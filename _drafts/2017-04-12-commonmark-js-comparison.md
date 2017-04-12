---
title: 比较CommonMark的几种JavaScript实现
created_at: 2017-04-01
lang: zh
---

前一段得知有 [Commonmark](http://commonmark.org/) 这个试图把 Markdown标准化的尝试。

稍微看了一下觉得质量不错，挺正经的，也有开发者支持 (还未1.0的现在已经有不少实现。pandoc的作者jgm给C和JS各写了一个)，可以上船。

我想看看能不能用来做一个 [帮助编辑md的东西](/post/2017-04/idea-markdown-formatter/)，比如一个md的[Language Service](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol)，所以比较了一下。

我想要的特性:

- parser
    - AST可以对应到原始文件
    - 在原始文件部分被修改时，可以增量parse
- renderer
    - 可部分重载 (一些html后端允许的格式不同，如zhihu)
- TS支持
- 能html2md 

