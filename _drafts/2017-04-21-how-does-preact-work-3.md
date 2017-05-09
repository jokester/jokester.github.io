---
title: 解剖Preact - 无状态 V-DOM 的渲染
created_at: 2017-04-01
lang: zh
---

- toc
{:toc}

## 目录

本文是系列文章的第三篇，介绍Preact将无状态 V-DOM 渲染到DOM的过程。

1. Preact介绍 & 开始使用Preact
2. V-DOM 和 JSX
3. 无状态 V-DOM 的渲染 (本文)
4. 有状态 V-DOM 的渲染

## "无状态"

在上一篇中我们讲过，V-DOM是一种用于描述渲染结果的树状JS对象，由下面几种Node组成:

1. `nodeName` 为字符串的VNode对象，对应DOM Component (以及原生DOM的一个Element)
2. `nodeName` 为 (不是Component constructor的函数) 的VNode对象，对应纯函数Component
3. `nodeName` 为 (Component constructor函数) 的VNode对象，对应 class Component
4. JS string或number值，对应一个原生DOM的 `Text` Node


我们知道只有3, `class Component` 才有state (以及Instance和)，其他几种Node都是无状态的。其中1和4已经是


更深层的原因: 1和4已经是固定了的JS值。2虽然

## 入口: `diff() @ vdom/diff.js`

- 初始化: isSvgMode / hydrating
- 实际的diff: `idiff()`
- diff完成后: `flushMount` / 将新dom插入parent

#### 一对一diff: `idiff(dom, vnode) @ vdom/diff.js`

- 如果vnode是函数Component: 展开vnode直到得到非函数Component, 继续
- 如果vnode是falsy: 设vnode为`''`, 继续
- 如果vnode是字符串: 将dom改为`TextNode`, 返回dom
- 如果vnode是 (非函数) Component: `buildComponentFromVNode` 并返回
    - 这部分在Component中介绍
- 剩下的情况: vnode是DOM element
    - 保证out
        - 如果node不存在
        - 如果node存在但和vnode类型不同，新建out并将node的child移给out
        - 否则就用原来的node为out
    - 对node和vnode的children做多对多diff (`innerDiffNode`)

#### 多对多diff: `innerDiffNode(dom, vchildren) @ vdom/diff.js`

- 将 `dom.childNodes` 分组
    - `keyed` : `[key: string] : Node`
    - `children`: `Node[]`
- 为 `vchildren`中每一个`vchild`，在`dom.childNodes`中找到旧的`child`
    - 如果vchild有key: 在`keyed`中找相同key的
    - 如果vchild没有key: 在`children`中从左边开始找有相同类型的
        - 找到后更新`min / childrenLen`以减小将来的搜索范围
- 对`child` (可能没找到) 和`vchild`用`idiff`，如果之前没找到child，这里会创建一个新的
- 对每个
- 回收没有被用到的`dom.childrenNodes`

#### 属性diff

- `diffAttributes(dom, attrs, old) @ vdom/diff.js`
    - 比较attrs(新) 和old(上次), 只对不同的属性调用setAccessor
        - 但属性名为`value` / `checked`时，比较对象是dom而不是old
            - FIXME: 是因为content / idl attribute吗?
        - 注意: content attribute和IDL attribute的区别

- `setAccessor(node, name, old, value, isSvg) @ dom/index.js`
    - event proxy

```js
// preact/src/vdom/diff.js
// dom: Element
// attrs: 想要的attr
// old: 上次更新时attr, 保存在dom[ATTR_KEY]中. 如果没有, idiff会在调用diffAttributes之前从dom.attributes ("Content attribute") 创建一个)
function diffAttributes(dom, attrs, old) {
    // 比较attrs和old
    //      old: 如果attr name为value/checked，从dom取 "上次的值"。否则才从old取。
    // 将不同的部分更新到dom (setAccessor)
}
```

#### React的diff算法

React: [Reconciliation](https://facebook.github.io/react/docs/reconciliation.html)

Preact: vnode和node

`node._component`: Component instance that "owns" this node

Q:
- what if multiple _component ?

`node._listeners`: event listeners

```ts

type node._listeners {
    [eventName: string]: (event: Event) => void
}
```