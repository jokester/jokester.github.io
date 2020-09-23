---
title: In-house k3s cluster
publishAt: 2020-09-06
lang: en
---

# Hosts & Services

- a k3s server
  - for control plane and light services
  - spec: bhyve VM / 2core amd64 / 4G mem / debian10
- k3s agent (worker) node \* 3
  - for stateless (and preferably low disk-IO) services
  - spec: Raspberry PI 4 / 4core arm64 / 4G mem / manjaro (for now)
- a non k3s-managed node
  - for stated services with Docker:
    - DBs
    - Rancher
  - spec: ASRock BeeBox 3000 / Celeron 2core arm64 / 4G mem / 240G SSD / debian 10

# Watchlist

- arm64 support for Rancher's node monitor
    - see https://github.com/rancher/rancher/issues/27368

# TODOs

- make a customized Debian image for Raspberry PI 4
