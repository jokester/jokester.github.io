---
title: html-tidy for Android
---

I wanted to know if I can use [tidy-html5 HTACG HTML Tidy](https://github.com/htacg/tidy-html5),
a modern HTML tidier (and parser) from Android.

## Wanted capabilities

To get DOM out of non-proper HTML.

- as Java Object, or some Java accessor interface
- at non-bad performance
    - cautious with JNI
- with some CSS-like selector syntax
    - htmltidy do not have selector, likely to roll up my own

## Problem with JSoup

JSoup is perfectly fine, I learned a lot reading its code.

However it lacks a few features for my use (parsing HTML from a native Android app).

## tidy-html5 / DOM Access API

Internally tidy-html5 is able to parse HTML and keep parsed DOM as its own `struct`s.

- [Document Tree](http://api.html-tidy.org/tidy/tidylib_api_5.4.0/group__Tree.html)
    - get html / head / body of doc
    - get child node (first child?) and prev / next of a node

- [Node](http://api.html-tidy.org/tidy/tidylib_api_5.4.0/group__NodeAsk.html)
    - get line / column of a node (tag?)

## tidy-html5 / internal

- writtern in Pure C
- `Node` and `TidyNode` are just different names for same struct
- Node:
    - `typedef struct _Node Node    @ forward.h`
    - `struct _Node                 @ lex.h`
    - TODO: find what does the node mean, maybe by reading/writing a pretty-printer
- TidyDocImpl:
    - `typedef struct _TidyDocImpl TidyDocImpl @ forward.h`
    - `struct _TidyDocImpl                     @ tidy-int.h`

## Implement some selector

## JNI

## Alternative to HTML-Tidy

## Get DO
