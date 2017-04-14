---
title: 解剖Preact - 2
created_at: 2017-04-01
lang: zh
---

这是一系列对 Preact / JSX / V-DOM 渲染的研究文章。目录在[链接](#)。

## Part 2 JSX和Element

### VNode

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