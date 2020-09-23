---
title: 解剖Preact - 开篇
---

这是一系列对 Preact 内部行为的介绍文章，

- toc
{:toc}

<!--


声明式编程: https://www.zhihu.com/question/28292740/answer/41235781
合成事件及其坑: https://zhuanlan.zhihu.com/p/26742034
JSX: https://zhuanlan.zhihu.com/p/29711902

-->

## 系列目录

1. Preact 介绍 & 开始使用 Preact (本文)
2. JSX 是什么
3. Preact 渲染过程 (stateless)
4. Preact 渲染过程 (stateful)

## Preact 是什么

[Preact](https://preactjs.com/) 是一个使用和 [React](https://facebook.github.io/react/) 相同的思想，几乎相同的 API 的 JavaScript-DOM 渲染库。
和 React 一样，Preact 也定位于 "单向渲染 DOM" 这一职责。

## Preact 的特点

(以下的比较都是相对于 React)

- 小: 全部代码仅有 1.3k 行，最小化后 9kB，再 gzip 后不到 4kB
    - 直接的好处: 可以边读这系列文章边把代码全部过一遍。这对于 React 的体量是难以做到的。
- 快: 在很多测试中比 React 性能更高
- 简单: 具体地说有以下几点
    - 对浏览器做更少抽象 ("Closer to the Metal")
        - 直接把原生 DOM 事件传给你的`onClick=`，不像 React 一样把不同浏览器的事件标准化成 “合成事件” (`SyntheticEvent`)。
    - 在渲染 VDOM 时，直接和原生 DOM 对比
    - 警告和错误处理比 React 少
    - 全部代码中只有一个 catch，如果你的代码抛出异常，这个异常会直接漏到浏览器控制台)。<!-- TODO: 漏异常会导致不可逆的状态破坏吗？(FIXME: 可能会..) -->
- 和 React API 有些差别
    - 大致上兼容 React 的最近 release，可能比 React 更早抛弃 deprecated API
    - 同时提供了 [preact-compat](https://github.com/developit/preact-compat) [preact-portal](https://github.com/developit/preact-portal/) 等包，来补全这些不同
    - 不一定有 React v16 的新 API
<!-- TODO:  diff算法略有不同? -->

更详细的比较可以看 [Preact](https://preactjs.com/) / [Differences to React](https://preactjs.com/guide/differences-to-react)。

## 这系列会介绍什么

主要内容是 Preact 怎样工作，将覆盖 Preact 的全部代码。

- JSX 和 Element (VNode / VDOM)
- 将 VDOM 渲染到 DOM 的过程
- Component 的更新和重渲染

考虑到 Preact 和 React 在概念和行为上有诸多相似，相信理解 Preact 的内部对 React 使用者也会有帮助。

顺便也会介绍 Preact 代码中看到的一些 JavaScript 技巧。

## 这系列不会介绍什么

- 怎样使用 JSX 和 React API
    - 我假设读者已经会使用 JavaScript 和 React
- 怎样配置 babel / webpack / TypeScript
    - 但会提供 babel / TypeScript 的两种新手包

## 开始使用Preact

### 如果你使用 JavaScript

可以使用 preact 作者自己写的 [preact-boilerplate](https://github.com/developit/preact-boilerplate)，内有配置好的 babel / webpack / 测试等东西。

### 如果你使用 TypeScript

可以使用我写的 [jokester/typescript-boilerplate](https://github.com/jokester/typescript-boilerplate) 的 `webpack-preact`分支，内有配置好的 tsc / webpack / 测试。

### 如果你使用 TypeScript 且想要自己配置

1. 让 TypeScript 编译器 (tsc) 用 preact 提供的函数转换 tsx，需要一些额外的设置。

在`tsconfig.json` (或其他地方的 tsc 设置) 中:

```json
{
    "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "preact.h"
    }
}
```

2. 安装 preact 并在所有的 tsx 文件中:

```typescript
import * as preact from 'preact';
```

- 注 1: `preact`自带 TypeScript 的类型声明，不需要找 `@types/preact`
- 注 2: `preact`和`@types/react`同时安装会有类型冲突

