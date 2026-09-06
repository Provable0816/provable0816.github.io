# frozen_string_literal: true

# =========================================================================
#  Jekyll 数学公式 + Markdown 修复插件
#
#  问题背景：
#   kramdown 只把 `$$...$$` 识别为数学，完全忽略单美元的 `$...$`。
#   因此行内 `$...$` 会被当作普通文本，kramdown 会：
#     1) 丢掉 LaTeX 里的反斜杠（`\{`->`{`、`\|`->`|`），导致 `{}` 花括号、
#        `\|...\|` 范数等被破坏；
#     2) 把行内数学里出现的裸竖线 `|`（如 `$p(y|X)$`）误判成“表格列分隔符”，
#        从而把段落/列表项拆成一张单列表格，Markdown 结构被破坏。
#
#  修复思路：
#   1) 给 kramdown 打补丁：让它在段落中也能识别单美元 `$...$` 为“行内数学”，
#      数学内容会被原样保留（不再剥反斜杠）。
#   2) 在把内容交给 kramdown 之前做预处理（通过 pre_render hook）：把 `$...$`
#      内的裸竖线 `|` 替换成 `\vert `（MathJax 的“单竖线”，末尾加空格防止
#      被 TeX 读成 `\vertX`），使 kramdown 不再误判为表格，且渲染为 `p(y|X)`。
#
#  注意：补丁是惰性的——直到第一次真正转换前才 require kramdown 并打补丁，
#  避免插件加载阶段 kramdown 尚未就绪。
# =========================================================================

module KramdownMathHelpers
  # 单美元行内数学。开闭定界符必须是“单个 $”，不能是 `$$`：
  #   (?!\$)  开头的 $ 不能被 $ 跟随（即不是 $$）
  #   (?<!\\) 结束的 $ 前不能是反斜杠（避免误吞 \\$）
  SINGLE_DOLLAR_INLINE_START = /\$(?!\$)(.*?)(?<!\\)\$(?!\$)/m
  INLINE_MATH = SINGLE_DOLLAR_INLINE_START

  @patched = false

  # 保证 kramdown 已加载，并把 inline_math 解析器改为也匹配单美元。
  def self.ensure_patch!
    return if @patched

    require "kramdown"
    Kramdown::Parser::Kramdown.parser(:inline_math).start_re = SINGLE_DOLLAR_INLINE_START
    @patched = true
  end

  # 把 $...$ 中的“裸竖线”替换成 \vert （末尾加空格，避免 TeX 把 \vertX
  # 当成一个未定义的控制序列）。已经转义的 \|（范数）不会被触碰。
  def self.protect(content)
    ensure_patch!
    return content unless content.is_a?(String)

    content.gsub(INLINE_MATH) do |match|
      body = match[1..-2]
      "$#{body.gsub(/(?<!\\)\|/, '\vert ')}$"
    end
  end
end

# 在 kramdown 转换之前，对帖子/页面的原始 Markdown 做预处理。
[:documents, :pages].each do |owner|
  Jekyll::Hooks.register owner, :pre_render do |item|
    item.content = KramdownMathHelpers.protect(item.content) if item.respond_to?(:content=)
  end
end
