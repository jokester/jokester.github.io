---
title: Functional programming and you
---

Next week I am going to give a introductionary lecture on functional programming at workplace.
The lecture is mostly intended to interest people.
This is a draft I used when writing slides.

## Functional Programming and You

- Function
    - "function" (math)
        - mapping between sets
        - definition itself
            - e.g. `y = sin(x)`
        - side effect-free
    - in (most) programming, another name for "subroutine"
        - run some code
        - instructions to fit implementation
        - often have side effect
    - What if: code like math?
- What is functional programming?
    - code like function (math)
        - no side effect
    - compose code with high-order function
        - pass function as objects
        - flexible and coherent code
            - comparison: `class RecordComparator implements Comparator<T>` v.s. `{|r1, r2| r1.id - r2.id }`
- Write less, do more: decleartive instead of imperative
    - holy grail at work: write less, do more
    - work at a higher level
        - "level"s:
            - human knows `intention`: what we want
            - compiler knows `semantics`: what the code does
            - processor knows `instruction`: how does a machines do it
        - "high": mapping of values / input / output
        - "low": instruction / loop / memory / thread
            - godberg machine
        - declearaive
            - SQL
            - lisp programmer knows value
            - Comparison: `map` vs `for`
        - one step ahead of OOP
            - OOP is partially declearative: "tell, not do"
            - most of the time, implementaion of body have to be written
            - functional is going one step further
    - be declearative: code like a smart manager
        - result instead of steps
            - "let there be light"
            - instead of how to make a elect blob
        - let (crafted machine) figure out the rest
        - SQL: `SELECT * FROM users WHERE users. `
        - React: `ReactDOM.render(<div />, document.querySelector("#app-root"));`
    - more productive
        - by writing less
        - by reusing flexible code
            - one implementation of `map`: single-threaded
            - another implementation of `map`: parallel
        - easier reasoning for human
            - hard: fast sort in C
            - easy: fast sort in hs
        - easier static analysis for machine
            - "test is a bad substitute for proof"
    - Price: of computation cost
        - often tuned better, at price of human hour
        - which is increasing low (HW / env)
- Extra: 老子道徳経 / 第十一章
    - 埏埴以为器，当其无，有器之用也。/ 粘土から容器を作る。空いているゆえ、容器としての価値がある。
    - 凿户牖以为室，当其无，有室之用也。/ 窓と壁で部屋を作る。空いているゆえ、部屋としての価値がある。
    - 故有之以为利，无之以为用。/ 存在させること (埋めること) は利益を作るが、存在させないこと (あけること) は価値を作る。
