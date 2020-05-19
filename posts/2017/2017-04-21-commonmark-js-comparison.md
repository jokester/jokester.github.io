---
title: 比较 CommonMark 的几种 JavaScript 实现
publishAt: 2017-04-21
lang: zh
---

前一段发现有 [Commonmark](http://commonmark.org/) 这个试图把 Markdown 标准化的尝试。

稍微看了一下觉得质量不错，挺正经的，也有开发者支持 (还未 1.0 的现在已经有不少实现。pandoc 的作者 jgm 给 C 和 JS 各写了一个)，感觉可以上船。

我想看看能不能用来做一个 [帮助编辑 md 的东西](/post/2017-04/idea-markdown-formatter/)，比如一个 md 的 linter 或[Language Service](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol)，所以比较了一下。

我想要的特性:

- parser
  - AST 可以对应到原始文件 (行、列)
  - 在原始文件部分被修改时，可以增量 parse
- renderer
  - 可自定义特定 md block 的渲染 (一些 html 后端允许的格式不同，如 zhihu 的破编辑器)
- TS 支持
- 能 html2md

## 比较

- 来源 1: [List of CommonMark Implementations](https://github.com/jgm/CommonMark/wiki/List-of-CommonMark-Implementations)
- 来源 2: `jgm/commonmark.js` 的 README 中的 benchmark

### `jgm/commonmark.js`

- https://github.com/jgm/commonmark.js

- `jgm` 出品，CommonMark 的参考实现

### `markdown-it/markdown-it`

- "high speed pluggable implementation"
- https://github.com/markdown-it/markdown-it
- API: https://markdown-it.github.io/markdown-it/
- 有诸多 plugins，还有个 plugin 指南，可能比较容易扩展
- VSCode 的[vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint) / [markdownlint](https://github.com/DavidAnson/markdownlint) 也用了这个

### `jonschlinkert/remarkable`

- https://github.com/jonschlinkert/remarkable
- 支持 CommonMarks
- 好像开发不活跃，最后更新在 2016 末
  - 3 位开发者中的 2 人转向了 `markdown-it`
- 有个 `Typographer`，能转换 `(c)`和引号等东西

### `marked`

- 有最多 star 但**不支持** commonmarks
- "Built for speed."
- https://github.com/chjj/marked

### `showdownjs/showdown`

- 没有提到 commonmarks，可能也不支持
- https://github.com/showdownjs/showdown
