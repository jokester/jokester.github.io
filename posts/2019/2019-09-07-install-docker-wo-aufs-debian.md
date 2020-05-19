---
title: Install docker-ce without aufs in Debian
publishAt: 2019-09-07
slug: install-docker-ce-without-aufs-in-debian
---

The offical build of [docker-ce for debian](https://docs.docker.com/install/linux/docker-ce/debian/)
listed [dkms](https://en.wikipedia.org/wiki/Dynamic_Kernel_Module_Support)
and dkms-built [aufs](https://en.wikipedia.org/wiki/Aufs)
as (non-optional) dependencies. This causes `aufs` kernel module to be built on every kernel update.

Also the `aufs` module (for docker's `aufs` storage driver) may not even get used:
recent docker would pick newer `overlay2` (available since Linux 4.0) or `btrfs` storage driver when possible.

This article introduces how to make sure `aufs` is not used, and how to install `docker-ce` without it.

If you dont have docker-ce installed (and believe aufs won't be required), just skip to the last part.

## Make sure aufs is not used

```shell
$ sudo docker info

Server:
 Containers: 4
  Running: 4
  Paused: 0
  Stopped: 0
 Images: 11
 Server Version: 19.03.2-ce
 Storage Driver: btrfs      << clean if this is not 'aufs'
```

```sh
$ modprobe | grep aufs
                            << clean if nothing appears (the module doesn't exist) or 'aufs 0' (not used)
```

## (re-) Install docker-ce without aufs

NOTE: if docker is already installed with default dependencies, there is no need to remove it first (in that case apt just remove unnecessary direct dependent packages. Remember to `apt autoremove` to remove transitive dependencies after that).

```shell
$ sudo apt install docker-ce aufs-dkms- aufs-tools-
```
