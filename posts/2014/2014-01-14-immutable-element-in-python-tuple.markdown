---
title: Immutable element in Python tuple
publishAt: 2014-01-14
---

#### What

I found a surprising fact today in [this SO post](http://stackoverflow.com/q/21105207/327815):
`tuple` in Python turns out to be able to contain mutable objects (I was expecting that they cannot).

Such tuples are not hashable, because being hashable requires being recursively hashable and immutable.
Therefore they *cannot* be used as key of `dict`.

~~~ python
In [34]: a_tuple=({},)              # No problem

In [35]: a_tuple
Out[35]: ({},)

In [36]: a_dict={ a_tuple: True }   # TypeError: unhashable type: 'dict'
~~~

#### Why
The same question was inquired in [this post](http://stackoverflow.com/questions/9755990/).

TL;DR of [the direct answer]():
such tuples maintains to be immutable because what it contains is *reference*,
and reference to a particular object is not mutable.

So, immutability here means the tuple's shallow self won't be changing.

Long answer from [python doc](http://docs.python.org/3.3/reference/datamodel.html#the-standard-type-hierarchy):

>   Immutable sequences (Strings, Tuples, Bytes)
>
>     An object of an immutable sequence type cannot change once it is created. (If the object contains references to other objects, these other objects may be mutable and may be changed; however, the collection of objects directly referenced by an immutable object cannot change.)
>
>   Mutable sequences (Strings, Tuples, Bytes)
>
>     Mutable sequences can be changed after they are created. The subscription and slicing notations can be used as the target of assignment and del (delete) statements.

#### More
[Immutability in C# Part One: Kinds of Immutability](http://blogs.msdn.com/b/ericlippert/archive/2007/11/13/immutability-in-c-part-one-kinds-of-immutability.aspx) introduces more kinds of `mutability`.
