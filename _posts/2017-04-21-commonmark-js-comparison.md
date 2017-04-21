---
title: 比较 CommonMark 的几种 JavaScript 实现
created_at: 2017-04-21
lang: zh
---

前一段发现有 [Commonmark](http://commonmark.org/) 这个试图把 Markdown标准化的尝试。

稍微看了一下觉得质量不错，挺正经的，也有开发者支持 (还未1.0的现在已经有不少实现。pandoc的作者jgm给C和JS各写了一个)，感觉可以上船。

我想看看能不能用来做一个 [帮助编辑md的东西](/post/2017-04/idea-markdown-formatter/)，比如一个md的linter或[Language Service](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol)，所以比较了一下。

我想要的特性:

- parser
    - AST可以对应到原始文件 (行、列)
    - 在原始文件部分被修改时，可以增量parse
- renderer
    - 可自定义特定md block的渲染 (一些html后端允许的格式不同，如zhihu的破编辑器)
- TS支持
- 能html2md

## 比较

- 来源1: [List of CommonMark Implementations](https://github.com/jgm/CommonMark/wiki/List-of-CommonMark-Implementations)
- 来源2: `jgm/commonmark.js` 的README中的benchmark

### `jgm/commonmark.js`

- https://github.com/jgm/commonmark.js

- `jgm` 出品，CommonMark的参考实现

### `markdown-it/markdown-it`

- "high speed pluggable implementation"
- https://github.com/markdown-it/markdown-it
- API: https://markdown-it.github.io/markdown-it/
- 有诸多plugins，还有个plugin指南，可能比较容易扩展

### `jonschlinkert/remarkable`

- https://github.com/jonschlinkert/remarkable
- 支持CommonMarks
- 好像开发不活跃，最后更新在2016末
    - 3位开发者中的2人转向了 `markdown-it`
- 有个 `Typographer`，能转换 `(c)`和引号等东西

### `marked`

- 有最多star但**不支持** commonmarks
- "Built for speed."
- https://github.com/chjj/marked

### `showdownjs/showdown`

- 没有提到commonmarks，可能也不支持
- https://github.com/showdownjs/showdown
