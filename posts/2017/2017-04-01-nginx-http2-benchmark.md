---
title: A benchmark of http2
created_at: 2017-04-01
---

Just updated my nginx sites to use http2. `nginx 1.10` package in Alpine linux already have this feature built. All I did is to enable it: changing `listen 443 ssl;` to `listen 443 ssl http2;`.

The following benchmark is done with [ab](https://httpd.apache.org/docs/2.4/programs/ab.html) / [nghttp2](https://nghttp2.org/documentation/index.html) and a static site hosted by `nginx 1.10.3` / `alpine 3.5` / 1cpu / 512M mem.

# 50 connection:

```text
% h2load -n 500 -c 50 https://some-site.jokester.io/

finished in 2.37s, 210.62 req/s, 7.47MB/s
requests: 500 total, 500 started, 500 done, 500 succeeded, 0 failed, 0 errored, 0 timeout
status codes: 500 2xx, 0 3xx, 0 4xx, 0 5xx
traffic: 17.74MB (18606450) total, 103.52KB (106000) headers (space savings 31.39%), 17.62MB (18471000) data
                     min         max         mean         sd        +/- sd
time for request:   307.92ms    937.78ms    658.94ms    157.61ms    61.00%
time for connect:   478.13ms       1.45s    905.85ms    279.07ms    57.00%
time to 1st byte:   641.92ms       1.63s       1.15s    234.91ms    68.00%
req/s           :       4.21        8.23        5.95        1.05    60.00%
```

```text
% ab -n 500 -c 50 https://some-site.jokester.io/

Concurrency Level:      50
Time taken for tests:   10.139 seconds
Complete requests:      500
Failed requests:        0
Write errors:           0
Total transferred:      18661500 bytes
HTML transferred:       18471000 bytes
Requests per second:    49.32 [#/sec] (mean)
Time per request:       1013.864 [ms] (mean)
Time per request:       20.277 [ms] (mean, across all concurrent requests)
Transfer rate:          1797.49 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      456  572 116.5    549    1209
Processing:   290  334  19.0    331     394
Waiting:      145  175  12.4    174     215
Total:        762  906 122.5    880    1579

Percentage of the requests served within a certain time (ms)
  50%    880
  66%    906
  75%    921
  80%    933
  90%    970
  95%   1183
  98%   1382
  99%   1477
 100%   1579 (longest request)
```

# 100 connection

- all requests served happily
- http2 reduces average but has larger *max time*

```text
% h2load -n 1000 -c 100 https://some-site.jokester.io/

finished in 3.41s, 293.48 req/s, 10.42MB/s
requests: 1000 total, 1000 started, 1000 done, 1000 succeeded, 0 failed, 0 errored, 0 timeout
status codes: 1000 2xx, 0 3xx, 0 4xx, 0 5xx
traffic: 35.49MB (37212900) total, 207.03KB (212000) headers (space savings 31.39%), 35.23MB (36942000) data
                     min         max         mean         sd        +/- sd
time for request:   313.89ms    964.01ms    652.30ms    152.53ms    64.50%
time for connect:   495.74ms       2.49s       1.44s    604.65ms    54.00%
time to 1st byte:   668.02ms       2.68s       1.65s    571.72ms    52.00%
req/s           :       2.94        7.99        4.81        1.44    61.00%
```

```text
% ab -n 1000 -c 100 https://some-site.jokester.io/

Concurrency Level:      100
Time taken for tests:   17.420 seconds
Complete requests:      1000
Failed requests:        0
Write errors:           0
Total transferred:      37323000 bytes
HTML transferred:       36942000 bytes
Requests per second:    57.40 [#/sec] (mean)
Time per request:       1742.013 [ms] (mean)
Time per request:       17.420 [ms] (mean, across all concurrent requests)
Transfer rate:          2092.31 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      483 1255 147.0   1257    2007
Processing:   304  342  17.8    341     402
Waiting:      157  183   9.8    183     220
Total:        793 1598 155.2   1599    2388

Percentage of the requests served within a certain time (ms)
  50%   1599
  66%   1622
  75%   1637
  80%   1648
  90%   1679
  95%   1734
  98%   2068
  99%   2227
 100%   2388 (longest request)
```

# 1000 connection

- 1.6% of http2 requests failed (h2load not showing the reason)
- 9% of http1 requests failed (during SSL handshake)

```text
% h2load -n 10000 -c 1000 https://some-site.jokester.io/

finished in 56.44s, 174.35 req/s, 6.19MB/s
requests: 10000 total, 9840 started, 10000 done, 9840 succeeded, 160 failed, 160 errored, 0 timeout
status codes: 9840 2xx, 0 3xx, 0 4xx, 0 5xx
traffic: 349.21MB (366174936) total, 1.99MB (2086080) headers (space savings 31.39%), 346.67MB (363509280) data
                     min         max         mean         sd        +/- sd
time for request:   292.37ms       1.64s    671.62ms    185.01ms    76.52%
time for connect:   508.90ms      55.53s      14.23s      10.82s    66.67%
time to 1st byte:   677.41ms      55.71s      14.45s      10.82s    66.67%
req/s           :       0.00        7.94        1.23        1.31    88.70%
```

```text
% ab -n 10000 -c 1000 https://some-site.jokester.io/

Concurrency Level:      1000
Time taken for tests:   147.935 seconds
Complete requests:      10000
Failed requests:        939
   (Connect: 0, Receive: 0, Length: 939, Exceptions: 0)
Write errors:           0
Total transferred:      338405805 bytes
HTML transferred:       334949373 bytes
Requests per second:    67.60 [#/sec] (mean)
Time per request:       14793.489 [ms] (mean)
Time per request:       14.793 [ms] (mean, across all concurrent requests)
Transfer rate:          2233.92 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0 4101 4893.8   2652   69653
Processing:   298 8098 27087.2    345  110250
Waiting:        0  169  51.8    182     272
Total:        787 12199 26345.0   3252  110250

Percentage of the requests served within a certain time (ms)
  50%   3252
  66%   4386
  75%   6242
  80%   7069
  90%  18392
  95%  110146
  98%  110186
  99%  110201
 100%  110250 (longest request)
```