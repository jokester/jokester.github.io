---
title: 分享你的 TypeScript 类型声明
created_at: 2017-04-14
lang: zh
---

最近给自己用的几个js库补上了TypeScript的类型声明，简单写几行。

## 背景1: 什么是类型声明

在TypeScript中使用JavaScript代码时，需要有那个模块的类型声明。如果 `require / import`的模块没有类型声明，一般就会直接编译错误。

## 背景2: 怎样写类型声明

可参考 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## 怎样发布 / 从哪找到类型声明

类型声明一般有这两种发布方式:

1. 合并到本体npm包

对于TS开发者来说，这是最方便的方式: 只要安装一个npm包就能直接使用相应版本的类型声明。TypeScript Handbook也推荐这种方式为首选。我们要分享时也不妨先试试朝本体的repo发PR，下面的 `合并到本体时的PR` 一节会介绍PR常有的内容。

感觉近年这种方式有增加的倾向，我自己常用的库中 `redux` / `Immutable.js` / `preact` 都已经自带了。

2. 发到 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/)。这里的类型声明会自动被发布在npm的 `@types/` 包，如 `@types/react`。

## 分享的好处

- 回馈给社区给更多人用，可能更快发现问题甚至有人帮着改，这会降低将来的维护成本
- 和开发者混个脸熟，问问题和求feature时比较好意思 (doge)
- 加声望和功德值

## 合并到本体时的PR

- 类型声明文件本身
- 在`package.json`里加上类型声明的路径，如 `"types": "src/index.d.ts"`
- 有类型声明才能通过编译的 `TypeScript`代码 (这个测试不一定需要实际执行，如[ts-decl-test.ts](https://github.com/jokester/node-libtidy/blob/5806f74ed1d801b3ee6c860b7d05c6dd37c24376/test/ts-decl-test.ts#L32)
- Readme / contributors 等
- 如果将来你也要继续用这份类型声明，不妨表明 "需要改bug/更新时可以找我"。相信维护者会更愿意接受这样的PR
- 如果你用代码生成类型声明: 生成用的代码，使用说明，以及生成时需要的包
