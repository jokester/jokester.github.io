---
title: 为什么 jsoup 在我 app 内慢
created_at: 2017-02-23
---

最近在android app中用 [jsoup](https://jsoup.org/) 从远程 html 中抽取数据, 觉得功能甚好, 只是有点慢. 翻了源码 & 做了简单测试后觉得下面这几点可以改造一下:

1. jsoup的用法是先 `parse()` 创建一个完整的 `Document` 对象, 然后才能 `select()` 在里面找需要的 `Element`. 其实在抽取数据时可能只需要一个或几个 `Element`.
2. `Element.select()` 好像一定会遍历整个 DOM 树, 我没有见到剪枝操作.
3. 即使传入 `InputStream`, jsoup也会先全部读入才开始parse

我想要的用法 (app里是和RxJava一起用):

1. 用类似SAX的API一遍完成, 只为匹配到的部分DOM (用 css selector 指定) 创建`Element`.
不过没有DOM难以实现所有的 css selector 语义, 所以我打算只支持适合 SAX 且简单的 selector. 完整的 selector 功能在创建好 `Element`后用已有的 `.select()` 做就可以了)
2. 边解析边返回匹配到的`Element`, 尽早把第一批结果传给UI.
3. 边读 HTTP response 边解析

------------

2017-03-24 更新:

这个月尝试了一下, 发现完全 SAX 的做法性能上是满足需要的, 但和现实中的 HTML 的兼容性颇差.

现实中的 HTML 往往不规整, 最大的问题可能是 tag 不配对. 为了从不规整的 HTML 得到一个能用的DOM树, w3c 有一个十分复杂的标准算法: [8.2 Parsing HTML documents](https://www.w3.org/TR/html51/syntax.html#parsing-html-documents).

这个算法的很多地方实质上需要一个类似DOM树的东西. 即使能把这个算法改造成兼容 SAX 式 API, 维护 DOM 树的时间开销可能也不会有明显减少, 最多是可以边 parse 边丢弃, 不需要整个 DOM 树同时在内存.

而在我的需求中, (首个匹配的DOM元素前的) 延迟才是最重要的因素. 所以我打算换一个方向: 给 jsoup 已有的DOM parser 加上能发射刚匹配到的 DOM 元素的API.

