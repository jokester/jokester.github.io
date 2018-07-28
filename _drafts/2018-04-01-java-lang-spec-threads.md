### 为什么

[Java Lang Spec](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html)

### Chapter 17. Threads and Locks

> The behavior of threads, particularly when not correctly synchronized, can be confusing and counterintuitive. This chapter describes the semantics of multithreaded programs; it includes rules for which values may be seen by a read of shared memory that is updated by multiple threads. As the specification is similar to the memory models for different hardware architectures, these semantics are known as the Java programming language memory model. When no confusion can arise, we will simply refer to these rules as "the memory model".
>
> These semantics do not prescribe how a multithreaded program should be executed. Rather, they describe the behaviors that multithreaded programs are allowed to exhibit. Any execution strategy that generates only allowed behaviors is an acceptable execution strategy.

本章描述多线程程序的语义，如（读取被多个线程写入过的共享内存时可能得到什么值）的规则。因为这些规定和各 **硬件架构** 的内存模型相类，其语义也被称为 **Java语言** 内存模型。下文在无歧义时将简称“内存模型”。

这些语义不指导一个多线程程序应该如何 **被执行**。它们仅描述多线程程序可以（**被允许**，不是可能）展现的行为。如果一个执行策略产生的都是被允许的行为，即是可以接受的(换句话说: 不约束JVM的实现，仅约束JVM的执行结果)。

#### 17.1. Synchronization

- JVM提供多种线程间通信的手段, 其中最简单的一种是同步(synchronization). 同步是用monitor实现的.
    - 每个Java对象带有一个monitor
    - 线程可以对monitor上锁 (lock) 和解锁 (unlock)
    - 同一时间只有一个线程可以对特定monitor上锁. 其他试图对同一monitor上锁的线程会被阻塞, 直到能够上锁.
    - 线程t可以对同一个monitor上多次锁, 每次解锁释放一次锁.

- `synchronized` 语句

- `synchronized` 方法

- Java语言不需要阻止或检测死锁. 程序应自负责任, 可以创建一些高级锁元语 (high-level locking primitive) 来避免死锁.

- volatile变量读写, 以及 `java.util.concurrent` 包中的类也可实现同步.

#### 17.2 Wait Sets and Notification

等待集和通知

#### 17.3. Sleep and Yield

睡和交出

- `Thread.sleep` 暂停现在的线程一段指定时间 (取决于系统定时器精度准度和调度器) 时间. 当前线程不失去任何 monitor. 恢复执行取决于调度, 以及空闲的处理器.
- `Thread.sleep` `Thread.yield` 均没有同步语义: 编译器不需要在执行sleep・yield前将寄存器的缓存冲到共享内存, 也不需要在执行后重载缓存在寄存器中的值.
    - 比如: 在代码 `while (!this.done) Thread.sleep(1000);` 中, 编译器 **可以** 只读一次`this.done`, 然后每次循环均使用缓存的值, 得到无限循环.

#### 17.4 内存模型


##### 17.4.1 Shared Variables