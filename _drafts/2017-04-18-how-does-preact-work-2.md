---
title: 解剖Preact - 2
created_at: 2017-04-01
lang: zh
---

## 目录

## Part 2 JSX和Element

### 渲染

"渲染" 这个词经常指 "从不可视的东西生成可视的东西" 的过程。
比如在图形学中，从两个座标和画线指令 (不可视) 生成一条线段的像素 (可视) 这样的过程就被称为渲染。

React式框架的渲染也是一个类似的过程，此时不可视形态是一些JS数据，可视形态则是浏览器原生DOM及其显示。
整个渲染过程是声明式的: 我们用数据描述想要的DOM (渲染的结果)，由框架负责把DOM更新到这个状态 (渲染的过程)。
这些"描述了想要的渲染结果"的JS数据就是虚拟DOM (以下称V-DOM)。

### V-DOM和VNode

V-DOM和DOM一样，是由Element/Node组成的树状结构 (以后的Element/Node如无额外说明均指V-DOM，请注意和原生DOM区分)。

Preact的V-DOM主要有以下几种Node (也包括了Element):

1. 对应Component的Node: 是一个`VNode`类的JS对象，有以下属性:
    - `nodeName`:
        - 当VNode对应DOM Component时，`nodeName`是`div`等字符串
        - 当VNode对应纯函数Component时，`nodeName`是那个函数
        - 当VNode对应非纯函数Component时，`nodeName`是Component constructor
    - `children`
        - 这个Component下的子Node数组。子Node可能是`VNode`对象，也可能是字符串
    - `attributes`
        - 这个Component的属性
    - `key`
        - 这个Component
2. Node也可能是字符串，对应原生DOM中的一个`Text` node。
3. 原生DOM的Comment和CDATA没有对应的VNode

### JSX

JSX的实质是 "V-DOM字面量"，我们可以把JSX完全手工地改写成preact的VNode:

```jsx
// 定义Component
class Greeting extends preact.Component {}

// 一个JSX写法的Element
const elem = <Greeting attr1={1} >text</Greeting>;

// 一个JS写法的Element
const elem = new VNode();
elem.nodeName = Greeting;
p.attributes = { a: 1};
p.children = ["text"];
```

当然这样就和手写

Preact中提供了 `preact.h` 这个函数来将JSX转换成Preact自己的VNode等数据结构。

### Element不等于Instance

V-DOM Element里只含有Component constructor的引用，以及JSX中的属性。我们可以低成本地创建 (`preact.h()`) 和复制 (`preact.cloneElement()`) Element。

在class Component内定义的state及hook方法 (`componentWillMount()`) 并不属于Element，而是属于那个Component的Instance。
当一个Element被渲染到DOM时，才会有相应的Instance被Preact创建。
同样的Element被多次渲染到DOM同一位置时，Instance也不会被多次创建。

一般我们不需要自己手工创建或管理Instance，Preact也没有能获取Instance的公开API。

### 代码

本文涉及的功能很短，不到100行:

