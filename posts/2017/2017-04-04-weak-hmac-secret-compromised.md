---
title: 弱HMAC secret的危害
publishAt: 2017-04-04
lang: zh
---

[One Line of Code that Compromises Your Server](https://martinfowler.com/articles/session-secret.html)

如果你在加密 secret 时用了 sha1-HMAC 和弱 secret:

- AWS 2.6 USD/h 的 instance 可以一分钟内穷举出 `super secret`
- 有 secret 后便可假造出管理员 cookie, 甚至用反序列化向服务器注入代码
