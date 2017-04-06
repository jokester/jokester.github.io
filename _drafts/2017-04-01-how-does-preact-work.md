---
title: 解剖 Preact
created_at: 2017-04-01
lang: zh
---

这是一系列对 Preact 和 JSX 渲染的研究文章。

### 什么是 Preact?

[Preact](https://preactjs.com/) 是一个使用和 [React](https://facebook.github.io/react/) 相同的思想，几乎相同的API的JavaScript渲染库。
和 React 一样，Preact 也定位于 "渲染DOM" 的单一职责。

Preact和React的几个重要不同:

1. 对浏览器做更少抽象 ("Closer to the Metal"):
    - Preact 直接连接你的代码和原生DOM事件，不像React一样把不同浏览器的事件 "标准化"
    - Preact 在渲染VDOM时，直接和原生DOM对比
2. 警告和错误处理比React少: 全部代码中只有一个catch，如果你的代码抛出异常，这个异常会直接漏到浏览器控制台。
    - TODO: 漏异常会导致不可逆的状态破坏吗？
3. 小: 全部代码仅有 1.3k 行，最小化后9kB，再gzip后不到4kB。
4. 快: 在很多测试中比 React 性能更高。
5. TODO: async render?

更详细的比较可以看 [Preact](https://preactjs.com/) / [Differences to React](https://preactjs.com/guide/differences-to-react)。

### 这系列会介绍什么?

- Preact 怎样工作
    - 定义Component -- 在JSX中使用Component -- 把JSX渲染成DOM -- 事件和DOM更新 的完整流程
    - 考虑到Preact和React在概念和设计上有诸多相似，相信理解Preact的内部对React 用户也会有帮助
- 顺便介绍 Preact 代码中用到的一些JavaScript技巧

### 这系列不会介绍什么?

- 怎样用JSX写出能动的东西 (所以在开始读之前，建议你先上手JavaScript，React及其API)
- 怎样配置 babel / webpack / TypeScript / 其他和核心无关的东西
    - TODO: 加一个JS用的模板

### 目录

<!-- TODO: finish -->
1. Element 和 Component
2. VDOM 和 Render

### 如果你使用 TypeScript

为了让tsc用preact转换tsx，需要一些额外的设置。

在`tsconfig.json` (或其他地方的tsc设置) 中:

```json
{
    "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "preact.h"
    }
}
```

在所有的tsx文件中:

```typescript
import * as preact from 'preact';
```

你也可以从我配置好的一个 TypeScript 模板开始: [jokester/typescript-boilerplate](https://github.com/jokester/typescript-boilerplate) 的 `webpack-preact`分支。

### 如果你使用 babel转换jsx/tsx

我不用babel和jsx所以暂留空了。如果有在用的人欢迎补充。
