---
title: Debugging ruby with pry and plugins
publishAt: 2013-12-29
slug: debugging-ruby-with-pry
---

- toc
{:toc}

#### [pry](https://github.com/pry/pry/)

pry is a pretty and pretty good ruby console.

It can be used as a empowered `irb`, with TAB completion, code highlight and so on.

But its real use is to inspect execution of ruby code.

~~~ ruby
#!/usr/bin/env ruby
# foo.rb
require "pry"
class Foo
  def bar x,y
    binding.pry # block execution and start a pry console here
  end
end
Foo.new.bar 1,2
~~~

~~~ shell
% pry foo.rb
From: (pry) @ line 6 Foo#bar:
    5: def bar x,y
 => 6:   binding.pry # block execution and start a pry console here
    7: end

[1] pry(#<Foo>)> ls
Foo#methods: bar
locals: _  __  _dir_  _ex_  _file_  _in_  _out_  _pry_  x  y

[2] pry(#<Foo>)> p x,y
1
2

[3] pry(#<Foo>)>
~~~

#### pry-remote

In case rails process is started by a daemon process ([passenger](https://www.phusionpassenger.com/), [pow](http://pow.cx/) or alike),
the blocked process won't magically come into a console.

[pry-remote](https://github.com/Mon-Ouie/pry-remote) provides a solution:

- use `binding.pry_remote` to block execution and listen on `127.0.0.1:9876`
- a CLI client `pry-remote`, which connects to `127.0.0.1:9876` and start pry

#### pry-rails

[pry-rails](https://github.com/rweng/pry-rails)
lets you start `rails console` with pry.

The only work is adding `gem "pry-rails"` to `Gemfile`.

#### pry-debugger

[pry-debugger](https://github.com/nixme/pry-debugger)
adds debug instructions to pry:

- step
- next
- continue
- finish

**NOT** compatible with ruby 2.1 yet.

#### [more pry plugins](https://github.com/pry/pry/wiki/Available-plugins)
