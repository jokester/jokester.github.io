---
title: 解剖Preact - V-DOM和JSX
created_at: 2017-04-01
lang: zh
---

- toc
{:toc}

## 目录

本文是系列文章的第二篇，介绍V-DOM和JSX的基础知识。

1. Preact介绍 & 开始使用Preact
2. V-DOM 和 JSX (本文)
3. 无状态 V-DOM 的渲染
4. 有状态 V-DOM 的渲染

## 渲染

"渲染" 这个词经常指 "从不可视的东西生成可视的东西" 的过程。
比如在图形学中，从两个座标和画线指令 (不可视) 生成一条线段的像素 (可视) 这样的过程就被称为渲染。

React式框架的渲染也是一个类似的过程，此时不可视形态是一些JS数据，可视形态则是浏览器原生DOM及其显示。
整个渲染过程是 *声明式* 的: 我们用数据描述想要的DOM (渲染的结果)，由框架负责把DOM更新到这个状态 (渲染的过程)。
这些"描述了想要的渲染结果"的JS数据就是虚拟DOM (以下称V-DOM)。

## V-DOM和VNode

V-DOM和DOM一样，是由Element/Node组成的树状结构 (以后的Element/Node如无额外说明均指V-DOM，请注意和原生DOM区分)。

Preact的V-DOM主要有以下几种Node (也包括了Element):

1. 对应Component的Element: 是一个`VNode`类的JS对象，有以下属性:
    - `nodeName`:
        - 当VNode对应 DOM Component 时，`nodeName`是`div`等字符串
        - 当VNode对应纯函数Component 时，`nodeName`是那个函数
        - 当VNode对应 class Component时，`nodeName`是那个Component的constructor
    - `children`
        - 这个Component下的子Node数组。子Node可能是`VNode`对象，也可能是字符串
    - `attributes`
        - 这个Component的属性
    - `key`
        - 这个Component
2. Node也可能是字符串，对应原生DOM中的一个`Text` Node。
3. 原生DOM的Comment和CDATA没有对应的VNode。

## JSX

JSX的实质是 "V-DOM字面量"，我们可以把JSX完全手工地改写成preact的VNode:

```ts
// 定义Component
class Greeting extends preact.Component {}

// 一个JSX写法的Element
const elem1 = <Greeting attr1={1} >text</Greeting>;

// 一个JS写法的Preact Element
const elem2 = new VNode();
elem.nodeName = Greeting;
p.attributes = { a: 1 };
p.children = ["text"];
```

当然这样手写出的代码既冗长又失去了 JSX 直观的优点。一般我们还是会手写JSX，然后用框架提供的 `preact.h` / `React.createElement` 等函数来将JSX转换成框架自己的数据结构。

延伸阅读:

- [WTF is JSX](jasonformat.com/wtf-is-jsx)
- [React Without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)

## Element和Instance

Element和Instance是两个重要而又容易混淆的概念。

Element 就是V-DOM本身。
一个V-DOM Element里只含有对Component constructor的引用，以及JSX中的属性。
我们可以低成本地创建 (`preact.h()`) 和复制 (`preact.cloneElement()`) Element。

Instance 是V-DOM渲染的结果，也是实际调用Component constructor 创建的，持有state的对象。
当一个Element被首次渲染到DOM时，相应的Instance 才会被Preact创建。
同样 (相同Component) 的Element被第二次渲染到DOM同一位置时，Preact不会多次创建Instance，而是会将props传给上次创建的Instance并重新渲染。

一句话总结: 框架使用者创建Element，框架创建并管理Instance。

(一般我们不需要自己创建或管理Instance，Preact也没有提供能获取Instance的公开API。)

延伸阅读:
- [React Components, Elements, and Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html)

## 相关代码

本文涉及的代码很少，不到100行。代码划分

<!-- FIXME: 加上有注释的代码。-->
<!-- FIXME: 加上到代码划分的链接 -->

- `src/vnode.js`

VNode类: 只是一个空函数。

- `src/clone-element.js`

(浅) 复制VNode。复制时可以覆盖props或children。对应React中的`React.cloneElement()`。

- `src/h.js`

将JSX转化为VNode。`preact.h` 函数的本体。
