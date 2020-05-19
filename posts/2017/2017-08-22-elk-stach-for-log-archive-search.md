---
title: ELK stack for log archiving and search
publishAt: 2018-08-22
---

## Related Products

### fluentd

- full-featured log agent (collect / forward / aggregate)
- written in ruby
- can be used with docker's log driver

### fluent-bit

- lightweight log collector
- written in c
- builtin cpu / memory / hdd collector
- can be used with docker's log driver too

### ElasticSearch

- full text search over JSON documents
- Part of "ELK" stack

### Kibana

- Log analyze and visualization
- Part of "ELK" stack

### Logstash

## Terms

### ElasticSearch / "Index"

Collection of logs, not really about computational indices.

## Setup

## Debugging ElasticSearch

- `http://localhost:9200/_cat/`
- `http://localhost:9200/INDEX_NAME/`
