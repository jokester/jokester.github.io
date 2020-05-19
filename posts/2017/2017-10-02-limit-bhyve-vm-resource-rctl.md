---
title: How to limit resource usage of bhyve VM with rctl
publishAt: 2017-10-02
---

When trying to guarantee a minimum CPU percentage of CPU for FreeBSD itself (from a few VMs),
I found that though FreeBSD and latest vm-bhyve have the capability to do this,
it's not enabled by default.

The following steps described here worked for me in FreeBSD 11.1 / vm-bhyve 1.1.8:

1. Check whether RACCT / RCTL are built into FreeBSD kernel
   - GENERIC kernel since FreeBSD 10.2 should already have this
   - Can be found with `sysctl kern.racct.enable`
   - See [this post](https://forums.freebsd.org/threads/28871/) if you have to rebuild kernel for RACCT
2. Enable RACCT by adding `kern.racct.enable=1` in loader.conf and reboot
   - You should see `kern.racct.enable.1` in `sysctl kern.racct.enable` output
3. Set resource limits with `rctl`. You can either use [options provided in vm-bhyve](https://github.com/churchers/vm-bhyve/blob/master/sample-templates/config.sample#L394-L406), or call rctl manually.
   - [This PR](https://github.com/churchers/vm-bhyve/pull/63/files) shows the actual commands vm-bhyve uses.
   - rctl can do much more than limiting CPU usage of a bhyve process, see [man rctl](https://www.freebsd.org/cgi/man.cgi?query=rctl&sektion=8) for more rctl options
