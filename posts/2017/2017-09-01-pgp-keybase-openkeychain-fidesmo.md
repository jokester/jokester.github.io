---
title: Using PGP keys with keybase, OpenKeychain and fidesmo
---

## Basic on PGP

Names:

- `PGP`: a commerical encryption program
- `OpenPGP`: the IETF standard followed by PGP (the problem) and GPG (proglem). The "PGP" in the title also resolves to it.
- `GPG` / `gnupg`: GNU Privacy Guard, anothe encryption program that implementes OpenPGP.
    - The `gpg` program shipped with most (if not all) Linuxes.

GPG key:

A format that contains *one* main (cryptology) key, *one or more* UserID (name + email), and zero or more *subkey* (attached cryptology key).

- [anotomy of a GPG key](https://davesteele.github.io/gpg/2014/09/20/anatomy-of-a-gpg-key/)
    - The term 'key' is largely ambigious in a cryptology context. It can mean a number, a encoded form of that number, a file format of key (number) and other metadata, etc.
    - A GPG key (file) is identified by fingerpoint (hashed public half of main key)
    - This is not a immutable (thought it is).
    - With secret half of the main key, one can modify the key and upload it to key servers.
    - Key servers are mostly a key for *anyone* to host keys. One should trust only keys that are confirmed by other way (e.g. meeting offline).
- [intermediate GPG](https://davesteele.github.io/gpg/2015/08/01/intermediate-gpg/)
- [Creating the perfect GPG keypair](https://alexcabal.com/creating-the-perfect-gpg-keypair/)
- [How to change the expiration date of a GPG key](https://www.g-loaded.eu/2010/11/01/change-expiration-date-gpg-key/)

Subkeys:

- [Improve the Security of Your OpenPGP Key by Using Subkeys](http://www.connexer.com/articles/openpgp-subkeys)
- [Import a subset of private subkeys in GPG](https://security.stackexchange.com/questions/89328/import-a-subset-of-private-subkeys-in-gpg)
- [Using OpenPGP subkeys in Debian development](https://wiki.debian.org/Subkeys)

## Keybase

- A PGP key is almost necessary
- One can have multiple PGP keys can be used
- `keybase pgp update`: gpg keychain `->` keybase site
- `keybase pgp export`: keybase fs -> local file (that can be imported to gpg)
- `keybase pgp import`: local -> keybase fs

- Feature: publish public key
- Feature: gpg --list-keys

## OpenKeychain

Basically a PGP client for Android.

## Fidesmo

I found when used to keep PGP key, fidesmo card have a quite limited capacity:

- Only keeps 1 key
- I cannot save a existing key to it. i.e. A new key have to be created.
- The secret key part is always stored within the card, and cannot be exported.
    - It's intended to be an authoritive key holder, rather than a backup key store. Reasonable from a security POV.

## My use of them

- Passphrased copy, and
- keep 1
