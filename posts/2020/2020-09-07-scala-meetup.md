---
title: Scala Meetup 2020-09
publishAt: 2020-09-07
-----

2020-09-05 参加 Scala Meetup 的笔记。

- 活动介绍: https://zhuanlan.zhihu.com/p/208761059
- 录像: https://www.bilibili.com/video/BV1Qa4y1L7dj

---

### 《Akka: Manage your state, just right》— by Evan

我两年前用过一点 akka 但是只留下印象了，而且广告系统的需求和设计离我比较遥远，无法评估 akka 在这点上相对其他方案的优势有多大。
只是感觉上，大量 hot 数据 in memory 的时候可能 actor 模型（相对于自己发明新的框架和模型）会是不错的选择。

akka 应该是我接触过的第一个从设计上就分布式的框架，有丰富的生态系统：

- akka 本身: 一个基于 actor 模型的应用程序框架
- 围绕 akka 的配套:
  - akka-http (http/websocket 服务器)
  - akka-streams (Reactive Manifesto 的另一种实现。RxJava 那些比较接近“流”，这个的 api 比较接近“图”)
  - akka-cluster (跨进程跨机器的 actor 空间)
  - akka-persistence (actor 持久化)
  - 等

akka 的文档质量相当好，IMHO 以 akka 作为分布式开发的入门挺好的。工作中有没有机会用到是另一回事。
有兴趣深入了解的可以看看 [Terminology, Concepts](https://doc.akka.io/docs/akka/2.6.8/general/terminology.html) 。

btw 广告业印象中 scala 用户挺多的，以前看 CyberAgent 也分享过 akka 的内容。
另外 Lightbend (akka 背后的公司，曾用名 TypeSafe) 的可能最有名的产品 Play Framework 里面用的也是 akka。

### 《代数组合子和文本解析》— by 刘鑫

- 听得不太明白。可能等我写过一次 parser combinator 再听比较合适。

### 《AST manipulation and Pattern Matching in Scala》— by 沈达

- 用 antlr4 生成一个算术表达式的 parser
- 用 implicit conversion 给 antlr 的 ParseTree 配上 helper method
- 以字符串为中间形式, 变换 AST (如替换一个 expression，重新生成 AST)

真正在 AST 中实现常量折叠的部分代码是留空的，第二天我试着写了一下然后没写出来。
小部分是因为不熟悉 antlr 的 ParseTree 的 API，绝大部分是因为不会。如果哪位写出来希望能分享一下。

### 《ZIO 入门分享》— by 明扬

这是我最觉得第一次就听懂了些的部分，可能因为 my 老师的配图和讲解比较生动。

后来又简单看了一下 zio 的介绍:
ZIO 是一个提供（函数式的依赖组合和依赖注入）和（函数式的异步控制流组合）的库。说是 "库” 但是看来比较侵入式，感觉写起来会更像 DSL。

如果有合适机会想试用一下。