---
title: Note for SICP Chapter 1
created_at: 2014-05-16
kind: article
---

* toc
{:toc}

#### Building Abstractions with Procedures

##### The Elements of Programming

###### Expressions

- primitive expression
    - number: `486`
    - primitive operators (are also procedures): `< = > and or not`

- compound expression
    - application of some **procedure** to some **arguments**: `(+ 1 2)`

###### Naming and the Environment

- naming: assign name to something ("object")
    - value: `(define foo 1)`
    - procedure: `(define (bar arg1) (+ 1 2))`

- environment: memory of name-object pairs
    - a computation may involve multiple environments

###### Evaluating Combinations

- steps of "applicative order"

    - evaluate every subexpressions
    - apply the leftmost subexpression ("operator") to the values of the other subexpressions ("operands")

###### Compound Procedures

- general form of procedure definition:

      (define (<name> <formal parameters>)
          <body>)

    The `<body>' part may contain multiple expressions. The value of the final expression becomes the value of the procedure application.

###### The Substitution Model for Procedure Application

- evaluate the body of procedure with the formal parameters replaced by the corresponding arguments

- is presented to help think about the process of application, and **is not** how interpreter works

- order of execution
    - normal order: "fully expand and then reduce"
    - applicative order: "evaluate the arguments and then apply"
    - lisp uses applicative order evaluation.

###### Conditional Expressions and Predicates
- if

    `if` is a special form and not a procedure.
    It only evalutes the predicate and **one of** the consequent / alternative expression.

      (if (> 1 0) #t #f)

- cond

    `cond` is a special form and not a procedure.
    It only evalutes the predicates till the correct branch, and that corresponding branch.

      (cond
          ((= a 1) 1)
          ((= a 2) 3))

###### Example: Square Roots by Newton’s Method

- code

      (define (newton-sqrt aim)
        (define (guess-till-good-enough current next-guess good-enough?)
          (if (good-enough? current)
            current
            (guess-till-good-enough (next-guess current) next-guess good-enough?)))
        (define (small-enough? delta) (< delta 1e-5))
        (define (close-enough? current) (small-enough? (abs (- (* current current) aim))))
        (define (better-approximation-of-sqrt current) (/ (+ current (/ aim current)) 2)) ;; << the ``Newton'' part
        (define initial-guess 1.1)
        (guess-till-good-enough initial-guess better-approximation-of-sqrt close-enough?))

      (display (newton-sqrt 2.0))
      ; => 1.4142

###### Procedures as Black-Box Abstractions

- The definition suppresses the details.

- The user of a procedure does not need to know the internal.

- Local names
    - The formal parameters are **local** to the body. AKA "bound variable" or "captured variable"
    - e.g. `(define (square x) (* x x))` contains a bound variable `x` and a free variable `*`.
    - The name of formal parameters can be arbitrary.

- Internal definitions (refer to previous `newton-sqrt` procedure)
    - One can localize subprocedures with nested `define`.
    - The free variable in inner procedure get its value from the bound variable of outer procedure, AKA **lexical scoping**.
    - Example of lexical scoping: `aim` in `(define (close-enough? current <body>)`.

##### Procedures and the Processes They Generate

###### Linear Recursion and Iteration

- Recursive computation of factorial

      (define (factorial n)
        (if (= n 0)
          1
          (* n (factorial (- n 1)))))

- Iterative computation of factorial

      (define (factorial n)
        (define (factorial-iter cumulative-product current max)
          (if (> max current)
            cumulative-product
            (factorial-iter (* cumulative-product current) (+ current 1) max)))
        (factorial-iter 1 1 n))

- The preceding 2 procedures produce different **shape of computation**.

###### Tree Recursion

- Example: recursive definition of `(fib n)`

- Example: counting change

      (define (change coins rest)
        (cond
          ((< rest 0) 0)
          ((= rest 0) 1)
          ((= (length coins) 0) 0)
          (else (+
            (change coins (- rest (car coins)))
            (change (cdr coins) rest)))))
      (display (change (list 50 25 10 5 1) 100))
      ; => 292

###### Order of Growth

- refer to **shape of computation**

###### Exponentiation

- implement `(power base exp)` with linear recursion

- implement `(power base exp)` with log recursion
- exercise 1.19: implement `(fib n)` with log recursion
        (let ((a 1)) (+ a 2))

###### Greatest Common Divisors

- Euclid’s Algorithm

###### Example: Testing for Primality

- code

      (define (prime? n)
        (define (find-first-divisor current)
          (cond
            ((= (remainder n current) 0) current)
            ((> (* current current) n)   #f)
            (else (find-first-divisor (+ 1 current)))))
        (define first-divisor (find-first-divisor 2))
        (if (and first-divisor (not (= n first-divisor)))
          #f
          #t))

##### Formulating Abstractions with Higher-Order Procedures

###### Procedures as Arguments

- `map`
- `sum`, `integral`

###### Constructing Procedures Using Lambda

- One can create (anonymous) procedures with the special form `lambda`

    - usage

          (lambda (formal-parameters) <body>)

    - example

          (map (lambda (x) (* x x)) '(1 2 3))

- One can use `lambda` to bind local variables, but the special form `let` makes it more convenient.

    - usage

          (let ((<name> <expression>)+) <body>)

    - "is but syntactic sugar of underlying lambda expression"

    - The name-expression pairs in `let` are parallel. One expression cannot refer to another name.

###### Procedures as General Methods

- Example: finding zero-point with the half-interval method

- Example: finding fixed-point

###### Procedures as Returned Values

- rights of **first-class** elements
    - can be assigned a name
    - can be passed as argument
    - can be returned by procedure
    - can be included in data structures
