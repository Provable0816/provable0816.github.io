# provable0816 · 个人主页与技术博客

一个纯静态的个人站点：**首页介绍、关于页、支持 Markdown 与 LaTeX 公式的技术博客**。
没有构建步骤、没有框架依赖，把仓库推到 GitHub Pages 即可上线。

## 目录结构

```
├── index.html              # 站点外壳（导航、页脚、CDN 脚本）
├── about.md                # 「关于」页内容 —— 换成你自己的介绍
├── css/style.css           # 全部样式（配色 / 深浅主题 / 排版）
├── js/main.js              # 路由、页面渲染、Markdown + KaTeX 管线
├── assets/                 # 头像、favicon、文章图片都放这里
├── posts/
│   ├── index.json          # 文章清单（标题 / 日期 / 标签）
│   └── *.md                # 博客文章
└── .nojekyll               # 让 GitHub Pages 原样托管静态文件
```

## 如何写一篇新文章（两步）

1. 在 `posts/` 下新建 `my-post.md`，开头写 frontmatter：

   ```markdown
   ---
   title: 文章标题
   date: 2026-09-07
   tags: 标签一, 标签二
   ---

   正文，随便写 Markdown 和 $LaTeX$ 公式。
   ```

2. 在 `posts/index.json` 的数组里登记一条：

   ```json
   { "slug": "my-post", "title": "文章标题", "date": "2026-09-07",
     "tags": ["标签一", "标签二"], "description": "列表页显示的一句话摘要" }
   ```

   `slug` 就是文件名（不带 `.md`），列表按 `date` 倒序排列。

支持的格式看 [posts/markdown-and-latex-guide.md](posts/markdown-and-latex-guide.md)：
表格、任务清单、代码高亮、行内公式 `$...$` / `\(...\)`、独立公式 `$$...$$` / `\[...\]`、
多行对齐（`aligned`）、矩阵（`pmatrix`）、分段函数（`cases`）等。

文章里的图片放到 `assets/`，在正文中用 `![说明](assets/xxx.png)` 引用。

## 本地预览

浏览器禁止 `file://` 页面读取本地文件，**必须走 HTTP**：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

> 公式渲染、代码高亮用的库（KaTeX / marked / highlight.js）走 CDN，
> 预览和部署后的站点都需要联网加载。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，名字用 **`<你的用户名>.github.io`**（主页仓库），或任意名字（项目页）。
2. 把本目录全部文件推上去：

   ```bash
   git init
   git add -A
   git commit -m "init: personal site"
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git branch -M main
   git push -u origin main
   ```

3. 打开仓库 **Settings → Pages**，Source 选 `Deploy from a branch`，分支选 `main` / 根目录，保存。
4. 一两分钟后访问：
   - 主页仓库：`https://<你的用户名>.github.io`
   - 项目页：`https://<你的用户名>.github.io/<仓库名>/`（无需任何配置，站内路由兼容子路径）

## 个性化清单

- `js/main.js` 顶部 `SITE`：站名、首页副标题、GitHub 链接
- `about.md`：自我介绍（头像引用也在里面）
- `assets/avatar.svg`：换成自己的照片（建议 `avatar.jpg`，并同步修改 `about.md` 里的路径）
- `index.html`：`<title>` 与 meta 描述
- 配色在 `css/style.css` 顶部 `:root` / `[data-theme="dark"]` 变量里

## 常见问题

- **页面空白 / 报「无法加载」**：九成是直接双击打开了 `index.html`，请用上面的本地服务器方式预览。
- **公式显示红色源码**：KaTeX 遇到不认识的命令时默认显示红色原文而非报错中断，检查公式拼写即可。
- **新增文章列表没出现 / 改动没生效**：确认 `index.json` 是合法 JSON（注意逗号），并强刷（Ctrl+F5）；`index.html` 里脚本引用带了 `?v=` 版本号，改动 `main.js` 后把它加一可以强制访客更新。
- **中文加粗失效**：`**"xxx"**`、`**（xx）**` 这类紧邻中文标点的写法受 CommonMark「侧翼规则」影响，本站已在渲染层自动修复（插入不可见的零宽空格），直接写即可；但 `__下划线加粗__` 在中文词组中间仍会被规范判定为普通文本，建议统一用 `**`。
- **加粗内容复制出来多了看不见的字符**：上述修复会在个别标点旁插入零宽空格（U+200B），显示无影响，纯文本粘贴时可能带出，属正常现象。
