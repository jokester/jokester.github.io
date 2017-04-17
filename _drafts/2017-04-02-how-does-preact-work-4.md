---
title: 解剖Preact - 4
created_at: 2017-04-01
lang: zh
---

## Part4 Component

### 什么是Component



- "纯" Component: 一个从prop生成Element的函数，没有state
- "不纯" Component: 一个定义了`render()`方法的类，有state

### Ref



#### 入口: `buildComponentFromVNode`


- `node._componentConstructor`

- `node._component`
    - 如果多层component对应同一个node会怎样?

### Component怎样和dom互相引用

dom到Component: 

- `dom._component`
- `dom._componentConstructor`

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

- 自带一个className() 实现
- 在JSX中可以使用属性名 `class`, 也可以使用 `className`, 但如果同时存在, 其中一个会被覆盖.


