---
title: 怎样在ES6及以下版本实现 async / await
created_at: 2017-04-01
language: zh
---

本文介绍两种用 ES6 以下版本的 JavaScript 实现 async 语义的方法。

`async / await` 是 ES2017 中引入的新 JavaScript 语法。用这种语法可以写出看上去像普通同步代码，实际上非阻塞 (间断执行) 的代码。

async 实质上是 (把 Promise 的`fulfill / reject` 映射到已有 js 语法的`return / throw`) 的结果，也依赖于 Promise。
如果你还不熟悉 Promise，建议先阅读相关教程。

如果你也使用 TypeScript: 这篇文章其实介绍的就是把 TypeScript 编译到 ES6 / ES5 以下时，tsc 编译器替我们做的事情。

## `async / await`

本节介绍 async / await 的语法和行为，然后吹一下 async 比 Promise 好在哪里。

#### async函数

我们可以声明一个函数为 `async`，如:

```js
async function a() {}
const b = async function() {}
const c = async () => {}
```

### await

在 `async` 函数内，我们可以使用 `await` 关键字去 "等待" 一个可能是 Promise 的值:

```js
async function a(p1) {
    const b = await p1;
}
```

对`await p` 这个表达式求值的行为是这样的:

- 如果 p 不是 Promise: 返回 p 本身
- 如果 p 是 Promise:
    - 在 p fulfill 之后，返回 p 内部的结果
    - 在 p reject 之后，抛出 p 内部的异常值
    - (如果 p 一直不 resolve，就不继续执行)

注意 1: await 表达式的 "返回" "抛出" 其实都是异步的。原因下面会讲。

注意 2: await 只能在 async 函数本身那一"层"使用。如果一个 async 函数 A 内部有非 async 函数 B，在 B 内部不能使用`await`:

```js
async function A() {
    function B() {
        // 这里不能使用await
    }
    // 这里可以用
}
```

### async函数的返回值

调用 async 函数一定返回一个反映了 async 函数内的执行结果的 Promise。具体来说，有以下几种情况:

```js
// 如果async 函数执行完毕，在内部返回a: 外部会得到一个相当于Promise.resolve(a)的Promise
async function foo1() {
    return 1;
}

foo1().then(v => console.log(v)); // 打印1
```

```js
// 接上一个例子: 如果a是Promise，外部得到的Promise会与a resolve到相同结果
// 这是Promise.resolve的标准行为。本条其实只是上一条的特例。不过有点绕，所以还是单独列出
async function foo2(shouldReject) {
    if (shouldReject) return Promise.reject(shouldReject)
    else return Promise.resolve(shouldReject);
}
foo2(false).then(v => console.log(v)); // 打印false
foo2(true).catch(v => console.log(v)); // 打印true
```

```js
// 如果async函数内有未捕获异常: 外部得到的Promise会reject那个异常
async function foo3() {
    throw 2;
}

foo3().catch(v => console.log(v)); // 打印2
```

### 为什么 `async/await` 比 `Promise#then` 更好

`async function` 和一般 js 有相同的 scope 和几乎相同的语法。我们可以写顺序执行的代码，而实现间断执行的行为。这大大减轻了读写代码的心智负担。

在没有 async 的时候，传给 Promise 的每一个函数有自己的作用域。往往要做一些额外的事才能在这些作用域间共享值。比如有下面一段用 Promise 实现的，间断执行的代码:

```ts
function asyncOperation(n: number): Promise<number>;

function foo1(arg1: Promise<number>) {
    return arg1
        .then(/* bar1 */ n1 => asyncOperation(n1))
        .then(/* bar2 */ n2 => 100 / n2);
}
```

如果这时我们需要在 `bar2` 那个函数中再使用 n1 的值怎么办呢？有几种做法：

A. 在上层 scope，即 foo1 中新开一个变量，在`bar1`中把 n1 存进去，在`bar2`中取:

```ts
function foo1(arg1: Promise<number>) {
    let n1_lifted;
    return arg1
           .then(/* bar1 */ n1 => { n1_lifted = n1; return asyncOperation(n1) })
           .then(/* bar2 */ n2 => 100 / n2);
}
```

B. 把 bar2 整个移到 bar1 内:

```ts
function foo1(arg1: Promise<number>) {
    return arg1
           .then(/* bar1 */ n1 => asyncOperation(n1)
                                  .then(/* bar2 */ n2 => 100 / n2));
}
```

这几种做法的共同点是长，以及痛苦。

现在再看一下用 async 写的版本:

```ts
async function foo2(arg1: Promise<number>) {
    const n1 = await arg1;
    // foo2内没有嵌套的scope, 我们仍然可以在这里使用n1
    const n2 = await asyncOperation(n1);
    return 100 / n2;
}
```

## 用Generator实现async

本节将简要介绍生成器，并用生成器实现 async / await。

#### Generator / 生成器

生成器 (Generator) 是 ES6 新增的一种可以不连续执行的控制流。我们可以用`function *`语法来定义一个 "生成器函数" (Generator function)，即 "创建生成器的函数"。

```js
function* gen(a) {
    yield a;     // yield 1
    yield a + 2; // yield 2
    yield a + 5; // yield 3
}
```

每次调用 `gen` 会返回一个新的生成器对象。我们可以用生成器对象的 `.next() / .throw()` 方法间断地获取从生成器函数中 `yield` 出来的值，直到生成器函数内的语句执行完毕。

```js
const seq1 = gen(5);
console.log(seq1.next()); // next 1
// => { value: 5, done: false }
console.log(seq1.next()); // next 2
// => { value: 7, done: false }
console.log(seq1.next()); // next 3
// => { value: 10, done: false }
console.log(seq1.next()); // next 4
// => { value: undefined, done: true }
```

`seq1` 是一个普通的 JS 对象，我们不一定要像上面这样连续地执行 `.next()`，
也可以在很久以后 (时间上的间隔)，在另一个函数中执行 (空间上的间隔)。
每次调用`.next()`后，生成器函数内部的执行进度，以及局部变量都不会消失。

生成器函数是 "懒" 的。每次调用 `next / throw` 会前进到下次的 yield。如果一次也不调用，就完全不前进。

#### 向生成器函数内注入值或异常

`next` / `throw` 方法同时会向生成器函数内注入值，这个值会被 `yield` 返回或抛出。

可能大家已经注意到了，`yield`的返回值。下面我们将把 `async` 函数改写成生成器函数，并用`yield` 和 `next / throw` 实现 `await` 的行为。

#### 用Generator实现await


## 用状态机实现async
