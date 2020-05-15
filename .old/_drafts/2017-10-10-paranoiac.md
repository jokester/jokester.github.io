# Paranoiac

[paranoiac.io](https://paranoiac.io) is a service to sign your data, with your secret key in a trusted device.

## Possible usage

When:

- you want to sign data on other (e.g. a CI server, a public PC) with your private key
    - sign persistent artifact (app build, git tag) so people know it's you
    - sign a login request so a machine know it's on your behavior
- you dont want to keep your private key in any other PC

## Concepts

- User: a human
- Key: an asymertric key pair
    - public key that is only known to your trusted devices, and paranoiac server
    - secret key that never leaves your device
    - PGP for pgp
    - RSA for X-509 certs
- Server: central paranoiac server
    - keep a user list (oauth authorized)
    - for each `user`:
        - keep a `token` list
            - tokens are crenditials for clients (web / requester / keyholder)
                - a web session logged via oAuth can do managed stuff
                - requester: minimal privilage of sending sign request, nothing more
                    - does this need a token? knowing endpoint already means it's on someone's behavior
                - by default: keyholder typically have more
                - user can change tokens with web ui
        - keep a `public key` list
            - in order to register a public key here, user have to submit a cryptology proof
        - keep a `endpoints` list
            - a endpoint is a aliases for a `(user, public_key)` combination
            - used in API path, to identify the user + public key to use
                - naming rule: string `/\w-_/`, case insensitive
                - a endpoint SHOULD have a user-inputable name, either user-defined or randomly generated
            - safer to use in less-secured environment
                - masks username and key
                - helps to prevent SPAM: one can delete a leaked endpoint and continue to use others
    - for each `endpoint` combination:
        - provide HTTP API to submit sign request, for requester client(s)
        - provide HTTP API to submit signed asset, for keyholder client(s)
    - for each `user`:
        - server keep the sign request / signed asset temporially
            - configurable timeout: default=1h max=24h
            - after that all assets (including x) will be removed, except some uuid
        - (optional) notify registered keyholders (usually mobile device with push message)

- Requester:
    - A less-trusted machine that have some data to sign on
        - knows endpoint URL
        - submit sign request and obtain a asset (asset s )
        - (optional) knows a public key to see if that is correctly signed
        - wait until it is signed
    - May be a process running on less-truested machine (CI server, public PC, etc)

- Keyholder:
    - A trusted machine that keeps the key to sign data with
        - can query user/endpoint for list of pending sign request
        - can down sign request and submit signed asset

- What can this be used:
    - sign
        - PGP-based sign
            - for message encryption
            - for auth:
                - PAM (2FA for ssh, etc)
                    - need a script to use with [pam-script](http://manpages.ubuntu.com/manpages/trusty/man7/pam-script.7.html)
        - RSA / ECDSA-based sign
            - Android app
            - X509 cert

## Concerns

- How to prove that paranoiac is clean? i.e. paranoiac is impossible to do MitM?
    - sign:
        - requester is able to validate (message + signed message) with public key
    - What if paranoiac is

## Core (request / list / response) API

```
path: /api/v1/ENDPOINT/request_sign
params:
    -


path: /api/v1/ENDPOINT/request_sign


```

## Part 0: register of your device

    - create a user at paranoiac ()
    - add a public key
        - RSA?
        - PGP?
    - use any of to sign

## Part 1: sign request

- sign:: a cryptology sign of "some asset"
    - as per [wikipedia](https://en.wikipedia.org/wiki/Digital_signature)
    - asset: hash of same data, or some data itself

- sign request:: a device requests another device (requested by the same human) to sign something
    - asset to sign
    - user should not 

## Part 2: sign with trusted devicez


## Part 3: use signed asset

