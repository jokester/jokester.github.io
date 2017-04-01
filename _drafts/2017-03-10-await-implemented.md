---
title: How is await implemented with ECMAScript < 7
created_at: 2017-03-16
---

`async / await` is a new syntax in ES2017, that enables us to *wait* for a Promise, and *resume* after that Promise resolves.

This post introduces 2 ways to implement the syntax.

<!--
# What is `await`

- When `p` is a promise:
    - If `p` is fulfilled with `v`, `await p` returns `v`
    - If `p` is rejected with `e`, `await p` returns `e`
- When `p` is not a promise:
    - Acts as if it is a Promise that get fulfilled with `p`.
- The expression `await v` evalutes to ``
- An `async` function always returns another `Promise`.

-->

# `await` implemented with generator function (ES6)

## Generator: re-entryable control flow


# `await` implemented with a state machine (pre-ES6)

Trahs