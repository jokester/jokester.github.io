---
title: 'TIL: Fast exp() for Monoids'
publishAt: 2017-03-30
slug: til-fast-exp-algorithm-for-monoids
---

Today I learned that the fast-exponentiation in [SICP 1.2.4](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4) can be applied to all monoids as well.

## Monoid

Definition: set `S` and operation `⊕ : S -> S -> S` forms a **Monoid** if they satisfy:

- **Associativity**: `(x ⊕ y) ⊕ z === x ⊕ (y ⊕ z)` for `x, y, z` in `S` .
- **Identity element**, or **Unit**: `I` such that `x ⊕ I === x === I ⊕ x` exists.

### Example of Monoid: Plus

We can see that the set of all real numbers, `R`, and `a ⊕ b := a + b` forms a Monoid, where `I = 0`.

### More examples of Monoid

- `R`, and `a ⊕ b := a * b` forms a Monoid, where `I = 1`.
- When N is an integer, Set of all integers `Z`, and `a ⊕ b := (a + b) mod N` forms a Monoid, where `I = 0`.

## "Multiplication" of Monoid

If we consider `⊕` to be a general form of `plus`, we can define a general form of `multiply`, denoted by operator `⊗`:

- Let k be `k` a non-negative integer
- `a ⊗ 0 := I` when `k == 0`
- `a ⊗ k := a ⊕ (a ⊗ (k-1))` when `k > 0`

This makes `a ⊗ k := a ⊕ a ⊕ a ⊕ a ⊕ a ⊕ a ⊕ a ⊕ a ⊕ a ...` where the right hand side is `k` `a`s concatencated by `⊕`.

- When `a ⊕ b` is `a + b`, `⊗` becomes `*`.
- When `a ⊕ b` is `a * b`, `⊗` becomes `**`.
- When `a ⊕ b` is `(a + b) % N`, `a ⊗ b` becomes `(a * b) % N`.

## `a ⊗ k` can be computed in `O(ln2 k)`

Let binary representation of `k` be `B(m) B(m-1) ... B(0)` where B0 is the LSB. We can rewrite `a ⊗ k` to be:

`a ⊗ k := (a ⊗ (2**B(m))) ⊕ (a ⊗ (2**B(m-1))) ⊕ ... ⊕ (a ⊗ (2**B(0)))`

If `⊕` has `O(1)`, `a ⊗ k` can be computing in `O(ln2 k)`. The key idea is to reuse `a ⊗ (2**B(m-1))` when computing `a ⊗ (2**B(m))`, with dynamic-programming.

Computing `*` in this way is not quite fruitful: we know that processor can compute `a * b` in `O(1)`.

However things are different in the case of `a * b` and `(a + b) % N`. Applying our fast-`⊗` method to them can save both time and space.

## Code

```ts
function fastMul<T>(id: T, mplus: (op1: T, op2: T) => T, a: T, k: number): T {
  if (~~k !== k || k < 0) throw new Error('exp must be positive integer');

  let ans = id;

  while (k > 0) {
    if (k % 2 == 1) {
      ans = mplus(ans, a);
      k--;
    } else {
      a = mplus(a, a);
      k /= 2;
    }
  }

  return ans;
}

// 2**5
console.log(fastMul(1, (a, b) => a * b, 2, 5));

// (887 * 885) % 12
console.log(fastMul(0, (a, b) => ((a % 12) + (b % 12)) % 12, 887, 885));
```
