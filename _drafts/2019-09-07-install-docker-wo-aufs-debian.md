---
title: Install docker-ce without aufs in Debian
created_at: 2019-09-07
---

docker-ce . 

simple . 

```

```

```
% sudo apt install docker-ce aufs-dkms- aufs-tools-                                                                                                                                        130 ↵

Reading package lists... Done
Building dependency tree
Reading state information... Done
Package 'aufs-dkms' is not installed, so not removed
Package 'aufs-tools' is not installed, so not removed
The following additional packages will be installed:
  cgroupfs-mount containerd.io docker-ce-cli pigz
Recommended packages:
  aufs-tools
The following NEW packages will be installed:
  cgroupfs-mount containerd.io docker-ce docker-ce-cli pigz
0 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.
Need to get 87.9 MB of archives.
After this operation, 390 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
```
