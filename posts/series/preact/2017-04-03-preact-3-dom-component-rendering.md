---
title: 解剖Preact - DOM Component的渲染
---

- toc
{:toc}

## 目录

本文是系列文章的第三篇，介绍 Preact 将无状态 V-DOM 渲染到 DOM 的过程。

1. Preact 介绍 & 开始使用 Preact
2. V-DOM / JSX / 渲染
3. 渲染过程 - DOM Component (本文)
4. 渲染过程 - 纯函数 Component
5. 渲染过程 - class Component

## VDOM的分类

在上一篇中我们讲过，V-DOM 中有下面几种 Node:

1. 字符串，对应一个原生 DOM 的 `Text` Node
2. `nodeName` 为字符串的 VNode 对象，对应原生 DOM Component。nodeName 的字符串即是原生 DOM 的 nodeName (tagName)。
3. `nodeName` 为 (不是 class constructor 的函数) 的 VNode 对象，对应无状态 Component
4. `nodeName` 为 (class constructor) 的 VNode 对象，对应 class Component

本文将介绍仅含 1 / 2 的 V-DOM 的渲染过程。

### call graph

```text
call graph:

render()    => diff()    =>     idiff()     <=>    innerDiffNode()

- diff() / vdom/diff.js
    - `idiff(dom, vnode)` (`vdom/diff.js`) 
```

## API和内部流程

### 给框架使用者的入口: `render()`

Preact 对外提供的 `render()` 函数处于 `src/preact.js`，仅仅是将参数转发给`diff()`。

### `diff()` (`vdom/diff.js`)

- 初始化一些在下级 diff 中用到的变量:
    - isSvgMode 现在的 diff 是否在 svg 内部
    - hydrating 是否正在将 VDOM 渲染到不由 Preact 管理的 DOM
- 执行`idiff()`，用`vnode`的内容更新 DOM (见下一段)
- 如果指定了 parent: 在 diff 完成后，将更新好的 DOM 移到 parent
- diff 全部完成后: `flushMount` 执行 diff 过程中被 mount 的 component
- 返回更新后的 DOM
    - 注意: 这个返回值和 React 不一样。React 的`render()`会返回顶层 Component 的 Instance。

### `idiff()` (`vdom/diff.js`)

`idiff` 对 dom node 和 vnode 进行一对一的比较，并更新 dom 到和 vnode 一致的状态。

- 如果 vnode 是 falsy 或字符串: 创建或更新`TextNode`, 返回 dom
- 如果 vnode 是 class Component 或纯函数 Component: 仅执行`buildComponentFromVNode` 并返回其结果
    - 这个分支会在后面的文章介绍
- 如果 vnode 是 DOM Component
    - 如果 dom 还不存在: 新建 DOM Element
    - 如果 dom 存在，但和`vnode.nodeName`是不同类型: 同样地新建 DOM Element，并将原 dom 中的 children 移给新元素
    - 对 dom 和 vnode 的 children 做多对多 diff (`innerDiffNode()`)
    - 将 vnode 的属性更新到 dom (`diffAttributes()`)

#### 多对多diff: `innerDiffNode(dom, vchildren) @ vdom/diff.js`

`innerDiffNode` 只由 `idiff()` 调用。

- 将 `dom.childNodes` 分组
    - `keyed` : `[key: string] : Node`
    - `children`: `Node[]`
- 为 `vchildren`中每一个`vchild`，在`dom.childNodes`中找到旧的`child`
    - 如果 vchild 有 key: 在`keyed`中找相同 key 的
    - 如果 vchild 没有 key: 在`children`中从左边开始找有相同类型的
        - 找到后更新`min / childrenLen`以减小将来的搜索范围
- 对上一步找到的 `child` 和`vchild` 递归执行 `idiff` ，把 `child` 更新到和 `vchild` 一致的状态。
    - 如果 `child` 之前不存在，`idiff` 内会新建一个。
- 回收没有匹配到 `vchild` 的 `child`

#### 属性diff (`diffAttributes()`)

- `diffAttributes(dom, attrs, old) @ vdom/diff.js`
    - 比较 attrs(新) 和 old(上次), 只对不同的属性调用 setAccessor
        - 当属性名为`value` / `checked`时，比较对象是 dom 而不是 old
            - FIXME: 是因为 content / idl attribute 吗?
        - 注意: content attribute 和 IDL attribute 的区别

### 将props中的属性更新到DOM (`setAccessor()`)

`setAccessor(node, name, old, value, isSvg) @ dom/index.js`
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

## 数据结构

在仅有 DOM Component 时整个渲染流程都比较简单。

Preact 把 (上次渲染时 VDOM node 的 attributes) 用 `ATTR_KEY` 这个 key 保存在原生 DOM 的对象上。

### `ATTR_KEY`

- `dom[ATTR_KEY]` iff dom is created/managed by preact
- `

