---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
aabccd
I installed Ruby from Arch repositories. After, following Arch Wiki instructions on Ruby, I edited my ~/.profile adding:

PATH="$PATH:$(ruby -e 'print Gem.user_dir')/bin"
export GEM_HOME=$HOME/.gem

