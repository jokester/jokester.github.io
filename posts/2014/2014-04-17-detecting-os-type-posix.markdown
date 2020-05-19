---
title: Detecting common posix OSs
publishAt: 2014-04-17
---

My first thought was to use the environment variables in shell.
That didn't work: zsh only provides `$CPUTYPE`, bash only provides `$HOSTTYPE`.

More portable way is to use `uname`:

~~~ bash
case $(uname -m) in #
  i686)
    :
    ;;
  x86_64)
    :
    ;;
esac

case $(uname -s) in
  Linux)
    :
    ;;
  Darwin) # OSX
    :
    ;;
esac

~~~
