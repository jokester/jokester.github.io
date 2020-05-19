---
title: keybase from a programmer's perspective
---

From a programmer's perspective.

A little knowledge about public key cryptology (public key / private key / sign / verify / encrypt / decrypt) is assumed.

## What keybase provides

1. encrypted filesystem
2. synchronized key management, to sync and use keys from different services.
   - this includes PGP key
3. publicly auditable identity proof, like "i am keybase/oooo and this is my twitter account xxxx"

## Keys

Key base applies multiple keys

### PGP key / eldest

1. `eldest` key
   The first `eldest` chain in signature chain of a keybase account. A 4096 bit PGP key.

The main key is [signed by itself](http://www.iusmentis.com/technology/remailers/selfsign.html).

### PGP key / additional

2.

### Device key

Keybase generates 2 key pairs for each device: one for signing and one for encryption.
When a device is added to an account, 2 entries are added to signature chain of that account:

- added `device_name`, as a `sibkey` link
  - the new sign key, signed by master key or signing key of previsioning device.
- added encryption key for `device_name`, as a `subkey` link
  - the new encryption key, signed by the new sign key

The public keys are shown in [keybase / devices](https://github.com/keybase/keybase-issues/issues/2238#issuecomment-217738229).
The device keys are normally not directly used by human.

Note that this is different from
Keybase key (which is different from `PGP key`, and may be NaCL key instead of PGP).

- normally a device

### Additional PGP key

a keybase key unifies device key and PGP key with a 35 bytes [kid](https://keybase.io/docs/api/1.0/kid).

#### fingerprint

A cryphtogic hash of (encoded form of) public key.
As in the case of human, a fingerprint (largely) identifies its owner.

#### key id

Last 32 or 64 bits (that is, 8 or 16 hex digits) of fingerprint.
A even lesser identity of a public key.

#### sub key

gg

### "Main" key

Upon signing up a keybase account, a PGP (RSA 4096) key pair is

pgp key of

usable from all devices

TODO: how is it stored?

## Passphrase

### Recover

## Keybase / Merkle tree / Bitcoin blockchain

[this post](http://chrislaing.net/blog/keybase-keys-for-everyone-part-ii/)

## Chatting and Team

[team](https://keybase.io/blog/introducing-keybase-teams)

### Store / Transmit

## Trust: keys and devices

## What keybase (server) keep

## What keybase (server) dont keep

## Practical use of keybase for me

- a site to publish my PGP key signeratures.
- a e2e , to individual or to

Rest: https://www.citadelo.com/en/2016/04/keybase-io/
