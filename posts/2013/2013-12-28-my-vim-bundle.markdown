---
title: My vim bundle
publishAt: 2013-12-28
slug: my-vim-bundle
---

(Updated 2017-Jan: the latest bundle can be found in [my dotfile repo](https://github.com/jokester/dotted/blob/master/DOTvimrc.bundle))

- toc
{:toc}

#### Other

- [`gmarik/vundle`](https://github.com/gmarik/vundle)
    - one plugin to install them all

- [`mileszs/ack.vim`](https://github.com/mileszs/ack.vim)
    - ack is a better grep

- [`tpope/vim-fugitive`](https://github.com/tpope/vim-fugitive)
    - git integration

- [`vim-scripts/DirDiff.vim`](https://github.com/vim-scripts/DirDiff.vim)
    - compare 2 directories

- [`vim-scripts/FencView.vim`](https://github.com/vim-scripts/FencView.vim)
    - detect and switch encoding

- [`vim-scripts/The-NERD-tree`](https://github.com/vim-scripts/The-NERD-tree)
    - a file manager

- [`vim-scripts/TaskList.vim`](https://github.com/vim-scripts/TaskList.vim)
    - list TODOs / NOTEs

- [`majutsushi/tagbar`](https://github.com/majutsushi/tagbar)
    - list classes / methods / etc

- [`vim-scripts/Gundo`](https://github.com/vim-scripts/Gundo)
    - show undo / redo tree

- [`907th/vim-auto-save`](https://github.com/907th/vim-auto-save)
    - autosave every a few seconds

- [`bkad/CamelCaseMotion`](https://github.com/bkad/CamelCaseMotion)
    - define [text objects](http://blog.carbonfive.com/2011/10/17/vim-text-objects-the-definitive-guide/)
      for segments in camelcase identifiers

- [`tpope/vim-surround`](https://github.com/tpope/vim-surround)
    - define text objects for brackets

- [`junegunn/vim-easy-align`](https://github.com/junegunn/vim-easy-align)
    - align text with delimiters like `[;:=& ]`

- [`vim-scripts/tir_black`](https://github.com/vim-scripts/tir_black)
    - just a color scheme

#### Dev

- [`scrooloose/syntastic`](https://github.com/scrooloose/syntastic)
    - syntax check on save

- [`Valloric/YouCompleteMe`](https://github.com/Valloric/YouCompleteMe)
    - code completion

- [`tpope/vim-endwise`](https://github.com/tpope/vim-endwise)
    - auto insert `end` / `esac` / `done` to code

- [`tpope/vim-commentary`](https://github.com/tpope/vim-commentary)
    - fast commenting out

- [`SirVer/ultisnips`](https://github.com/SirVer/ultisnips)
    - code snippets

- [`tpope/vim-rails`](https://github.com/tpope/vim-rails)

- [`tpope/vim-bundler`](https://github.com/tpope/vim-bundler)

- [`othree/html5.vim`](https://github.com/othree/html5.vim)

- [`tpope/vim-haml`](https://github.com/tpope/vim-haml)

- [`kchmck/vim-coffee-script`](https://github.com/kchmck/vim-coffee-script)

- [`jelera/vim-javascript-syntax`](https://github.com/jelera/vim-javascript-syntax)

#### Appearance

- [`kshenoy/vim-signature`](https://github.com/kshenoy/vim-signature)
    - show marks beside line numbers

- [`nathanaelkane/vim-indent-guides.git`](https://github.com/nathanaelkane/vim-indent-guides.git)
    - colorize indent spaces / tabs

- [`ap/vim-css-color`](https://github.com/ap/vim-css-color)
    - show color codes with colors

- [`bling/vim-airline`](https://github.com/bling/vim-airline)
    - a pretty pure-VIML status line
    - use `dupes/screen` if you are a OSX & homebrew user, see [this post](/post/mac-brew/).

#### My dotfiles

##### `.vimrc.vundle`

~~~ vim
" vim: ft=vim
filetype off
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

Bundle 'gmarik/vundle'

" detect / switch encoding
Bundle 'vim-scripts/FencView.vim'

" diff 2 dirs
Bundle 'vim-scripts/DirDiff.vim'

" better grep
nnoremap <C-g> :Ack
Bundle 'mileszs/ack.vim'

" file manager
nnoremap <F2> :NERDTreeToggle<CR>
Bundle 'vim-scripts/The-NERD-tree'
    let g:NERDTreeDirArrows=0
    let NERDTreeIgnore = ['\.pyc$', '\.aux$']

" tasklist
nnoremap <F3> :TaskList<CR>
Bundle 'vim-scripts/TaskList.vim'
    let g:tlTokenList = ["FIXME", "TODO", "XXX", "NOTE", "@todo"]

" undo tree
nnoremap <F5> :GundoToggle<CR>
Bundle 'vim-scripts/Gundo'

" tagbar for classes / methods / etc.
nnoremap <F6> :TagbarToggle<CR>
Bundle 'majutsushi/tagbar'
    let g:tagbar_iconchars=['+','-']
    let g:tagbar_autofocus=1
    if executable('coffeetags')     " gem install CoffeeTags
        let g:tagbar_type_coffee = {
                    \ 'ctagsbin' : 'coffeetags',
                    \ 'ctagsargs' : '--include-vars',
                    \ 'kinds' : [
                    \ 'f:functions',
                    \ 'o:object',
                    \ ],
                    \ 'sro' : ".",
                    \ 'kind2scope' : {
                    \ 'f' : 'object',
                    \ 'o' : 'object',
                    \ }
                    \ }
    endif

" git integration
nnoremap <F7> :Gdiff<CR>
nnoremap <F8> :Gstatus<CR>
Bundle 'tpope/vim-fugitive'

" auto save
Bundle '907th/vim-auto-save'
let g:auto_save = 1  " enable AutoSave on Vim startup
let g:auto_save_no_updatetime = 1  " do not change the 'updatetime' option

" better text objects for brackets
Bundle 'tpope/vim-surround'

" text objects for camelCase
Bundle "bkad/CamelCaseMotion"

" fast commenting out
Bundle 'tpope/vim-commentary'

" align text
vnoremap <silent> <Enter> :EasyAlign<Enter>
Bundle "junegunn/vim-easy-align"
let g:easy_align_ignore_groups = []
    let g:easy_align_delimiters = {
                \ '>': { 'pattern': '>>\|=>\|>' },
                \ '/': { 'pattern': '//\+\|/\*\|\*/', 'ignore_groups': ['String'] },
                \ '#': { 'pattern': '#\+', 'ignore_groups': ['String'], 'delimiter_align': 'l' },
                \ ']': {
                \     'pattern':       '[[\]]',
                \     'left_margin':   0,
                \     'right_margin':  0,
                \     'stick_to_left': 0
                \   },
                \ ')': {
                \     'pattern':       '[()]',
                \     'left_margin':   0,
                \     'right_margin':  0,
                \     'stick_to_left': 0
                \   },
                \ 'd': {
                \     'pattern': ' \(\S\+\s*[;=]\)\@=',
                \     'left_margin': 0,
                \     'right_margin': 0
                \   },
                \ '\': {
                \     'pattern': '\\$',
                \   },
                \ }

""""""""""""" section: looking
" show marks
Bundle "kshenoy/vim-signature"

Bundle 'nathanaelkane/vim-indent-guides.git'
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_guide_size = 1
autocmd VimEnter,Colorscheme * :hi IndentGuidesOdd  guibg=#ffc261 ctermbg=3 "applejack
autocmd VimEnter,Colorscheme * :hi IndentGuidesEven guibg=#f3b6cf ctermbg=4 "pinkie

""""""""""""" section: programming related

" insert closing pair of brackets
" Bundle 'vim-scripts/simple-pairs'

" syntax check
Bundle 'scrooloose/syntastic'

" code completion
Bundle 'Valloric/YouCompleteMe'
    let g:ycm_add_preview_to_completeopt=1
    let g:ycm_key_list_select_completion=[]    " leave tab to me
    let g:ycm_key_list_previous_completion=[]
    let g:ycm_key_invoke_completion = '<C-a>'
    if v:version < 703 || (v:version == 703 && !has('patch584')) || !has( 'python' )
        let g:loaded_youcompleteme=1
    endif

" Bundle 'vim-ruby/vim-ruby'
"     autocmd FileType ruby,eruby set omnifunc=rubycomplete#Complete
"     autocmd FileType ruby,eruby let g:rubycomplete_buffer_loading = 1
"     autocmd FileType ruby,eruby let g:rubycomplete_classes_in_global = 1
"     autocmd FileType ruby,eruby let g:rubycomplete_rails = 1

" code snippets
Bundle 'SirVer/ultisnips'

" language
Bundle 'tpope/vim-rails'
Bundle 'tpope/vim-bundler'
Bundle 'othree/html5.vim'
Bundle 'ap/vim-css-color'
Bundle 'tpope/vim-haml'
Bundle 'kchmck/vim-coffee-script'
Bundle 'jelera/vim-javascript-syntax'
Bundle 'tpope/vim-endwise'

Bundle 'vim-scripts/tir_black'
Bundle 'bling/vim-airline'
~~~

##### `.vimrc`
~~~ vim
set nocompatible

if filereadable( $HOME . '/.vimrc.bundle' )
    source ~/.vimrc.bundle
endif

" ...
~~~
