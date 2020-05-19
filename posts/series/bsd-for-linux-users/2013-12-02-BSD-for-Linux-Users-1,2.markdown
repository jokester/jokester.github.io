---
title: BSD for Linux Users 简译 1,2 / 11
publishAt: 2013-12-02
---
原作者 [Matt](http://www.over-yonder.net/~fullermd/)

原链接 [BSD for Linux Users](http://www.over-yonder.net/~fullermd/rants/bsd4linux/01)

-----------

> BSD和Linux的不同源自他们不同的哲学。只要理解这点，其他的一切都顺理成章。

* toc
{:toc}

#### 1. 前言

##### 这是什么？

我用FreeBSD。我很多朋友用Linux，或者至少一种Linux发行版。可以说我们都认为Unix式的OS是正确的选择，但在用哪个上有分歧.

在我印象中，BSD社区对Linux的了解要比Linux社区对BSD的了解深得多。我对此现象有一套解释，但是和本文无关。
我认为一些Linux用户不喜欢BSD是因为不了解BSD。因此作为BSD用户，我想介绍一下BSD是怎样做事的，供Linux用户参考。

这两派OS极其相似，也有很多不同。
当深入研究这些不同时，你会发现不同发源于理念: 开发方法论 / 部署和使用 / 认为什么重要 / 认为什么味儿冰淇淋好吃。

比较表面的不同没意义，是理念的不同导致了行事方法不同。

##### 这不是什么?

- 命令对照表
- 怎样装BSD
- 为什么你应该抛弃BSD用Linux
- 为什么你应该抛弃Linux用BSD
- 为什么你应该抛弃这个BSD用那个BSD
- 为什么你应该抛弃这个Linux发行版用那个发行版
- 为什么BSD对 Linux错
- 为什么Linux对 BSD错
- 为什么我是神 汝当拜我

我认为自己的OS选择正确。我不要求你相信.
认识事实，以及研究事实背后的起源，能让你好好用脑。这就是你长脑的原因。

##### 初步的想法

Linux和BSD有大量复杂的区别。这些区别有很多种表述，我特别喜欢这个:

> BSD是一群Unix黑客试图移植Unix到PC的产物。Linux是PC黑客试图在PC上造Unix的产物。

我喜欢这段不是因为他极其符合事实，而是因为能说明那种感觉。
和Linux相比，BSD更像传统Unix（们）。因为BSD是Berkley BSD的直系后代，Berkley BSD又是AT&T Unix的直系后代。
Unix商标属于The Open Group，Unix代码属于SCO，所以不能说BSD是真正的Unix（这样的说法曾导致USL/UCB打上法庭)。
但是从很多方面看，BSD是传统Unix的直接衍生物。

这些区别表现在很多方面：基本系统的设计，包管理，硬盘分区，命令的细节。
这些区别表现在开发者的态度，反射和偏见，又被代码和用户反映。

“BSD是设计出来的. Linux是生长出来的” 可能是唯一简洁又正确的表述.

(目录，略)

-----------

#### 2. 选手们

##### Unix

严格地说Unix不是OS. Unix是又不是OS.

(历史, 略)

当我们说Unix, 我们一般不是指Unix的商标 而是"有实质上像Unix的设计/执行/界面/口味的任何OS".
包括BSD, Linux, SunOS, Tru64, SCO, Irix, AIX, HP/UX 等.

我不关心多少天使可以在分叉的头发上跳舞. 你知道我说的Unix是什么.

##### Linux

Linux也有很多含义。它是Linus在芬兰求学时写出的kernel，后来又过了无数人的手。
Linux可也指一系OS。

在这一秒钟，世界上也进行着各种“Linux只是kernel，不是OS”，“Linux应该叫GNU/Linux”之类争论。
为了避免文字之争, 我说Linux时就是指Red Hat / Slackware / Mandrake / Debian / SuSe / Gentoo / 其他无数发行版
这些建筑在Linux kernel的系统。

##### BSD

BSD起初是一些在UCB开发的，Bell Unix的补丁和程序.
BSD慢慢地成长，替换了整套系统，最终成为了“和Bell Unix有相同代码”的OS。

当时你仍然需要Bell的许可才能用整个系统。但由Berkeley开发的部分是以BSD协议公开的。
BSD协议的内容是“爱干嘛干嘛，感谢我们就行”。
有很多BSD代码又回到了"正式"Unix系统, 如SystemIII, SystemV.

在CSRG解散, BSD停止开发后, 一堆小组走上不同的道路。
有一组人是386BSD，他们把BSD移植到了i386。
386BSD死后，FreeBSD和NetBSD的两组人接手代码继续前进。
后来NetBSD又分出OpenBSD。

我口中的BSD包括很多东西，包括口味和风格。这些可以在现存的3种BSD系统中看到：

- FreeBSD: 追求i386上的最佳性能
- NetBSD:  多平台
- OpenBSD: 注重安全

各BSD的目标有很多共通之处：大家都关心可移植性 / 性能 / 安全。
不同BSD间有大量共通代码。很多开发者为不止一个BSD做事。

敏锐的读者会发现我没有提到Mac OSX和下层的Darwin。
这些确实也来自BSD，但OSX的上层完全是苹果造。OSX的用户感受到的是OSX，不是BSD。
理论上这文章也适用于OSX，不过内容对了解OSX没帮助。
Darwin比较像BSD，不过Darwin用户都来自BSD，不是本文的目标群体。

我主要讲FreeBSD，因为我用这个而且最熟悉这个。
一般的观点对各BSD都通用。

和各Linux相比，各BSD的哲学十分相近。这文章就讲哲学。
