### 为什么

[Java Lang Spec](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html)

### Chapter 17. Threads and Locks

> The behavior of threads, particularly when not correctly synchronized, can be confusing and counterintuitive. This chapter describes the semantics of multithreaded programs; it includes rules for which values may be seen by a read of shared memory that is updated by multiple threads. As the specification is similar to the memory models for different hardware architectures, these semantics are known as the Java programming language memory model. When no confusion can arise, we will simply refer to these rules as "the memory model".
>
> These semantics do not prescribe how a multithreaded program should be executed. Rather, they describe the behaviors that multithreaded programs are allowed to exhibit. Any execution strategy that generates only allowed behaviors is an acceptable execution strategy.

本章描述多线程程序的语义，如（读取被多个线程写入过的共享内存时可能得到什么值）的规则。因为这些规定和各 **硬件架构** 的内存模型相类，其语义也被称为 **Java 语言** 内存模型。下文在无歧义时将简称“内存模型”。

这些语义不指导一个多线程程序应该如何 **被执行**。它们仅描述多线程程序可以（**被允许**，不是可能）展现的行为。如果一个执行策略产生的都是被允许的行为，即是可以接受的(换句话说: 不约束 JVM 的实现，仅约束 JVM 的执行结果)。

#### 17.1. Synchronization

- JVM 提供多种线程间通信的手段, 其中最简单的一种是同步(synchronization). 同步是用 monitor 实现的.
    - 每个 Java 对象带有一个 monitor
    - 线程可以对 monitor 上锁 (lock) 和解锁 (unlock)
    - 同一时间只有一个线程可以对特定 monitor 上锁. 其他试图对同一 monitor 上锁的线程会被阻塞, 直到能够上锁.
    - 线程 t 可以对同一个 monitor 上多次锁, 每次解锁释放一次锁.

- `synchronized` 语句

- `synchronized` 方法

- Java 语言不需要阻止或检测死锁. 程序应自负责任, 可以创建一些高级锁元语 (high-level locking primitive) 来避免死锁.

- volatile 变量读写, 以及 `java.util.concurrent` 包中的类也可实现同步.

#### 17.2 Wait Sets and Notification

等待集和通知

#### 17.3. Sleep and Yield

睡和交出

- `Thread.sleep` 暂停现在的线程一段指定时间 (取决于系统定时器精度准度和调度器) 时间. 当前线程不失去任何 monitor. 恢复执行取决于调度, 以及空闲的处理器.
- `Thread.sleep` `Thread.yield` 均没有同步语义: 编译器不需要在执行 sleep・yield 前将寄存器的缓存冲到共享内存, 也不需要在执行后重载缓存在寄存器中的值.
    - 比如: 在代码 `while (!this.done) Thread.sleep(1000);` 中, 编译器 **可以** 只读一次`this.done`, 然后每次循环均使用缓存的值, 得到无限循环.

#### 17.4 内存模型

给定一个程序（java 或 class）和其执行过程，内存模型描术执行过程(i.e. 内存模型规定 JVM 能否把一串代码这样执行)。内存模型检验执行过程中的每一次读，保证被那次读操作观测到的写操作是合规的。

内存模型描述了程序可能的行为。一个实现可以自由地产生任何代码，只要执行程序得到的结果能被内存模型预测。

(因此实现者可以非常自由地做代码变换，包括 action 重排序，以及去除不需要的同步)

内存模型决定了在程序的每一点，能读到什么值。每个线程的 action 必须符合线程的语义，除了每次读到的值由内存模型决定。我们称此为“线程内”语义。线程内语义是单线程程序的语义，能用（线程中读操作的结果）来完全预测此线程的行为。要判断线程 T 的操作是否合法，我们

每次线程 T 产生一个跨线程 ACTION，它必须和下一个 action a 符合。如果 a 是读，则线程 T 中使用的 A 的结果必须符合内存模型。

##### 17.4.1 Shared Variables

- shared memory OR heap memory
- 'variable':
    - instance fields
    - static fields
    - array elements
- 'conflicting':
    - 2 access to the same variable, where at least 1 of them is write

##### 17.4.2 action

- (inter-thread) action
    - read (normal, aka non-volatile)
    - write
    - synchronization action
        - volatile read
        - volatile write
        - lock
        - unlock
        - first and last action of thread
        - start of thread, and detection of termination of thread
    - external action
    - thread divergence

action: described by `thread, kind-of-action, variable-or-monitor, action-identifier`:w

##### 17.4.3 Programs and Program Order

- Program order
    - **a** total order (of actions) that obeys intra-thread semantics of T
- Sequentially consistent
    - if the **execution order** is consistent with **program order**, and each read of variable `v` sees the 'last' value written to v.

Strong guarantee:
    - execution order is a total order
    - each individual action is atomic and immediately visible

##### 17.4.4 Synchronization order

- Synchronization order: a total order of all **synchronization** actions that are consistent with the **program order**

- synchronized-with relation of actions `>`
    - unlock of m > lock of m
    - volatile write of v > read of v
    - starting a thread > first action in the thread
    - write of default value (0 / false / null) > first action in *every* thread
    - final action of thread > detection of termination of the thread (`Thread#isAlive()`, `Thread#join()`)
    - 'release' > 'acquire'

##### 17.4.5 happens-before order: a partial order over actions

- x, y :: Action, x, y : hb(x,y) reads 'x happens before y'
- happens-before defines where data race

hb(x, y) IF:

- x and y are in same threa, and x comes before y in program order
- end of construction of object > finializer of that object
- x > y
- transitive: hb(x, y) && hb(y, z) => hb(x, z)
