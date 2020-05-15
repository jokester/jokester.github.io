---
title: 我的笔记本复活了
---

上上周我的笔记本 (Lenovo yogabook 710) 因无线网卡故障而送修了，今天拿到了修好的机器。本文记录一下送修前后备份和恢复系统的主要经过。

这台机是上半年某次特价时买的，性能不强 (i5-7Y54 1.2G 2核4线程)，且键盘手感很一般，
但装了Arch Linux后用起来还行 (电池可用10小时，没有需要特别折腾的硬件)。
是我不想起床时，以及去公园写东西时的主要用机。

## Linux配置

文件系统:

- sda1: vfat boot分区 512M
- sda2: btrfs 主分区 约240G

启动管理器: [rEFInd](http://www.rodsbooks.com/refind/)

桌面: 一般xfce / 有时awesome

## 送修时

- 把硬盘上的当天的snapshot 发到家里NAS
    - `# btrfs subvolume send 路径 | gz > /media/iris/disk1/backup/djpon-btrfs.img.gz`
        - `/media/iris` 是 nas 的 mount 路径
    - sda1 (`/boot`) 几乎全是默认设置就没专门备份，直接重建)
- 抹掉硬盘: usb启动后 `shred /dev/sda`
- 用usb装个win 10 (装好就自动激活了)
- 寄回lenovo

## 修好后

- 用archlinux的liveusb启动
- 重新分区
- 恢复文件
    - 把主分区的根volume mount到 `/mnt`，记得 `-o compress=lzo`
    - 把snapshot复制回来:
        - `# curl http://iris/disk1/backup/djpon-btrfs.img.gz | zcat | btrfs subvolume receive /mnt`
        - `http://iris` 是nas的http文件共享。用的自己写的 [toosimple](https://github.com/jokester/toosimple)
    - 上面receive出来的subvolume还是只读。要再生成一个可读写的subvolume 用于 `/`
        - `# btrfs subvolume snapshot sysvol-20171001 sysvol`
    - `umount /mnt` 并将新建的sysvol mount到`/mnt`
        - `# mount -o compress=lzo,subvol=/sysvol`
- 重新生成fstab: `genfstab -U -p /mnt >> /mnt/etc/fstab.new` 然后vimdiff回去
- 重建boot
    - 把boot分区mount到 `/mnt/boot`, arch-chroot进 `/mnt`，
    - 恢复内核和ucode: `pacman -S linux intel-ucode`
        - 如果你的/boot有更多东西: 可以 `pacman -Qkk  | grep boot` 检查一下哪些包需要恢复
    - <!-- TODO: 设置启动管理器 (refind) -->
- 重启后如果一切正常就可以继续用了
