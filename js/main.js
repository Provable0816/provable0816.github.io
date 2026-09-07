/* ==========================================================================
   provable0816 — 站点逻辑
   纯静态单页应用：hash 路由 + Markdown/LaTeX 渲染，无构建步骤，
   直接部署到 GitHub Pages 即可使用。
   ========================================================================== */

/* ------------------------ 站点配置：改成你自己的 ------------------------ */
const SITE = {
  name: 'provable0816',
  heroSub: '这里是我的公开笔记本 —— 写工程、写公式、也写思考。文章用 Markdown 书写，公式由 KaTeX 渲染。',
  github: 'https://github.com/provable0816',
};

/* ------------------------------ 小工具 ------------------------------ */

const $app = document.getElementById('app');

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function readingTime(text) {
  const t = text.replace(/```[\s\S]*?```/g, ' ').replace(/~~~[\s\S]*?~~~/g, ' ');
  const cjk = (t.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) || []).length;
  const words = (t.replace(/[\u3400-\u4dbf\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  return Math.max(1, Math.round(cjk / 380 + words / 200));
}

/* ------------------------------ 主题切换 ------------------------------ */

(function initTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) {
    document.documentElement.dataset.theme = stored;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.dataset.theme = 'dark';
  }
})();

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});

/* ------------------------------ 页头滚动效果 ------------------------------ */

const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

/* ==========================================================================
   Markdown + LaTeX 渲染管线
   问题：marked 会把公式里的 _ { } * 等当作 Markdown 语法破坏掉，
   所以先用一个扫描器把公式提取成占位符（跳过代码块/行内代码），
   Markdown 解析完再还原，最后交给 KaTeX 渲染。
   ========================================================================== */

/**
 * 扫描 Markdown 源码，把数学公式替换为 N 占位符。
 * 支持：$$...$$（独立）、\[...\]（独立）、\(...\)（行内）、$...$（行内）。
 * 代码围栏（``` / ~~~）与行内代码里的内容原样保留，不会被当作公式。
 */
