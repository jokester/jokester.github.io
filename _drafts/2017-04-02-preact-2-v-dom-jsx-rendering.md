---
title: 解剖Preact - V-DOM / JSX / 渲染
created_at: 2017-04-01
lang: zh
---

- toc
{:toc}

## 系列目录

1. Preact介绍 & 开始使用Preact
2. V-DOM / JSX / 渲染 (本文)
3. 渲染过程 - DOM Component
4. 渲染过程 - 纯函数 Component
5. 渲染过程 - class Component

## 渲染

"渲染" 这个词经常指 "从不可视的东西生成可视的东西" 的过程。
比如在图形学中，从两点座标和画线指令 (不可视) 生成一条线段的像素 (可视) 的过程就是一种渲染。

React / Preact 式框架的渲染也是一个类似的过程，此时不可视的是一些JS数据，(在前端) 渲染得到的可视结果则是原生DOM (在服务器渲染则是得到HTML字符串)。

整个渲染过程是 *声明式* 的: 我们用数据描述想要的DOM (渲染的结果)，由框架负责把DOM更新到这个状态 (渲染的过程)。这些 "描述渲染结果" 的JS数据就是虚拟DOM (以下称V-DOM)。

本文主要介绍渲染的输入 (V-DOM / JSX) 和输出，下面几篇会具体研究渲染过程。

## Preact的V-DOM

V-DOM和DOM一样，是树状结构 (下文的Element/Node如无额外说明均指V-DOM，请注意和原生DOM区分)。

Preact的V-DOM有以下几种Node:

1. 字符串，对应原生DOM的 `Text` Node。
2. `VNode` 类 (`src/vnode.js` 中的空白类) 的JS对象。有以下属性:
    - `nodeName`:
        - 当VNode对应 DOM Element 时，`nodeName` 是字符串，如`div`
        - 当VNode对应纯函数Component 时，`nodeName`是纯函数
        - 当VNode对应 class Component时，`nodeName`是class constructor
    - `children`
        - 这个Node下的子Node (数组)。子Node同样可能是`VNode`对象或字符串
    - `attributes`
        - 这个Node的属性
    - `key`
        - 这个Node的key

注: 原生DOM的`Comment` `CDATA` 等Node 在Preact的V-DOM中没有东西对应

注2: VNode名字叫 "Node" 但其实对应原生DOM的HTMLElement / React的 `React.Element` 。

## JSX

JSX的实质是 "V-DOM字面量"，就像HTML是原生DOM的字面量。我们可以自己写JSX:

```ts
// 定义Component
class Greeting extends preact.Component {}

// 一个用JSX写的Element
const elem = <Greeting name={1}>text</Greeting>;
```

也可以自己写JS来生成VNode:

```ts
// 一个和上面等价的Element
const elem = new VNode();
elem.nodeName = Greeting;
p.attributes = { a: 1 };
p.children = ["text"];
```

显然手写JS麻烦得多。所以一般我们还是写JSX，然后让编译器 (如tsc / babel) 把JSX转换为 `const elem = preact.h(Greeting, { a: 1 }, "text")`，再由 `preact.h` 生成VNode。

延伸阅读:

- [WTF is JSX](jasonformat.com/wtf-is-jsx)
- [React Without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)

## Element / Component / Instance

这是几个貫穿全局的，重要而又容易混淆的概念。

**Element**

就是上文中的V-DOM Node。一个 (不是字符串的) Element里含有对 Component 的引用，以及JSX中的属性 (包括key / children)。

我们可以低成本地创建 (`preact.h()`) 和复制 (`preact.cloneElement()`) Element。

**Component**

被 VNode 引用 (`nodeName`) 的字符串或函数或class constructor。

Component决定这个VNode被渲染时的结果:

- 字符串: 一个原生DOM Element
- 纯函数Component: 一颗原生DOM的子树
- class Component: 一颗原生DOM的子树，和一个 "持有" 这颗子树的Instance

**Instance**

Instance 是 (有状态Component的Element) 的渲染结果。当一个这样的Element被首次渲染到DOM时，Preact才会创建相应的Instance。

同样 (相同Component) 的Element被再次渲染到DOM同一位置时，Preact不会多次创建Instance，而是将新的props传给已有的Instance，并由那个Instance决定是否重新渲染 (`componentShouldUpdate`)。

一个Instance也可以 `this.setState()` / `this.forceUpdate()` 然后重新渲染自己持有的那部分子树。

**总结**

框架使用者创建Component和Element，框架创建 (以及管理和更新) Instance。一般我们不会自己创建或管理Instance，Preact也没有提供能获取Instance的公开API<!-- FIXME: ref? -->。

延伸阅读:

- [React Components, Elements, and Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html)

## 相关代码

本文涉及的代码不到100行。代码划分

<!-- FIXME: 加上有注释的代码。-->
<!-- FIXME: 加上到代码划分的链接 -->

- `src/vnode.js`

VNode类: 只是一个空类。

- `src/clone-element.js`

(浅) 复制VNode。复制时可以覆盖attributes或children。对应React中的`React.cloneElement()`。

- `src/h.js`

将JSX转化为JS时使用的 `preact.h` 函数的本体。对应React中的`React.createElement()`。
