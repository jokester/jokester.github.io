---
title: 解剖Preact - 2
created_at: 2017-04-01
lang: zh
---

## 目录

## Part 2 JSX和Element

### V-DOM和渲染

"渲染" 这个词经常指 "从不可视的东西生成可视的东西" 的过程。
比如在图形学中，从两个座标和画线指令 (不可视) 生成一条线段的像素 (可视) 这样的过程就被称为渲染。

React式框架的渲染也是一个类似的过程，此时不可视形态是一些JS数据，可视形态则是浏览器原生DOM及其显示 (以下称DOM)。
整个渲染过程是声明式的: 我们用数据描述想要的DOM (渲染的结果)，由框架负责把DOM更新到这个状态 (渲染的过程)。
这个传给框架的JS数据就是虚拟DOM (以下称V-DOM)。

### Element / VNode

V-DOM和DOM一样是树状结构，V-DOM的组成单位是Element (注意和原生DOM的Element区分。以下的Element如无特别注明，都指V-DOM即`JSX.Element`)。

Preact的V-DOM中有以下几种Element

2. 和一个原生DOM Element对应，此时Element是一个JS对象，如 `{ nodeName: "div", ...}`
3. 和一个纯函数Component对应，此时Element是一个，
4. 没有comment和cdata

1. 和DOM中一个`Text` Node对应的，此时Element本身是一个JS字符串

V-DOM是
一个Element

V-DOM的单位是Element。

1. string 本身也是VNode
2. 和HTML tag对应的，不带JS实现的Component ("DOM component"): nodeName是`"div"`等字符串
3. 自定义的Component子类: nodeName是Component类的Constructor
4. 自定义的纯函数的Component: nodeName是那个函数

对2 3 4类的VNode含有:

- attributes (来自jsx?)
- children (jsx?)

### (DOM) Element

`node._component`: Component instance that "owns" this node

Q:
- what if multiple _component ?

`node._listeners`: event listeners

```ts

type node._listeners {
    [eventName: string]: (event: Event) => void
}
```