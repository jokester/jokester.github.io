---
title: 解剖 Preact -- 草稿
created_at: 2017-04-01
lang: zh
---

### VNode

1. string 本身也是VNode
2. 和HTML tag对应的，不带JS实现的Component ("DOM component"): nodeName是`"div"`等字符串
3. 自定义的Component子类: nodeName是Component类的Constructor
4. 自定义的纯函数的Component: nodeName是那个函数

对2 3 4类的VNode含有:

- attributes (来自jsx?)
- children (jsx?)

### (DOM) Element

node._component: Component instance that "owns" this node

Q:
- what if multiple _component ?

```ts
node._listeners: event listeners

type node._listeners {
    [eventName: string]: (event: Event) => void
}
```


### Diff算法

React: 先对vnode和vnode进行比较，将[Reconciliation](https://facebook.github.io/react/docs/reconciliation.html)

Preact:

```text
输入: vnode 和 node
可选输入: dom (), parent ()

```

### 设计模式: 对象池

Preact分别为DOM对象 `HTML***Element`


### 代码模式: 全局队列 / 全局栈


避免了每次创建数组, 也避免了开一个参数来传递数组.


注意: 如果


### 代码模式: 缓存计算结果



### Preact

- 自带一个className() 实现
- 在JSX中可以使用属性名 `class`, 也可以使用 `className`, 但如果同时存在, 其中一个会被覆盖.

### 属性的 diff

```js
// preact/src/vdom/diff.js
// dom: Element
// attrs: 想要的attr
// old: 上次更新时attr (保存在dom[ATTR_KEY]中, 如果没有, 会从dom.attributes ("Content attribute") 创建一个)
function diffAttributes(dom, attrs, old) {
    // 比较attrs和old
    //      old: 如果attr name为，从dom取 "上次的值"。否则才从old取。
    // 将不同的部分更新到dom (setAccessor)
}

// preact/src/vdom/index.js
function setAccessor(node, name, old, value, isSvg) {
    //
}
```
