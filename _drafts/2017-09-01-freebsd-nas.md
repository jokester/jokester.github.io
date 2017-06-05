## Spec

- HP N54L
    - a handicapped N54L 2core cpu
    - 2x8G ECC DDR3 memory (TODO: find some at ebay)
    - 4x4TB HDDs for data (TODO: buy)
    - 1x256GB SSD for system and cache (TODO: test its IOPS)
- FreeBSD stable

## References

As a zfs newbie I had to learn quite a lot before starting.

General:
- [FreeBSD handbook / zfs-term](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/zfs-term.html)
- [ZFS Administration](https://pthree.org/2012/12/18/zfs-administration-part-xi-compression-and-deduplication/)
- [ZFS: Read Me 1st](http://nex7.blogspot.jp/2013/03/readme1st.html)
- [Adventures in ZFS: arc, l2arc, dedupe, and streaming workloads](http://weblog.etherized.com/posts/185.html)
- good zfs guys on IRC

Dedup:

- [Deduplication now in ZFS](https://blogs.oracle.com/jsavit/deduplication-now-in-zfs)

## Storage

- `data-po` pool
    - all 4x4TB HDDs, as a `raidz1` vdev
    - 32GB of SSD, as a `log` vdev
        - will be used by zfs for ZIL
    - 128GB of SSD, as a `cache` vdev
        - will be used by zfs for L2ARC (caches random IO, dedup table, etc)
        - the 4x4TB of data would make a DDT (dedup table) of around 100G
        - TODO: can we allocate more?
- `sys-po` pool
    - rest of SSD

## ZFS settings and tuneables

- enable [Encrypted](www.schmidp.com/2014/01/07/zfs-full-disk-encryption-with-freebsd-10-part-2/)
- enable [Compressing]()
    - lz4 / lz4fast saves like 0.5% - 0.8% [benchmark](https://gist.github.com/e921a4620fd8deec648d6b95b342e1ea) with [lzbench](https://github.com/inikep/lzbench)
    - *Risk*: my server is severly CPU bounded (N54L 2core/2.2G)
    - this can be disabled later: https://serverfault.com/q/499304/74190
- *not decided* [Dedupe](http://constantin.glez.de/blog/2011/07/zfs-dedupe-or-not-dedupe)
    - a good BSD guy told me that dedup do save some space
    - I happen to have a SSD for L2ARC (dedup-table sizes at 5~6GB per TB data)
    - TODO: see if dedup is profitable, after migrated the data
        - `When in doubt, check how much` ... in [ZFSTuningGuide](https://wiki.freebsd.org/ZFSTuningGuide#Deduplication)
- cache stragegy: `all/all` for memory/L2ARC
- scrub: once per month?

## Service

- file storage
    - and LAN sharing with SMB
- VM1: coreos for web services
    - bridge net
    - mapped 80/443
- VM2: CI server
- VM3: archlinux playground

## Install - Phase1

This happens


