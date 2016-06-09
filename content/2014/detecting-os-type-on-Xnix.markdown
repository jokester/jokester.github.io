---
title: Detecting OS type on *nix
created_at: 2014-04-17
kind: article
---

My first thought was to use the environment variables in shell.
That didn't work: zsh only provides `$CPUTYPE`, bash only provides `$HOSTTYPE`.

More portable way is to use `uname`:

~~~ bash
# works with both bash / zsh

case $(uname -m) in #
  i686)
    :
    ;;
  x86_64)
    :
    ;;
esac

case $(uname -s) in
  Linux)  # what can it be?
    :
    ;;
  Darwin) # OSX
    :
    ;;
esac

~~~
