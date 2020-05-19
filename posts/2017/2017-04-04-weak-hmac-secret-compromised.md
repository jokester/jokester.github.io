---
title: 弱HMAC secret的危害
publishAt: 2017-04-04
lang: zh
---

[One Line of Code that Compromises Your Server](https://martinfowler.com/articles/session-secret.html)

如果你在加密secret时用了sha1-HMAC和弱secret:

- AWS 2.6 USD/h 的instance可以一分钟内穷举出 `super secret`
- 有secret后便可假造出管理员cookie, 甚至用反序列化向服务器注入代码
