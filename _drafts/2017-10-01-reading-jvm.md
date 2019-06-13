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
- each *read* MUST observe some *write* that is valid according to certain rules (i.e. memory model)


happens-before:

分布式中的基本关系.

- `volatile`
- [jls / 8.3.1.4. volatile Fields](https://docs.oracle.com/javase/specs/jls/se9/html/jls-8.html#jls-8.3.1.4)
    - Java Memory Model ensures that all threads see a **consistent** value for the variable
    - `consistent`
