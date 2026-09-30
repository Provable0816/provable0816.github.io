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

## 引用其他 Markdown 文件（不进入文章列表）

长报告想拆成「主文档 + 若干子文档」时，把子文档放进 `posts/`（放进子目录也可以，
例如 `posts/Agent记忆papers/`），但**不要**登记进 `index.json`，
然后在主文档正文里像平常一样写相对链接：

```markdown
[逐篇深读](逐篇第一性原理深读与批判性评估.md)
[某一节](另一个文件.md#小节标题)
[总索引](Agent记忆papers/papers.md)
```

- 渲染时这类链接会被自动改写成站内路由 `#/post/<文件路径>`，点击就在本站打开子文档页面，
  而不是跳到原始的 `.md` 文本；链接路径按**相对 `posts/`** 解析（子目录内的文件互相引用，
  写法相同），`[文字](文件名.md)`、`[文字](posts/子目录/文件名.md)` 两种写法都行，
  文件名和目录名带中文也可以。
- 子文档因为没进 `index.json`，不会出现在博客列表、首页「最新文章」和上一篇/下一篇里。
- 子文档放在 `posts/` 下或它的任意子目录里都行，记得一起 `git push`。
- 子文档没有 frontmatter 也能打开：页面标题会取正文里第一个 `# 一级标题`，日期留空。
- 文章页顶部的「返回」指向**进入本页时的上级**，并且保持稳定：从另一篇文章点进来就显示
  「← 返回 <那篇文章标题>」，从文章列表进来或直接用链接打开则显示「← 返回文章列表」。
  它记录的是「进入路线」而不是「上一页」——沿 A → B → C 一路点下去后，从 C 退回 B 时，
  B 的返回键仍指向 A（不会反过来指向 C），逐级退回看到的始终是同一套上级关系。
- 「返回」以及**浏览器后退**都会恢复上一篇的阅读位置（滚动到离开时的位置），
  正常点链接进入新文章仍从顶部开始；带 `#小节` 的链接则以小节定位为准。
- 正文里的页内锚点 `[文字](#小节标题)` 也能用：点击平滑滚到该标题，地址栏变成
  `#/post/<所在文档>#<小节>`，可以直接把带小节的链接分享给别人。

支持的格式看 [posts/markdown-and-latex-guide.md](posts/markdown-and-latex-guide.md)：
表格、任务清单、代码高亮、行内公式 `$...$` / `\(...\)`、独立公式 `$$...$$` / `\[...\]`、
多行对齐（`aligned`）、矩阵（`pmatrix`）、分段函数（`cases`）等。

文章里的图片放到 `assets/`，在正文中用 `![说明](assets/xxx.png)` 引用。

## 直接上传 HTML 文档

导出的整份 HTML（自带 `<style>`，甚至 CDN 上的 Tailwind 之类靠脚本生成样式的）可以原样放进博客，
**和 markdown 文章并存**。把文件放进 `posts/`（或子目录）后，二选一：

1. **登记进 `index.json`**：`slug` 写文件名去掉 `.html` 的部分，它就会和 markdown 文章一起
   出现在博客列表、首页「最新文章」里；
2. **不登记**：在主文档里写链接 `[对比报告](航空视景系统对比.html)` 引用它，点链接在站内打开——
   写法和引用 `.md` 完全一样（`.md` 链接会去掉扩展名，`.html` 链接保留扩展名以便区分）。

渲染时这类文档放在**沙箱 iframe** 里原样呈现：它自带的样式与脚本（含 Tailwind 这类 CDN 依赖）
只作用于自己，不会影响本站排版，深色主题下也保持它原本的配色；iframe 高度按内容自动撑开，
上方另给一个「在新窗口打开原始文件」的链接。

两点差异要知道：HTML 文档**没有左侧目录**（目录只对 markdown 正文生效）；页面标题会取
`index.json` 里的 `title`，没有登记时取文档自己的 `<title>`。

## 讨论区（giscus · 评论存在 GitHub Discussions）

每篇文章末尾（上一篇/下一篇之前）会挂一个 giscus 评论区，评论直接存在本仓库的
**Discussions** 里，读者用 GitHub 账号登录后即可发言。

**前置条件：给仓库装上 giscus 应用** —— 打开 <https://github.com/apps/giscus> 点 Install，
选中本仓库即可（只装这一个仓库就够）。没装的话评论区会显示
`giscus is not installed on this repository`。

配置集中在 `js/main.js` 顶部的 `GISCUS` 常量：

| 项 | 当前值 | 说明 |
| --- | --- | --- |
| `repo` / `repoId` | `Provable0816/provable0816.github.io` / `R_kgDOSAcryw` | 评论存放的仓库 |
| `category` / `categoryId` | `Announcements` / `DIC_kwDOSAcry84DGuqL` | 讨论分类，想换成 `General`、`Q&A` 等改这两项即可 |

两个实现要点：

- 站内路由跑在 `location.hash` 上，所有文章的 URL 路径都是 `/`，所以用
  `data-mapping="specific"` + `data-term=<文章 slug>` 来区分——**别改已发文章的 slug，
  也别在 GitHub 上重命名对应的讨论**，否则评论会「搬」到新讨论去。
- 讨论区只挂在**登记进 `index.json`** 的文章上；`posts/Agent记忆papers/` 里那 200 多篇
  子文档不挂，免得每被打开一次就在 Discussions 里新建一个讨论。要给它们也开的话，
  把 `viewPost()` 里 `commentsHtml` 的判断条件去掉即可。

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
- **新增文章列表没出现 / 改动没生效**：确认 `index.json` 是合法 JSON（注意逗号），并强刷（Ctrl+F5）；`index.html` 里 `style.css` 与 `main.js` 的引用都带了 `?v=` 版本号，改动这两个文件后把它俩的版本号一起加一，可以强制访客同时更新样式和脚本（版本号不一致会出现「新脚本 + 旧样式」的中间状态）。
- **中文加粗失效**：`**"xxx"**`、`**（xx）**` 这类紧邻中文标点的写法受 CommonMark「侧翼规则」影响，本站已在渲染层自动修复（插入不可见的零宽空格），直接写即可；但 `__下划线加粗__` 在中文词组中间仍会被规范判定为普通文本，建议统一用 `**`。
- **加粗内容复制出来多了看不见的字符**：上述修复会在个别标点旁插入零宽空格（U+200B），显示无影响，纯文本粘贴时可能带出，属正常现象。