function extractMath(src) {
  const segs = [];
  const N = src.length;
  let out = '';
  let i = 0;
  const atLineStart = (p) => p === 0 || src[p - 1] === '\n';
  const placeholder = () => '\uE000' + (segs.length - 1) + '\uE001';
  const push = (tex, display) => { segs.push({ tex, display }); out += placeholder(); };

  // 找行内 $ 的合法闭合（Pandoc 规则的简化版）
  const findInlineDollar = (from) => {
    for (let p = from; p < N; p++) {
      const ch = src[p];
      if (ch === '\n' && (src[p + 1] === '\n' || (src[p + 1] === ' ' && src[p + 2] === '\n'))) return -1;
      if (ch !== '$') continue;
      let bs = 0, q = p - 1;
      while (q >= 0 && src[q] === '\\') { bs++; q--; }
      if (bs % 2 === 1) continue;                       // \$ 转义
      if (src[p - 1] && /\s/.test(src[p - 1])) continue; // 闭合 $ 前不能是空白
      if (src[p + 1] === '$') continue;                  // 是 $$ 的一部分
      if (src[p + 1] && /\d/.test(src[p + 1])) continue; // $100 货币
      return p;
    }
    return -1;
  };

  while (i < N) {
    /* ---- 代码围栏：整段原样复制 ---- */
    if (atLineStart(i)) {
      let j = i, sp = 0;
      while (src[j] === ' ' && sp < 3) { j++; sp++; }
      const c = src[j];
      if ((c === '`' || c === '~') && src[j + 1] === c && src[j + 2] === c) {
        let k = j;
        while (src[k] === c) k++;
        const runLen = k - j;
        const eol = src.indexOf('\n', i);
        if (eol === -1) { out += src.slice(i); break; }
        out += src.slice(i, eol + 1);
        i = eol + 1;
        while (i < N) {
          const leol = src.indexOf('\n', i);
          const line = leol === -1 ? src.slice(i) : src.slice(i, leol + 1);
          const bare = line.replace(/\r?\n$/, '');
          let a = 0; while (bare[a] === ' ' && a < 3) a++;
          let b = a; while (bare[b] === c) b++;
          if (b - a >= runLen && /^[\t ]*$/.test(bare.slice(b))) {
            out += line; i += line.length;
            break;
          }
          out += line; i += line.length;
          if (leol === -1) break;
        }
        continue;
      }
    }

    /* ---- 行内代码 span：整段原样复制，里面的 $ 不当公式 ---- */
    if (src[i] === '`') {
      let k = 0;
      while (src[i + k] === '`') k++;
      const lineEnd = src.indexOf('\n', i);
      const stop = lineEnd === -1 ? N : lineEnd;
      let j = i + k, found = -1;
      while (j < stop) {
        if (src[j] === '`') {
          let m = 0;
          while (src[j + m] === '`') m++;
          if (m === k) { found = j + k; break; }
          j += m;
          continue;
        }
        j++;
      }
      if (found !== -1) { out += src.slice(i, found); i = found; }
      else { out += src.slice(i, stop); i = stop; }
      continue;
    }

    /* ---- 强调分隔符的中文侧翼修复 ----
       CommonMark 规定：`**` 后面紧跟标点（如 **"xxx"**、**（xx）**）且前面是汉字时
       无法开启加粗，会原样输出星号。这里在分隔符内侧插入一个零宽空格（U+200B，
       对 marked 既不算空白也不算标点），让侧翼判定通过。仅处理非代码区域。 */
    if (src[i] === '*' || src[i] === '~') {
      const c = src[i];
      let k = 0;
      while (src[i + k] === c) k++;
      const prev = i > 0 ? src[i - 1] : undefined;
      const next = src[i + k];
      const P = /[\p{P}\p{S}]/u;
      const L = /[\p{L}\p{N}\uE000-\uF8FF\u200B]/u; // 字母类（含数学占位符/已有零宽空格）
      const run = src.slice(i, i + k);
      const nextIsPunct = next !== undefined && next !== '\n' && P.test(next);
      const prevIsPunct = prev !== undefined && prev !== '\n' && P.test(prev);
      if (nextIsPunct && (prev === undefined || L.test(prev))) {
        out += run + '\u200B'; // 开启侧被标点挡住 → 零宽空格放内侧
      } else if (prevIsPunct && next !== undefined && L.test(next)) {
        out += '\u200B' + run; // 关闭侧被标点挡住 → 零宽空格放内侧
      } else {
        out += run;
      }
      i += k;
      continue;
    }

    /* ---- 公式 ---- */
    if (src[i] === '$' && src[i + 1] === '$') {
      const end = src.indexOf('$$', i + 2);
      if (end !== -1) { push(src.slice(i + 2, end), true); i = end + 2; continue; }
    }
    if (src[i] === '\\' && src[i + 1] === '[') {
      const end = src.indexOf('\\]', i + 2);
      if (end !== -1) { push(src.slice(i + 2, end), true); i = end + 2; continue; }
    }
    if (src[i] === '\\' && src[i + 1] === '(') {
      const end = src.indexOf('\\)', i + 2);
      if (end !== -1) { push(src.slice(i + 2, end), false); i = end + 2; continue; }
    }
    if (src[i] === '$' && (i === 0 || src[i - 1] !== '\\')) {
      const nxt = src[i + 1];
      if (nxt && !/\s/.test(nxt)) {
        const close = findInlineDollar(i + 1);
        if (close !== -1) { push(src.slice(i + 1, close), false); i = close + 1; continue; }
      }
    }

    out += src[i];
    i++;
  }
  return { text: out, segs };
}

