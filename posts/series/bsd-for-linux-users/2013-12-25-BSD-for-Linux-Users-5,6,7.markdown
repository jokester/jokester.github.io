---
title: BSD for Linux Users 简译 5,6,7 / 11
publishAt: 2013-12-25
---
原作者 [Matt](http://www.over-yonder.net/~fullermd/)

原链接 [BSD for Linux Users](http://www.over-yonder.net/~fullermd/rants/bsd4linux/05)

-----------

> BSD和Linux的不同源自他们不同的哲学。只要理解这点，其他的一切都顺理成章。

* toc
{:toc}

#### 发布工程

BSD 的系统都处于版本控制的管理之下。各种免费 BSD 都用 CVS。
简单地说，版本控制是一种流程，在这个流程中修改一个程序需要把文件拿出来－改动文件－把文件放回去－留言说明改动。
版本控制系统保留所有变更的完整历史，你可以查看变更历史，拿出一个文件的旧版本，或是比较任意两个版本。

各种 BSD 的 CVS 版本库都是公开的。
作为一个用户，你可以看到几时，谁，为何做出改动。你随时可以拿到最新代碼。
各种免费 BSD 都有邮件列表，你注册后可以立刻得到通知。
其实 CVS 也提供 web 界面，你可以在[这](http://cvsweb.freebsd.org/src)看到 FreeBSD 代码树的全部历史。

Linux 最初没有用版本控制来管理 kernel 代码。
在 2.4 版本中期的某时，kernel 代码开始由一个公开的 BitKeeper 版本库管理。
Linux, historically, hasn't used any version control for the kernel. Somewhere in mid-2.4 days the kernel began being kept in a public BitKeeper repository. Many of the other utilities use revision control, but since they're all developed separately, there isn't any central place you can go to to look through the changes. So it's sometimes hard to get a historic picture of even any one part; to so do for a whole distribution is practically impossible.

Note: There's been some contention about the last paragraph. While many developers have used CVS for parts of the kernel, available information says that Linus never used it for the kernel, thus the whole thing wasn't in a coherent version control system until the move to Bitkeeper. See this paper for details.

This leads to a lot of differences. In a very real sense, BSD systems are constantly developed; I can always update my system to the absolute latest code, irrespective of "releases". In Linux, that doesn't really have as much meaning, because the release process is very different. I think the most appropriate verb for a Linux release is "assembled". A Linux release is assembled from version A.B of this program, plus version C.D of this program, plus version E.F of this program... all together with version X.Y.Z of the Linux kernel. In BSD, however, since the pieces are all developed together, the verb "cut" makes a lot more sense; a release is "cut" at a certain time.

Linux releases kernels in two parallel lines (well, often more than 2, but we're simplifying); a version with an odd minor release number, as a "development" version, and a version with an even minor release number, as a "production" version. The BSDs also have "development" and "production" tracks, but they're handled rather differently.

CVS, like most version control systems, has the concept of "branches". It's easy to understand, but somewhat difficult to explain. Basically, when you "branch" a file or a set of files (or a whole directory tree), you create a new version of the file which exists in parallel with the primary version. When you make changes to the primary version, it doesn't affect the branched version. And you can make changes to the branched version without affecting the primary.

In FreeBSD, there's usually 2 active development lines; one called "-CURRENT", which is the development version, and the other called "-STABLE", which is the production version. Both, of course, are under development, and both have some attempt to be made to keep them usable. -STABLE, as a rule, gets bug and security fixes, but only gets new features and such that are well tested, usually by a stint in -CURRENT first. -CURRENT gets new features, big architectural changes, and all those sorts of new development stuff. It should be noted that the naming of the branches doesn't necessarily mean what it seems to; while -STABLE usually is "stable" as in "robust", it isn't always. The term "stable" refers more to the fact that the codebase itself doesn't have major changes made to it.

In the Linux world, Debian does a similar thing with their release engineering. They have a "stable" release , which mostly only gets major bugfixes. This is roughly the same as a FreeBSD -RELEASE. Then, they have a "testing" release, which gets more in the way of new features, but only after they've been tested for a while and don't seem to have any major problems. This is similar to FreeBSD's -STABLE branch. And, they have an "unstable" release, which is where new development happens, new features are developed, and new versions of packages come in. This, then, corresponds to FreeBSD's -CURRENT branch. (Note: I don't really know Debian's release process that well; this is my understanding of it, which could be completely wrong. Hopefully, someone will send me correct info if I am.)

I repeat, because it's important; these are BRANCHES. Not releases. Branches. They're not points; they're constant streams of development, changing from day to day and hour to hour and often minute to minute. If I grab -STABLE now, and -STABLE tomorrow, they'll likely be different. However, because it's under revision control, I can say something like "Give me -STABLE as of 11:30pm on October 13th, 2003", and always get the same code back.

In fact, that's all a release is; a snapshot at some point along a branch. For instance, what we call "2.2.6-RELEASE" is actually just a snapshot of what the 2.2-STABLE branch looked like on March 24, 1998. On March 25, it was called "2.2.6-STABLE", even though practically nothing had changed. And it kept being called "2.2.6-STABLE" until July 21, when a new snapshot was called "2.2.7-RELEASE". And so on, down the line.

Now, you'll note that there's numbering on these branches too. We've got 2.1-STABLE, and 2.2-STABLE, and 3-STABLE, and 4-STABLE. To understand that, we'll look at where these branches come from. At one point, there was 3-CURRENT. In CVS terms, that was the HEAD of the tree; not a branch, but the main line. Eventually, there was a time when it was decided to start making this branch production-ready, so a tag was laid declaring a certain point as "3.0-RELEASE". At that time, the 3-branch was still -CURRENT; 2.2 was -STABLE. As we approached 3.1-RELEASE, it was decided that it was time to create the 3-STABLE branch. So, a branch was created and called "3-STABLE", and -CURRENT was renamed to "4-CURRENT".

The same thing occured (roughly) when 4 became -STABLE and -CURRENT became 5, and the same will happen again when 5 becomes -STABLE and -CURRENT moves on to 6. Sometimes only the x.0 release is cut before the branch becomes -STABLE, sometimes .1 and even .2 are. 5.0-RELEASE is a snapshot of 5-CURRENT. So's 5.1-RELEASE. So's 5.2-RELEASE. At the current time, the plan is for 5.3-RELEASE to be the first -RELEASE off the to-be-created 5-STABLE branch, though that may change. All depends on the state of the tree.

You'll note, of course, that even though 4.x or 4-STABLE is still (for the moment) the "production" stream, that 3-STABLE still exists (though it hasn't gotten any changes in a long time). For that matter, 2.2-STABLE and 2.1-STABLE are still around too, though they haven't gotten any changes in even longer. Conventionally, -STABLE without a number, then, refers to the latest -STABLE branch. Really, the only time there's any confusion is when a new branch has just been created, so a lot of people are still on the old one. And then you can just use the number to make it unambiguous.

Also, note that 5.1-RELEASE happened before 4.9-RELEASE. And 5.0-RELEASE was before 4.8-RELEASE. This is the time, when one branch is in its ending days, and another branch is in its starting days, when things get really confusing. It's then that the -CURRENT and -STABLE difference comes into place. To make a very rough analogy, 5-CURRENT is like Linux 2.5, while 4-STABLE is like Linux 2.4. But, before that, 4-CURRENT was like Linux 2.3, and in the future, 5-STABLE will be like Linux 2.6. It's not a perfect analogy, of course, partly because we're talking about the full system with all its pieces, not just the kernel. But it's close enough to get the idea.

So. What does that all mean? Not much, perhaps. But, with that background, perhaps you can get a better feel for what happens when, and what the branch names and release numbers mean.

Some more information on -CURRENT vs -STABLE is available in the FreeBSD handbook. There's also an article in the documentation about the release engineering process.

Releases get old
So, now you have a better understanding of where releases come from, and what this -CURRENT and -STABLE nonsense is about. But all releases get old eventually, and need to be brought up to date. So, let's move on to upgrading.

---------------------

####Building the world in less than 7 days

As a result of the fact that the BSD base system is developed as a single unit, you can easily get the entire source tree for the entire base system. And because of the way it's designed, you can execute a single command at the top level to compile everything. For most of us, that's the normal way to upgrade; you update your source tree to the absolute latest (with a few hours, of course) changes made by anybody, compile it, install the new binaries, and you're done. Miller time.

Of course, you might not necessarily want the latest. You could grab the sources from last week, say. And normally, you do the whole rebuild process in four steps. You start with a make buildworld which compiles all of userland, then a make buildkernel which compiles the kernel. Then you take a deep breath and make installkernel to install the new kernel, and make installworld to install the new userland. Each step is automated by a target in the Makefile.

Of course, I'm leaving out tons of detail here. Things like describing the kernel config, merging system config files, cleaning up includes... all those gritty details. If you want to read about that, check the FreeBSD handbook, specifically the sections on updating and building and configuring your kernel, or the various other forms of documentation available. But those sort of things become second nature after you do them a few times. Really, the process of updating your system boils down to those four commands. I find it a lot easier than having to resolve cross-dependencies and changed library versions and such across a zillion binary packages.

This information is mostly based on FreeBSD. NetBSD uses a different model for doing the system builds. OpenBSD tends to be much more in favor of reinstalls, at least for major version changes.

Addon software
Well, that sure was easy. But, what about all those add-on packages? How do we manage those? Let's talk about installing and upgrading ports.

----------------------

If you build 2 ports, is that a pair-a-docks?
Other add-on packages you've installed will need to be updated in the same way you originally installed them; by installing a newer version package, or building a newer version port. The ports tree itself is also kept in CVS just like the source tree, so you can update it through CVS or CVSup just like the source tree. Also, look into the portupgrade utility, which is a suite of scripts written in Ruby to make it easier to upgrade already installed ports.

The ports tree is basically a huge skeleton. Each individual package has its own directory, which contains a number of files. Each has a Makefile, which defines some variables relating to that package, like where the master site for the distribution is, version numbers, special instructions for autoconf, and a listing of other packages that this depends on (Mozilla, for instance, requires the X libraries, among a zillion other things). It'll have a few files containing things like a one-paragraph description of the package, a packing list for the files that it'll install, and so on. And it may include any patches that might be necessary for the software to compile or run. That's the "porting" part of the ports tree; the porting is already done.

There's all sorts of magic inside a giant web of very complex Makefiles. Fortunately, you don't need to know any of it. All you need to know is that if you run make, it will automatically fetch the source from whatever the master site for that package is, automatically patch it, automatically configure it with whatever magic is necessary, and automatically compile it. And if it requires other packages, it will automatically check to see if they're installed, and if they're not, it will automatically recurse down and compile and install those, too. Then when you run make install, it will automatically install it, and automatically register it as a package so you can upgrade or deinstall it with package tools later.

It's fiendishly complex in detail, but remarkably simple to use.

Or, you can use binary packages. Here, you'll primarily use the pkg_add command. And if you use it with the -r switch, it will automatically try to fetch the requested package and its dependencies from the FreeBSD mirror sites.

Lots more information on the whole process is available, as always, in the handbook; specifically, the ports and packages chapter.

Philosophy
That's not too hard either. But boy, that sure is a lot of information on the technical side. Let's move away from those sort of details, and get to the differences in underlying philosophy.
