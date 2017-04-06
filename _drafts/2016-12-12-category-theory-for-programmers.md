---
title: Memo for "Category Theory for Programmers" series
created_at: 2016-12-12
---

This post serves as a memo of [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/) series for myself.

As a programmer without much math / algebra background, I cannot overstate my gratitude to the author of this series: Bartosz Milewski.

## Part 1

### 1. Category: The Essence of Composition

Definition of category: "objects" and "arrows aka *morphisms*".

The morphisms must have 2 characticics in order to form a category:
- transitive: if `A -> B` and `B -> C` exists, `A -> C` must exist.
- reflexive: for any object x, `X -> X`, or *identity morphism* must exist.

`0` in addition --- `id` in morphism.

Composition is ubiqutious in programming. It helps by limiting the concept we have to deal simultaneously.

### 2. Types and Functions

Types helps us to find incorrect code at early stage (*fail fast*).

> Testing is almost always a probabilistic rather than a deterministic process.
> Testing is a poor substitute for proof.

Types can be considered *sets of values*, while morphisms / arrows being functions.

`Hask`: the category of Haskell types and functions, that is like `Set: category of sets` but contains `_|_` (bottom, or `undefined :: a`) for computation that never ends.

Special types:

- `Void` the type that have no values
- `()` the type that have 1 value, `()`

Challange 6.

```text
() -> () : 1　arrows
    _ -> ()

Bool -> Bool: 4 arrows
    _ -> True
    _ -> False
    _ -> _
    _ -> !_

Void -> Void: 1 arrows (I'm not pretty confident, but it cannot be more than 1 so)
```

### 3. Categories Great and Small

