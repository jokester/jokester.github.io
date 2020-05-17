Memo when I learn about raw SQL statements, and other DB topics.

### Resources

- wikibook: sql
- PgSQL10 manual.


## Select

## Join


### Cross join

Simply cartesian product. Not much useful in practice, except testing performance of DB.

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
crossJoin().filter(([a1, ..., b1, ...]) => (a1 === b1 &&& a1 !== null));
```

### Left Outer Join

'left':
