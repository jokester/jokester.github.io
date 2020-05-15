---
title: Setup Archlinux on Raspberry Pi 4b
slug: setup-archlinux-raspberry-pi-4b
publishAt: 2019-09-14
---

I bought a raspberry 4b (4g mem) to use as a low-power home server and emulator console ([libretro](https://www.archlinux.org/groups/x86_64/libretro/)). By far I'm satisfied.

This is a memo about my settings and tunings.

* toc
{:toc}

## Prepare SD card

I started from [the build at ArchLinuxARM](https://archlinuxarm.org/about/downloads) but used a btrfs root instead of ext4.

The [original instructions used ext4](https://archlinuxarm.org/platforms/armv8/broadcom/raspberry-pi-4)
should definitely work. It's just I prefer to use a btrfs subvolume as root for a few reasons:

- transparent compression (makes the SD card less of a bottleneck)
- subvolume snapshots (enables convenient transfer with `btrfs send/receive`, and backup like [btrbk](https://github.com/digint/btrbk))

The following snippet assumes SD card is at `/dev/sdX`. You need to use actual path in commands.

### Partition the card

With `fdisk` or other tools you like:

- Create `sdX1`, a 100MB FAT partition, and set partition type to `W95 FAT32 (LBA)`. This becomes `/boot`.
- Create `sdX2` with rest of the disk, and set partition type to `Linux`. This becomes parent of other subvolumes including `/` (detailed later).
- If swap space is required (think twice, it's SD card after all), shrink `sdX2` and create a swap partition now, because swap file is not supported in btrfs.

Refer to original instructions if you are uncertain about `fdisk` commands.

### mkfs and extract image

```
# cd /media

# mkfs.vfat  /dev/sdX1

# mkfs.btrfs /dev/sdX2

# mkdir -pv sdcard

# mount /dev/sdX2 sdcard -o ssd,discard,compress=lzo

# btrfs subvolume create sdcard/root-current         # This subvolume becomes / at run time. It can be snapshot-ed separately.

# mkdir sdcard/root-current/boot

# mount /dev/sdX1 sdcard/root-current/boot

# bsdtar -xpf ArchLinuxARM-rpi-4-latest.tar.gz -C sdcard/root-current
```

### configure mounts

Edit `sdcard/root-current/boot/cmdline.txt`, add `rootflags` part to mount the subvolume at `/`:

```diff
-root=/dev/mmcblk0p2 rw rootwait console=ttyAMA0,115200 ...
+root=/dev/mmcblk0p2 rootflags=subvol=/root-current rw rootwait console=ttyAMA0,115200 ...
```

Edit `sdcard/root-current/etc/fstab`, add our mount options (it boots without these lines, but new created files won't get compressed):

```diff
+/dev/mmcblk0p2  /              btrfs   defaults,compress=lzo,subvol=/root-current       0       0
+/dev/mmcblk0p2  /media/sdcard  btrfs   defaults,compress=lzo,subvol=/,noauto            0       0
```

The `/media/sdcard` mount is not necessary for everyday use. It can be used to manage subvolumes / snapshots.

## Customization and hardening

After successfully booting from SD card:

- Modify `/etc/locale.gen` and re-run `locale-gen` (It's strange that the `locale.gen` does not come with any locale.)
- Recommended: harden sshd and other security config

## Tuneables to minimize SD card IO

After the following attempts, I'm already OK with the performance. Stopping here until I need to squeeze more out of it.

### Mount options

- vfat partition: `noatime,nodiratime`
- btrfs partition: `noatime,nodiratime,compress=lzo,ssd,discard`

### Stop journald from persisting logs

```diff
# /etc/systemd/journald.conf
 [Journal]
-Storage=auto
+Storage=volatile
```

## Mount remote disk via iSCSI

This is my first journey about iSCSI but it's smoother than I thought.

### Server aka "iSCSI target"

[My NAS](/post/2017-09/freebsd-on-microserver/) runs FreeBSD so I just followed the [29.12.1. Configuring an iSCSI Target](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/network-iscsi.html).

### Client aka "iSCSI Initiator"

see [archwiki](https://wiki.archlinux.org/index.php/Open-iSCSI)

## Gaming stuff: libretro and joystick

TODO

## Watchlist

### ARMv8 build

The CPU is ARMv8-capable but I don't see any ARMv8 builds published. Guess I have to check the following links later:

- [Stable 64 bit (arm v8) Raspbian buster on pi 4?](https://www.raspberrypi.org/forums/viewtopic.php?t=245658) @ raspberrypi.org
- [what about PI 4](https://archlinuxarm.org/forum/viewtopic.php?f=8&t=13734&start=50) @ archlinuxarm.org
- [Upstream initial Raspberry Pi 4 B support](https://github.com/lategoodbye/rpi-zero/issues/43) @ github
