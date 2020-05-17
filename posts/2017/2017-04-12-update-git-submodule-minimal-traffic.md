---
title: Update git submodule with minimal traffic
publishAt: 2017-04-12
slug: update-git-submodules-with-minimal-traffic
---

`git update --init` by default performs a normal `git clone`. This is less favorable when bandwidth or traffic is limited. I'm going to show a workaround for this, the core idea is to only fetch the needed commit.

The following steps used a small repository that contains submodule: [node-libtidy](https://github.com/gagern/node-libtidy).

#### 1. shallow clone the submodule repo

    $ git submodule update --init --depth=1

It is normal to see a error here, don't panic.

```text
remote: Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
error: no such remote ref abb03163aeafb8b7fc1efd2413d9f077bcdbeed9
Fetched in submodule path 'tidy-html5', but it did not contain abb03163aeafb8b7fc1efd2413d9f077bcdbeed9.
Direct fetching of that commit failed.
```

#### 2. find the needed commit SHA1

If the previous command contains the SHA1, just use it.

There are other ways if you missed it:

```text
$ git submodule status
-abb03163aeafb8b7fc1efd2413d9f077bcdbeed9 tidy-html5

# OR

$ git ls-tree HEAD:
100644 blob d32ca78ff42b7cf2b532a1eb1dd35bc81b584046    .gitignore
...
160000 commit abb03163aeafb8b7fc1efd2413d9f077bcdbeed9  tidy-html5
```

(background: commit sha1 of submodule is stored in a git `tree` object)

#### 3. fetch that commit

```text
# cd into the bare repo cloned for the submodule
$ cd .git/modules/tidy-html5/

# fetch by sha1, the full sha1 is required
$ git fetch origin abb03163aeafb8b7fc1efd2413d9f077bcdbeed9
```

#### 4. checkout the correct commit in submodule

```text
# back to main repo
$ cd ../../../

# update the submodule again without fetch, it should succeed this time
$ git submodule update --no-fetch
```
