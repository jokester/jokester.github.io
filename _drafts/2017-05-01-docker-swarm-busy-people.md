---
title: 试用docker swarm的记录
created_at: 2017-05-01
lang: zh
---

本文是我将已有的独立docker host转移到

## 我对 Container orchestration的需求以及非需求

- 能从一台主机控制整个集群，不需要逐个ssh
- 能指定特写服务在哪个host运行 (集群可能在多个vps商的多个位置)
- 配置可以用文件表达，可以和版本控制结合
- 方便的加密通信
- 配置简单
- (可选) 能像docker-compose一样，声明式地配置和连接container
- (可选) 自带类似vpn的，能跨host连接container的功能
- 不需要GUI
- 不需要复杂的监视 (另外会有log和资源监视，orchestration这一级能知道host / container的当前状态即可)

## 为什么我对swarm有兴趣

- 这是Docker自带的，看tutorial觉得概念和使用都算简单
- Docker 1.12 才有这个swarm mode，有时间从Mesos / Kubernetes学习
- Docker 1.13 (2017.1) 开始支持用docker-compose格式定义服务

## Swarm的特征

[Feather Highlights](https://docs.docker.com/engine/swarm/#feature-highlights)

- 和Docker统合的集群管理
- 去中心化
- 声明式service
- 弹性: 每个service可以动态增减task
- 状态重建: 如果一台worker machine死掉，会自动在其他worker重开task
- Multi-host networking
    - ???
- 服务发现: 自带DNS服务器，每个service分配一个dns name
    - Q: service也可用于负载均衡吗?
- 负载均衡
    - 可以暴露指定端口给外部的负载均衡
    - 可以在内部指定怎样分配service给node
- node之间默认用TLS通信
- 滚动更新: 一个service中的task可以不同时更新，并且可以回滚到service的前一状态

## Swarm的核心概念

[Swarm mode key concepts](https://docs.docker.com/engine/swarm/key-concepts/)

- `node` 一个以swarm mode运行的docker engine
    - `manager node` 既运行container又管理集群的node。"管理" 包括以下:
        - 分配task给node
        - 监视和恢复node状态 (`reconciliation`)，包括重启和新建container以保证服务数量
        - manager node之间自行决定出一个leader
    - `worker node` 只运行container的node
        - 向leader报告自己的状态
- `swarm` / `cluster` 所有node组成的集群
- `service`
    - 一个service包括image 和启动命令，声明了 `task`(s)
    - `replicated services` 一service有多个相同的task，运行在可能不同的node
    - `global services` 在每个node上运行一个task
        - 感觉可以用于fluentd 等task
- `task`
    - 对应一个container
    - swarm的最小调度单位
    - 在一个node建立后不可迁移到其他node
- 负载均衡
    - 一个service会被分配一个端口 (PublishedPort)
    - 外部的负载均衡可以使用 **任一** node的PublishedPort来访问该服务
        - 即使此node上没有此service的task也可以
        - 负载均衡 (将连接转发给相应的task) 由整个swarm完成，使用内部的DNS

## 管理swarm / 建立swarm和运行service

[Getting started with swarm mode](https://docs.docker.com/engine/swarm/swarm-tutorial/)

- `docker swarm init` 新建swarm
- `docker swarm join` 加入swarm
- `docker service create` 新建service
- `docker service inspect` 查看service
- `docker service scale` 调整一个service的task数量
- `docker service ps` 查看task
- `docker service rm` 删除service
    - 相应的task也会被删除
- `docker service update` 更新service
    - 可指定一个不同的image
        - 以及很多，见[options](https://docs.docker.com/engine/reference/commandline/service_update/#options)
    - 可以指定task更新的delay，避免task同时更新
    - 可以给service增加label
    - 旧task不会被删除
        - 不会被 (全部) 删除，每个service最多保留5个旧container
        - volume怎办?

## 管理swarm / secret

最大500kb的数据，可以是文件或字符串，只有需要此secret的node/task才能读到。在container内部看来是可访问的文件。

```text
docker secret create
docker secret inspect
docker secret ls
docker secret rm
--secret flag for docker service create
--secret-add and --secret-rm flags for docker service update
```

- 一个secret不能改名或覆盖，只能rm后重新add
- 更新secret后 service会自动重启

## 管理swarm / node和task

- `docker node update` 更新node状态
    - `update --availability drain` 停止在此node上新建task，并停止已有task在其他node重建
        - 已经drain的node可以再被设为active
- 可以通过service的constraint，让task在指定node运行

## 管理swarm / 网络

Swarm中的各机器用TLS over TCP通信，如果额外定义了overlay network也会被TLS透明转发。

## 管理swarm / volume

一个service可以有多个volume，但volume仍然是属于host的 (volume是和swarm独立的功能)。
- 有需要 / 有可能同步吗?

## 管理swarm / stack和compose

[Using Docker Stack And Compose YAML Files To Deploy Swarm Services](https://technologyconversations.com/2017/01/23/using-docker-stack-and-compose-yaml-files-to-deploy-swarm-services/)

[Deploy Docker Compose (v3) to Swarm (mode) Cluster](https://codefresh.io/blog/deploy-docker-compose-v3-swarm-mode-cluster/)

"stack" 是一组运行在swarm中的服务。Docker 1.13开始，可以用和compose一样的yaml定义stack。

## 管理swarm / 监视和log

"监视": node和task的资源以及存活状态

"log": task内应用的log

## 我之前的docker用法

- 每台docker host上有数个docker-compose.yaml，各自对应一个服务
- docker host之间不直接通信
- 每台docker host上有fluentd，将本机的container log转存到S3
- 另有一台机从S3下载log，发到ELK

## 新的docker用法

- 所有docker host组成swarm
- 仍然用docker-compose.yml管理
    - 保持已有的服务 (ss, nginx, wp, etc) 位于同一host，逐步迁移

## TODO

- 可以将一个task开放到外界吗?
- 可以连接同一台机的两个task吗?
- 可以一台机多个IP吗? (比如利用VPS的内部网络)
