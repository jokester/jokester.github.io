---
title: Checklist when Switching to HTTPS
created_at: 2017-01-01
---

## Compatibility

Will user see different content?

### non-HTTPS content

[mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)

-`active mixed content` (e.g. `<script src=`) are blocked by most browsers
    - FX 23 +
    - IE 9 +
    - Chrome

- `passive mixed content` (e.g. `<img src=`)
    - `<img>` loads with warning

### Browser

#### Transport Protocol

- *most* browser support TLS 1.0 and up.
- The only reason to enable SSL would be IE6 users `/bless`.

#### Cipher and encryption

-
How to read: [wikipedia]()


## Performance

Will server explode?

### Cause of Performance Overhead

- Handshake
    - [example](https://www.ssl.com/article/ssl-tls-handshake-overview/)
    - once per SSL session
    - cipher negotiation
    - asymmetric encryption, typically RSA / EC
        - benchmark: jj
- after handshake
    - symmetric encryption, typically AES

### Cipher suite

### Computation

- handshake: 
    - use 
- 

### Bandwidth

# Drawbacks / Concerns

## Concerns regarding old browsers


