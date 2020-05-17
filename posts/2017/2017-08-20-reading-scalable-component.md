---
title: 'TIR: Scalable Component Abstractions'
publishAt: 2017-08-20
slug: tir-scalable-component-abstractions
lang: zh
---

## 2 Scala 的用于组合 class 的机制

### 2.1

#### Abstract Type Numbers

一个抽象类可以以抽象的类型为成员。

```scala
abstract class AbsCell {
    type T;
    val init: T;
    // 其他成员也可使用T, 比如以T为方法参数或返回值
}
```

这样一个抽象类型的成员可以在创建时才具体指定:

```scala
val cell = AbsCell { type T = int; val init = 1 }
```

#### Path-dependent types

没有看懂

#### Parameter bounds

没有看懂

### 2.2 Modular Mixin Composition

`trait` 是特殊的抽象类, 要求 constructor 没有 value 参数.

抽象类可以用于 `extend` (继承) 或 `with` (mixin).

#### Class Linearation

一个类型可能 extend 一个, mixin 多个类型, 而且此过程是递归的.
Class Linearation 定义怎样从一个类型的所有 superclass (graph) 求出一个 _严格全序_ 的 superclass 链 (list).
这个链用于 override / super 的 resolution

#### Super calls

因为, `A extend B` 不保证在被用于组合后, A 中的 super 仍然指 B.

### 2.3 Selftype Annotations

可以为一个类另外指定这个类中的 this 的类型.

### 2.4 Service-Oriented Component Model

还没看懂
