---
title: iostat cheatsheet
publishAt: 2017-10-15
slug: linux-iostat-cheatsheet
---

A cheatsheet of `iostat` in Linux. Mostly learned from [Interpreting iostat Output](https://blog.serverfault.com/2010/07/06/777852755/)

Background:

- iostat reports at physics device/sector level (i.e. beneath cache and IO scheduling)

Overall utilization:

- `avg-cpu / %iowait`: how busy is the CPU, or "amount of computation waiting for IO"
- `device / %util`: how busy is the device

Columns (listed per device):

- `rrqm/s  wrqm/s`: r/w requests merged per second
    - *Block IO subsystem* may merge physically adjacent requests
- `r/s  w/s`: number of (possibly merged) r/w requests
- `rsec/s  wsec/s`: number of sectors read/written
    - iostat can also be set to use units `rkB/s  wkB/s  rMB/s  wMB/s`
- `avgrq-sz`: average size of request, in #sectors
    - larger size indicates sequential IO, smaller indicates random IO
- `avgqu-sz`: average length of request queue, i.e. average #request waiting to be served
- `await`: average (wait + serve) time for a request, in ms
    - `r_await / w_await`: the same time for r/w requests
- `svctm`: average serve time for a request, in ms

A monitor command with iostat:

```bash
# -x: extended report
# -t: print time for report
# -z: omit inactive devices
# 1: report every 1 second

$ iostat -xtz 1
```

