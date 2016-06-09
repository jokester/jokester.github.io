---
title: Ruby operator or
created_at: 2014-05-07
kind: article
---

- Difference of `||` and `or`

    In short, they have different priorities.
    The priority of `or` is even lower than `=`.

    Forgetting this can easily cause problems.

~~~ ruby
from = "some random string"
to = "AAA"

from[/random/] = to or "DEFAULT"
# actually means
(from[/random/] = to) or "DEFAULT"
# and never replace matched part with "DEFAULT"

# one should use
from[/random/] = to || "DEFAULT"
~~~

Reference: [this SO answer](http://stackoverflow.com/a/21060235/327815)
