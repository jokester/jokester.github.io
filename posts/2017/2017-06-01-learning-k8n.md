---
title: Learning kubernetes
---

Memo when learning about kubernetes / k8n.

- toc
{:toc}




## Basic Concepts

### Cluster and nodes

A cluster consists of:

- 1 `master node`
    - interacts with human ops
    - schedule containers to run on nodes
- multiple `non-master` node
    - worker machines that supports container (docker or rkt), can be a VM or a physical PC
    - runs a `Kubelet` agent process

### Pod

- a environment for containers inside, not something that *run*s.
- always run on **one** node
    - contains 1 or more containers
        - all containers share same network namespace & port space
        - a container is *able* to communicate with other containers in same pod, with `localhost` ports
        - a container is *able* to , after some setting
            - what if cross-pod and same-host?
            - what if cross-host?
    - contains 0 or more volumes
        - a volume can persist when container *restarts*
        - all volumes get removed when that pod gets removed
        - XXX: how do I keep persist data (files) then?
            - can i have persist volumes that exists after pod remove?
- creation: rarely directly created
    - rather, they are created by controller
- deletion:
    - *preStop* hook can be defined to do sth
        - executed inside pod
            - can it be used to backup volumes?

a pod can have *init container*s that are sequentially executed, before other containers.

### Service

abstraction of "a logical set of Pods" and "policy to access them by", aka ("micro-service").

- encapsulates repicas etc: a frontend service only need to know backend service, not replicas inside.

Kubernetes provides "virtual-ip-based bridge which redirects to backend Pods."
- is this what is called "service proxy"?

selector:
- a service can use a selector to match pods that are part of it
- a service without selector can be used to "import" something outside into a cluster
    - e.g. a internet service defined by domain name

discovering services:
- way 1: environment variable (requires a service to be created prior to pods that use it)
- way 2: DNS
    - DNS records are created for end services, by a "cluster addon"
        - e.g. `my-service` in `my-ns` namespace will have DNS record of `my-services.my-ns`. also pods in the same namespace can just use `my-service`.
        - k8n also provides "DNS SRV" to query port number with "named ports" (e.g. http)
    - i like this

headless service: a service that is not exposed as a single service IP

publishing services:

- ClusterIP: a virtual ip that is internal to cluster
    - "headless" service
- NodePort: expose service on each node's ip
- LoadBalancer: ??
- ExternalName: a internet hostname or IP?
- externel ip?

### Volume

Aim:
- persist files between container restarts
- share files between container

types of volume:
- emptyDir
- hostPath: somewhere from host FS
    - can we use this to do persist data storage?
- platform-specific: gce / aws / azure
- network storage: nfs / glusterFS / cephfs
- `secret` for sensitive info like passwords
    - XXX: can this be updated on the fly?
- `local`: ???
    - https://github.com/kubernetes-incubator/external-storage/tree/master/local-volume

### Namespace

### Endpoint

- something that accepts traffic? no idea yet
- ???


### Controller

Stuff that create and manage pods?

- handle replication, rollout, self-healing

types of controller:
- Job
    - for pods that are expected to terminate
- ReplicationController / ReplicaSet / Deployment
    - for pods that should not terminate. e.g. web server
- DaemonSet
    - for per-machine pods

Pods alone are not resilient to machine failures, but controllers are.

### Deployment

- instructions of how to create / update `instances` of application
    - `Master` schedules a deployment is , and ensure they are still running
    - TODO: wtf are instances?
- deployment itself can be *scaled* or *updated*

## My require of features

- Can containers (supposedly the atomic unit in container orchestration) communicate with each other?
    - what about containers in the same service (or some larger unit)
    - what if they are not in the same service
    - what if they are in different host
    - what protocol is supported: TCP / UDP / Unix socket?
    - can this be configured without downtime?
- How is a service defined?
    - I would prefer a declarative and git-friendly way
    - XXX: seemingly can be defined with [yaml](). I love this feature.
- How is containers connected to internet?
- What
- Security: what is default 

## My usage of 

Wishes:

- cross-host tcp forwarding
- volume (even fixed is fine)


## References

- [kubernetes.io / concepts](https://kubernetes.io/docs/concepts/)
- [openshift v3 / core concepts](https://docs.openshift.com/online/architecture/core_concepts/index.html)
- [coreos / concepts](https://coreos.com/kubernetes/docs/latest/)
