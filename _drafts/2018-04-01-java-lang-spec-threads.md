##

[Java Lang Spec](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html)

#### Chapter 17. Threads and Locks

> The behavior of threads, particularly when not correctly synchronized, can be confusing and counterintuitive. This chapter describes the semantics of multithreaded programs; it includes rules for which values may be seen by a read of shared memory that is updated by multiple threads. As the specification is similar to the memory models for different hardware architectures, these semantics are known as the Java programming language memory model. When no confusion can arise, we will simply refer to these rules as "the memory model".
>
> These semantics do not prescribe how a multithreaded program should be executed. Rather, they describe the behaviors that multithreaded programs are allowed to exhibit. Any execution strategy that generates only allowed behaviors is an acceptable execution strategy.

本章描述多线程程序的语义，如（读取被多个线程写入过的共享内存时可能得到什么值）的规则。因为这些规定和各 **硬件架构** 的内存模型相类，其语义也被称为 **Java语言** 内存模型。下文在无歧义时将简称“内存模型”。

这些语义不指导一个多线程程序应该如何 **被执行**。它们仅描述多线程程序可以（**被允许**，不是可能）展现的行为。如果一个执行策略产生的都是被允许的行为，即是可以接受的。

*（i.e. 这些语义不约束JVM的实现，仅约束JVM的执行结果)*

##### 17.1. Synchronization

JVM提供多种线程间通信的手段。其中最简单的一种是同步（synchronization）。

- 每个Java对象 (Object) 都带有一个

##### 参考阅读: Monitor

- monitor由互斥锁(mutex)和

