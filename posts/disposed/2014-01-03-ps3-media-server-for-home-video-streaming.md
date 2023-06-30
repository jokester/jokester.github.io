---
title: PS3 media server for home media streaming
---

I turned to [ps3 media server / pms](https://github.com/ps3mediaserver/ps3mediaserver)
to LAN video streaming.
I should have found it earlier, the name is somehow deceptive.
It is easy to configure as minidlna.
The best point is it recognize my video files (with on the fly conversion by Mencoder).

[minidlna](http://sourceforge.net/projects/minidlna/) seems to only host file without conversion,
and fails to host some files (not sure it's filename or encoding).

The [pms package @ aur](https://aur.archlinux.org/packages/pms/) confused me.
tsmuxer is included as non-optional dependency, but it seems to be only an optional renderer.
Furthermore, tsmuxer requires multilib.
Anyway, I removed it from PKGBUILD without occurring problem.
pms still converts with Mencoder and streams to iPad.

As another alternative DLNA server, [serviio](http://serviio.org/) seems in more active development.
BUT it requires a GUI to add content to library. Pity.
