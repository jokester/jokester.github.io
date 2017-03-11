---
title: SHA1 Collision and Android Apk Signing
created_at: 2017-02-28
---

As a paranoiac Android developer, I was concerned by recent SHA1-collision news.

After investigating it a bit, I am writing this as a FAQ to answer myself.

If you need more information, or want to share any ideas, feel free to drop me a comment.

* toc
{:toc}

# Why should I be concerned?

SHA1 was used by default in APK signing for a few years.
You might be using it as either creator or consumer of APK files.

# What is the worst case?

A bad guy *may* be able to create a APK contain his/her malicious code, and identical SHA1 digest of your genuine files. Devices that had previous version will consider the crafted APK to be signed by *your* certificate, and issue no warning when installing it.

# Can I feel secured?

IMHO the answer is still practically yes in early 2017.

In the light side of the world, there are factors that may make actual attack difficult and unprofitable.

- A collision is still expensive to find
- It may be more difficult to find collision for executable files like `.dex`
- APK may not be validated with SHA1 (see the following part)
- A sane user may not install APK from untrusted origin (given that your Play Console account is not compromised)

And this is the dark side:

- Theoretically we are still in danger
- Things can change
- Android versions before 7.0 (N / SDK 24) are coherently insecure due to downgrade attack and lack of great Signature schama v2

# How is SHA1 used in APK signing?

SHA1 and its fellows is used in the `digest` part of `digest-and-sign` pattern of *digital signature*.

The digest function (MD5 / SHA1 / SHA256) and type of sign key (DSA / RSA / EC) constitutes a *Signature Algorithm* like `SHA1withRSA` or `SHA256withEC`.

## APK Signature schema v1

Schema v1 had a few other algorithms, but I'm afraid a vast majority used `SHA1withRSA`, it have been default of several tools.

## APK Signature schema v2

Schema v2 always use SHA2 and up, and is thus safe against SHA1 collision.

*But* it is only checked since Android 7.0 (SDK level 24).

# How is digest function determined for schema V1?

## `apksign`

This is the up-to-date sign tool since Android build-tools v24.
`apksign` determines digest algorithm from key type and minimum SDK version of APK,
so as to use SHA256 when possible.

- `SHA256withRSA` for minimum SDK 18 (Android 4.3) and up
- `SHA256withDSA` for minimum SDK 21 (Android 5.0) and up
- `SHA256withEC` for minimum SDK 18 and up
- `SHA1with*` for lower minimum SDK levels

See [V1SchemeSigner.java](https://android.googlesource.com/platform/tools/apksig/)

## `jarsigner`

This is the outdated tool used before Android build-tools v24. It is distributed as a part of `JDK`. Android build tools uses it with `SHA1with*` by default.

# Can I use both SHA1 and SHA256 in one APK?

No.

An APK that contain more than 1 signature will be rejected by Google Play.

(similar thing can be done with `jar`, but google decided to reject such APKs)

# Can I switch to SHA2?

Yes. This can be done by setting minimum SDK to a higher value.
However older devices will not be able to install your new APKs.

Please go on and read *why a simply switching is not enough*.

# Is switching to SHA2 completely enough?

No. *sobs*

By far, android installs new APK without warning, as long as it is signed with identical certificate.

That means older devices (that only checks schema v1) is inherently vulenarble to *downgrade attack*.
One can overwrite a `SHA256withRSA`-signed version with a `SHA1withRSA` APK (maybe made from an old version).

# What can I do to maximize security?

- Sign with SHA2. If possible, switch to certificate that have not been used with SHA1
- Have users upgrade to Android 7.0, to benefit from signing schema v2
