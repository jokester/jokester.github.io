---
title: 解剖Preact - 1
created_at: 2017-04-16
lang: zh
---

这是一系列对 Preact 内部行为的介绍文章，

- toc
{:toc}

<!--


声明式编程: https://www.zhihu.com/question/28292740/answer/41235781
合成事件及其坑: https://zhuanlan.zhihu.com/p/26742034
JSX: https://zhuanlan.zhihu.com/p/29711902

-->

## 目录

1. Preact介绍 & 开始使用Preact (本文)
2. JSX 和 Element
3. 将 VDOM 渲染到 DOM
4. Component

## Preact 是什么

[Preact](https://preactjs.com/) 是一个使用和 [React](https://facebook.github.io/react/) 相同的思想，几乎相同的 API 的JavaScript-DOM渲染库。
和 React 一样，Preact 也定位于 "单向渲染DOM" 这一职责。

## Preact 的特点

(以下的比较都是相对于 React)
- 小: 全部代码仅有 1.3k 行，最小化后9kB，再gzip后不到4kB
    - 直接的好处: 可以边读这系列文章边把代码全部过一遍。这对于React的体量是难以做到的。
- 快: 在很多测试中比 React 性能更高
- 对浏览器做更少抽象 ("Closer to the Metal")
    - 直接把原生DOM事件传给你的`onClick=`，不像React一样把不同浏览器的事件标准化成 “合成事件” (`SyntheticEvent`)
    - 在渲染VDOM时，直接和原生DOM对比
- 警告和错误处理比React少
    - 全部代码中只有一个catch，如果你的代码抛出异常，这个异常会直接漏到浏览器控制台。
<!-- TODO: 漏异常会导致不可逆的状态破坏吗？(FIXME: 可能会..) -->
- 和React API略有不同
    - 大致上兼容React的最近release，可能比React更早抛弃deprecated API
    - 同时提供了 [preact-compat](https://github.com/developit/preact-compat) 来减少API区别
    - 不一定有 React v16的新API
<!-- TODO:  diff算法略有不同? -->

更详细的比较可以看 [Preact](https://preactjs.com/) / [Differences to React](https://preactjs.com/guide/differences-to-react)。

## 这系列会介绍什么

主要内容是 Preact 怎样工作，将覆盖Preact的全部代码。考虑到Preact和React在概念和行为上有诸多相似，相信理解Preact的内部对React 使用者也会有帮助。

- JSX和Element (VNode / V-DOM)
- 将VDOM渲染到DOM
- Component
- 事件和DOM更新

顺便也会介绍 Preact 代码中用到的一些JavaScript技巧。

## 这系列不会介绍什么

- 怎样使用JSX和React API
    - 我假设读者已经会使用 JavaScript 和 React
- 怎样配置 babel / webpack / TypeScript
    - 但会提供babel / TypeScript的两种新手包

## 开始使用Preact

### 如果你使用 JavaScript

可以使用preact作者自己写的 [preact-boilerplate](https://github.com/developit/preact-boilerplate)，内有配置好的babel / webpack / 测试等东西。

### 如果你使用 TypeScript

可以使用我写的 [jokester/typescript-boilerplate](https://github.com/jokester/typescript-boilerplate) 的 `webpack-preact`分支，内有配置好的tsc / webpack / 测试。

### 如果你使用 TypeScript 且想要自己配置

1. 让 TypeScript编译器 (tsc) 用preact提供的函数转换tsx，需要一些额外的设置。

在`tsconfig.json` (或其他地方的tsc设置) 中:

```json
{
    "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "preact.h"
    }
}
```

2. 安装preact并在所有的tsx文件中:

```typescript
import * as preact from 'preact';
```

- 注1: `preact`自带TypeScript的类型声明，不需要找 `@types/preact`
- 注2: `preact`和`@types/react`同时安装会有类型冲突
