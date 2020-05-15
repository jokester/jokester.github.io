Behavior

------

callsite

1. Same instance (no receiver)
2. Same class (type)
3. Subclass (subtype)
4. Same Package
5. anywhere

------

| Lang  | Modifier           | Behavior
| Java  | (no)               | 4
| Java  | protected          | 3
| Java  | private            | 2
| Scala | (no)               | 5
| Scala | private            | 2
| Scala | private[package]   | 3 && 4
| Scala | protected          | 3
| Scala | protected[package] | 3 && 4
| Ruby  | (no)               | 5
| Ruby  | protected          | 2
| Ruby  | private            | 1

