---
title: 解剖Preact - 3
created_at: 2017-04-01
lang: zh
---

这是一系列对 Preact / JSX / V-DOM 渲染的研究文章。目录在[链接](#)。

## Part3 渲染DOM

#### 入口: `diff() @ vdom/diff.js`

- 初始化: isSvgMode / hydrating
- 实际的diff: `idiff()`
- diff完成后: `flushMount` / 将新dom插入parent

#### 一对一diff: `idiff(dom, vnode) @ vdom/diff.js`

- 如果vnode是函数Component: 展开vnode直到得到非函数Component, 继续
- 如果vnode是falsy: 设vnode为`''`, 继续
- 如果vnode是字符串: 将dom改为`TextNode`, 返回dom
- 如果vnode是Component: `buildComponentFromVNode` 并返回
    - TODO: 这部分在Component中介绍
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
