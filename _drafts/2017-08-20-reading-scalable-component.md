---
title: "Reading - Scalable Component Abstractions"
created_at: 2017-08-20
lang: zh
---

## 2 Scala的用于组合class的机制

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

`trait` 是特殊的抽象类, 要求constructor没有value参数.

抽象类可以用于 `extend` (继承) 或 `with` (mixin).

#### Class Linearation

一个类型可能extend一个, mixin多个类型, 而且此过程是递归的.
Class Linearation定义怎样从一个类型的所有superclass (graph) 求出一个 *严格全序* 的superclass链 (list).
这个链用于override / super的resolution

#### Super calls

因为, `A extend B` 不保证在被用于组合后, A中的super仍然指B.

### 2.3 Selftype Annotations

可以为一个类另外指定这个类中的this的类型.

### 2.4 Service-Oriented Component Model

还没看懂

