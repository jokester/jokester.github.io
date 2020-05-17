---
title: 'Memo: home nas server and FreeBSD'
publishAt: 2017-09-01
slug: memo-home-nas-server-freebsd
---

This is a memo after installing FreeBSD on my MicroServer. Before that it was Arch Linux.

- toc
  {:toc}

## Hardware

- HP MicroServer N54L (Gen7)
- a handicapped N54L 2core cpu
- 2x8G ECC DDR3 memory
  - NOTE: N54L is picky about memory: it must be DDR3 ECC _unbuffered_. I found 2 economical modules on eBay at \$50 / 8GB.
- 1x256GB SSD for cache and performance-critical data
  - Connected to onboard SATA port (originally for CDROM)
- 4x4TB HDDs for data
  - Connected to 4 HDD bays
- PCI-E addon cards:
  - ATI RV810 for HDMI output
  - Some USB3.0 interface card <!-- TODO: what is the brand? -->

## Install

Nothing tricky, just boot from `FreeBSD-11.1-RELEASE-amd64-memstick.img` and go through the steps in installer.

- see [RootOnZFS](https://wiki.freebsd.org/RootOnZFS) for an example of manual partitions
- see [remote install](https://www.freebsd.org/doc/en/articles/remote-install/installation.html) for guide on headless install

## Hardware compatibility

The only hardware-related issue is about DMA timeout messages in dmesg. They are SATA "READ" commands issued to the SSD but did not return in 5 seconds:

```text
(ada3:ata2:0:1:0): READ_DMA. ACB: c8 00 80 30 3b 40 00 00 00 00 01 00
(ada3:ata2:0:1:0): CAM status: Command timeout
(ada3:ata2:0:1:0): Retrying command
```

This seemingly correlates to sys load, but nothing is wrong except the timeout itself (at least `smartctl` and `zpool scrub` zfs scrub says so).
There are [similar problem reports](https://forums.freenas.org/index.php?threads/daily-security-run-output-read_dma-command-timeout.26194/)
and even [a merged patch](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=195349), however their workaround did not save me.

I found a possible explanation after days: the `hint.ahci.0.msi="1"` helps when the disk is connected to AHCI controller 0, whereas my SSD was connected to a non-AHCI ATA controller.

A similar hint for `atapci.0` (`man ata (4)`) may have fixed this issue, but I went another way: to flash a custom BIOS firmware that enables AHCI on all SATA ports. After SSD is recognized as AHCI device (`ada3 at ahcich5 bus 0 scbus5 target 0 lun 0`), the timeout vanished.

References during my quest:

- [how to decode DMA command](http://wiki.osdev.org/ATA/ATAPI_using_DMA#ATA.2FATAPI_Commands)
- [how to read ATA error](https://ata.wiki.kernel.org/index.php/Libata_error_messages)
- [freebsd wiki / ata issues](https://wiki.freebsd.org/JeremyChadwick/ATA_issues_and_troubleshooting)
<!-- TODO: how to download / flash the custom firmware -->

## Post Install / Delay boot from USB root

A `kern.cam.boot_delay` in `/boot/loader.conf` prevents system to boot from USB before it gets ready.

[an extensive example of loader.conf](http://web.mit.edu/freebsd/head/sys/boot/forth/loader.conf)

## Post Install / Packages

BSD have a binary package manager `pkg` now.

```text
# pkg install                                   \
  bash zsh screen git coreutils rsync curl wget \
  sudo vim-lite cmake ruby devel/rubygems       \
  htop smartmontools ddrescue                   \
  vm-bhyve grub2-bhyve
```

(Binary packages constitutes a good example of the 20 / 80 rule. Personally I cannot recall a single time when I have to touch `make.conf` in my short Gentoo journey.)

<!-- TODO: add 'basic' services: microcode update, etc -->

## Post Install / User and Group

- create new user: `adduser` (interactive)
- add new user to group: `pw group mod wheel -m MY_USERNAME`

## Post Install / Storage Pool

My no.1 reason to change to FreeBSD is for ZFS. It seems to me that zfsonlinux still have a not-quite-short way to go.
The whole storage is like:

- a `syspo` zpool, created during install
  - contains a basic FreeBSD system
  - 32GB of SSD, as a `log` vdev
- a `datapo` zpool
  - all 4x4TB HDDs, as a `raidz1` vdev
  - 4GB of SSD, as a `log` vdev
    - used by zfs for ZIL
  - 128GB of SSD, as a `cache` vdev
    - will be used by zfs for L2ARC (cached IO, dedup table, etc)
    - the 4x4TB of data would make a DDT (dedup table) of around 100G
- Rest of SSD is reserved, for ssd lifetime and future use

ZFS settings and tuneables:

- enable [Encrypted](http://www.schmidp.com/2014/01/07/zfs-full-disk-encryption-with-freebsd-10-part-2/)
  - [Unlock Geli-encrypted ZFS Volume - FreeNAS](https://www.openattic.org/posts/unlock-geli-ecrypted-zfs-volume-freenas/)
  - Wanted [] as in zfsonlinux, sadly it's not part of FreeBSD yet
- enable LZ4 [compreession](https://www.freebsd.org/doc/handbook/zfs-term.html#zfs-term-compression-lz4)
  - lz4 / lz4fast saves like 0.5% - 0.8% [benchmark](https://gist.github.com/e921a4620fd8deec648d6b95b342e1ea) with [lzbench](https://github.com/inikep/lzbench)
  - _Risk_: my server is severly CPU bounded (N54L 2core/2.2G)
  - this can be always be disabled later: https://serverfault.com/q/499304/74190
- enable [Dedupe](http://constantin.glez.de/blog/2011/07/zfs-dedupe-or-not-dedupe)
  - a good BSD guy told me that dedup do save some space
  - I happen to have a SSD for L2ARC (dedup-table sizes at 5~6GB per TB data)
  - `When in doubt, check how much` ... in [ZFSTuningGuide](https://wiki.freebsd.org/ZFSTuningGuide#Deduplication)
- cache stragegy: `all/all` for memory/L2ARC
- scrub: once per week

ZFS References:

- [FreeBSD handbook / zfs-term](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/zfs-term.html)
- [FAQ: all-about-zfs](https://www.freebsd.org/doc/en/books/faq/all-about-zfs.html)
- [ZFS Administration](https://pthree.org/2012/12/18/zfs-administration-part-xi-compression-and-deduplication/)
- [ZFS: Read Me 1st](http://nex7.blogspot.jp/2013/03/readme1st.html)
- [Adventures in ZFS: arc, l2arc, dedupe, and streaming workloads](http://weblog.etherized.com/posts/185.html)
- [Deduplication now in ZFS](https://blogs.oracle.com/jsavit/deduplication-now-in-zfs)
- [FreeBSD ZFS: Advanced format (4k) drives and you](https://savagedlight.me/2012/07/15/freebsd-zfs-advanced-format/)
- good bsd/zfs guys on IRC

## Post Install / Services

- Mail

  - forward alert mail with mailgun: [guide](https://marblenix.com/blag/2017/08/20/Receiving-Email-Alerts-from-FreeBSD-using-Mailgun.html)
  - some [earlier guide](https://www.digitalocean.com/community/tutorials/how-to-send-email-through-an-external-smtp-service-with-sendmail-on-freebsd-10-1) required sendmail to be recompiled. This is not the case today.

- Storage

  - The data pool is exposed with samba

- VMs
  - [vm-bhyve](https://github.com/churchers/vm-bhyve/wiki/Quickstart) works out of box for creating and managing VMs
  - All VMs uses bridged network and is now part of my home LAN
  - VM1: debian x64 for internal services
  - VM2: CoreOS for public services
  - VM3: archlinux playground (whole filesystem imported from old Arch Linux)

## Misc Tricks

- We can [access UFS from linux](https://tachibanatech.com/chris/freebsd/)
