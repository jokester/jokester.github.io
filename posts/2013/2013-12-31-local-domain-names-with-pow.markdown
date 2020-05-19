---
title: Local domain names with pow
publishAt: 2013-12-31
---

- toc
  {:toc}

#### Pow

[pow](http://pow.cx/) provides local domain names (like `http://oxox.dev/`). It works by injecting the following things to system:

- A local DNS server specified in `/etc/resolver/dev`.
- A HTTP reverse proxy server to serve pow homepage `http://localhost` and other applications

Pros:

- no more `http://localhost:3000`.
- no more editings in `/etc/hosts`
- no more `rails s`

Cons:

- OSX only

#### Install with homebrew

Run `brew install pow` AND execute what you are instructed.

```sh
% brew install pow
Create the required host directories:
  mkdir -p ~/Library/Application\ Support/Pow/Hosts
  ln -s ~/Library/Application\ Support/Pow/Hosts ~/.pow

Setup port 80 forwarding and launchd agents:
  sudo pow --install-system
  pow --install-local

Load launchd agents:
  sudo launchctl load -w /Library/LaunchDaemons/cx.pow.firewall.plist
  launchctl load -w ~/Library/LaunchAgents/cx.pow.powd.plistd.
```

If this succeeds, you should see a page at `http://localhost/`.

#### Run a rails app

I have a rails app in `~/demo_app`.
The following command register it in `pow`,
so accesses to `http://demo_app.dev` are routed to it.

The domain name is determined by name of the symlink.

```sh
% ln -s ~/demo_app ~/.pow/
```

#### Troubles I met

##### Error: Gem not found

I got `Bundler::GemNotFound` at first.
My `GEM_HOME=~/.gem` is specified in **.zshrc**,
which is not used by pow and applications it runs.

Fix: add `export GEM_HOME=~/.gem` to **APP_ROOT/.powenv** file.

Note: RVM may use more complex env for ruby and gems. They can be generated with `rvm env > APP_ROOT/.powenv`

See [pry manual: Customizing Environment Variables](http://pow.cx/manual.html#section_2.2)

##### Got redirected to a search page

`demo_app.dev` in address bar may be redirected to search page.

Fix: type `http://demo_app.dev` or `demo_app.dev/`

#### Tips

##### Helper gem: powder

[powder](https://github.com/rodreegez/powder) provides convenient commands to pow.

##### Restart rails app

Restart once:

    touch APP_ROOT/tmp/restart.txt

Restart on each request (does not reload `.powrc`, `.powenv` and so on):

    touch APP_ROOT/tmp/always_restart.txt

##### Use pow to host static site

Static sites can also be hosted. The static files should reside in `APP_ROOT/public`

##### Use pow as a reverse proxy for non-rails app

This provides `localhost:3000` as `nanoc.dev`:

    % echo 3000 > ~/.pow/nanoc

Source: [Port proxying](http://pow.cx/manual.html#section_2.1.4)

##### Allow access from other computer

[xip.io](http://xip.io) resolves `127.0.0.1.xip.io` to `127.0.0.1`.
So people in same LAN can access the app at `demo_app.192.0.0.100.xip.io`.

#### More resource

[pow wiki @ github](https://github.com/37signals/pow/wiki/Troubleshooting)

[pow manual](http://pow.cx/manual.html)

#### Alternative

##### prax

[prax](https://github.com/ysbaddaden/prax) is an alternative for Linux. It uses:

- a daemon that runs applications
- `nsswitch` trick to take over routing
