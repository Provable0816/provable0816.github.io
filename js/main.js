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
const toTopBtn = document.getElementById('to-top');
function syncToTop() {
  // 往下读过大约一屏才显示「回到顶部」
  if (toTopBtn) toTopBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.8);
}
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);
  syncToTop();
}, { passive: true });

// 平滑回顶交给 CSS 的 scroll-behavior: smooth
if (toTopBtn) toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, left: 0 }));

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
  rewriteDocLinks(container);
  container.querySelectorAll('a[href^="http"]').forEach((a) => {
    try { if (new URL(a.href).host !== location.host) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } } catch (_) { /* ignore */ }
  });
}

/* ------------------------------ 文档互链 ------------------------------
   写文章时可以直接用相对路径引用 posts/ 里的另一个 .md 文件：

     [配套深读](逐篇第一性原理深读与批判性评估.md)
     [某一节](另一个文件.md#小节标题)

   被引用的文件**不需要**登记进 posts/index.json，因此不会出现在文章列表、
   首页「最新文章」和上一篇/下一篇里；链接会在渲染后被改写成站内路由
   #/post/<slug>，点击即在本站渲染该文件，而不是跳到原始的 .md 文本。
   另外，正文里形如 [x](#小节标题) 的站内锚点也在这里接管 —— 如果交给浏览器
   默认行为，它会顶掉 hash 路由，被误判成一篇文章而显示 404。
   ---------------------------------------------------------------------- */

const POST_DIR = 'posts/';
const MD_LINK_RE = /\.md$/i;
const DOC_LINK_RE = /\.(md|html)$/i; // 站内文档：.md 与上传的 .html

/** decodeURIComponent，遇到坏编码就原样返回 */
function dec(s) {
  try { return decodeURIComponent(s); } catch (_) { return s; }
}

