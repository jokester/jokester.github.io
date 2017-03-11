---
title: 为什么 async 比 Promise.then 好
created_at: 2016-11-11
language: zh
---

"为什么Promise比callback好"，就不赘述了。主要讨论为什么 `async/await` 比 `Promise.then` 更好:

`async` 最好的一点是: 和一般 js 有相同的 scope 和几乎相同的语法，真正做到了代码上的顺序执行，行为上的间断执行。

在没有async的时候，传给Promise的每一个匿名函数有自己的作用域。往往要做一些额外的事才能在这些作用域间共享值。

```ts
function asyncOperation(n: number): Promise<number>;

function foo1(arg1: Promise<number>) {
    return arg1
        .then(/* bar1 */ n1 => asyncOperation(n1))
        .then(/* bar2 */ n2 => 100 / n2);
}
```

如果这时你改主意了，想要在 `bar2` 中再使用n1的值怎么办呢？有几种做法：

A. 在上层scope，即foo1中新开一个变量，在`bar1`中把n1存进去，在`bar2`中取:

```ts
function foo1(arg1: Promise<number>) {
    let n1_lifted;
    return arg1
        .then(/* bar1 */ n1 => { n1_lifted = n1; return asyncOperation(n1) })
        .then(/* bar2 */ n2 => 100 / n2);
}
```

B. 把bar2整个移到bar1内:

```ts
function foo1(arg1: Promise<number>) {
    return arg1
        .then(/* bar1 */ n1 => asyncOperation(n1)
                                .then(/* bar2 */ n2 => 100 / n2));
}

```

这几种做法的共同点是: 都很痛苦。

现在再看一下用async写的版本:

```ts
async function foo2(arg1: Promise<number>) {
    const n1 = await arg1;
    const n2 = await asyncOperation(n1);
    // foo2内没有嵌套的scope, 你仍然可以在这里使用n1
    return n2;
}
```
