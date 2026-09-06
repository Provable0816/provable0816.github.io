source "https://rubygems.org"

# 使用原生 Jekyll（不用 github-pages gem）。
# 重要：github-pages gem 会强制 safe: true 并把 plugins_dir 设为随机目录，
# 导致本站的 _plugins/math_fix.rb 永远不会被加载。用原生 Jekyll 才能让插件生效。
gem "jekyll", "~> 4.3"
gem "kramdown"
gem "kramdown-parser-gfm"

# Ruby 3.x 中 webrick 被移出标准库，Jekyll 需要它
gem "webrick"
