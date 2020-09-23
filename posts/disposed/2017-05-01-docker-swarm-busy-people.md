---
title: 试用docker swarm的记录
created_at: 2017-05-01
lang: zh
---

本文是我将已有的独立 docker host 转移到

## 我对 Container orchestration的需求以及非需求

- 能从一台主机控制整个集群，不需要逐个 ssh
- 能指定特写服务在哪个 host 运行 (集群可能在多个 vps 商的多个位置)
- 配置可以用文件表达，可以和版本控制结合
- 方便的加密通信
- 配置简单
- (可选) 能像 docker-compose 一样，声明式地配置和连接 container
- (可选) 自带类似 vpn 的，能跨 host 连接 container 的功能
- 不需要 GUI
- 不需要复杂的监视 (另外会有 log 和资源监视，orchestration 这一级能知道 host / container 的当前状态即可)

## 为什么我对swarm有兴趣

- 这是 Docker 自带的，看 tutorial 觉得概念和使用都算简单
- Docker 1.12 才有这个 swarm mode，有时间从 Mesos / Kubernetes 学习
- Docker 1.13 (2017.1) 开始支持用 docker-compose 格式定义服务

## Swarm的特征

[Feather Highlights](https://docs.docker.com/engine/swarm/#feature-highlights)

- 和 Docker 统合的集群管理
- 去中心化
- 声明式 service
- 弹性: 每个 service 可以动态增减 task
- 状态重建: 如果一台 worker machine 死掉，会自动在其他 worker 重开 task
- Multi-host networking
    - ???
- 服务发现: 自带 DNS 服务器，每个 service 分配一个 dns name
    - Q: service 也可用于负载均衡吗?
- 负载均衡
    - 可以暴露指定端口给外部的负载均衡
    - 可以在内部指定怎样分配 service 给 node
- node 之间默认用 TLS 通信
- 滚动更新: 一个 service 中的 task 可以不同时更新，并且可以回滚到 service 的前一状态

## Swarm的核心概念

[Swarm mode key concepts](https://docs.docker.com/engine/swarm/key-concepts/)

- `node` 一个以 swarm mode 运行的 docker engine
    - `manager node` 既运行 container 又管理集群的 node。"管理" 包括以下:
        - 分配 task 给 node
        - 监视和恢复 node 状态 (`reconciliation`)，包括重启和新建 container 以保证服务数量
        - manager node 之间自行决定出一个 leader
    - `worker node` 只运行 container 的 node
        - 向 leader 报告自己的状态
- `swarm` / `cluster` 所有 node 组成的集群
- `service`
    - 一个 service 包括 image 和启动命令，声明了 `task`(s)
    - `replicated services` 一 service 有多个相同的 task，运行在可能不同的 node
    - `global services` 在每个 node 上运行一个 task
        - 感觉可以用于 fluentd 等 task
- `task`
    - 对应一个 container
    - swarm 的最小调度单位
    - 在一个 node 建立后不可迁移到其他 node
- 负载均衡
    - 一个 service 会被分配一个端口 (PublishedPort)
    - 外部的负载均衡可以使用 **任一** node 的 PublishedPort 来访问该服务
        - 即使此 node 上没有此 service 的 task 也可以
        - 负载均衡 (将连接转发给相应的 task) 由整个 swarm 完成，使用内部的 DNS

## 管理swarm / 建立swarm和运行service

[Getting started with swarm mode](https://docs.docker.com/engine/swarm/swarm-tutorial/)

- `docker swarm init` 新建 swarm
- `docker swarm join` 加入 swarm
- `docker service create` 新建 service
- `docker service inspect` 查看 service
- `docker service scale` 调整一个 service 的 task 数量
- `docker service ps` 查看 task
- `docker service rm` 删除 service
    - 相应的 task 也会被删除
- `docker service update` 更新 service
    - 可指定一个不同的 image
        - 以及很多，见[options](https://docs.docker.com/engine/reference/commandline/service_update/#options)
    - 可以指定 task 更新的 delay，避免 task 同时更新
    - 可以给 service 增加 label
    - 旧 task 不会被删除
        - 不会被 (全部) 删除，每个 service 最多保留 5 个旧 container
        - volume 怎办?

## 管理swarm / secret

最大 500kb 的数据，可以是文件或字符串，只有需要此 secret 的 node/task 才能读到。在 container 内部看来是可访问的文件。

```text
docker secret create
docker secret inspect
docker secret ls
docker secret rm
--secret flag for docker service create
--secret-add and --secret-rm flags for docker service update
```

- 一个 secret 不能改名或覆盖，只能 rm 后重新 add
- 更新 secret 后 service 会自动重启

## 管理swarm / node和task

- `docker node update` 更新 node 状态
    - `update --availability drain` 停止在此 node 上新建 task，并停止已有 task 在其他 node 重建
        - 已经 drain 的 node 可以再被设为 active
- 可以通过 service 的 constraint，让 task 在指定 node 运行

## 管理swarm / 网络

Swarm 中的各机器用 TLS over TCP 通信，如果额外定义了 overlay network 也会被 TLS 透明转发。

## 管理swarm / volume

一个 service 可以有多个 volume，但 volume 仍然是属于 host 的 (volume 是和 swarm 独立的功能)。
- 有需要 / 有可能同步吗?

## 管理swarm / stack和compose

[Using Docker Stack And Compose YAML Files To Deploy Swarm Services](https://technologyconversations.com/2017/01/23/using-docker-stack-and-compose-yaml-files-to-deploy-swarm-services/)

[Deploy Docker Compose (v3) to Swarm (mode) Cluster](https://codefresh.io/blog/deploy-docker-compose-v3-swarm-mode-cluster/)

"stack" 是一组运行在 swarm 中的服务。Docker 1.13 开始，可以用和 compose 一样的 yaml 定义 stack。

## 管理swarm / 监视和log

"监视": node 和 task 的资源以及存活状态

"log": task 内应用的 log

## 我之前的docker用法

- 每台 docker host 上有数个 docker-compose.yaml，各自对应一个服务
- docker host 之间不直接通信
- 每台 docker host 上有 fluentd，将本机的 container log 转存到 S3
- 另有一台机从 S3 下载 log，发到 ELK

## 新的docker用法

- 所有 docker host 组成 swarm
- 仍然用 docker-compose.yml 管理
    - 保持已有的服务 (ss, nginx, wp, etc) 位于同一 host，逐步迁移

## TODO

- 可以将一个 task 开放到外界吗?
- 可以连接同一台机的两个 task 吗?
- 可以一台机多个 IP 吗? (比如利用 VPS 的内部网络)
