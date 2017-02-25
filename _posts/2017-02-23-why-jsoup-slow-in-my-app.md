---
title: 为什么jsoup在我app内慢
created_at: 2017-02-23
---

最近在android app中用 [jsoup](https://jsoup.org/) 从远程 html 中抽取数据, 觉得功能甚好, 只是有点慢. 翻了源码 & 做了简单测试后觉得下面这几点可以改造一下:

1. jsoup的用法是先 `parse()` 创建一个完整的 `Document` 对象, 然后才能 `select()` 在里面找需要的 `Element`. 其实在抽取数据时可能只需要一个或几个 `Element`.
2. `Element.select()` 好像一定会遍历整个 DOM 树, 我没有见到剪枝操作.
3. 即使传入`InputStream`, jsoup也会先全部读入才开始parse

我想要的用法 (app里是和RxJava一起用):

1. 用类似SAX的API一遍完成, 只为匹配到的部分DOM (用 css selector 指定) 创建`Element`.
不过没有DOM难以实现所有的 css selector 语义, 所以我打算只支持适合 SAX 且简单的 selector. 完整的 selector 功能在创建好 `Element`后用已有的 `.select()` 做就可以了)
2. 边解析边返回匹配到的`Element`, 尽早把第一批结果传给UI.
3. 边读 HTTP response 边解析