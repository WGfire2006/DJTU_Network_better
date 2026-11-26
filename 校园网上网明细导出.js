// ==UserScript==
// @name         校园网自助 · 上网明细导出
// @author       WGfire
// @namespace    local.campus.selfservice
// @version      1.0.0
// @description  一键导出全部上网明细（一星期/一个月/一年/5年/自定义），自动翻页取全量并生成 CSV
// @match        http://10.1.1.200:8080/selfservice/module/onlineuserself/web/newonlinedetailself_list.jsf*
// @match        http://10.1.1.200:8080/selfservice/module/userself/web/business_detail.jsf*
// @run-at       document-idle
// @grant        none
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAACOCAYAAAA1rTpQAAASbUlEQVR42u2d95MVRReG/WexMCAYwRwwoGLOERVUUIIJFEyYcxZFLSOIOWCO1V89Xd+71U7NnbnT3dP3zuz54dQuu+zcnpm3T3zP6UOcc4eYmOQQewgmBiYTA5OJgcnExMBkYmAyMTCZGJhMTAxMJgYmEwOTiYmBycTAZGJgGo/8+OOPzp6DgalR/v33X/fnn3+633//3X355Zdu//797pVXXnGXX365O+mkk9wpp5zijj/+eHf44Ye7Bx980JVc03fffefX8+mnn3r57LPP3L59+9xXX33l/vnnH2dgmqEcPHjQHThwwH388cdu9+7d7qGHHnK33HKLu+yyy9xFF13kVq5c6Y444gh31FFHudWrV7sLLrjArVmzxn9du3atBxV/08fafvrpJ/fJJ5+4Bx54wN10003ukksucaeeeqpbvny5O/LII92yZcu8HHbYYe7hhx82MJWWX3/91b3zzjv+4W/bts1df/31HhznnHOOO/30090ZZ5zhzjrrLHf22Wf7n1144YXu4osv9gJ4EH6G6HsAtX79+qwv8tFHH3VXX321X8dpp53mgcz3gBiQsx7AhXbcu3evMzNXSH7++WdvDk4++eQFoJx55pn++3PPPdfL+eef70UaJxQBpwom/m7VqlX+Z2i3HGv94IMP3LHHHrsAHtZU/XyEn6Mt+f/mMxUQfAx8GpkGgBJqlRgRiPCbzjvvPPf888+7XIDftGmTO+644/zn1IFaP0OToq3eeOMNZw54IYd1y5Yt7oQTTvAvX2aqK5DC/89LRLuhNXbt2uXwaXKs9bfffnPXXXed98/0mVUwaROwBoKA1157zVk0V0juuusu/9CljWI1kQTthtnZsWNHNpOG4DRfeumlXtOE66wzrWwKwPzqq686Sw0UEqKyE088ccHfiAUTji5+1dFHH+02bNiQFUTSnjfffLMHPZ81STNKU+FLkaKwPFMheeyxx3x01dWkhaDjxQEiXjK5pdwgktxzzz3+MyatiXUgaCR8qT179jhLWhYSwn38DgEjBkyYMkwauSZSCH2tlWvjxKM9m9aEj0TK4s033xx8tn1QQCJMnxRKt5kzXhpAvPLKK71PggnqMzi48cYbvfZrAzi+1Ouvvz6Kss0gFvnUU095IAGIGPNGzumY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
// ==/UserScript==


