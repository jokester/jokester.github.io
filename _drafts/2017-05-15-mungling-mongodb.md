
# Concepts

## Database / Collection / Document / Create

`collection` --- `table`
`document` aka `data record` --- `row`

```js
// switch to a database, it will be created at first use
use myDB;

// insert into a collection;
db.myNewCollection1.insertOne( { x: 1 } )
//                 .insertMany()

// document stored in a collection requires a unique _id field that acts as a primary key

// find in collection
db.collection.find(criteria, projection);
/** FIXME: what is criteria */
/** FIXME: what is projection */

// update
db.collection.updateOne
db.collection.updateMany
db.collection.replaceOne

/* NOTE: All write operations in MongoDB are atomic on the level of a single document. */
db.collection.deleteOne
db.collection.deleteMany
```

## Query selector

https://docs.mongodb.com/manual/reference/operator/query/#query-selectors

## Update selector

https://docs.mongodb.com/manual/reference/operator/update/

#### View

read-only doucments calculated from *real* documents.



#### TTL collection

#### Document Validation

parallel to `table` in RDBMS.
