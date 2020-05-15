---
title: Type for non-null and non-undefined in TypeScript
created_at: 2017-03-15
---

TypeScript's type computation does support `complement of type`, so we cannot simply define a type for `not-null`.

This is a workaround to create a type for `non-null and non-undefined`:

(in short, we compute the wanted complement set by hand)

- Use TypeScript 2.2 which introduced [`object`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type) type.
- Set `"strictNullChecks": true` in `tsconfig.json` to separate `null` / `undefined` and other types.

The complement set of type `null | undefined` can then be expressed as `number | string | boolean | symbol | object`.