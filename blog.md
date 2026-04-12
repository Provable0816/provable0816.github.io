---
# ============================================================
# 博客列表页面配置
# ============================================================
layout: page
title: "博客"
permalink: /blog/
description: "我的博客文章列表"
---

<!-- ============================================================
     博客文章列表页面
     所有在 _posts 文件夹中的文章会自动显示在这里
============================================================= -->

# 博客文章

<!-- 
博客文章说明：
1. 在 _posts 文件夹中创建新文件
2. 文件名格式：YYYY-MM-DD-文章标题.md
3. 每篇文章顶部需要 YAML Front Matter 配置
4. 文章会自动按日期倒序显示
-->

{% for post in site.posts %}
  <article class="post-item">
    <h2>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </h2>
    <p class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">
        📅 {{ post.date | date: "%Y年%m月%d日" }}
      </time>
      {% if post.categories %}
        <span class="post-categories">
          📁 {% for category in post.categories %}
            {{ category }}{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </span>
      {% endif %}
      {% if post.tags %}
        <span class="post-tags">
          🏷️ {% for tag in post.tags %}
            #{{ tag }}{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </span>
      {% endif %}
    </p>
    <p class="post-excerpt">
      {% if post.description %}
        {{ post.description }}
      {% else %}
        {{ post.excerpt | strip_html | truncate: 200 }}
      {% endif %}
    </p>
    <a href="{{ post.url }}" class="read-more">阅读全文 →</a>
  </article>
  <hr>
{% else %}
  <!-- 当没有文章时显示的内容 -->
  <div class="no-posts">
    <h3>📝 还没有文章</h3>
    <p>
      在 <code>_posts</code> 文件夹中创建您的第一篇文章吧！
    </p>
    <p>
      文件名格式：<code>YYYY-MM-DD-文章标题.md</code>
    </p>
  </div>
{% endfor %}

---

## 如何添加新文章

1. 在 `_posts` 文件夹中创建新文件
2. 使用文件名格式：`YYYY-MM-DD-文章标题.md`
3. 在文件顶部添加 YAML Front Matter
4. 撰写您的文章内容
5. 推送到 GitHub，网站会自动更新

示例文件名：`2024-01-15-我的第一篇文章.md`
