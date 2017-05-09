---
title: 解剖Preact - 介绍
created_at: 2017-04-16
lang: zh
---

(<!-- FIXME: -->还未全部完成)

- toc
{:toc}

## 目录

本文是一系列对 Preact / JSX / V-DOM 渲染的介绍文章的第一篇。

1. Preact介绍 & 开始使用Preact (本文)
2. V-DOM 和JSX
3. 无状态 V-DOM 的渲染
4. 有状态 V-DOM 的渲染

## Preact 是什么

[Preact](https://preactjs.com/) 是一个使用和 [React](https://facebook.github.io/react/) 相同的思想，几乎相同的API的JavaScript DOM渲染库。
和 React 一样，Preact 也定位于 "单向渲染DOM" 这一职责。

## Preact 的特点

(以下的比较都是相对于 React)

- 小: 全部代码仅有 1.3k 行，最小化后9kB，再gzip后不到4kB
    - 直接的好处: 可以边读这系列文章边把代码全部过一遍。这对于React的体量是难以做到的。
    - 追求小的副作用是代码中有些晦涩的地方，这也是我写这系列文章的动机之一。
- 快: 在很多测试中比 React 性能更高
- 对浏览器做更少抽象 ("Closer to the Metal")
    - 直接把原生DOM事件传给你的`onClick=` (React会把不同浏览器的事件 "标准化")
    - 在渲染V-DOM时，直接将V-DOM和原生DOM对比 (React会先把V-DOM和上次的V-DOM对比，然后将不同点更新到原生DOM)
- 警告和错误处理比React少
    - 全部代码中只有一个catch，如果你的代码抛出异常，这个异常会直接漏到浏览器控制台。
<!-- TODO: 漏异常会导致不可逆的状态破坏吗？(FIXME: 可能会..) -->
- API略有不同
    - 大致上兼容React的最近release，但可能比React更早抛弃deprecated API
    - 同时提供了 [preact-compat](https://github.com/developit/preact-compat) 来把这些API补回来。
<!-- TODO:  diff算法略有不同? -->

更详细的比较可以看 [Preact](https://preactjs.com/) / [Differences to React](https://preactjs.com/guide/differences-to-react)。

Preact和React在概念和行为上有诸多相似，相信理解Preact的内部对React 使用者也会有帮助。

## 这系列会介绍什么

后续文章将介绍Preact 8.1.0中的渲染全过程及代码。以下是按功能对Preact代码的划分，前3部分分别对应本系列的余下3篇文章。

```text
-----+---------------------------------+-------------------
 LOC | filename                        | comment
-----+---------------------------------+-------------------
     |                                 | *** Part 2. JSX和V-DOM *** (70LOC)
   2 | src/vnode.js                    | VNode类
  10 | src/clone-element.js            | 复制VNode
  60 | src/h.js                        | JSX -> VNode
-----+---------------------------------+-------------------
     |                                 | *** Part 3. 无状态V-DOM的渲染 *** (500LOC)
  20 | src/render.js                   | Diff 和渲染功能的入口
 108 | src/dom/index.js                | DOM
 303 | src/vdom/diff.js                | VDOM-DOM diff
  50 | src/vdom/index.js               | VDOM utils
-----+---------------------------------+-------------------
     |                                 | *** Part 4. 有状态V-DOM的渲染 *** (500LOC)
  81 | src/component.js                | Component的基类
  49 | src/vdom/component-recycler.js  | Component对象池
 274 | src/vdom/component.js           | 将有状态Component渲染到DOM
  21 | src/render-queue.js             | Component的渲染队列
-----+---------------------------------+-------------------
     |                                 | *** 其他 ***
  26 | src/preact.js                   | 整个Preact的入口
  13 | src/constants.js                | consts
  27 | src/options.js                  | options / hooks
  10 | src/util.js                     | util
 754 | src/preact.d.ts                 | TypeScript decl
   9 | src/preact.js.flow              | Flow decl
-----+---------------------------------+-------------------
1817 | total                           |
```

顺便也会介绍 Preact 代码中用到的一些JavaScript技巧。

## 这系列不会介绍什么

- 怎样使用JSX和React API。所以在开始读之前，建议先上手React到如下程度:
    - 会用JSX语法
    - 会定义和使用Component，包括纯函数Component和有状态的 `class` Component
- 怎样配置 babel / webpack / TypeScript
    - 但会提供 babel / TypeScript的两种新手包

## 开始使用Preact

#### 如果你使用 JavaScript

可以使用preact作者自己写的 [preact-boilerplate](https://github.com/developit/preact-boilerplate)，内有配置好的babel / webpack / 测试等东西。

#### 如果你使用 TypeScript

可以使用我写的 [jokester/typescript-boilerplate](https://github.com/jokester/typescript-boilerplate) 的 `webpack-preact`分支，内有配置好的tsc / webpack / 测试。

<!-- TODO: 命令 -->

#### 如果你使用 TypeScript 且想要自己配置

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
