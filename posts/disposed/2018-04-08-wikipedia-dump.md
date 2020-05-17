## Build 

### build xml2sql

```sh
# apt install libbz2-dev libz-dev

$ cd ~/local/src/operations-dumps-import-tools/xmlfileutils
$ make mwxml2sql
$ ln -s "$(realpath mwxml2sql)" ~/local/bin/
```

### convert xml to sql

```sh

$ mwxml2sql                                                       \
    -s zhwiki-20180301/zhwiki-20180301-stub-meta-history.xml.gz   \
    -t zhwiki-20180301/zhwiki-20180301-pages-meta-current.xml.bz2 \
    -f zhwiki-20180301.sql.gz                                     \
    --mediawiki 1.21
```

NOTE: 1.21 was the latest version my build supports (`--version`), not the version that created dump.
