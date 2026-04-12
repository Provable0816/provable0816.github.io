# GitHub Pages Jekyll 个人网站模板

一个完整的、带详细注释的 GitHub Pages + Jekyll 网站模板，可以直接上传到 GitHub 仓库并通过 github.io 访问。

## 📁 项目结构

```
github-pages-jekyll-site/
├── _config.yml              # 站点配置文件（修改网站标题、作者等信息）
├── index.md                 # 首页内容
├── about.md                 # 关于页面
├── blog.md                  # 博客列表页面
├── _posts/                  # 博客文章目录
│   └── 2024-01-15-我的第一篇文章.md  # 示例文章
├── _layouts/                # 布局模板
│   ├── home.html           # 首页布局
│   ├── page.html           # 普通页面布局
│   └── post.html           # 文章页面布局
├── assets/                  # 静态资源
│   ├── css/
│   │   └── style.css       # 样式文件
│   └── js/                  # JavaScript 文件（可选）
└── README.md                # 本说明文件
```

## 🚀 快速开始

### 步骤 1：创建 GitHub 仓库

1. 登录 GitHub
2. 创建新仓库，命名格式为：`你的用户名.github.io`
   - 例如：如果用户名是 `zhangsan`，仓库名应为 `zhangsan.github.io`
3. 仓库设置为**公开**（免费账户）

### 步骤 2：上传文件

**方法 A：通过 Git 命令行**

```bash
# 克隆您的仓库
git clone https://github.com/你的用户名/你的用户名.github.io.git

# 进入仓库目录
cd 你的用户名.github.io

# 将此项目的所有文件复制到仓库目录
# （复制 _config.yml, index.md, about.md, blog.md, _posts/, _layouts/, assets/ 等）

# 添加并提交文件
git add .
git commit -m "初始化 Jekyll 网站"
git push
```

**方法 B：通过 GitHub 网页上传**

1. 在 GitHub 仓库页面点击 "Add file" → "Upload files"
2. 将所有文件拖拽上传
3. 填写提交信息并点击 "Commit changes"

### 步骤 3：等待构建

上传后，GitHub 会自动构建您的网站：

1. 等待约 1-2 分钟
2. 访问 `https://你的用户名.github.io`
3. 您的网站应该已经上线！

### 步骤 4：配置 GitHub Pages（如果需要）

如果网站没有自动发布：

1. 进入仓库 **Settings** → **Pages**
2. 在 **Source** 下选择：
   - Branch: `main` (或 `master`)
   - Folder: `/ (root)`
3. 点击 **Save**

## 📝 自定义配置

### 修改网站信息

编辑 `_config.yml` 文件：

```yaml
title: "我的个人网站"           # 网站标题
description: "网站描述"         # 网站描述
author: "你的名字"             # 作者名称
email: "your-email@example.com" # 联系邮箱
```

### 修改导航菜单

在 `_config.yml` 中编辑 `navigation` 部分：

```yaml
navigation:
  - name: "首页"
    url: "/"
  - name: "关于"
    url: "/about/"
  - name: "博客"
    url: "/blog/"
  # 添加更多菜单项...
```

### 修改首页内容

编辑 `index.md` 文件，直接修改 Markdown 内容。

### 添加新页面

1. 在根目录创建新文件，如 `contact.md`
2. 添加 Front Matter：
   ```yaml
   ---
   layout: page
   title: "联系我"
   permalink: /contact/
   ---
   ```
3. 在下方编写内容
4. 在 `_config.yml` 的 `navigation` 中添加菜单项

### 添加博客文章

1. 在 `_posts` 文件夹创建新文件
2. **文件名格式**：`YYYY-MM-DD-文章标题.md`
   - 例如：`2024-01-20-我的新技术学习.md`
3. 添加 Front Matter：
   ```yaml
   ---
   layout: post
   title: "文章标题"
   date: 2024-01-20 12:00:00 +0800
   categories: [分类 1, 分类 2]
   tags: [标签 1, 标签 2]
   description: "文章简介"
   ---
   ```
4. 编写文章内容
5. 推送到 GitHub

### 修改样式

编辑 `assets/css/style.css` 文件。

**快速修改主题颜色**：

```css
:root {
    --primary-color: #0366d6;        /* 主色调 */
    --background-color: #ffffff;     /* 背景色 */
    --text-color: #24292e;           /* 文字颜色 */
    /* ... 修改这些值 */
}
```

## 🔧 本地测试（可选）

如果您想在发布前本地预览网站：

### 安装 Ruby 和 Jekyll

```bash
# macOS (使用 Homebrew)
brew install ruby
gem install bundler jekyll

# Ubuntu/Debian
sudo apt install ruby-full build-essential
gem install bundler jekyll
```

### 本地运行

```bash
# 进入项目目录
cd github-pages-jekyll-site

# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

## 📋 文件说明

| 文件/文件夹 | 说明 |
|------------|------|
| `_config.yml` | 站点配置文件，包含网站标题、作者、导航等 |
| `index.md` | 首页内容 |
| `about.md` | 关于页面 |
| `blog.md` | 博客列表页面 |
| `_posts/` | 博客文章目录 |
| `_layouts/` | 页面布局模板 |
| `assets/css/` | CSS 样式文件 |
| `assets/js/` | JavaScript 文件（可选） |

## 🎨 主题切换

如果想使用其他 GitHub Pages 主题，修改 `_config.yml`：

```yaml
# 可用主题：minimal, cayman, time-machine, slate, etc.
remote_theme: pages-themes/cayman@v0.2.0
```

更多主题查看：[GitHub Pages Themes](https://pages.github.com/themes/)

## ❓ 常见问题

### 网站没有更新？

- 检查 GitHub Actions 是否完成构建
- 清除浏览器缓存
- 等待 1-2 分钟

### 图片如何添加？

1. 在 `assets/images/` 目录上传图片
2. 在 Markdown 中使用：`![描述](/assets/images/图片名.jpg)`

### 如何绑定自定义域名？

1. 在仓库根目录创建 `CNAME` 文件
2. 内容为您的域名：`example.com`
3. 在域名 DNS 设置中添加 CNAME 记录

## 📚 参考资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Jekyll 官方文档](https://jekyllrb.com/docs/)
- [GitHub Pages 主题](https://pages.github.com/themes/)
- [Markdown 语法指南](https://www.markdownguide.org/)

## 📄 许可证

MIT License - 可自由使用和修改

---

**祝您建站愉快！** 🎉

如有问题，欢迎在 GitHub 上提 Issue。