/** 把占位符换回 <span class="math-*">（TeX 内容做 HTML 转义） */
function restoreMath(html, segs) {
  return html.replace(/\uE000(\d+)\uE001/g, (_, idx) => {
    const seg = segs[Number(idx)];
    if (!seg) return '';
    const esc = seg.tex
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<span class="${seg.display ? 'math-block' : 'math-inline'}">${esc}</span>`;
  });
}

/** Markdown → HTML（含公式保护、DOMPurify 净化） */
function renderMarkdown(md) {
  const { text, segs } = extractMath(md);
  let html = marked.parse(text, { gfm: true, breaks: false });
  html = DOMPurify.sanitize(html, { ADD_ATTR: ['target', 'rel'] });
  return restoreMath(html, segs);
}

/** innerHTML 之后的增强：代码高亮、KaTeX 渲染、外链新窗口打开 */
function enhanceContent(container) {
  container.querySelectorAll('pre code').forEach((el) => {
    if (window.hljs) { try { hljs.highlightElement(el); } catch (_) { /* ignore */ } }
  });
  container.querySelectorAll('.math-inline, .math-block').forEach((el) => {
    if (!window.katex) return;
    const display = el.classList.contains('math-block');
    try {
      katex.render(el.textContent, el, { displayMode: display, throwOnError: false, strict: false });
    } catch (err) {
      el.textContent = err.message || String(err);
    }
  });
  container.querySelectorAll('a[href^="http"]').forEach((a) => {
    try { if (new URL(a.href).host !== location.host) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } } catch (_) { /* ignore */ }
  });
}

/* ------------------------------ Frontmatter ------------------------------ */

function parseFrontmatter(md) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(md);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([\w-]+)\s*:\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: md.slice(m[0].length) };
}

function normalizeTags(raw) {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') return raw.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  return [];
}

/* ------------------------------ 文章清单 ------------------------------ */

let manifestPromise = null;
function getManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch('posts/index.json', { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error('index.json ' + r.status); return r.json(); })
      .then((list) => {
        list.forEach((p) => { p.tags = normalizeTags(p.tags); });
        return list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
      });
  }
  return manifestPromise;
}

/* ------------------------------ 公共视图片段 ------------------------------ */

function tagsHtml(tags) {
  if (!tags || !tags.length) return '';
  return `<span class="tag-row">${tags.map((t) => `<span class="tag">#${escapeHtml(t)}</span>`).join('')}</span>`;
}

function postListHtml(items) {
  if (!items.length) {
    return `<div class="error-box"><h2>还没有文章</h2>
      <p>在 <code>posts/</code> 目录下新建一个 <code>.md</code> 文件，并在 <code>posts/index.json</code> 里登记一行，就会出现在这里。</p></div>`;
  }
  return `<ul class="post-list">${items.map((p) => `
    <li class="post-item">
      <a href="#/post/${encodeURIComponent(p.slug)}">
        <span class="post-date">${escapeHtml(p.date || '')}</span>
        <div class="post-main">
          <h3 class="post-item-title">${escapeHtml(p.title || p.slug)}</h3>
          ${p.description ? `<p class="post-item-desc">${escapeHtml(p.description)}</p>` : ''}
          ${tagsHtml(p.tags)}
        </div>
        <span class="post-item-arrow" aria-hidden="true">→</span>
      </a>
    </li>`).join('')}</ul>`;
}

function fetchErrorBox(what) {
  return `<div class="error-box"><h2>无法加载${what}</h2>
    <p>如果你是直接双击打开 <code>index.html</code>（file:// 协议），浏览器会拦截本地文件的读取。</p>
    <p>请在本目录启动一个静态服务器再访问，例如：</p>
    <p><code>python -m http.server 8000</code>，然后打开 <code>http://localhost:8000</code></p>
    <p>若部署到 GitHub Pages 后出现此错误，请检查 <code>posts/index.json</code> 是否已随仓库上传。</p></div>`;
}

/* ------------------------------ 滚动 reveal ------------------------------ */

let revealObserver = null;
function attachReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

/* ==========================================================================
   视图
   ========================================================================== */

/* ------------------------------ 首页 ------------------------------ */

async function viewHome() {
  let latest = [];
  try { latest = (await getManifest()).slice(0, 3); } catch (_) { /* 首页允许降级 */ }

  $app.innerHTML = `
  <section class="hero">
    <div class="hero-grid" aria-hidden="true"></div>
    <p class="hero-kicker rise" style="animation-delay:.05s">Personal Site · Tech Blog</p>
    <h1 class="hero-title rise" style="animation-delay:.16s">${escapeHtml(SITE.name)}</h1>
    <p class="hero-sub rise" style="animation-delay:.27s">${escapeHtml(SITE.heroSub)}</p>
    <div class="hero-actions rise" style="animation-delay:.38s">
      <a class="btn btn-solid" href="#/blog">阅读博客</a>
      <a class="btn btn-ghost" href="#/about">关于我</a>
      <a class="btn btn-ghost" href="${escapeHtml(SITE.github)}" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
    <p class="hero-note rise" style="animation-delay:.5s">∀ ε &gt; 0, ∃ δ &gt; 0 —— 慢慢写，把每件事证明给自己看。</p>
    <div class="hero-watermark" aria-hidden="true">∀ε&gt;0</div>
  </section>

  <section class="section reveal">
    <p class="section-kicker">01 / LATEST</p>
    <h2 class="section-title">最新文章</h2>
    ${postListHtml(latest)}
    <a class="more-link" href="#/blog">查看全部文章 →</a>
  </section>

  <section class="section reveal">
    <p class="section-kicker">02 / WHAT'S HERE</p>
    <h2 class="section-title">这个站点</h2>
    <ul class="feature-list">
      <li>
        <span class="feature-num">/blog</span>
        <div class="feature-body">
          <h3>技术博客</h3>
          <p>完整支持 Markdown：表格、任务清单、代码高亮、脚注式引用，文章按时间倒序排列。</p>
        </div>
      </li>
      <li>
        <span class="feature-num">LaTeX</span>
        <div class="feature-body">
          <h3>数学公式</h3>
          <p>行内公式 <span class="math-inline">E=mc^2</span> 与独立公式块都可以直接书写，由 KaTeX 排版渲染。</p>
        </div>
      </li>
      <li>
        <span class="feature-num">/about</span>
        <div class="feature-body">
          <h3>关于我</h3>
          <p>一张头像、一段自我介绍、正在做的事情与联系方式，编辑 <code>about.md</code> 即可更新。</p>
        </div>
      </li>
    </ul>
  </section>`;

  enhanceContent($app.querySelector('.feature-list'));
  attachReveal();
}

/* ------------------------------ 博客列表 ------------------------------ */

async function viewBlog() {
  $app.innerHTML = `
  <div class="page-narrow">
    <header class="post-header">
      <p class="section-kicker">BLOG</p>
      <h1>全部文章</h1>
      <div class="post-header-meta"><span id="blog-count">正在加载…</span></div>
    </header>
    <div id="blog-list"><p class="mono-dim">正在加载…</p></div>
  </div>`;
  try {
    const list = await getManifest();
    document.getElementById('blog-count').textContent =
      `共 ${list.length} 篇 · Markdown + LaTeX`;
    document.getElementById('blog-list').innerHTML = postListHtml(list);
  } catch (_) {
    document.getElementById('blog-list').innerHTML = fetchErrorBox('文章列表');
  }
}

/* ------------------------------ 文章页 ------------------------------ */

async function viewPost(slug) {
  $app.innerHTML = `
  <div class="page-narrow">
    <a class="back-link" href="#/blog">← 返回文章列表</a>
    <div id="post-body"><p class="mono-dim">正在加载…</p></div>
  </div>`;
  const body = document.getElementById('post-body');

  let listMeta = null;
  try { listMeta = (await getManifest()).find((p) => p.slug === slug) || null; } catch (_) { /* 单篇不依赖清单也能读 */ }

  let md;
  try {
    const res = await fetch('posts/' + encodeURIComponent(slug) + '.md', { cache: 'no-store' });
    if (!res.ok) throw new Error('post ' + res.status);
    md = await res.text();
  } catch (_) {
    body.innerHTML = `<div class="error-box"><h2>404 · 找不到这篇文章</h2>
      <p>检查 <code>posts/${escapeHtml(slug)}.md</code> 是否存在，文件名要与 <code>index.json</code> 里的 <code>slug</code> 一致。</p>
      <p><a href="#/blog">← 回到文章列表</a></p></div>`;
    return;
  }

  const { meta: fm, body: content } = parseFrontmatter(md);
  const title = fm.title || (listMeta && listMeta.title) || slug;
  const date = fm.date || (listMeta && listMeta.date) || '';
  const tags = fm.tags ? normalizeTags(fm.tags) : ((listMeta && listMeta.tags) || []);
  const minutes = readingTime(content);

  document.title = `${title} · ${SITE.name}`;

  // 上一篇 / 下一篇
  let nav = '';
  try {
    const list = await getManifest();
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx !== -1) {
      const older = list[idx + 1]; // 列表按时间倒序，后面的是更早的文章
      const newer = list[idx - 1]; // 前面的是更新的文章
      nav = `<nav class="post-nav">
        ${older ? `<a class="prev" href="#/post/${encodeURIComponent(older.slug)}"><span class="dir">← 更早一篇</span><span class="pn-title">${escapeHtml(older.title || older.slug)}</span></a>` : '<span></span>'}
        ${newer ? `<a class="next" href="#/post/${encodeURIComponent(newer.slug)}"><span class="dir">更新一篇 →</span><span class="pn-title">${escapeHtml(newer.title || newer.slug)}</span></a>` : '<span></span>'}
      </nav>`;
    }
  } catch (_) { /* ignore */ }

  body.innerHTML = `
    <header class="post-header">
      <p class="section-kicker">POST</p>
      <h1>${escapeHtml(title)}</h1>
      <div class="post-header-meta">
        ${date ? `<span>${escapeHtml(date)}</span><span class="dot">·</span>` : ''}
        <span>约 ${minutes} 分钟</span>
      </div>
      ${tagsHtml(tags)}
    </header>
    <article class="prose" id="prose">${renderMarkdown(content)}</article>
    ${nav}`;

  enhanceContent(document.getElementById('prose'));
}

/* ------------------------------ 关于页 ------------------------------ */

async function viewAbout() {
  $app.innerHTML = `
  <div class="page-narrow">
    <header class="post-header">
      <p class="section-kicker">ABOUT</p>
      <h1>关于我</h1>
    </header>
    <article class="prose" id="about-body"><p class="mono-dim">正在加载…</p></article>
  </div>`;
  try {
    const res = await fetch('about.md', { cache: 'no-store' });
    if (!res.ok) throw new Error('about ' + res.status);
    const md = await res.text();
    const { body } = parseFrontmatter(md);
    const el = document.getElementById('about-body');
    el.innerHTML = renderMarkdown(body);
    enhanceContent(el);
  } catch (_) {
    document.getElementById('about-body').innerHTML = fetchErrorBox('关于页（about.md）');
  }
}

/* ------------------------------ 404 ------------------------------ */

function view404() {
  $app.innerHTML = `
  <div class="page-narrow">
    <div class="error-box">
      <h2>404 · 页面不存在</h2>
      <p>这个地址没有对应的内容，<a href="#/">回到首页</a> 或去 <a href="#/blog">文章列表</a> 看看。</p>
    </div>
  </div>`;
}

/* ==========================================================================
   路由
   ========================================================================== */

function setActiveNav(key) {
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === key);
  });
}

async function route() {
  const path = location.hash.replace(/^#/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  scrollTop();
  document.title = `${SITE.name} · 个人主页与技术博客`;

  if (parts.length === 0) { setActiveNav('home'); await viewHome(); scrollTop(); return; }
  if (parts[0] === 'blog') { setActiveNav('blog'); await viewBlog(); scrollTop(); return; }
  if (parts[0] === 'about') { setActiveNav('about'); await viewAbout(); scrollTop(); return; }
  if (parts[0] === 'post' && parts[1]) { setActiveNav('blog'); await viewPost(decodeURIComponent(parts[1])); scrollTop(); return; }
  setActiveNav(''); view404();
}

/** 路由切换后回到顶部；内容是异步插入的，插入后再补一次 */
function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

window.addEventListener('hashchange', route);
route();

/* ------------------------------ 页脚 ------------------------------ */

document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
document.getElementById('footer-github').href = SITE.github;
