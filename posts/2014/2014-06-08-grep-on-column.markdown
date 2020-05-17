---
title: 'TIL: grep on a column rather on line'
publishAt: 2014-06-08
slug: til-grep-on-column-rather-than-line
---

One may want to run grep-like operation on a specific column.

For example, when I need the lines from `/home/me/test.tsv` where the second column equals to `a`:

    1	a	2.1
    1	b	2.2
    2	a	2.5
    2	c	2.6

`grep` does not come with an option to specify column.
I don't want to break the lines into pieces or put pieces back, that's too much pain.

The trick is to use `join`. It performs join (recall relational algebra) on lines of 2 input files.

Example:

    % join -1 2 -2 1 -o 1.1,1.2,1.3 -t $'\t' <(sort test --key=2) <(echo a)
    1 a 2.1
    2 a 2.5

Arguments explained:

- `-1`, `-2`: which column to join on
- `-o`: which columns to output (I had to specify all columns explicitly)
- `-t`: column delimiter of input/output
- `<(sort test --key=2)`: lines sorted by 2nd column
- `<(echo a)`: just `a`

BTW this join solution may be to some degree cleaner, but not much shorter than a perl one-liner:

    % perl -ne '@cs=split;$cs[1] eq "a" and print;' < test

and awk code is even shorter:

    % awk '$2=="a"' < test
