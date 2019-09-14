---
title: reading jsr133
language: zh
---

Java Language Spec

## Chapter 17: Threads and Locks

### Preface

- memory model defines behaviors that are allowed
    - JVMs are free to optimize (as long as they only generates allowed behavior)

### 17.1 Synchronization

- 'most basic' synchronization mechism
- implemented with `monitor`
- monitor:
    - exists in each Java object
    - reentrant
    - only belongs to 1 thread at any time
- `synchronized`
    - try to lock on the monitor before run
    - automatically unlocks when (return OR throw)
    - no non-blocking try or timeout

- JVM is NOT obliged to detect OR prevent deadlock

### 17.2 Wait Sets and Notification

- Wait Set: a set of threads that are waiting "on" the monitor of one object
- only affacted by `Object.wait()` / `Object#notify` / `Object#notifyAll`

#### 17.2.1 `Object#wait`

if
- caller thread (currentThread) MUST have locked the monitor
- currentThread MUST NOT be interrupted

then

- unlock the monitor
- add currentThread to wait set
- block currentThread until it gets removed from wait set
    - removal may happen if:
        - currentThread gets interrupted
        - `notify()` called
        - `notifyAll()` called
        - timed wait && timeout
- lock the monitor again
- (if block ended due to interruption) `wait() throws InterruptedException

#### 17.2.2 `Object#notify()` / `Object#notifyAll()`

- currentThread must have locked the monitor
- remove 1 or all threads from wait set
    - in case of notifyAll, *ONLY 1* thread would be able to lock again
- NOTE: this DOES NOT unlock the monitor (so NO thread removed from Wait Set can succeed until currentThread unlocks)

#### 17.2.3 Interruptions

#### 17.2.4 Interactions of waits / notifation / interruption

### 17.3 Sleep and Yield

`Thread.sleep()` / `Thread.yield()`

- sleep DOES NOT lose ownership of monitors
- NEITHER Thread.sleep NOR have synchronization semantics

### 17.4 Memory Model

"possible behaviors of a program"

- whether an execution trace (instructions?) is a legal execution of the program (code?)
- "legal" := each *read* MUST observe some *write* that is valid according to certain rules

- intra-thread semantics
    - semantics for single-threaded programs

#### 17.4.1 Shared Variables

- "shared variable": instance fields / static fields / array elements
    - in contrast to single-threaded : local variables / method params / execution handler params
- "conflicting": two accesses to the same variable if at least 1 of them is write

#### 17.4.2 Actions

**inter-thread action** or simply "action": an action that can be detected or directly-influenced by another thread

intra-thread actions do not concern us: all threads need to obey intra-thread semantics

possible (inter-thread) actions:

- non-volatile read
- non-volatile write
- **synchronized actions**
    - volatile read
    - volatile write
    - lock of monitor
    - unlock of monitor
    - first and last action of a thread
    - actions that start a thread, or detect termination of a thread
- "external" action
    - an action that may be observable outside of an execution (`side effect` ?), and have a result based on an environment external to the execution (`RealWorld` ?)
- thread divergence action, or "dead loop"

#### 17.4.3 Programs and Program Order

(*program order* of thread *t*): a total order that obeys intra-thread semantics of *t*

a set of actions is *sequentially consistent* if

- the actions occur in a total order *"execution order* that is consistent with program order
- AND each read r of variable v sees (last write to v in execution order)

"sequential consistency" as a language model prohibits many compiler optimizations

#### 17.4.4 Synchronization order

a synchronization order is a total order over all the *synchronization actions* of an execution.

For each thread t, the **synchronization order** of synchronization actions in t is consistent with the **program order** of t.

Synchronization actions induce **synchronized-with** relation relation of actions:

- unlock *synchronized-with* all subsequent lock
- a volatile write *synchronized-with* all subsequent volatile read
- starting a thread *synchronized-with* first action in that thread
- final action of a thread T *synchronized-with* actions of thread T2, if T2 dectes T has terminatedd
- interruption of thread blah blah
- write of default value *synchronized-with* first action in every thread
     - "conceptually every object is created at start of program"

#### 17.4.5 Happens-before order

2 actions can be ordered by a **happens-before** relationship

If x happens before y, then: x is visible to y AND is ordered before y

x happens before y if:

- x and y are actions of the same thread, and x comes before y in program order
- OR: x is (end of constructor) and y is (start of finalizer)
- OR: x synchronized-with y
- OR: x happens-before some z, and z happens-before y (i.e. happens-before is a transitive relation)

NOTE: happens-before does not require certain order in execution (implementation may reorder as long as all observations obeys *happens-before*)

happens-before relation defines **data races**: if 2 **conflicting accesses** are not ordered by a **happens-before** relationship, the program is said to contain a **data race**.

a program is **correctly synchronized** IFF all sequentially consistent executions are free of data races.

if a program is **correctly synchronized**, then **all** executions of the program will appear to be sequentially consistent

read r of varable v is allowed to observe a write w if

**happens-before consistency**:


