---
title: Promise is better value
created_at: 2017-02-26
---

# Promise is more than a value

A Promise is a wrapped "async result of computation".

It may `throw` a error or never ends.

# always async

- Handlers (`then / catch`) are guaranteed to be called async
    - As of Promise/A+ spec, there is no interface to examine result in a sync way (exists in libraries like Bluebird though)
- Order of execution are expressed via dependicies, just as in plain sync code
