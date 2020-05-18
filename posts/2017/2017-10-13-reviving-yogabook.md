---
title: 我的笔记本电脑复活了
publishAt: 2017-10-13
slug: reviving-yogabook
---

上上周我的笔记本 (Lenovo yogabook 710) 因无线网卡故障而送修了，今天拿到了修好的机器。本文记录一下送修前后备份和恢复系统的主要经过。

这台机是上半年某次特价时买的，性能不强 (i5-7Y54 1.2G 2 核 4 线程)，且键盘手感很一般，
但装了 Arch Linux 后用起来还行 (电池可用 10 小时，没有需要特别折腾的硬件)。
是我不想起床时，以及去公园写东西时的主要用机。

## Linux 配置

文件系统:

- sda1: vfat boot 分区 512M
- sda2: btrfs 主分区 约 240G

启动管理器: [rEFInd](http://www.rodsbooks.com/refind/)

桌面: 一般 xfce / 有时 awesome

## 送修时

- 把硬盘上的当天的 snapshot 发到家里 NAS
  - `# btrfs subvolume send 路径 | gz > /media/iris/disk1/backup/djpon-btrfs.img.gz`
    - `/media/iris` 是 nas 的 mount 路径
  - sda1 (`/boot`) 几乎全是默认设置就没专门备份，直接重建)
- 抹掉硬盘: usb 启动后 `shred /dev/sda`
- 用 usb 装个 win 10 (装好就自动激活了)
- 寄回 lenovo

## 修好后

- 用 archlinux 的 liveusb 启动
- 重新分区
- 恢复文件
  - 把主分区的根 volume mount 到 `/mnt`，记得 `-o compress=lzo`
  - 把 snapshot 复制回来:
    - `# curl http://iris.local/disk1/backup/djpon-btrfs.img.gz | zcat | btrfs subvolume receive /mnt`
    - `http://iris` 是 nas 的 http 文件共享。用的自己写的 [toosimple](https://github.com/jokester/toosimple)
  - 上面 receive 出来的 subvolume 还是只读。要再生成一个可读写的 subvolume 用于 `/`
    - `# btrfs subvolume snapshot sysvol-20171001 sysvol`
  - `umount /mnt` 并将新建的 sysvol mount 到`/mnt`
    - `# mount -o compress=lzo,subvol=/sysvol`
- 重新生成 fstab: `genfstab -U -p /mnt >> /mnt/etc/fstab.new` 然后 vimdiff 回去
- 重建 boot
  - 把 boot 分区 mount 到 `/mnt/boot`, arch-chroot 进 `/mnt`，
  - 恢复内核和 ucode: `pacman -S linux intel-ucode`
    - 如果你的/boot 有更多东西: 可以 `pacman -Qkk | grep boot` 检查一下哪些包需要恢复
  - 设置启动管理器 (refind)
- 重启后如果一切正常就可以继续用了
