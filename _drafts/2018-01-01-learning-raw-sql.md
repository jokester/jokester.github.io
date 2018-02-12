Memo when I learn about raw SQL statements, and other DB topics.

### Cross join

Cartesian product.

```sql
SELECT *
FROM employee CROSS JOIN department;
```

### Inner join

```sql
SELECT ...
FROM a INNER JOIN b
ON a.a1 = b.b1;
```

```typescript
crossJoin().filter(([a1, ..., b1, ...]) => (a1 === b1));
```
