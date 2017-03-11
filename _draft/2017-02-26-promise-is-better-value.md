---
title: Promise is better value
created_at: 2017-02-26
---

# Promise is more than a value

A Promise is a wrapped "result of computation".

It may `throw` a error, it may even never ends.

- It's more than a "return value"
- Instead, it's 
    - may be error
    - may never return

# always async

- Handlers are guaranteed to be called async

# It is timeless

Callback will , and will not be called 

    - NO interface to get value in sync way
    - instead of "pass after promise", just pass a promise

