
# Redis

- in-memory K-V data structure store
- can be used for database / cache / message broker

## Data types

### Type of Value

String-centred:

- string
- list (of strings)
    - internally linked list
- set (of strings)
- sorted sets (of strings)
    - where every string is attached a floating number value (weight?)
    - internally, maybe sth like heap?
- hash of `<string, string>`

Others (todo: read):

- bitmap (aka bit array)
- HyperLogLogs

### Type of Key

string

- try use a schema: `user:1000:followers`
- a too-long string as key may harm performance (uuid / sha as string should be fine)

redis keys are "binary safe" strings. i.e. they can be any byte sequence, and not necessarily char sequence.

## Concept


### Value



### Atomcity

all commands are atomic, including commands about multi values (`MGET / MSET`) too.

### Expire




## Commands

### Key

- EXISTS key
    - see if key exists
- DEL key
    - del the key
- TYPE key
    - return `none | list `

### Expire

- EXPIRE / PEXPIRE
    - set expire with relative time
- EXPIREAT / PEXPIREAT
    - set expire with current time
- `TTL` / `PTTL`
    - query 
- `PERSIST key`
    - removes the expiration

### `string`

- `SET key value [EX expire_in_sec] [PX expire_in_msec] [NX|XX]
    - EX/PX flag: set expire (relative time)
    - NX flag: only set if not exist
    - XX flag: only set if exist
    - can be used to implement a (not fool-proof) mutex lock: see [SET / patterns](https://redis.io/commands/set)
- GET
- INCR / DECR / INCRBY / DECRBY
    - `++x` or `x+= delta`
    - the string and the delta must represent decimal integer
    - returns new value
    - delta must be integer
- GETSET key new-value
    - return old value (may be nil)

### `list`

- LPUSH / RPUSH
    - runs in `O(1)` time
    - add string values to (left | right) of list
    - `lpush key a b c` results in a list of `c b a ...`
    - returns number of values pushed
    - creates list if not exist
    - fails if the key exists but value is not list
- LPOP / RPOP / BLPOP / BRPOP
    - pop 1 element from left / right
    - return nil on empty list
    - list gets removed if it had 1 element
- BRPOP / BLPOP
    - like LPOP / RPOP
    - differs in that B-POP would block on empty list, until there is sth to return
        - won't stop blocking if value is changed to a non-list
    - FIFO: the first client started waiting, gets served first
    - timeout: max block time in second (sepcify 0 to block indefinitely)
- LRANGE
    - `LRANGE key start end`
    - get values from list
    - both start / end are inclusive
    - -1 means last index, -2 means last but 1
        - so `LRANGE key 0 -1` gets all
- LLEN
    - get length of list
    - may need `O(n)` time
- LTRIM
    - trims a list to a range
    - "capped list" pattern: trim after push, to limit capacity
- LINSERT
    - insert new value before/after a pivot

complicated:

- RPOPLPUSH src dest
    - atomic `LPUSH dest $ RPOP src`
    - returns the element
    - TODO: read patterns https://redis.io/commands/brpoplpush

### `hash`

- HSET / HGET : 1 field-value pair
- HMSET / HMGE: multi pairsT
- HGETALL
    - returns `[field1, value1, field2, value2, ...]`
- HLEN: `#fields`

Operation on values:

- HSETNX
    - sets field only if not exist
- HINCBY / HINCBYFLOAT
- HSCAN
    - iterator


### `set`

- SADD
- SISMEMBER
- SINTER
    - intersection
- SUNIONSTORE
    - compute union of 2 stores, and save to another set
- SPOP
    - pop a *random* element
- SCARD
    - return cardinal of set

### `sorted set`

Sets, where each element is attached a numerical (IEEE754 float64, double-precision) `score`.

Elements are in a (strict) `total order`

- ZADD
- ZINCRBY
- ZSCORE
    - get score by element
- ZCARD
- ZCOUNT ZLEXCOUNT
    - count elements in a range (by score / by key)
- ZRANGE ZRANGEBYLEX ZRANGEBYSCORE ZREVRANGE ZREVRANGEBYLEX ZREVRANGEBYSCORE
    - get elements in a range of rank (ranked by score or lexicographical)
    - can get scores too (WITHSCORES)
- ZREM ZREMRANGEBYSCORE ZREMRANGEBYRANK ZREMRANGEBYLEX
    - del element
- ZRANK ZREVRANK
    - get index when sorted by key
- ZINTERSTORE ZUNIONSTORE
    - merge 2 or more sorted sets
    - aggregation function of scores: SUM (default) / MIN / MAX
- ZSCAN
    - iterator

## Server

### Persistency

- ahead of toi

## c
