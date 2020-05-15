---
title: Note for SICP Chapter 3
created_at: 2014-06-14
kind: article
---

* toc
{:toc}

#### Modularity, Objects and State

> "modular": naturally breaks into coherent parts that can be separately developed and maintained.

- design strategy: modeling physical objects with computational objects.

- organizational strategies: **objects view** and **streams view**

##### Assignment and Local State

Objects can hold states that are determined by its history.

`set!`

###### The Benefits of Introducing Assignment

- Objects like pseudo random generators have to hold states within them.

###### The Costs of Introducing Assignment

- Substitution model no longer applies, because we have to somehow distinguish "name before `set!`" and "name after `set!`".
- Same call can return different values.
- Referentially transparency is violated by `set!`
- One have to care about order of execution.

- Even ``sameness`` itself is ambiguous:
    - Sameness at the same time is clear: A and B are different if changing A does not affect B.
    - Change over time is harder to define: are A(time1) and A(time2) both As?
    - This complication is a consequence of our perception of "object", and not of a programming language.

##### The Environment Model of Evaluation

- A variable is no longer a "name" of value.
- It is merely a name of "place" where value can be stored.

- Environments are structures that maintain such places.
    - sequence of frames
    - frame: a table of bindings
    - binding: name-value mapping

- Evaluating an expression requires some frame as context
    - even `(+ 1 1)` requires the definition of `+` as a procedure of *sum*

###### The Rules for Evaluation

- Specification of Evaluation Process
    - Evaluate every subexpressions
    - Apply the operator subexpression to values of operand subexpressions

- Procedure: definition
    - a `code, pointer-to-env` pair
    - only way to create: by evaluating `(lambda (bar) ...)`
        - the `(define (foo bar) ...)` form is but syntactic sugar
        - the `code` are from the `...` part
        - the `pointer-to-env` points to the enviorment where `lambda` is evaluted

- Procedure: application