/** 把指向 posts/*.md 的链接换算成站内路由；返回 null 表示无需改写 */
function docLinkToRoute(rawHref) {
  let h = String(rawHref || '').trim();
  if (!h || h.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(h)) return null; // 锚点 / 绝对 URL / mailto

  let frag = '';
  const cut = h.indexOf('#');
  if (cut !== -1) { frag = h.slice(cut + 1); h = h.slice(0, cut); }
  h = h.split('?')[0];
  if (!DOC_LINK_RE.test(h)) return null; // 只接管 .md / .html，图片、PDF 等原样保留

  h = h.replace(/^\.\//, '').replace(/^\/+/, '');
  const at = h.lastIndexOf(POST_DIR);
  if (at !== -1) h = h.slice(at + POST_DIR.length);

  // 路径按「相对 posts/」解析，支持子目录：
  // 主文档在 posts/ 下写 Agent记忆papers/papers.md → #/post/Agent记忆papers/papers
  const segs = [];
  for (const seg of h.split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') { segs.pop(); continue; } // 只向上退一层，逃不出 posts/
    segs.push(seg);
  }
  if (!segs.length) return null;
  // .md 去掉扩展名（既有链接与路由保持不变）；.html 保留扩展名，取文时才分得清
  segs[segs.length - 1] = segs[segs.length - 1].replace(MD_LINK_RE, '');
  if (!segs[segs.length - 1]) return null;

  const slug = segs.map(dec).join('/');
  if (!slug) return null;
  return '#/post/' + slug.split('/').map(encodeURIComponent).join('/') + (frag ? '#' + frag : '');
}

/** 路由里的 slug 归一化：按段解码，丢掉空段与 . / ..（不允许越出 posts/） */
function normalizeSlug(raw) {
  return String(raw || '').split('/')
    .filter((seg) => seg && seg !== '.' && seg !== '..')
    .map(dec)
    .join('/');
}

function rewriteDocLinks(container) {
  container.querySelectorAll('a[href]').forEach((a) => {
    const routeHref = docLinkToRoute(a.getAttribute('href'));
    if (routeHref) a.setAttribute('href', routeHref);
  });
}

/** 宽松归一：只留字母/数字/汉字，忽略空格、全角空格、标点、连字符 */
function looseKey(text) {
  return String(text).trim().toLowerCase().replace(/[^\w\u3400-\u4dbf\u4e00-\u9fff]/g, '');
}

/** 解析 #片段：先按 id 命中，再按标题文本匹配（兼容手写的目录链接） */
function resolveAnchor(frag) {
  if (!frag) return null;
  let key = frag;
  try { key = decodeURIComponent(frag); } catch (_) { /* ignore */ }

  const scope = document.getElementById('prose') || document;
  const direct = document.getElementById(key);
  if (direct && scope.contains(direct)) return direct;

  const want = slugifyHeading(key);
  const loose = looseKey(key);
  if (!want && !loose) return null;
  const nodes = [...scope.querySelectorAll('[id], h1, h2, h3, h4, h5, h6')];
  for (const el of nodes) {
    if (el.id && (slugifyHeading(el.id) === want || (loose && looseKey(el.id) === loose))) return el;
  }
  for (const el of nodes) {
    if (!/^H[1-6]$/.test(el.tagName)) continue;
    if (slugifyHeading(el.textContent) === want) return el;
    if (loose && looseKey(el.textContent) === loose) return el;
  }
  return null;
}

/** 滚动到锚点：标题上已有 scroll-margin-top，正好让开顶部固定导航 */
function scrollToAnchor(frag) {
  const el = resolveAnchor(frag);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
  if (!a) return;

  // 「跳到正文」（#app）：改为直接聚焦，避免 #app 被路由当成页面地址
  if (a.classList.contains('skip-link')) { e.preventDefault(); $app.focus(); return; }

  // 「← 返回」：放行 hash 变化，只置标志，让路由回来后恢复上一篇的阅读位置
  if (a.classList.contains('back-link')) { restoreScrollOnNextRoute = true; return; }

  const href = a.getAttribute('href') || '';
  if (!a.closest('.prose') || !href.startsWith('#') || href.startsWith('#/')) return;
  e.preventDefault();
  if (!scrollToAnchor(href.slice(1))) return;

  // 顺手把地址栏更新成可分享的深链 #/post/<slug>#<片段>
  // 带上 history.state，别把历史条目的序号（判断前进/后退用）冲掉
  const seg = location.hash.slice(1).split('#');
  if (/^\/post\//.test(seg[0])) history.replaceState(history.state, '', '#' + seg[0] + href);
});

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

/** 取正文里第一个一级标题：子文档常常没有 frontmatter，用它当页面标题 */
function firstHeading(md) {
  const m = /^#[ \t]+(.+?)[ \t]*$/m.exec(md);
  return m ? m[1].trim() : '';
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

/* ------------------------------ 文章目录 ------------------------------ */

const TOC_SELECTOR = 'h2, h3'; // 收录哪些标题；只想收二级标题就改成 'h2'
const TOC_MIN_ITEMS = 3;       // 标题少于这个数量就不单开一栏

let tocState = null;

/** 标题文本 → 可用作 id 的短串（保留中英文与数字） */
function slugifyHeading(text) {
  return String(text).trim().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u3400-\u4dbf\u4e00-\u9fff-]/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function renderTocList(nodes, depth) {
  const lis = nodes.map((n) => {
    const kids = n.children && n.children.length ? renderTocList(n.children, depth + 1) : '';
    return `<li><button type="button" class="toc-link" data-toc="${escapeHtml(n.id)}">${escapeHtml(n.text)}</button>${kids}</li>`;
  });
  return `<ul class="toc-l${depth}">${lis.join('')}</ul>`;
}

/**
 * 把正文标题渲染成左侧目录。
 * 本站路由跑在 location.hash 上，所以目录项用 button + scrollIntoView，
 * 而不是 <a href="#id">——否则滚动会改掉 hash，被路由当成页面跳转。
 */
function mountToc(article, aside) {
  tocState = null;
  if (!article || !aside) return;
  const heads = [...article.querySelectorAll(TOC_SELECTOR)].filter((h) => h.textContent.trim());
  if (heads.length < TOC_MIN_ITEMS) return;

  const used = new Set();
  const tree = [];
  const flat = [];

  heads.forEach((h, i) => {
    let id = h.id;
    if (!id || used.has(id)) {
      const base = slugifyHeading(h.textContent) || `section-${i + 1}`;
      id = base;
      let n = 1;
      while (used.has(id)) id = `${base}-${++n}`;
      h.id = id;
    }
    used.add(id);

    const item = { id, level: h.tagName === 'H2' ? 1 : 2, text: h.textContent.trim(), el: h, btn: null };
    flat.push(item);
    // h3 挂到前一个 h2 之下；若文章开头就是 h3，就当作顶层
    if (item.level === 2 && tree.length) tree[tree.length - 1].children.push(item);
    else tree.push({ ...item, children: [] });
  });

  aside.innerHTML = `<p class="post-toc-title">目录</p>${renderTocList(tree, 1)}`;

  const buttons = [...aside.querySelectorAll('.toc-link')];
  if (buttons.length !== flat.length) return; // 理论上不会，保险起见
  flat.forEach((it, i) => { it.btn = buttons[i]; });

  const layout = aside.closest('.post-layout');
  if (layout) layout.classList.add('has-toc');
  tocState = { aside, items: flat, active: null };

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => { flat[i].el.scrollIntoView(); });
  });

  updateTocActive();
}

