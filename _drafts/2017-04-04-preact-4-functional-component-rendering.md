---
title: 解剖Preact - 4
created_at: 2017-04-01
lang: zh
---



## Part4 Component

## Pure / Stateless

我们把前 3 种情况称为 "无状态" 渲染。"无状态" 是指渲染所需信息完全由V-DOM决定，且不会再变动:

- 1和2已经是固定了的JS值。
- 3虽然还没有被执行，但只要 `nodeName` 是对相同输入给出相同输出的纯函数Component，在props确定时相应的Node也已经确定。

与其相反的则是 4 "有状态" 渲染:

本文介绍Preact将1 / 2 / 3几种Node渲染到DOM的过程。



### Notation

```
dom :: DOM Node

dom

vnode :: VNode

C :: new() => Component
c :: Component

c.base ::: dom // if c 'owns' the dom
c.nextBase // dom that gets 'owned' by c when c gets mounted
c._disabled // true during setComponentProps()
c.__ref , c.__key // ref and key from vnode
c.context, c.prevContext
c.props, c.prevProps

dom._component              :: Component
component._parentComponent  :: Component
component._component        :: child component?



```




#### 入口: `buildComponentFromVNode`


- `node._componentConstructor`
    - 和`isDirectOwner`有关

- `node._component`
    - 最内层的Component instance

### Component constructor

- `Ctor.name`: [Function.name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)

### Component instance的属性

- `c.constructor` 指向constructor (这是JS Obj共有的)
- `c._component` 本次
- `c._disable` 曾经的名字是 `_disableRendering`. unmount时置为true / setComponentProps中先true再false / 是true时renderComponent会忽略
- `c.base` 最后一次render结果的dom
    - 有base `<=>` mounted
- `c.__ref` props中的ref
- `c.__key` props中的key
- `c._dirty` 用于避免多次enqueueRender
- `c.nextBase` ???

### DOM Node的属性

- `dom[ATTR_KEY]` 上次的

### Component (instance) 怎样和dom互相引用

dom到Component: 

- `dom._component` 最内层的 `Component` instance
- `dom._componentConstructor` 这个instance的Constructor

Component到外层Component:

- `c._parentComponent`

Component到内层 (inner) Component:

- `c._component`

Component到DOM:

- `c.base` (最内层的非DOM component才有)

```jsx
const A = (props) => <B />;
const B = (props) => <C />;
const C = (props) => <p />;

<A />
```

```js
p._component = A
```

## Part5 其他

### Context

### 设计模式: 对象池

Preact分别为DOM对象 `HTML***Element`


### 代码模式: 在递归中使用全局变量

例: `hydrating @ vdom/diff.js`

- 最外层递归: 初始化全局变量
- 内层递归: 使用

- 好处: 避免了每次创建变量，或用参数传递变量
- 条件: JS是单线程，这不会导致冲突。
- 条件: 整个递归需要是同步的
- 风险: 如果内层代码抛出异常，全局变量有可能不会被正常复原

### 代码模式: 缓存计算结果


### 代码模式: 事件代理

- node._listeners

### Preact的细节

- 自带一个className() 实现 `8.1中已删除`
- 在JSX中可以使用属性名 `class`, 也可以使用 `className`, 但如果同时存在, 其中一个会被覆盖.
- `ref` 必须是函数


