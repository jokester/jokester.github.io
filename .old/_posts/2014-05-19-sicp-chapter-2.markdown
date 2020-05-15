---
title: Note for SICP Chapter 2
created_at: 2014-05-19
kind: article
---

* toc
{:toc}

#### Building Abstractions with Data

##### Introduction to Data Abstraction

###### Example: Arithmetic Operations for Rational Numbers

- `cons` forges a pair. `car`, `cdr` takes value out of a pair.
    - example: `(car (cons a b)) ; =>a`, `(cdr (cons a b)) ; =>b`.

- list is but a special form of pair
    - `'()` or `nil` is a list
        - `nil` is not available in MIT-scheme.
    - The return value of `(cons something <a-list>)` is also a list
    - `(list a1 a2 ... an)` is short for `(cons a1 (cons a2 ... (cons an nil) ... ))`
    - In the other direction, a pair is an improper list

###### Abstraction Barriers

###### What Is Meant by Data?

- "the ability to manipulate procedures as objects automatically provides the ability to represent compound data."

###### Extended Exercise: Interval Arithmetic

##### Hierarchical Data and the Closure Property

###### Representing Sequences

- `(cons something a-list)` yields another list.

- `(append list1 list2)` returns concatenation of list1 and list2.

- dotted-tail notation: `(define (foo arg1 arg2 . rest ) <body>)`
    - arg1, arg2 capture the first 2 arguments, rest captures the rest.

###### Hierarchical Structures

- `(cons (list 1 2) (list 3 4))` denotes a tree.

- Exercise 2.27: a deep-reverse procedure

      (define (deep-reverse arg)
        (if (list? arg)
          (reverse (map deep-reverse a-list))
          arg))
      (deep-reverse '(1 (2 3) (4 (5 6)))) ; =>

- Exercise 2.28: flattening a tree (nested list) in left-right order

      (define (fringe arg)
        (if (list? arg)
          (apply append (map fringe arg))
          (list arg)))
      (display (fringe (list 1 (list 2) (list 3 4 (list 5)) 6)))
      ; => (1 2 3 4 5 6)

- Exercise 2.31: a tree-map procedure

      (define (map-tree proc arg)
        (if (list? arg)
          (map (lambda (x) (map-tree proc x)) arg)
          (proc arg)))
      (define (square x) (* x x))
      (display
        (map-tree
          square
          '(1 2 (3 4 (5)))) )
      ; => (1 4 (9 16 (25)))

###### Sequences as Conventional Interfaces

- "basic" operations on a bunch of things:
    - enumerate: transform something into a list

    - filter: select from a list

          (filter precidate a-list) ; =>list

    - map: transform the list via a proc

          (map proc a-list) ; =>list

    - accumulate: fold a list of things, a.k.a "fold-right"

          (define (accumulate op init a-list)
            (if (null? a-list)
              init
              (op (car a-list)
                  (accumulate op init (cdr a-list)))))
          ;
          ;       op
          ;      /  \
          ;    car   op
          ;         /  \
          ;       cadr ...
          ;               \
          ;                op
          ;               /  \
          ;            last  init  ; init is to the "RIGHT" of l

    - Use of the preceding "basic" operations encourage modular design
        - Because one have to fit to the known-to-be-common-enough interfaces

    - filter and map can be implemented using accumulate

    - Exercise 2.33: implement `map`, `append`, `my-length` with accumulate

          (define (my-map proc sequence)
            (accumulate
              (lambda (head acc) (cons (proc head) acc))
              '()
              sequence))
          (define (my-append seq1 seq2)
            (accumulate
              (lambda (head acc) (cons head acc))
              seq2
              seq1))
          (define (my-length sequence)
            (accumulate
              (lambda (head acc) (+ 1 acc))
              0
              sequence))

    - Exercise 2.36: implement `accumulate-n` with `accumulate`

          (define (accumulate-n op init seqs)
            (if (null? (car seqs))
                  '()
                  (cons (accumulate op init (map car seqs))
                        (accumulate-n op init (map cdr seqs)))))
          (accumulate-n
            +
            0
            '((1  2  3)
              (4  5  6)
              (7  8  9)
              (10 11 12))) ; => '(22 26 30)

    - Exercise 2.38: fold-left

          (define (my-fold-left op init sequence)
            (if (null? sequence)
              init
              (my-fold-left
                op
                (op init (car sequence))
                (cdr sequence))))
          ;                        op
          ;                       /  \
          ;                    ...   last
          ;                    /
          ;                  op
          ;                 /  \
          ;               op   cadr
          ;              /  \
          ; "LEFT": initial  car

        - a sufficient condition: when binary operator `op` satisfies `op(a,b) 三 op(b,a)`

    - Exercise 2.40: unique-pairs

    - Exercise 2.41: eight-queens puzzle

###### Example: A Picture Language

##### Symbolic Data

###### Quotation

- `'a` returns a symbol: `a`

- `'(a b)` evaluates to the list of symbol: `(a b)`

- Extra: `` `( ) `` quotes a list where only specific members are evaluated ("quasiquote"). `,` specifies the evaluated number in such a list.
    - Example: ``(let ((a 1)) `(a ,a))`` evals to `(a 1)`.

- `(eq? a b)` returns whether symbol a and b are the same.

###### Example: Symbolic Differentiation

###### Example: Representing Sets

- **Sets** are defined by operations on them, i.e. the interface of Set class.
    - `(adjoin-set elem set)`
    - `(element-of-set? elem set)`
    - `(intersection-set set1 set2)`
    - `(union-set set1 set2)`

- Underlying implementation can vary:
    - unordered lists
    - ordered lists
    - binary trees

###### Example: Huffman Encoding Trees

- prefix code: no complete code (a sequence of bits) is an prefix of another code
    - code automatically get segmented: we can immediately obtain a code when its last bit is received
    - no need to look forward, because it is the only legal way to decode the symbols

~~~ scheme
(define sorted-codes
  (fastsort
    (huffman-encode
                '((a 8) (b 3) (c 4)
                  (d 1) (e 1) (f 1)
                  (g 1) (h 1) (i 9)
                  ))
    (sort-by (lambda (x) (- (caddr x))))))
(map display-code sorted-codes)
; symbol = i      count = 9       code = (0 0)
; symbol = a      count = 8       code = (0 1)
; symbol = c      count = 4       code = (0 1 0)
; symbol = b      count = 3       code = (0 1 1)
; symbol = d      count = 1       code = (1 1 1 1)
; symbol = e      count = 1       code = (1 1 1 0)
; symbol = h      count = 1       code = (0 1 1 1)
; symbol = f      count = 1       code = (0 1 1 0 1)
; symbol = g      count = 1       code = (0 1 1 0 0)
~~~