/** 滚动时高亮当前所在的小节 */
function updateTocActive() {
  if (!tocState) return;
  const { aside, items } = tocState;
  if (!document.body.contains(aside)) { tocState = null; return; }

  const offset = (siteHeader ? siteHeader.offsetHeight : 64) + 24;
  let current = items[0];
  for (const it of items) {
    if (it.el.getBoundingClientRect().top <= offset) current = it;
    else break;
  }
  if (tocState.active === current.id) return;
  tocState.active = current.id;

  items.forEach((it) => {
    const on = it === current;
    it.btn.classList.toggle('active', on);
    if (on) it.btn.setAttribute('aria-current', 'location');
    else it.btn.removeAttribute('aria-current');
  });

  // 让高亮项留在目录自身的可视范围内（只动目录的滚动，不影响页面）
  const b = current.btn.getBoundingClientRect();
  const box = aside.getBoundingClientRect();
  if (b.top < box.top) aside.scrollTop -= box.top - b.top + 10;
  else if (b.bottom > box.bottom) aside.scrollTop += b.bottom - box.bottom + 10;
}

let tocRaf = 0;
window.addEventListener('scroll', () => {
  if (tocRaf) return;
  tocRaf = requestAnimationFrame(() => { tocRaf = 0; updateTocActive(); });
}, { passive: true });

/* ------------------------------ HTML 文档 ------------------------------ */

