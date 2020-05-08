(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{280:function(a,t,e){"use strict";e.r(t);var s=e(37),n=Object(s.a)({},function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"crossover-canary-deployments"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#crossover-canary-deployments","aria-hidden":"true"}},[a._v("#")]),a._v(" Crossover Canary Deployments")]),a._v(" "),e("p",[a._v("This guide shows you how to use Envoy, "),e("a",{attrs:{href:"https://github.com/mumoshu/crossover",target:"_blank",rel:"noopener noreferrer"}},[a._v("Crossover"),e("OutboundLink")],1),a._v(" and Flagger to automate canary deployments.")]),a._v(" "),e("p",[a._v("Crossover is a minimal Envoy xDS implementation supports "),e("a",{attrs:{href:"https://smi-spec.io/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Service Mesh Interface"),e("OutboundLink")],1),a._v(".")]),a._v(" "),e("h2",{attrs:{id:"prerequisites"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites","aria-hidden":"true"}},[a._v("#")]),a._v(" Prerequisites")]),a._v(" "),e("p",[a._v("Flagger requires a Kubernetes cluster "),e("strong",[a._v("v1.11")]),a._v(" or newer and Envoy paired with "),e("a",{attrs:{href:"https://github.com/mumoshu/crossover",target:"_blank",rel:"noopener noreferrer"}},[a._v("Crossover"),e("OutboundLink")],1),a._v(" sidecar.")]),a._v(" "),e("p",[a._v("Create a test namespace:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl create ns "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n")])])]),e("p",[a._v("Install Envoy along with the Crossover sidecar with Helm:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("helm repo "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" crossover https://mumoshu.github.io/crossover\n\nhelm upgrade --install envoy crossover/envoy "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --namespace "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  -f "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<<")]),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("EOF\nsmi:\n  apiVersions:\n    trafficSplits: v1alpha1\nupstreams:\n  podinfo:\n    smi:\n      enabled: true\n    backends:\n      podinfo-primary:\n        port: 9898\n        weight: 100\n      podinfo-canary:\n        port: 9898\n        weight: 0\nEOF")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),e("p",[a._v("Install Flagger and the Prometheus add-on in the same namespace as Envoy:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("helm repo "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" flagger https://flagger.app\n\nhelm upgrade -i flagger flagger/flagger "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--namespace "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--set prometheus.install"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("true "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--set "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("meshProvider")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("smi:crossover\n")])])]),e("p",[a._v("Optionally you can enable Slack notifications:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("helm upgrade -i flagger flagger/flagger "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--reuse-values "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--namespace "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--set slack.url"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--set slack.channel"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("general "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--set slack.user"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("flagger\n")])])]),e("h2",{attrs:{id:"bootstrap"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bootstrap","aria-hidden":"true"}},[a._v("#")]),a._v(" Bootstrap")]),a._v(" "),e("p",[a._v("Flagger takes a Kubernetes deployment and optionally a horizontal pod autoscaler (HPA),\nthen creates a series of objects (Kubernetes deployments, ClusterIP services, SMI traffic splits).\nThese objects expose the application on the mesh and drive the canary analysis and promotion.\nThere's no SMI object you need to create by yourself.")]),a._v(" "),e("p",[a._v("Create a deployment and a horizontal pod autoscaler:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl apply -k github.com/weaveworks/flagger//kustomize/podinfo\n")])])]),e("p",[a._v("Deploy the load testing service to generate traffic during the canary analysis:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("helm upgrade -i flagger-loadtester flagger/loadtester "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--namespace"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("test\n")])])]),e("p",[a._v("Create a canary custom resource:")]),a._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" flagger.app/v1beta1\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Canary\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" podinfo\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("namespace")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" test\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("spec")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# specify mesh provider if it isn't the default one")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v('# provider: "smi:crossover"')]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# deployment reference")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("targetRef")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" apps/v1\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Deployment\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" podinfo\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# the maximum time in seconds for the canary deployment")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# to make progress before it is rollback (default 600s)")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("progressDeadlineSeconds")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("60")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# HPA reference (optional)")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("autoscalerRef")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" autoscaling/v2beta1\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" HorizontalPodAutoscaler\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" podinfo\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("service")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ClusterIP port number")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("port")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("9898")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# container port number or name (optional)")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("targetPort")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("9898")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# define the canary analysis timing and KPIs")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("analysis")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# schedule interval (default 60s)")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("interval")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" 1m\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# max number of failed metric checks before rollback")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("threshold")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# max traffic percentage routed to canary")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# percentage (0-100)")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("maxWeight")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("50")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# canary increment step")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# percentage (0-100)")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("stepWeight")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# App Mesh Prometheus checks")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("metrics")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("success"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("rate\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# minimum req success rate (non 5xx responses)")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# percentage (0-100)")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("thresholdRange")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("min")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("99")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("interval")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" 1m\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("duration\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# maximum req duration P99")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# milliseconds")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("thresholdRange")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("max")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("500")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("interval")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" 30s\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# testing (optional)")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("webhooks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" acceptance"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("test\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" pre"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("rollout\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("url")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" http"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("//flagger"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("loadtester.test/\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("timeout")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" 30s\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" bash\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("cmd")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"curl -sd 'test' http://podinfo-canary.test:9898/token | grep token\"")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" load"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("test\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("url")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" http"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("//flagger"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("loadtester.test/\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("timeout")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" 5s\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("cmd")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"hey -z 1m -q 10 -c 2 -H 'Host: podinfo.test' http://envoy.test:10000/\"")]),a._v("\n")])])]),e("p",[a._v("Save the above resource as podinfo-canary.yaml and then apply it:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl apply -f ./podinfo-canary.yaml\n")])])]),e("p",[a._v("After a couple of seconds Flagger will create the canary objects:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# applied ")]),a._v("\ndeployment.apps/podinfo\nhorizontalpodautoscaler.autoscaling/podinfo\ncanary.flagger.app/podinfo\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# generated")]),a._v("\ndeployment.apps/podinfo-primary\nhorizontalpodautoscaler.autoscaling/podinfo-primary\nservice/podinfo\nservice/podinfo-canary\nservice/podinfo-primary\ntrafficsplits.split.smi-spec.io/podinfo\n")])])]),e("p",[a._v("After the boostrap, the podinfo deployment will be scaled to zero and the traffic to "),e("code",[a._v("podinfo.test")]),a._v("\nwill be routed to the primary pods. During the canary analysis,\nthe "),e("code",[a._v("podinfo-canary.test")]),a._v(" address can be used to target directly the canary pods.")]),a._v(" "),e("h2",{attrs:{id:"automated-canary-promotion"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#automated-canary-promotion","aria-hidden":"true"}},[a._v("#")]),a._v(" Automated canary promotion")]),a._v(" "),e("p",[a._v("Flagger implements a control loop that gradually shifts traffic to the canary while measuring\nkey performance indicators like HTTP requests success rate, requests average duration and pod health.\nBased on analysis of the KPIs a canary is promoted or aborted, and the analysis result is published to Slack.")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/weaveworks/flagger/master/docs/diagrams/flagger-canary-steps.png",alt:"Flagger Canary Stages"}})]),a._v(" "),e("p",[a._v("A canary deployment is triggered by changes in any of the following objects:")]),a._v(" "),e("ul",[e("li",[a._v("Deployment PodSpec (container image, command, ports, env, resources, etc)")]),a._v(" "),e("li",[a._v("ConfigMaps and Secrets mounted as volumes or mapped to environment variables")])]),a._v(" "),e("p",[a._v("Trigger a canary deployment by updating the container image:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl -n "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("set")]),a._v(" image deployment/podinfo "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("podinfod")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("stefanprodan/podinfo:3.1.5\n")])])]),e("p",[a._v("Flagger detects that the deployment revision changed and starts a new rollout:")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("kubectl -n test describe canary/podinfo\n\nStatus:\n  Canary Weight:         0\n  Failed Checks:         0\n  Phase:                 Succeeded\nEvents:\n New revision detected! Scaling up podinfo.test\n Waiting for podinfo.test rollout to finish: 0 of 1 updated replicas are available\n Pre-rollout check acceptance-test passed\n Advance podinfo.test canary weight 5\n Advance podinfo.test canary weight 10\n Advance podinfo.test canary weight 15\n Advance podinfo.test canary weight 20\n Advance podinfo.test canary weight 25\n Advance podinfo.test canary weight 30\n Advance podinfo.test canary weight 35\n Advance podinfo.test canary weight 40\n Advance podinfo.test canary weight 45\n Advance podinfo.test canary weight 50\n Copying podinfo.test template spec to podinfo-primary.test\n Waiting for podinfo-primary.test rollout to finish: 1 of 2 updated replicas are available\n Routing all traffic to primary\n Promotion completed! Scaling down podinfo.test\n")])])]),e("p",[a._v("When the canary analysis starts, Flagger will call the pre-rollout webhooks before routing traffic to the canary.")]),a._v(" "),e("p",[e("strong",[a._v("Note")]),a._v(" that if you apply new changes to the deployment during the canary analysis, Flagger will restart the analysis.")]),a._v(" "),e("p",[a._v("During the analysis the canary’s progress can be monitored with Grafana.")]),a._v(" "),e("p",[a._v("Flagger comes with a Grafana dashboard made for canary analysis. Install Grafana with Helm:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("helm upgrade -i flagger-grafana flagger/grafana "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--namespace"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("test "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--set "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("url")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("http://flagger-prometheus:9090\n")])])]),e("p",[a._v("Run:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl port-forward --namespace "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" svc/flagger-grafana "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3000")]),a._v(":80\n")])])]),e("p",[a._v("The Envoy dashboard URL is "),e("a",{attrs:{href:"http://localhost:3000/d/flagger-envoy/envoy-canary?refresh=10s&orgId=1&var-namespace=test&var-target=podinfo",target:"_blank",rel:"noopener noreferrer"}},[a._v("http://localhost:3000/d/flagger-envoy/envoy-canary?refresh=10s&orgId=1&var-namespace=test&var-target=podinfo"),e("OutboundLink")],1)]),a._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/weaveworks/flagger/master/docs/screens/flagger-grafana-appmesh.png",alt:"Envoy Canary Dashboard"}})]),a._v(" "),e("p",[a._v("You can monitor all canaries with:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("watch")]),a._v(" kubectl get canaries --all-namespaces\n\nNAMESPACE   NAME      STATUS        WEIGHT   LASTTRANSITIONTIME\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("        podinfo   Progressing   "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("15")]),a._v("       "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("2019")]),a._v("-10-02T14:05:07Z\nprod        frontend  Succeeded     "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("        "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("2019")]),a._v("-10-02T16:15:07Z\nprod        backend   Failed        "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("        "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("2019")]),a._v("-10-02T17:05:07Z\n")])])]),e("p",[a._v("If you’ve enabled the Slack notifications, you should receive the following messages:")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/weaveworks/flagger/master/docs/screens/slack-canary-notifications.png",alt:"Flagger Slack Notifications"}})]),a._v(" "),e("h2",{attrs:{id:"automated-rollback"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#automated-rollback","aria-hidden":"true"}},[a._v("#")]),a._v(" Automated rollback")]),a._v(" "),e("p",[a._v("During the canary analysis you can generate HTTP 500 errors or high latency to test if Flagger pauses the rollout.")]),a._v(" "),e("p",[a._v("Trigger a canary deployment:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl -n "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("set")]),a._v(" image deployment/podinfo "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("podinfod")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("stefanprodan/podinfo:3.1.2\n")])])]),e("p",[a._v("Exec into the load tester pod with:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("kubectl -n "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("exec")]),a._v(" -it deploy/flagger-loadtester "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("bash")]),a._v("\n")])])]),e("p",[a._v("Generate HTTP 500 errors:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("hey -z 1m -c "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v(" -q "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("'Host: podinfo.test'")]),a._v(" http://envoy.test:10000/status/500\n")])])]),e("p",[a._v("Generate latency:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("watch")]),a._v(" -n "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("'Host: podinfo.test'")]),a._v(" http://envoy.test:10000/delay/1\n")])])]),e("p",[a._v("When the number of failed checks reaches the canary analysis threshold, the traffic is routed back to the primary,\nthe canary is scaled to zero and the rollout is marked as failed.")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("kubectl -n test logs deploy/flagger -f | jq .msg\n\nNew revision detected! Starting canary analysis for podinfo.test\nPre-rollout check acceptance-test passed\nAdvance podinfo.test canary weight 5\nAdvance podinfo.test canary weight 10\nAdvance podinfo.test canary weight 15\nHalt podinfo.test advancement success rate 69.17% < 99%\nHalt podinfo.test advancement success rate 61.39% < 99%\nHalt podinfo.test advancement success rate 55.06% < 99%\nHalt podinfo.test advancement request duration 1.20s > 0.5s\nHalt podinfo.test advancement request duration 1.45s > 0.5s\nRolling back podinfo.test failed checks threshold reached 5\nCanary failed! Scaling down podinfo.test\n")])])]),e("p",[a._v("If you’ve enabled the Slack notifications, you’ll receive a message if the progress deadline is exceeded,\nor if the analysis reached the maximum number of failed checks:")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/weaveworks/flagger/master/docs/screens/slack-canary-failed.png",alt:"Flagger Slack Notifications"}})])])},[],!1,null,null,null);t.default=n.exports}}]);