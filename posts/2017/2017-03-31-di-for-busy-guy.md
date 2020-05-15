---
title: Depencendy Injection for busy guy
created_at: 2017-03-31
language: zh
---

依赖: 如果A类中需要使用B类的实例 则称A依赖B, B是A的依赖

不注入: 在A中 `new B()`，实质上是硬编码了B这个全局变量。

注入: 在A中不创建B, 而是从外界获取

好处1: A和 (获取B的方法) 的解耦。注入B1 B2就可获得 `(A+B1)` `(A+B2)`

好处2: 可测试性。要测试A时只需传入B的stub。