(function () {
  'use strict';

  /* ===================== DATA-START 数据层（不依赖 DOM） ===================== */
  const BASE = '/selfservice';
  const LIST_URL = BASE + '/module/onlineuserself/web/newonlinedetailself_list.jsf';
  const PAGE_SIZE = 200;
  const MAX_PAGES = 500;              // 安全阀：最多 10 万条

  const COLUMNS = ['上线时间', '下线时间', '用户IPv4', '在线时长', '网关策略名', '服务', '上网费用(元)', '下线原因'];

  async function readGbk(resp) {
    const buf = await resp.arrayBuffer();
    try { return new TextDecoder('gbk').decode(buf); }
    catch (e) { return new TextDecoder('utf-8').decode(buf); }
  }

  async function postForm(url, params) {
    const body = new URLSearchParams();
    for (const k of Object.keys(params)) body.set(k, params[k]);
    const r = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    return readGbk(r);
  }

  // 从页面取 JSF view state（每次查询前需要一个新的）
  async function getFreshViewState() {
    const r = await fetch(LIST_URL, { credentials: 'same-origin', cache: 'no-store' });
    const html = await readGbk(r);
    const m = html.match(/name="com\.sun\.faces\.VIEW"[^>]*value="([^"]+)"/i);
    if (!m) {
      if (/login_self|login_judge/.test(html) || /name="password"/.test(html)) {
        throw new Error('会话已失效，请先登录自助服务系统');
      }
      throw new Error('取不到页面 view state');
    }
    return m[1];
  }

  function parseMeta(html) {
    const total = (html.match(/id="ec_totalrows"\s+value="([^"]*)"/) || [, '0'])[1];
    const pages = (html.match(/id="ec_totalpages"\s+value="([^"]*)"/) || [, '0'])[1];
    return { total: parseInt(total, 10) || 0, pages: parseInt(pages, 10) || 0 };
  }

  function stripTags(s) {
    return String(s)
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // 解析结果表的数据行 → 二维数组
  function parseRows(html) {
    const out = [];
    const rowRe = /<tr\s+class="(?:odd|even)"[\s\S]*?<\/tr>/gi;
    let m;
    while ((m = rowRe.exec(html)) !== null) {
      const cells = [];
      const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      let t;
      while ((t = tdRe.exec(m[0])) !== null) cells.push(stripTags(t[1]));
      if (cells.length >= COLUMNS.length) out.push(cells.slice(0, COLUMNS.length));
    }
    return out;
  }

  function fmt(d) {
    const p = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }

  // 快捷区间
  function rangeOf(key) {
    const to = new Date();
    const from = new Date(to.getTime());
    if (key === 'week') from.setDate(from.getDate() - 7);
    else if (key === 'month') from.setMonth(from.getMonth() - 1);
    else if (key === 'year') from.setFullYear(from.getFullYear() - 1);
    else if (key === '5year') from.setFullYear(from.getFullYear() - 5);
    return { from: fmt(from), to: fmt(to) };
  }

  /**
   * 查询并翻页取全量
   * @param {{from:string,to:string}} range
   * @param {(p:{page:number,pages:number,got:number,total:number})=>void} onProgress
   * @param {()=>boolean} isCancelled
   */
  async function collectAll(range, onProgress, isCancelled) {
    const view = await getFreshViewState();

    // 第 1 页：完整表单查询
    let html = await postForm(LIST_URL, {
      'OnlineDetailForm:_id11': '',
      'OnlineDetailForm:isFirst': 'false',
      'OnlineDetailForm:loginFromTime': range.from,
      'OnlineDetailForm:logoutToTime': range.to,
      'OnlineDetailForm:_id12': '1',
      'com.sun.faces.VIEW': view,
      'OnlineDetailForm': 'OnlineDetailForm',
      'ec_i': 'ec', 'ec_crd': String(PAGE_SIZE), 'ec_p': '1', 'ec_rd': String(PAGE_SIZE),
      'exportType': '',
    });

    let meta = parseMeta(html);
    let rows = parseRows(html);
    let page = 1;
    if (onProgress) onProgress({ page: page, pages: meta.pages, got: rows.length, total: meta.total });

    // 后续页：最小参数即可（结果集已缓存在 session）
    while (page < meta.pages && page < MAX_PAGES) {
      if (isCancelled && isCancelled()) throw new Error('已取消');
      page++;
      html = await postForm(LIST_URL, {
        'ec_i': 'ec', 'ec_crd': String(PAGE_SIZE), 'ec_p': String(page), 'ec_rd': String(PAGE_SIZE),
        'exportType': '',
      });
      const m2 = parseMeta(html);
      if (m2.total) meta.total = m2.total;
      const more = parseRows(html);
      if (!more.length) break;
      rows = rows.concat(more);
      if (onProgress) onProgress({ page: page, pages: meta.pages, got: rows.length, total: meta.total });
    }

    return { rows: rows, total: meta.total, pages: meta.pages };
  }

  function csvCell(v) {
    const s = v == null ? '' : String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function toCsv(rows) {
    const lines = [COLUMNS.map(csvCell).join(',')];
    for (const r of rows) lines.push(r.map(csvCell).join(','));
    return '\uFEFF' + lines.join('\r\n');   // BOM 让 Excel 正确识别 UTF-8
  }

  const DATA_API = { collectAll, toCsv, parseRows, parseMeta, rangeOf, fmt, LIST_URL, COLUMNS };
  /* ===================== DATA-END ===================== */

  /* ============================ UI 层 ============================ */
  const STYLE = `
  #rjexp{position:fixed;right:16px;bottom:16px;z-index:2147483600;width:288px;
    font:12px/1.6 "Microsoft YaHei",system-ui,sans-serif;color:#eceff4;
    background:rgba(24,28,36,.97);border:1px solid rgba(255,255,255,.14);
    border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.5);overflow:hidden;}
  #rjexp .hd{display:flex;align-items:center;gap:6px;padding:7px 10px;
    background:rgba(255,255,255,.06);cursor:move;user-select:none;}
  #rjexp .hd b{flex:1;font-size:12px;font-weight:600;}
  #rjexp .hd span.dot{width:7px;height:7px;border-radius:50%;background:#8b93a1;}
  #rjexp .hd span.dot.ok{background:#3fbf5f;}
  #rjexp .hd span.dot.err{background:#e05555;}
  #rjexp .hd span.dot.run{background:#e8a33d;}
  #rjexp .hd button{all:unset;cursor:pointer;color:#9aa4b2;padding:0 4px;font-size:13px;}
  #rjexp .hd button:hover{color:#fff;}
  #rjexp .bd{padding:9px 10px 10px;}
  #rjexp .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:7px;}
  #rjexp .q{padding:6px 4px;border:none;border-radius:6px;cursor:pointer;
    font:600 12px/1.3 inherit;color:#fff;background:#2f6fd0;transition:background .15s;}
  #rjexp .q:hover{background:#3b81e6;}
  #rjexp .q:disabled{background:#4a5160;cursor:default;color:#8b93a1;}
  #rjexp .row{display:flex;align-items:center;gap:5px;margin-bottom:6px;}
  #rjexp .row label{color:#9aa4b2;flex:none;width:30px;}
  #rjexp input[type=datetime-local]{flex:1;min-width:0;padding:3px 5px;border-radius:5px;
    font:11px/1.4 inherit;color:#eceff4;background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.16);outline:none;color-scheme:dark;}
  #rjexp .custom{width:100%;padding:5px;border:none;border-radius:6px;cursor:pointer;
    font:600 12px/1.4 inherit;color:#eceff4;background:rgba(255,255,255,.12);}
  #rjexp .custom:hover{background:rgba(255,255,255,.2);}
  #rjexp .custom:disabled{color:#8b93a1;cursor:default;}
  #rjexp .st{margin-top:8px;color:#9aa4b2;word-break:break-all;min-height:16px;}
  #rjexp .st.err{color:#ff8a8a;} #rjexp .st.ok{color:#66d97f;} #rjexp .st.run{color:#e8c07a;}
  #rjexp .bar{height:3px;border-radius:2px;background:rgba(255,255,255,.12);margin-top:6px;overflow:hidden;display:none;}
  #rjexp .bar i{display:block;height:100%;width:0;background:#4a8fd4;transition:width .2s;}
  #rjexp.min .bd{display:none;}
  `;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  ready(function () {
    if (document.getElementById('rjexp')) return;
    if (!document.getElementById('ec_table') && !/newonlinedetailself_list/.test(location.href)) return;

    const style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);

    const p = document.createElement('div');
    p.id = 'rjexp';
    p.innerHTML = `
      <div class="hd">
        <span class="dot"></span><b>上网明细导出</b>
        <button data-act="min" title="折叠">－</button>
      </div>
      <div class="bd">
        <div class="grid">
          <button class="q" data-range="week">一星期</button>
          <button class="q" data-range="month">一个月</button>
          <button class="q" data-range="year">一年</button>
          <button class="q" data-range="5year">5 年</button>
        </div>
        <div class="row"><label>从</label><input type="datetime-local" data-f="from" step="1"></div>
        <div class="row"><label>到</label><input type="datetime-local" data-f="to" step="1"></div>
        <button class="custom" data-act="custom">按自定义区间导出</button>
        <div class="bar"><i></i></div>
        <div class="st">选择区间即可导出</div>
      </div>`;
    document.body.appendChild(p);

    const $ = (s) => p.querySelector(s);
    const st = $('.st'), dot = $('.dot'), bar = $('.bar'), barIn = $('.bar i');
    const btnCustom = $('[data-act="custom"]');
    const qBtns = Array.from(p.querySelectorAll('.q'));

    // 默认填一个月的区间
    const def = DATA_API.rangeOf('month');
    const toLocalInput = (s) => s.replace(' ', 'T');
    $('[data-f="from"]').value = toLocalInput(def.from);
    $('[data-f="to"]').value = toLocalInput(def.to);

    let cancelled = false;

    function setStatus(text, kind) {
      st.textContent = text || '';
      st.className = 'st' + (kind ? ' ' + kind : '');
      dot.className = 'dot' + (kind === 'ok' ? ' ok' : kind === 'err' ? ' err' : kind === 'run' ? ' run' : '');
    }
    function setBusy(busy) {
      btnCustom.disabled = busy;
      qBtns.forEach(b => (b.disabled = busy));
      bar.style.display = busy ? 'block' : 'none';
      if (!busy) barIn.style.width = '0';
    }
    function setProgress(cur, all) {
      if (!all) return;
      barIn.style.width = Math.min(100, Math.round(cur / all * 100)) + '%';
    }

    function download(csv, filename) {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
    }

    function stamp(from, to) {
      const s = (x) => x.replace(/[-: ]/g, '').slice(0, 12);
      return `上网明细_${s(from)}-${s(to)}.csv`;
    }

    async function run(range) {
      cancelled = false;
      setBusy(true);
      setStatus('取页面状态…', 'run');
      try {
        const res = await DATA_API.collectAll(range, (pr) => {
          setProgress(pr.page, pr.pages);
          const shown = pr.total ? `，共 ${pr.total} 条` : '';
          setStatus(`第 ${pr.page}/${pr.pages || '?'} 页，已取 ${pr.got} 条${shown}`, 'run');
        }, () => cancelled);

        if (!res.rows.length) {
          setStatus(`该区间没有上网明细记录（${range.from} ~ ${range.to}）`, 'err');
          setBusy(false);
          return;
        }
        const csv = DATA_API.toCsv(res.rows);
        download(csv, stamp(range.from, range.to));
        setProgress(1, 1);
        setStatus(`完成：导出 ${res.rows.length} 条 → ${stamp(range.from, range.to)}`, 'ok');
      } catch (e) {
        setStatus('失败：' + (e && e.message ? e.message : e), 'err');
      } finally {
        setBusy(false);
      }
    }

    qBtns.forEach((b) => {
      b.addEventListener('click', () => {
        const r = DATA_API.rangeOf(b.getAttribute('data-range'));
        $('[data-f="from"]').value = toLocalInput(r.from);
        $('[data-f="to"]').value = toLocalInput(r.to);
        run(r);
      });
    });

    btnCustom.addEventListener('click', () => {
      const from = $('[data-f="from"]').value.replace('T', ' ');
      const to = $('[data-f="to"]').value.replace('T', ' ');
      if (!from || !to) { setStatus('请先填写起止时间', 'err'); return; }
      if (from >= to) { setStatus('开始时间必须早于结束时间', 'err'); return; }
      const pad = (s) => (s.length === 16 ? s + ':00' : s);
      run({ from: pad(from), to: pad(to) });
    });

    $('[data-act="min"]').addEventListener('click', () => p.classList.toggle('min'));

    // 拖动
    const hd = p.querySelector('.hd');
    let drag = null;
    hd.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      const r = p.getBoundingClientRect();
      drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      p.style.right = 'auto'; p.style.bottom = 'auto';
      p.style.left = r.left + 'px'; p.style.top = r.top + 'px';
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!drag) return;
      p.style.left = (e.clientX - drag.dx) + 'px';
      p.style.top = (e.clientY - drag.dy) + 'px';
    });
    document.addEventListener('mouseup', () => { drag = null; });
  });
})();
