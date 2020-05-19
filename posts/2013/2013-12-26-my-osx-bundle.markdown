---
title: My OSX bundle
publishAt: 2013-12-26
---

(Updated 2017-Jan: the latest bundle can be found in [my dotfile repo](https://github.com/jokester/dotted/tree/master/osx))

- toc
{:toc}

#### brew

~~~ sh
brew install htop-osx zsh-completions midnight-commander macvim ack cmus ctags \
    wget lftp corkscrew git pow node python ruby cmake
~~~

- htop-osx
- zsh-completions
- midnight-commander
- macvim
- ack
- cmus
- ctags

- wget
- lftp
- corkscrew

- git
- pow
- node
- python
- ruby
- cmake

- dupes/screen
    - need `brew tap homebrew/dupes`
    - build with 256-color support

#### brew cask

~~~ sh
brew cask install caffeine logitech-unifying keyremap4macbook growlnotify hexfiend \
        keka lightpaper pester iterm2 filezilla google-chrome dropbox binreader    \
        ireadfast ichm skim mplayerx quick-cast virtualbox clementine vox qq skype \
        curse-client simple-comic boxer minecraft smartgithg steam welly x-quartz
~~~

- brew-cask
    - `brew tap phinze/homebrew-cask` first
- caffeine
    - disable sleep
- logitech-unifying
- keyremap4macbook
- growlnotify
    - cli app to send growl message
- hexfiend
    - hex editor
- keka
    - file archiver
- lightpaper
    - markdown editor
- pester
    - alarm

- iterm2
- filezilla
- google-chrome
- dropbox
- binreader

- ireadfast
- ichm
- skim
    - PDF viewer with auto-refresh

- mplayerx
- quick-cast
    - record and publish screencasts
- virtualbox

- clementine
- vox
- qq
- skype
- curse-client
- simple-comic
- boxer
    - run DOS games
- minecraft

- smartgithg
- steam
- welly
    - a telnet BBS client
- x-quartz

#### App Store

- growl
- Microsoft remote desktop

#### wild

- [WineBottler](http://winebottler.kronenberg.org/)
    - wraps windows application with wine
