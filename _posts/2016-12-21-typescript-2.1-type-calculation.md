---
title: TypeScript 2.1中的类型运算
created_at: 2016-12-21
---

去年12月的 TypeScript 2.1 中加入了 keyof / Lookup Types / Mapped Types 等 (编译期的) 类型运算特性。
本文将介绍这些特性，并用这些特性实现一个 "递归的Readonly" 泛型。

* toc
{:toc}

## 新特性的介绍

### keyof

`keyof T` 返回一个类型，这个类型是一个string union，内容是T中所有的属性名 (key)。

例: `keyof { a: 1, b: 2 }` 得到的类型是 `"a" | "b"`

### Lookup Types / 查找类型

`[]`的类型版。`T[K]` 返回 (类型T中以K为属性名的值) 的类型。K必须是`keyof T`的子集，可以是一个字符串字面量。

```typescript
const a = { k1: 1, k2: "v2" };

// tv1 为number
type tv1 = (typeof a)["k1"];

// tv2 为string
type tv2 = (typeof a)["k2"];

// tv$ 为 (number|string): 属性名的并集对应到了属性值的类型的并集
type tv$ = (typeof a)["k1" | "k2"];

// 以上的括号不是必需的: typeof优先级更高

// 也可以用于获取内置类型 (string, 或string[]) 中的方法
type t_charAt = string["charAt"];  // (pos: number) => string
type t_push = string[]["push"];  // (...items: string[]) => number
```

### Mapped Types / 映射类型

我们可以在类型定义中引用其他类型的 (部分或全部) 属性，并对其进行运算，用运算结果定义出新的类型 (Mapped Type)。即"把旧类型的属性map/映射成新类型的属性"，可以比作list comprehension (把旧list的一部分map成新list) 的类型属性版。

引用哪些属性是通过一个string union来定义的。这个string union必须是(keyof 旧类型)的子集，可以是string或string union，也可以是keyof的返回值 (即映射全部属性)。

```ts
interface A {
    k1: string;
    k2: string;
    k3: number;
}

// 从A中取一部分属性, 类型 ([A[P]) 不变
// 结果: type A_var1 = { k1: string, k3: number }
type A_var1 = {
    [P in "k1" | "k3"]: A[P]
}

// 从A中取所有属性名, 类型改为number
// 结果: type A_var1 = { k1: number, k2: number, k3: number }
// 注意: keyof / Mapped type / 泛型一起使用时有一些特殊规则。建议读一下最后一部分 "DeepReadonly 是怎样展开的"
type A_var2 = {
    [P in keyof A]: number;
}

// 从A中取所有属性, 类型改为相应的Promise (TS 2.1 release note中的Deferred是这个的泛型版)
type A_var3 = {
    [P in keyof A]: Promise<A[P]>;
}
```

## 新特性的例子: Readonly

使用上面介绍的新特性可以定义出一些实质是"类型的decorator"的泛型，比如下面的Readonly (已经在TS2.1标准库中):

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface A {
    k1: string;
    k2: string;
    k3: number;
}

/**
 等价于
type A_ro = {
    readonly k1: string;
    readonly k2: string;
    readonly k3: number;
}
 */
type A_ro = Readonly<A>;
```

利用这些类型运算，我们可以表达出更复杂的编译期约束，十分适合 (需要和无限的类型一起工作的) 的代码或库。比如Release note里还提到的`Partial` / `Pick` / `Record` 等类型。

## Readonly的强化版: DeepReadonly

前面提到的`Readonly`只保证属性只读，不会把属性的属性也变成只读:

```ts
const v = { k1: 1, k2: { k21: 2 } };

const v_ro = v as Readonly<typeof v>;
v_ro.k1 = 2;     // 禁止
v_ro.k2.k21 = 3; // 可以
```

我们可以写一个DeepReadonly，实现递归的只读:

```ts
type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

function deepFreeze<T>(val: T) {
    return val as any as DeepReadonly<T>;
}

const v_deep_ro = v as any as DeepReadonly<typeof v>;
v_deep_ro.k1 = 2; // 禁止
v_deep_ro.k2.k21 = 3; // **也禁止**
```

## DeepReadonly 是怎样展开的

(这个话题是 @vilicvane 帮我审稿时提到的。我又翻了一下相关的issue后觉得满有意思.. 就一起加进来了。不读这个在大多数情况下应该不影响使用)

背景: 如果A是泛型的类型参数(比如`T<A>`)，则称形如 `{ [P in keyof A]: (类型) }` 的映射类型为A的同构 (isomorphic) 类型 (含有和A相同的属性名，即相同的"形状") 。在展开`T<A>`时有如下附加规则:

1. 基本类型(`string | number | boolean | undefined | null`)的同构类型强行定义为其本身，即跳过了对值类型的运算
2. union类型，如`type A = A1 | A2`，的同构类型 `T<A>` 展开为 `T<A1> | T<A2>`

所以上面的`DeepReadonly<typeof v>`的 (概念上) 展开过程是这样的 :

```ts
DeepReadonly<{ k1: number; k2: { k21: number } }>
```
↓
```ts
{
    readonly k1: number;
    readonly k2: DeepReadonly<{ k21: number }>;
}
```
↓ 
```ts
{
    readonly k1: number;
    readonly k2: {
        readonly k21: DeepReadonly<number>;
    }
}
```
↓ (规则1)
```ts
{
    readonly k1: number;
    readonly k2: {
        readonly k21: number;
    }
}
```
(规则1有时会导致一些奇怪的结果，不过大多数情况下我们不是想要基本类型的同构类型，到此停止展开可以接受)
