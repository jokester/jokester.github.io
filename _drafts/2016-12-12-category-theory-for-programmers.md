---
title: Memo for "Category Theory for Programmers" series
created_at: 2016-12-12
---

This post serves as a memo of [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/) series for myself.

As a programmer without much math background, I cannot overstate my gratitude to the author of this series: Bartosz Milewski.

## Part 1

### 1. Category: The Essence of Composition

Definition of category: "objects" and "arrows aka *morphisms*".

The morphisms must have 2 characticics in order to form a category:
- transitive: if `A -> B` and `B -> C` exists, `A -> C` must exist.
- reflexive: for any object x, `X -> X`, or *identity morphism* must exist.

`0` in addition --- `id` in morphism.

Composition is ubiqutious in programming. It helps by limiting the concept we have to deal simultaneously.

### 2. Types and Functions


