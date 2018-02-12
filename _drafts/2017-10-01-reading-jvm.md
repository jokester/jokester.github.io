---
title: reading jsr133
language: zh
---

memory model:

- 一个java程序可以有多种执行顺序。其中有一些执行顺序是正确的 (符合内存模型的)
- 只要满足此模型，一个java实现 (如jvm) 可以自由地reorder / 去除不需要的synchronization
    - 即: 和物理cpu一样, JVM级也有指令重排序

happens-before:

分布式中的基本关系.

- `volatile`
- [jls / 8.3.1.4. volatile Fields](https://docs.oracle.com/javase/specs/jls/se9/html/jls-8.html#jls-8.3.1.4)
    - Java Memory Model ensures that all threads see a **consistent** value for the variable
    - `consistent`