/** 从上传的 HTML 文档里取 <title> */
function htmlTitle(html) {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

/** 粗略去掉标签、脚本与样式，用于估算 HTML 文档的阅读时长 */
function htmlToText(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

/** 取文档内容：slug 不带扩展名时先按 .md 找、再退到 .html */
async function fetchDoc(slug) {
  const base = 'posts/' + slug.split('/').map(encodeURIComponent).join('/');
  const urls = DOC_LINK_RE.test(slug) ? [base] : [base + '.md', base + '.html'];
  for (const url of urls) {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) return { url, text: await res.text(), html: /\.html$/i.test(url) };
  }
  throw new Error('404 ' + base);
}

let htmlDocFit = null;

/**
 * 上传的 HTML 文档用沙箱 iframe 原样呈现。导出的整份文档常自带 <style>、
 * 甚至 CDN 上的 Tailwind 之类（靠脚本生成样式），直接注入正文会重绘整个站点，
 * 放在沙箱里则它自己的样式与脚本只作用于它自己，本站排版不受影响。
 */
function mountHtmlDoc(container, doc) {
  if (htmlDocFit) { window.removeEventListener('resize', htmlDocFit); htmlDocFit = null; }

  const frame = document.createElement('iframe');
  frame.className = 'html-doc';
  frame.title = htmlTitle(doc.text) || 'HTML 文档';
  // 需要 allow-same-origin 才能读它内部高度做自适应（上传的是自己的文档，这里不把它当安全边界，
  // 沙箱的作用是隔离样式与脚本，顺带禁止它跳转或替换本站页面）
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms allow-modals');
  frame.setAttribute('referrerpolicy', 'no-referrer');
  frame.srcdoc = doc.text;
  container.appendChild(frame);

  // 高度随内容自适应，否则 iframe 会用自己的滚动条
  const fit = () => {
    if (!document.body.contains(frame)) {
      if (htmlDocFit === fit) { window.removeEventListener('resize', fit); htmlDocFit = null; }
      return false;
    }
    try {
      const d = frame.contentDocument;
      if (!d) return false;
      const h = Math.max(d.documentElement.scrollHeight, d.body ? d.body.scrollHeight : 0);
      if (h > 40) frame.style.height = h + 2 + 'px';
      return true;
    } catch (_) { return false; } // 读不到就保持现有高度
  };
  htmlDocFit = fit;
  window.addEventListener('resize', fit);
  frame.addEventListener('load', fit);
  // 布局可能要等 CDN 样式/脚本跑完才稳定，短时间内多量几次
  let ticks = 0;
  const timer = setInterval(() => { if (!fit() || ++ticks > 14) clearInterval(timer); }, 300);
}

/* ------------------------------ 文章页 ------------------------------ */

async function viewPost(slug, backHash = '') {
  // 「返回」指向进入本页时的上级文章；从列表页或深链直接进来时，仍回文章列表
  const backSlug = slugFromHash(backHash);
  let backHtml = '<a class="back-link" href="#/blog">← 返回文章列表</a>';
  if (backSlug && backSlug !== slug) {
    const fromTitle = postTitles.get(backSlug) || backSlug;
    const href = '#/post/' + backSlug.split('/').map(encodeURIComponent).join('/');
    backHtml = `<a class="back-link" href="${href}" title="${escapeHtml(fromTitle)}">← 返回 ${escapeHtml(shortTitle(fromTitle))}</a>`;
  }
  $app.innerHTML = `
  <div class="post-layout">
    <nav class="post-toc" id="post-toc" aria-label="文章目录"></nav>
    <div class="post-content">
      ${backHtml}
      <div id="post-body"><p class="mono-dim">正在加载…</p></div>
    </div>
  </div>`;
  const body = document.getElementById('post-body');

  let listMeta = null;
  try { listMeta = (await getManifest()).find((p) => p.slug === slug) || null; } catch (_) { /* 单篇不依赖清单也能读 */ }

  let doc;
  try {
    doc = await fetchDoc(slug);
  } catch (_) {
    body.innerHTML = `<div class="error-box"><h2>404 · 找不到这篇文章</h2>
      <p>检查 <code>posts/${escapeHtml(slug)}.md</code> 或 <code>posts/${escapeHtml(slug)}.html</code> 是否存在、
      是否已随仓库上传，文件名要与 <code>index.json</code> 里的 <code>slug</code> 或正文里引用的链接一致。</p>
      <p><a href="#/blog">← 回到文章列表</a></p></div>`;
    return;
  }

  const { meta: fm, body: content } = parseFrontmatter(doc.html ? '' : doc.text);
  const title = fm.title || (listMeta && listMeta.title)
    || (doc.html ? htmlTitle(doc.text) : firstHeading(content)) || slug;
  postTitles.set(slug, title); // 供子文档页的「返回上一篇」显示来路文章名
  setNotesContext(slug, title); // 随手记按文章分别记录
  const date = fm.date || (listMeta && listMeta.date) || '';
  const tags = fm.tags ? normalizeTags(fm.tags) : ((listMeta && listMeta.tags) || []);
  const minutes = readingTime(doc.html ? htmlToText(doc.text) : content);

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
    <article class="prose" id="prose">${doc.html ? '' : renderMarkdown(content)}</article>
    ${nav}`;

  const prose = document.getElementById('prose');
  if (doc.html) {
    prose.innerHTML = `<p class="mono-dim">HTML 文档，样式与脚本在沙箱里隔离呈现 ·
      <a href="${escapeHtml(doc.url)}" target="_blank" rel="noopener">在新窗口打开原始文件 ↗</a></p>`;
    mountHtmlDoc(prose, doc);
  } else {
    enhanceContent(prose);
    mountToc(prose, document.getElementById('post-toc'));
  }
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

/* ------------------------------ 随手记（本地笔记） ------------------------------
   阅读时随手记想法/问题。纯静态站点没有后端，所以笔记存在浏览器本地（localStorage），
   按文章 slug 分开存，不上传也不公开。换设备或清空站点数据会丢，面板底部提供
   「导出全部笔记」，可以把它们存成 markdown 留档。
   ------------------------------------------------------------------------------ */

const NOTES_KEY = 'blog-notes:v1';

let notesData = { posts: {}, drafts: {} };
let notesSlug = ''; // 当前文章 slug；空串表示不在文章页

const notesToggle = document.getElementById('notes-toggle');
const notesPanel = document.getElementById('notes-panel');
const notesCount = document.getElementById('notes-count');
const notesTitleEl = document.getElementById('notes-title');
const notesInput = document.getElementById('notes-input');
const notesList = document.getElementById('notes-list');
const notesHint = document.getElementById('notes-hint');
const notesScope = document.getElementById('notes-scope');
const notesExport = document.getElementById('notes-export');

function loadNotes() {
  try {
    const data = JSON.parse(localStorage.getItem(NOTES_KEY) || 'null');
    notesData = (data && typeof data === 'object' && data.posts) ? data : { posts: {}, drafts: {} };
    if (!notesData.drafts) notesData.drafts = {};
  } catch (_) { notesData = { posts: {}, drafts: {} }; }
}

function persistNotes() {
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(notesData)); } catch (_) { /* 隐私模式等：静默失败 */ }
}

function storageAvailable() {
  try { localStorage.setItem('__notes_probe', '1'); localStorage.removeItem('__notes_probe'); return true; } catch (_) { return false; }
}

function notesOf(slug) {
  const list = notesData.posts[slug];
  return Array.isArray(list) ? list : [];
}

function fmtNoteTime(ts) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function renderNotes() {
  if (!notesSlug) return;
  const list = notesOf(notesSlug);
  notesCount.textContent = String(list.length);
  notesCount.hidden = list.length === 0;
  notesList.innerHTML = list.length
    ? list.map((n) => `<li class="note-item">
        <p class="note-text">${escapeHtml(n.text)}</p>
        <p class="note-meta"><span>${fmtNoteTime(n.at)}</span>
          <button class="note-del" type="button" data-del="${escapeHtml(n.id)}">删除</button></p>
      </li>`).join('')
    : '<li class="note-empty">本篇还没有笔记</li>';
}

/** 路由切换时调用；slug 为空表示离开文章页（隐藏按钮并收起面板） */
function setNotesContext(slug, title) {
  notesSlug = slug || '';
  notesToggle.hidden = !notesSlug;
  if (!notesSlug) { closeNotes(); return; }
  notesTitleEl.textContent = title || slug;
  notesInput.value = notesData.drafts[notesSlug] || '';
  notesHint.textContent = '';
  renderNotes();
}

function openNotes() {
  notesPanel.classList.add('open');
  notesToggle.classList.add('active');
  notesToggle.setAttribute('aria-expanded', 'true');
  notesInput.focus();
}

function closeNotes() {
  notesPanel.classList.remove('open');
  notesToggle.classList.remove('active');
  notesToggle.setAttribute('aria-expanded', 'false');
}

function addNote() {
  if (!notesSlug) return;
  const text = notesInput.value.trim();
  if (!text) { notesHint.textContent = '先写点什么吧'; return; }
  const list = notesOf(notesSlug).slice();
  list.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text, at: Date.now() });
  notesData.posts[notesSlug] = list;
  delete notesData.drafts[notesSlug];
  persistNotes();
  notesInput.value = '';
  notesHint.textContent = '已保存';
  renderNotes();
  setTimeout(() => { if (notesHint.textContent === '已保存') notesHint.textContent = ''; }, 1800);
}

/** 导出全部笔记为 markdown（笔记只在本机，导出一份更保险） */
function exportNotes() {
  const slugs = Object.keys(notesData.posts).filter((s) => notesOf(s).length).sort();
  if (!slugs.length) { notesHint.textContent = '还没有任何笔记'; return; }
  const lines = ['# 博客笔记', '', `导出时间：${fmtNoteTime(Date.now())}`, ''];
  for (const s of slugs) {
    lines.push(`## ${postTitles.get(s) || s}`, '', `> slug: \`${s}\``, '');
    for (const n of notesOf(s)) lines.push(`- **${fmtNoteTime(n.at)}** ${n.text.replace(/\n+/g, ' ')}`);
    lines.push('');
  }
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `博客笔记-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  notesHint.textContent = '已导出';
}

loadNotes();
if (!storageAvailable()) notesScope.textContent = '当前浏览器无法保存笔记';

notesToggle.addEventListener('click', () => {
  if (notesPanel.classList.contains('open')) closeNotes(); else openNotes();
});
document.getElementById('notes-close').addEventListener('click', closeNotes);
document.getElementById('notes-save').addEventListener('click', addNote);
notesExport.addEventListener('click', exportNotes);

notesInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); addNote(); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && notesPanel.classList.contains('open')) closeNotes();
});

// 输入即存草稿，切走再回来不丢
let notesDraftTimer = 0;
notesInput.addEventListener('input', () => {
  if (!notesSlug) return;
  clearTimeout(notesDraftTimer);
  notesDraftTimer = setTimeout(() => {
    const v = notesInput.value;
    if (v.trim()) notesData.drafts[notesSlug] = v;
    else delete notesData.drafts[notesSlug];
    persistNotes();
  }, 400);
});

notesList.addEventListener('click', (e) => {
  const btn = e.target instanceof Element ? e.target.closest('[data-del]') : null;
  if (!btn || !notesSlug) return;
  if (!window.confirm('删除这条笔记？')) return;
  notesData.posts[notesSlug] = notesOf(notesSlug).filter((n) => n.id !== btn.dataset.del);
  persistNotes();
  renderNotes();
});

// 同一浏览器多标签页之间同步
window.addEventListener('storage', (e) => {
  if (e.key !== NOTES_KEY) return;
  loadNotes();
  if (notesSlug) renderNotes();
});

/* ==========================================================================
   路由
   ========================================================================== */

function setActiveNav(key) {
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === key);
  });
}

/** 上一次渲染的 hash：文章页据此判断「来路」，把「返回」指向上一篇看过的文章 */
let renderedHash = '';

/** 从一段 hash 里取出文章 slug；不是文章页则返回空串 */
function slugFromHash(hash) {
  const parts = String(hash || '').replace(/^#/, '').split('/').filter(Boolean);
  if (parts[0] !== 'post' || parts.length < 2) return '';
  const rest = parts.slice(1).join('/');
  const cut = rest.indexOf('#');
  return normalizeSlug(cut === -1 ? rest : rest.slice(0, cut));
}

/** slug → 标题：渲染过的文章标题，「返回上一篇」用它显示来路文章名 */
const postTitles = new Map();

/** 路由 → 离开时的滚动位置：「返回」时用它恢复阅读位置 */
const scrollPositions = new Map();

/**
 * 路由 → 进入它时的来路（上级）。
 * 只在**向前导航**时写入；返回时不覆盖，所以同一页的「返回」始终指向同一个上级，
 * 不会出现「从 A 进 B，退回 A 后 A 的返回键变成指向 B」这种来回横跳。
 */
const entryFrom = new Map();

/** 由「返回」键置位：下一次路由要恢复阅读位置而不是回到顶部 */
let restoreScrollOnNextRoute = false;

/**
 * 历史条目标号。hash 路由下 popstate 对普通链接点击也会触发，不能拿它判断后退，
 * 所以给每个历史条目打上自增序号：普通点击产生的新条目 state 为 null，
 * 浏览器前进/后退会带着旧序号回来，据此区分。
 */
let navSeq = 0;

/** 渲染完成后定位：需要恢复就回到上次的阅读位置，否则回到顶部 */
function settleScroll(wantRestore) {
  const y = wantRestore ? (scrollPositions.get(renderedHash) || 0) : 0;
  if (y > 0) {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    // 内容高度可能还没稳定（字体、图片），下一帧再校正一次
    requestAnimationFrame(() => {
      if (document.documentElement.scrollHeight >= y + window.innerHeight - 4 &&
          Math.abs(window.scrollY - y) > 4) {
        window.scrollTo({ top: y, left: 0, behavior: 'instant' });
      }
    });
    return;
  }
  scrollTop();
}

/** 截短标题，免得「← 返回 xxx」把首行撑得太长 */
function shortTitle(t, max = 32) {
  const s = String(t || '').trim();
  return s.length > max ? s.slice(0, max) + '…' : s;
}

async function route() {
  const path = location.hash.replace(/^#/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  const stateSeq = (history.state && typeof history.state.seq === 'number') ? history.state.seq : null;
  if (stateSeq === null) history.replaceState({ seq: ++navSeq }, '');
  else if (stateSeq > navSeq) navSeq = stateSeq;

  const wantRestore = stateSeq !== null || restoreScrollOnNextRoute; // 历史移动 / 点了「返回」
  restoreScrollOnNextRoute = false;
  setNotesContext(''); // 离开文章页就收起随手记；文章页会在 viewPost 里重新设定
  if (renderedHash) scrollPositions.set(renderedHash, window.scrollY); // 记住离开时的位置
  const curHash = location.hash;
  // 只在向前导航时更新「进入路线」；返回时不覆盖，保证返回键稳定指向上级
  if (!wantRestore && renderedHash) entryFrom.set(curHash, renderedHash);
  const backHash = entryFrom.get(curHash) || '';
  renderedHash = curHash;
  if (!wantRestore) scrollTop();
  document.title = `${SITE.name} · 个人主页与技术博客`;

  if (parts.length === 0) { setActiveNav('home'); await viewHome(); settleScroll(wantRestore); return; }
  if (parts[0] === 'blog') { setActiveNav('blog'); await viewBlog(); settleScroll(wantRestore); return; }
  if (parts[0] === 'about') { setActiveNav('about'); await viewAbout(); settleScroll(wantRestore); return; }
  if (parts[0] === 'post' && parts.length > 1) {
    // slug 可以带子目录（#/post/子目录/文件），末尾还可以带 #小节
    const rest = parts.slice(1).join('/');
    const cut = rest.indexOf('#');
    const slug = normalizeSlug(cut === -1 ? rest : rest.slice(0, cut));
    if (slug) {
      setActiveNav('blog');
      await viewPost(slug, backHash);
      // 带 #小节 的深链优先滚到那一节，否则按「返回」恢复阅读位置
      if (cut !== -1) scrollToAnchor(rest.slice(cut + 1));
      else settleScroll(wantRestore);
      return;
    }
  }
  setActiveNav(''); view404();
}

/** 路由切换后回到顶部；内容是异步插入的，插入后再补一次 */
function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

window.addEventListener('hashchange', route);
// 注意：hash 路由下 popstate 连普通链接点击也会触发，不能拿它判断「后退」，
// 前进/后退的识别改由 route() 里的 history.state 序号完成。
route();

/* ------------------------------ 页脚 ------------------------------ */

document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
document.getElementById('footer-github').href = SITE.github;
