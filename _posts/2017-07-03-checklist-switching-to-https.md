---
title: Checklist when Switching to HTTPS
---

This is a memo before I switched all my services to https.

- toc
{:toc}

## User Experience

### Browser support: can users still view my site?

- *most* browser support TLS 1.0 and up.
- The only reason to enable SSL would be IE6 users `/bless`.

### Content: (if https is supported at all) will users still see complete content?

This relates to how browser handles [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content),
the non-https resources in a https page.

- `active mixed content` (e.g. `<script src=`) are blocked by most browsers
    - FX 23 +
    - IE 9 +
    - Chrome
- `passive mixed content` (e.g. `<img src=`)
    - `<img>` loads with warning

## Cost and Performance

Will server experience high load and explode?

### Breakdown of SSL overhead

The extra stuff browser and server have to do includes:

- Session Establishment
    - the part where client and server determines a encryption key for data transfer
    - once per SSL session
        - Some webservers support reuse of ssl session. nginx does.
    - cipher negotiation ([cipher suite](https://en.wikipedia.org/wiki/Cipher_suite))
    - asymmetric encryption, typically RSA
        - simple benchmark: `openssl speed rsa`
- After established: client and server exchange encrypted data
    - the part where client and server flows encrypted data to each other
    - symmetric encryption, typically AES
        - nowdays CPUs have intrustion set to accelerate this
        - simple benchmark: `openssl speed aes`

A good illustration of SSL: [ssl-tls-handshake-overview](https://www.ssl.com/article/ssl-tls-handshake-overview/)

### Estimation of overhead

We can use `openssl speed rsa aes` to estimate intensity and throughput of a server.
In my $5 vultr instance (1cpu / 1G mem / AES-NI supported), I am getting this result:

```text
type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
aes-128 cbc      92395.92k   101214.20k   102269.63k   227764.25k   226313.75k
aes-192 cbc      76020.25k    83423.61k    85446.95k   191443.81k   192688.75k
aes-256 cbc      67800.93k    71916.01k    72710.14k   159391.21k   165057.65k

                  sign    verify    sign/s verify/s
rsa  512 bits 0.000070s 0.000005s  14302.2 203856.8
rsa 1024 bits 0.000193s 0.000013s   5183.6  79046.3
rsa 2048 bits 0.000908s 0.000040s   1101.7  25136.7
rsa 4096 bits 0.009625s 0.000149s    103.9   6691.5
```

That means for my small-to-medium traffic sites, SSL overhead is not likely to exceed around 10% of CPU.

## Tools

- [SSL Server Test](https://www.ssllabs.com/ssltest/index.html) tells you what can be hardened further.

## References

- Usage statistics of SSL: [SSL Pulse](https://www.ssllabs.com/ssl-pulse/)
- [SSL TLS Knowledge Center](https://www.owasp.org/index.php/SSL_TLS_Knowledge_Center)

