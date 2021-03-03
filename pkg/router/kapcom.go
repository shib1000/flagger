package router

import (
	"context"
	"encoding/json"
	"fmt"
	flaggerv1 "github.com/fluxcd/flagger/pkg/apis/flagger/v1beta1"
	"github.com/fluxcd/flagger/pkg/apis/kapcom/v1beta1"
	kapcomv1beta1 "github.com/fluxcd/flagger/pkg/apis/kapcom/v1beta1"
	"k8s.io/apimachinery/pkg/types"
	"strings"

	clientset "github.com/fluxcd/flagger/pkg/client/clientset/versioned"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"go.uber.org/zap"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/kubernetes"
)

type KapcomRouter struct {
	kubeClient    kubernetes.Interface
	kapcomClient  clientset.Interface
	flaggerClient clientset.Interface
	logger        *zap.SugaredLogger
	ingressClass  string
}
type updateSpec struct {
	Spec kapcomv1beta1.IngressRouteSpec `json:"spec"`
}

func (kr *KapcomRouter) Reconcile(canary *flaggerv1.Canary) error {
	const annotation = "kubernetes.io/ingress.class"

	apexName, primaryName, canaryName := canary.GetServiceNames()

	newSpec := v1beta1.IngressRouteSpec{
		Routes: []v1beta1.Route{
			{
				PermitInsecure: true,
				Match:          kr.makeExactPath(canary),
				TimeoutPolicy:  kr.makeTimeoutPolicy(canary),
				RetryPolicy:    kr.makeRetryPolicy(canary),
				Services: []v1beta1.Service{
					{
						Name:   primaryName,
						Port:   int(canary.Spec.Service.Port),
						Weight: 100,
						//HealthCheck: kr.makeHealthCheck(canary),
					},
					{
						Name:   canaryName,
						Port:   int(canary.Spec.Service.Port),
						Weight: 0,
						//HealthCheck: kr.makeHealthCheck(canary),
					},
				},
			},
		},
	}

	if len(canary.GetAnalysis().Match) > 0 {
		newSpec = v1beta1.IngressRouteSpec{
			Routes: []v1beta1.Route{
				{
					PermitInsecure: true,
					Match:          kr.makeExactPath(canary),
					TimeoutPolicy:  kr.makeTimeoutPolicy(canary),
					RetryPolicy:    kr.makeRetryPolicy(canary),
					Services: []v1beta1.Service{
						{
							Name:   primaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: 100,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
						{
							Name:   canaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: 0,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
					},
				},
				{
					PermitInsecure: true,
					Match:          kr.makeExactPath(canary),
					TimeoutPolicy:  kr.makeTimeoutPolicy(canary),
					RetryPolicy:    kr.makeRetryPolicy(canary),
					Services: []v1beta1.Service{
						{
							Name:   primaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: 100,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
						{
							Name:   canaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: 0,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
					},
				},
			},
		}
	}

	proxy, err := kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Get(context.TODO(), apexName, metav1.GetOptions{})

	if errors.IsNotFound(err) {
		proxy = &v1beta1.IngressRoute{
			ObjectMeta: metav1.ObjectMeta{
				Name:      apexName,
				Namespace: canary.Namespace,
				OwnerReferences: []metav1.OwnerReference{
					*metav1.NewControllerRef(canary, schema.GroupVersionKind{
						Group:   flaggerv1.SchemeGroupVersion.Group,
						Version: flaggerv1.SchemeGroupVersion.Version,
						Kind:    flaggerv1.CanaryKind,
					}),
				},
			},
			Spec: newSpec,
			Status: v1beta1.Status{
				CurrentStatus: "valid",
				Description:   "valid IngressRoute",
			},
		}

		if kr.ingressClass != "" {
			proxy.Annotations = map[string]string{
				annotation: "contour-corp",
			}
		}
		//proxy.Spec.Routes[0].PermitInsecure=true
		_, err = kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Create(context.TODO(), proxy, metav1.CreateOptions{})
		if err != nil {
			return fmt.Errorf("IngressRoute %s.%s create error: %w", apexName, canary.Namespace, err)
		}
		kr.logger.With("canary", fmt.Sprintf("%s.%s", canary.Name, canary.Namespace)).
			Infof("IngressRoute %s.%s created", proxy.GetName(), canary.Namespace)
		return nil
	} else if err != nil {
		return fmt.Errorf("IngressRoute %s.%s get query error: %w", apexName, canary.Namespace, err)
	}

	// update IngressRoute but keep the original destination weights
	if proxy != nil {
		if diff := cmp.Diff(
			newSpec,
			proxy.Spec,
			cmpopts.IgnoreFields(kapcomv1beta1.Service{}, "Weight"),
		); diff != "" {
			clone := proxy.DeepCopy()
			clone.Spec = newSpec
			_, err = kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Update(context.TODO(), clone, metav1.UpdateOptions{})
			if err != nil {
				return fmt.Errorf("IngressRoute %s.%s update error: %w", apexName, canary.Namespace, err)
			}
			kr.logger.With("canary", fmt.Sprintf("%s.%s", canary.Name, canary.Namespace)).
				Infof("IngressRoute %s.%s updated", proxy.GetName(), canary.Namespace)
		}

	}

	return nil
}

// GetRoutes returns the service weight for primary and canary
func (kr *KapcomRouter) GetRoutes(canary *flaggerv1.Canary) (
	primaryWeight int,
	canaryWeight int,
	mirrored bool,
	err error,
) {
	apexName, primaryName, _ := canary.GetServiceNames()

	proxy, err := kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Get(context.TODO(), apexName, metav1.GetOptions{})
	if err != nil {
		err = fmt.Errorf("IngressRoute %s.%s get query error %w", apexName, canary.Namespace, err)
		return
	}

	if len(proxy.Spec.Routes) < 1 || len(proxy.Spec.Routes[0].Services) < 2 {
		err = fmt.Errorf("IngressRoute %s.%s services not found", apexName, canary.Namespace)
		return
	}

	for _, dst := range proxy.Spec.Routes[0].Services {
		if dst.Name == primaryName {
			primaryWeight = int(dst.Weight)
			canaryWeight = 100 - primaryWeight
			return
		}
	}
	return

}

func (kr *KapcomRouter) SetRoutes(
	canary *flaggerv1.Canary,
	primaryWeight int,
	canaryWeight int,
	_ bool,
) error {
	apexName, primaryName, canaryName := canary.GetServiceNames()

	if primaryWeight == 0 && canaryWeight == 0 {
		return fmt.Errorf("Ingressroute %s.%s update failed: no valid weights", apexName, canary.Namespace)
	}

	proxy, err := kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Get(context.TODO(), apexName, metav1.GetOptions{})
	if err != nil {
		return fmt.Errorf("Ingressroute %s.%s query error: %w", apexName, canary.Namespace, err)
	}

	newRoutes := []v1beta1.Route{
		{
			PermitInsecure: true,
			Match:          kr.makeExactPath(canary),
			TimeoutPolicy:  kr.makeTimeoutPolicy(canary),
			RetryPolicy:    kr.makeRetryPolicy(canary),
			Services: []v1beta1.Service{
				{
					Name:   primaryName,
					Port:   int(canary.Spec.Service.Port),
					Weight: primaryWeight,
					//HealthCheck: kr.makeHealthCheck(canary),
				},
				{
					Name:   canaryName,
					Port:   int(canary.Spec.Service.Port),
					Weight: canaryWeight,
					//HealthCheck: kr.makeHealthCheck(canary),
				},
			}},
	}

	proxy.Spec = v1beta1.IngressRouteSpec{
		Routes: newRoutes,
	}

	if len(canary.GetAnalysis().Match) > 0 {
		proxy.Spec = v1beta1.IngressRouteSpec{
			Routes: []v1beta1.Route{
				{
					PermitInsecure: true,
					Match:          kr.makeExactPath(canary),
					TimeoutPolicy:  kr.makeTimeoutPolicy(canary),
					RetryPolicy:    kr.makeRetryPolicy(canary),
					Services: []v1beta1.Service{
						{
							Name:   primaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: primaryWeight,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
						{
							Name:   canaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: canaryWeight,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
					},
				},
				{
					PermitInsecure: true,
					Match:          kr.makeExactPath(canary),
					TimeoutPolicy:  kr.makeTimeoutPolicy(canary),
					RetryPolicy:    kr.makeRetryPolicy(canary),
					Services: []v1beta1.Service{
						{
							Name:   primaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: 100,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
						{
							Name:   canaryName,
							Port:   int(canary.Spec.Service.Port),
							Weight: 0,
							//HealthCheck: kr.makeHealthCheck(canary),
						},
					},
				},
			},
		}
	}

	payloadBytes, _ := json.Marshal(proxy)
	_, err = kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Patch(context.TODO(), apexName, types.MergePatchType, payloadBytes, metav1.PatchOptions{}, "")
	if err != nil {
		return fmt.Errorf("Ingressroute %s.%s query error: %w", apexName, canary.Namespace, err)
	}

	svc, err := kr.kubeClient.CoreV1().Services(canary.Namespace).Get(context.TODO(), canaryName, metav1.GetOptions{})
	if err != nil {
		return fmt.Errorf("Service  %s.%s fetch error: %w", apexName, canary.Namespace, err)
	}
	selectorMap := make(map[string]string)
	// Ensure Kapcom has upstream from both primary and canary sides to start with.
	if canary.Status.CanaryWeight == 0 && canary.Status.Phase == flaggerv1.CanaryPhaseProgressing {
		selectorMap = svc.Spec.Selector
	}
	for selector, _ := range svc.Spec.Selector {
		if strings.LastIndex(selector, "-common") > 0 {
			selectorMap[strings.ReplaceAll(selector, "-common", "")] =
				strings.ReplaceAll(svc.Spec.Selector[selector], "-common", "")
		}
	}
	if len(selectorMap) > 0 {
		svc.Spec.Selector = selectorMap
	//if updateMap{
		_, err = kr.kubeClient.CoreV1().Services(canary.Namespace).Update(context.TODO(), svc, metav1.UpdateOptions{})
		if err != nil {
			return fmt.Errorf("Service  %s.%s fetch error: %w", apexName, canary.Namespace, err)
		}
	}
	//_, err = kr.kapcomClient.KapcomV1beta1().IngressRoutes(canary.Namespace).Update(context.TODO(), proxy, metav1.UpdateOptions{})
	return nil
}

func (kr *KapcomRouter) makeExactPath(canary *flaggerv1.Canary) string {
	prefix := "/"

	if len(canary.Spec.Service.Match) > 0 &&
		canary.Spec.Service.Match[0].Uri != nil &&
		canary.Spec.Service.Match[0].Uri.Prefix != "" {
		prefix = canary.Spec.Service.Match[0].Uri.Exact
	}

	return prefix
}

func (kr *KapcomRouter) Finalize(_ *flaggerv1.Canary) error {
	return nil
}

func (kr *KapcomRouter) makeTimeoutPolicy(canary *flaggerv1.Canary) *v1beta1.TimeoutPolicy {
	if canary.Spec.Service.Timeout != "" {
		return &v1beta1.TimeoutPolicy{
			Request: fmt.Sprintf("%s", canary.Spec.Service.Timeout),
		}
	}
	return nil
}

func (kr *KapcomRouter) makeRetryPolicy(canary *flaggerv1.Canary) *v1beta1.RetryPolicy {
	if canary.Spec.Service.Retries != nil {
		return &v1beta1.RetryPolicy{
			NumRetries:    canary.Spec.Service.Retries.Attempts,
			PerTryTimeout: canary.Spec.Service.Retries.PerTryTimeout,
		}
	}
	return nil
}

func (kr *KapcomRouter) makeHealthCheck(canary *flaggerv1.Canary) *v1beta1.HealthCheck {
	if canary.Spec.Service.Retries != nil {
		return &v1beta1.HealthCheck{
			Path:                    "/ping",
			IntervalSeconds:         60,
			TimeoutSeconds:          5,
			UnhealthyThresholdCount: 3,
			HealthyThresholdCount:   1,
		}
	}
	return nil
}
