---
title: 解剖Preact - DOM Component的渲染
created_at: 2017-04-01
lang: zh_cn
---

- toc
{:toc}

## 目录

本文是系列文章的第三篇，介绍Preact将无状态 V-DOM 渲染到DOM的过程。

1. Preact介绍 & 开始使用Preact
2. V-DOM / JSX / 渲染
3. 渲染过程 - DOM Component (本文)
4. 渲染过程 - 纯函数 Component
5. 渲染过程 - class Component

## VDOM的分类

在上一篇中我们讲过，V-DOM中有下面几种Node:

1. 字符串，对应一个原生DOM的 `Text` Node
2. `nodeName` 为字符串的VNode对象，对应原生DOM Component。nodeName的字符串即是原生DOM的nodeName (tagName)。
3. `nodeName` 为 (不是 class constructor的函数) 的VNode对象，对应无状态Component
4. `nodeName` 为 (class constructor) 的VNode对象，对应 class Component

本文将介绍仅含1 / 2的V-DOM的渲染过程。

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

- 初始化一些在下级diff中用到的变量:
    - isSvgMode 现在的diff是否在svg内部
    - hydrating 是否正在将VDOM渲染到不由Preact管理的DOM
- 执行`idiff()`，用`vnode`的内容更新DOM (见下一段)
- 如果指定了parent: 在diff完成后，将更新好的DOM移到parent
- diff全部完成后: `flushMount` 执行diff过程中被mount的component
- 返回更新后的DOM
    - 注意: 这个返回值和React不一样。React的`render()`会返回顶层Component的Instance。

### `idiff()` (`vdom/diff.js`)

`idiff` 对dom node和vnode进行一对一的比较，并更新dom到和vnode一致的状态。

- 如果vnode是falsy或字符串: 创建或更新`TextNode`, 返回dom
- 如果vnode是 class Component或纯函数Component: 执行`buildComponentFromVNode` 并返回其结果
    - 这个分支会在后面的文章介绍
- 如果vnode是DOM Component
    - 如果dom还不存在: 新建DOM Element
    - 如果dom存在，但和`vnode.nodeName`是不同类型: 同样地新建DOM Element，并将原dom中的children移给新元素
    - 对dom和vnode的children做多对多diff (`innerDiffNode()`)
    - 将vnode的属性更新到dom (`diffAttributes()`)

#### 多对多diff: `innerDiffNode(dom, vchildren) @ vdom/diff.js`

`innerDiffNode` 只由 `idiff()` 调用。

- 将 `dom.childNodes` 分组
    - `keyed` : `[key: string] : Node`
    - `children`: `Node[]`
- 为 `vchildren`中每一个`vchild`，在`dom.childNodes`中找到旧的`child`
    - 如果vchild有key: 在`keyed`中找相同key的
    - 如果vchild没有key: 在`children`中从左边开始找有相同类型的
        - 找到后更新`min / childrenLen`以减小将来的搜索范围
- 对上一步找到的 `child` 和`vchild` 递归执行 `idiff` ，把 `child` 更新到和 `vchild` 一致的状态。
    - 如果 `child` 之前不存在，`idiff` 内会新建一个。
- 回收没有匹配到 `vchild` 的 `child`

#### 属性diff (`diffAttributes()`)

- `diffAttributes(dom, attrs, old) @ vdom/diff.js`
    - 比较attrs(新) 和old(上次), 只对不同的属性调用setAccessor
        - 当属性名为`value` / `checked`时，比较对象是dom而不是old
            - FIXME: 是因为content / idl attribute吗?
        - 注意: content attribute和IDL attribute的区别

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

在仅有DOM Component时整个渲染流程都比较简单。

Preact把 (上次渲染时VDOM node的attributes) 用 `ATTR_KEY` 这个key保存在原生DOM的对象上。

### `ATTR_KEY`

- `dom[ATTR_KEY]` iff dom is created/managed by preact
- `

