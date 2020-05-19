---
title: Type for non-null and non-undefined in TypeScript
publishAt: 2017-03-15
---

TypeScript's type computation does support `complement of type`, so we cannot simply define a type for `not-null`.

This is a workaround to create a type for `non-null and non-undefined`:

(in short, we compute the wanted complement type by hand)

- Use TypeScript 2.2 which introduced [`object`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type) type.
- Set `"strictNullChecks": true` in `tsconfig.json` to separate `null` / `undefined` and other types.

We can then express the complement set of type `null | undefined` with `number | string | boolean | symbol | object`.
