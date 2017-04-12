---
title: 怎样在ES6及以下版本实现 async / await
created_at: 2017-04-01
language: zh
---

本文介绍两种用ES6以下版本的JavaScript实现async语义的方法。

`async / await` 是ES2017中引入的新JavaScript语法。用这种语法可以写出看上去像普通同步代码，实际上非阻塞 (间断执行) 的代码。

async依赖于Promise，大致上是 (把`Promise的fulfill / reject` 映射到已有js语法) 的结果。
如果你还不熟悉Promise，建议先阅读相关教程。

如果你也使用TypeScript: 这篇文章其实介绍的就是把TypeScript编译到ES6 / ES5以下时，tsc编译器替我们做的事情。

## `async / await` 语法

我们可以声明一个函数为 `async`，如:

```js
async function a() {}
const b = async function() {}
const c = async () => {}
```

#### await

在 `async` 函数内，我们可以使用 `await` 关键字去 "等待" 一个可能是Promise的值:

```js
async function a(p1) {
    const b = await p1;
}
```

`await p` 这个表达式的行为是这样的:

- 如果p不是Promise: 返回p本身
- 如果p是Promise:
    - 在p fulfill之后，返回p内部的结果
    - 在p reject之后，抛出p内部的异常值

注意1: await表达式的 "返回" "抛出" 其实都是异步的。原因下面会讲。

注意2: await 只能在async函数本身那一"层"使用。如果一个async函数A内部有非async函数B，在B内部不能使用`await`:

```js
async function A() {
    function B() {
        // 这里不能使用await
    }
    // 这里可以用
}
```

#### async函数的返回值

调用async函数一定返回一个Promise，这个Promise反映了async函数内的执行结果:

```js
// 如果async 函数执行完毕，在内部返回a: 外部会得到一个相当于Promise.resolve(a)的Promise
async function foo1() {
    return 1;
}

foo1().then(v => console.log(v)); // 打印1

// ---------

// 接上一个例子: 如果a是Promise，外部得到的Promise会与a resolve到相同结果
// 这是Promise.resolve的标准行为，不过有点绕所以单独列出
async function foo2(shouldReject) {
    if (shouldReject) return Promise.reject(shouldReject)
    else return Promise.resolve(shouldReject);
}

foo2(false).then(v => console.log(v)); // 打印false
foo2(true).catch(v => console.log(v)); // 打印true

// ---------

// 如果async函数内有未捕获异常: 外部得到的Promise会reject那个异常
async function foo3() {
    throw 2;
}

foo3().catch(v => console.log(v)); // 打印2
```

## 为什么 `async/await` 比 `Promise#then` 更好

`async function` 和一般 js 有相同的 scope 和几乎相同的语法，真正做到了代码上的顺序执行，行为上的间断执行。

在没有async的时候，传给Promise的每一个函数有自己的作用域。往往要做一些额外的事才能在这些作用域间共享值。

```ts
function asyncOperation(n: number): Promise<number>;

function foo1(arg1: Promise<number>) {
    return arg1
        .then(/* bar1 */ n1 => asyncOperation(n1))
        .then(/* bar2 */ n2 => 100 / n2);
}
```

如果这时你想要在 `bar2` 那个函数中再使用n1的值怎么办呢？有几种做法：

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
    // foo2内没有嵌套的scope, 你仍然可以在这里使用n1
    const n2 = await asyncOperation(n1);
    return 100 / n2;
}
```

## 用Generator实现async

Generator (`function *()`) 是ES6中加入的一种可中断的控制流。

#### Generator



#### 用Generator实现await


## 用状态机实现async



- vczh:
-