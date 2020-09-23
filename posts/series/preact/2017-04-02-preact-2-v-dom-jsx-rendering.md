---
title: 解剖Preact - V-DOM / JSX / 渲染
---

- toc
{:toc}

## 系列目录

1. Preact 介绍 & 开始使用 Preact
2. V-DOM / JSX / 渲染 (本文)
3. 渲染过程 - DOM Component
4. 渲染过程 - 纯函数 Component
5. 渲染过程 - class Component

## 渲染

"渲染" 这个词经常指 "从不可视的东西生成可视的东西" 的过程。
比如在图形学中，从两点座标和画线指令 (不可视) 生成一条线段的像素 (可视) 的过程就是一种渲染。

React / Preact 式框架的渲染也是一个类似的过程，此时不可视的是一些 JS 数据，(在前端) 渲染得到的可视结果则是原生 DOM (在服务器渲染则是得到 HTML 字符串)。

整个渲染过程是 *声明式* 的: 我们用数据描述想要的 DOM (渲染的结果)，由框架负责把 DOM 更新到这个状态 (渲染的过程)。这些 "描述渲染结果" 的 JS 数据就是虚拟 DOM (以下称 V-DOM)。

本文主要介绍渲染的输入 (V-DOM / JSX) 和输出，下面几篇会具体研究渲染过程。

## Preact的V-DOM

V-DOM 和 DOM 一样，是树状结构 (下文的 Element/Node 如无额外说明均指 V-DOM，请注意和原生 DOM 区分)。

Preact 的 V-DOM 有以下几种 Node:

1. 字符串，对应原生 DOM 的 `Text` Node。
2. `VNode` 类 (`src/vnode.js` 中的空白类) 的 JS 对象。有以下属性:
    - `nodeName`:
        - 当 VNode 对应 DOM Element 时，`nodeName` 是字符串，如`div`
        - 当 VNode 对应纯函数 Component 时，`nodeName`是纯函数
        - 当 VNode 对应 class Component 时，`nodeName`是 class constructor
    - `children`
        - 这个 Node 下的子 Node (数组)。子 Node 同样可能是`VNode`对象或字符串
    - `attributes`
        - 这个 Node 的属性
    - `key`
        - 这个 Node 的 key

注: 原生 DOM 的`Comment` `CDATA` 等 Node 在 Preact 的 V-DOM 中没有东西对应

注 2: VNode 名字叫 "Node" 但其实对应原生 DOM 的 HTMLElement / React 的 `React.Element` 。

## JSX

JSX 的实质是 "V-DOM 字面量"，就像 HTML 是原生 DOM 的字面量。我们可以自己写 JSX:

```ts
// 定义Component
class Greeting extends preact.Component {}

// 一个用JSX写的Element
const elem = <Greeting name={1}>text</Greeting>;
```

也可以自己写 JS 来生成 VNode:

```ts
// 一个和上面等价的Element
const elem = new VNode();
elem.nodeName = Greeting;
p.attributes = { a: 1 };
p.children = ["text"];
```

显然手写 JS 麻烦得多。所以一般我们还是写 JSX，然后让编译器 (如 tsc / babel) 把 JSX 转换为 `const elem = preact.h(Greeting, { a: 1 }, "text")`，再由 `preact.h` 生成 VNode。

延伸阅读:

- [WTF is JSX](jasonformat.com/wtf-is-jsx)
- [React Without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)

## Element / Component / Instance

这是几个貫穿全局的，重要而又容易混淆的概念。

**Element**

就是上文中的 V-DOM Node。一个 (不是字符串的) Element 里含有对 Component 的引用，以及 JSX 中的属性 (包括 key / children)。

我们可以低成本地创建 (`preact.h()`) 和复制 (`preact.cloneElement()`) Element。

**Component**

被 VNode 引用 (`nodeName`) 的字符串或函数或 class constructor。

Component 决定这个 VNode 被渲染时的结果:

- 字符串: 一个原生 DOM Element
- 纯函数 Component: 一颗原生 DOM 的子树
- class Component: 一颗原生 DOM 的子树，和一个 "持有" 这颗子树的 Instance

**Instance**

Instance 是 (有状态 Component 的 Element) 的渲染结果。当一个这样的 Element 被首次渲染到 DOM 时，Preact 才会创建相应的 Instance。

同样 (相同 Component) 的 Element 被再次渲染到 DOM 同一位置时，Preact 不会多次创建 Instance，而是将新的 props 传给已有的 Instance，并由那个 Instance 决定是否重新渲染 (`componentShouldUpdate`)。

一个 Instance 也可以 `this.setState()` / `this.forceUpdate()` 然后重新渲染自己持有的那部分子树。

**总结**

框架使用者创建 Component 和 Element，框架创建 (以及管理和更新) Instance。一般我们不会自己创建或管理 Instance，Preact 也没有提供能获取 Instance 的公开 API<!-- FIXME: ref? -->。

延伸阅读:

- [React Components, Elements, and Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html)

## 相关代码

本文涉及的代码不到 100 行。代码划分

<!-- FIXME: 加上有注释的代码。-->
<!-- FIXME: 加上到代码划分的链接 -->

- `src/vnode.js`

VNode 类: 只是一个空类。

- `src/clone-element.js`

(浅) 复制 VNode。复制时可以覆盖 attributes 或 children。对应 React 中的`React.cloneElement()`。

- `src/h.js`

将 JSX 转化为 JS 时使用的 `preact.h` 函数的本体。对应 React 中的`React.createElement()`。
