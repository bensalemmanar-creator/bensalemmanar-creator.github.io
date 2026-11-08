/* Manar Ben Salem — portfolio interactions */
(() => {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = id => `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  document.getElementById("yr").textContent = new Date().getFullYear();

  /* ---------- generated covers (projects without a screenshot) ---------- */
  const covers = {
    credit: `<div class="gcover" aria-hidden="true"><svg viewBox="0 0 320 180">
      <g stroke="rgba(255,255,255,.12)">${[30, 60, 90, 120, 150].map(y => `<line x1="20" x2="300" y1="${y}" y2="${y}"/>`).join("")}</g>
      ${Array.from({ length: 70 }, (_, i) => { const x = 28 + (i * 37) % 268, y = 150 - ((i * 53) % 110) * (0.4 + (x / 300) * .6); return `<circle cx="${x}" cy="${Math.max(18, y).toFixed(1)}" r="3" fill="rgba(244,138,111,${.35 + (i % 5) / 10})"/>`; }).join("")}
      <line x1="24" y1="156" x2="300" y2="40" stroke="#ef6447" stroke-width="3" stroke-linecap="round"/>
      <text x="22" y="24" fill="#fff" font-family="DM Sans" font-size="11" font-weight="700" letter-spacing="2">SPREAD ~ RATING + LEVERAGE + …</text>
    </svg></div>`,
    legacy: `<div class="gcover gcover--legacy" aria-hidden="true"><svg viewBox="0 0 320 180">
      <rect x="10" y="10" width="300" height="160" rx="10" fill="#f8fafc"/>
      <rect x="10" y="10" width="62" height="160" rx="10" fill="#0f172a"/><rect x="62" y="10" width="10" height="160" fill="#0f172a"/>
      <text x="20" y="32" fill="#14b8a6" font-family="DM Sans" font-size="9" font-weight="800">LegacyOS</text>
      ${[48, 62, 76, 90, 104].map(y => `<rect x="20" y="${y}" width="40" height="5" rx="2" fill="rgba(255,255,255,.25)"/>`).join("")}
      <text x="84" y="32" fill="#0f172a" font-family="DM Sans" font-size="9" font-weight="700">Founder dependency</text>
      ${[[84, "#dc2626", "72"], [152, "#f59e0b", "48"], [220, "#10b981", "61"]].map(([x, c, v]) => `<rect x="${x}" y="42" width="60" height="42" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="${x + 8}" y="70" font-family="DM Sans" font-size="16" font-weight="800" fill="${c}">${v}</text>`).join("")}
      <rect x="84" y="94" width="128" height="66" rx="6" fill="#fff" stroke="#e2e8f0"/>
      <polyline points="92,148 110,132 128,138 146,116 164,122 182,104 202,110" fill="none" stroke="#14b8a6" stroke-width="2.5"/>
      <rect x="220" y="94" width="80" height="66" rx="6" fill="#fff" stroke="#e2e8f0"/>
      <circle cx="260" cy="127" r="20" fill="none" stroke="#e2e8f0" stroke-width="8"/><circle cx="260" cy="127" r="20" fill="none" stroke="#14b8a6" stroke-width="8" stroke-dasharray="80 126" transform="rotate(-90 260 127)"/>
    </svg></div>`
  };

  /* ---------- data project cards ---------- */
  const kpi = {
    airbnb: ["3.97%", "MAPE of the best model (ETS)"],
    credit: ["3,408", "bonds, 34 countries"],
    gym: ["3", "member personas, 400 members"],
    rain: ["0.86", "AUC · 77% of rainy days caught"]
  };
  $("#data-grid").innerHTML = D.dataProjects.map(p => `
    <button class="pcard reveal" data-open="data:${p.id}" data-tool="${p.tool}" aria-label="Open case study: ${esc(p.title)}">
      <div class="pcard__media">
        <span class="pcard__no">${p.no}</span><span class="pcard__tool">${p.tool}</span>
        ${p.cover ? `<img src="${p.cover}" alt="" loading="lazy">` : covers[p.id] || ""}
      </div>
      <div class="pcard__body">
        <div class="pcard__tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.short)}</p>
        <div class="pcard__kpi"><b>${kpi[p.id][0]}</b><span>${kpi[p.id][1]}</span></div>
      </div>
      <span class="pcard__go">${icon("arrow-r")}</span>
    </button>`).join("");

  $("#bi-grid").innerHTML = D.biDashboards.map(b => `
    <button class="bicard reveal" data-open="bi:${b.id}" aria-label="Open dashboard: ${esc(b.title)}">
      <span class="bicard__top"><span class="bicard__ic">BI</span><span class="bicard__pages">${b.pages.length} pages</span></span>
      <h4>${esc(b.title)}</h4>
      <p>${esc(b.focus)}</p>
      <span class="bicard__kpi"><b>${b.headline[0]}</b> ${esc(b.headline[1])}</span>
      <span class="bicard__go">View dashboard ${icon("arrow-r")}</span>
    </button>`).join("");

  /* filters */
  $$(".filters .chip").forEach(btn => btn.addEventListener("click", () => {
    $$(".filters .chip").forEach(b => { b.classList.toggle("is-on", b === btn); b.setAttribute("aria-selected", b === btn); });
    const f = btn.dataset.filter;
    $$(".pcard").forEach(c => c.classList.toggle("is-hidden", f !== "all" && c.dataset.tool !== f));
  }));

  /* ---------- design cards ---------- */
  $("#manual-grid").innerHTML = D.manualDesign.map(p => `
    <button class="mcard reveal" data-open="manual:${p.id}" aria-label="Open ${esc(p.title)}">
      <div class="mcard__media">
        ${p.cover ? `<img src="${p.cover}" alt="" loading="lazy">` : `<div class="placeholder"><div>${icon("figma")}<br>Figma screens<br>to be added</div></div>`}
      </div>
      <div class="mcard__body">
        <span class="mcard__kind">${esc(p.kind)}</span>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.short)}</p>
        ${p.todo ? `<span class="todo-tag">Content pending</span>` : ""}
      </div>
    </button>`).join("");

  $("#ai-grid").innerHTML = D.aiDesign.map(p => `
    <button class="acard reveal" data-open="ai:${p.id}" aria-label="Open ${esc(p.title)}">
      <div class="acard__media">
        <span class="acard__ai">${icon("sparkle")} AI-generated · Figma Make</span>
        ${p.cover ? `<img src="${p.cover}" alt="" loading="lazy">` : covers[p.id] || ""}
      </div>
      <div class="acard__body">
        <span class="acard__badge">${esc(p.badge)} · ${p.year}</span>
        <h4>${esc(p.title)}</h4>
        <span class="acard__kind">${esc(p.kind)}</span>
        <p>${esc(p.short)}</p>
        <div class="acard__links"><span class="pill">${icon("play")} Live prototype</span><span class="pill">${icon("gh")} Code</span></div>
      </div>
    </button>`).join("");

  /* ---------- case-study templates ---------- */
  const list = (arr, cls) => `<ol class="${cls}">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ol>`;
  const gallery = g => g && g.length ? `<div><h3 class="cs__h">Visuals</h3><div class="cs__gallery">${g.map(x => `
      <figure data-zoom="${x.src}" data-cap="${esc(x.cap)}" tabindex="0" role="button" aria-label="Enlarge: ${esc(x.cap)}"><img src="${x.src}" alt="${esc(x.cap)}" loading="lazy"><figcaption>${esc(x.cap)}</figcaption></figure>`).join("")}</div></div>` : "";

  function barChart(c) {
    const vals = c.rows.map(r => r.value);
    const lo = c.min ?? 0, hi = c.max ?? Math.max(...vals) * 1.08;
    return `<div class="chart"><h3 class="cs__h">${esc(c.title)}</h3><div class="bars">${c.rows.map(r => `
      <div class="bar ${r.key === c.best ? "is-best" : ""}"><span>${esc(r.label)}</span>
      <div class="bar__track"><div class="bar__fill" data-w="${(((r.value - lo) / (hi - lo)) * 100).toFixed(1)}"></div></div>
      <span class="bar__val">${r.value}${c.unit}</span></div>`).join("")}</div>
      ${c.min ? `<p class="mx-legend">Axis starts at ${c.min} to make differences visible.</p>` : ""}</div>`;
  }
  const table = t => `<div class="tbl-wrap"><table class="tbl"><thead><tr>${t.head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${t.rows.map((r, i) => `<tr class="${i === t.highlight ? "hl" : ""}">${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const matrix = m => `<div class="chart"><h3 class="cs__h">${esc(m.title)}</h3><div class="tbl-wrap" style="padding:0;background:none"><table class="matrix"><thead><tr><th>Determinant</th>${m.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${m.rows.map(r => `<tr><td>${esc(r.label)}${r.note ? `<small>${esc(r.note)}</small>` : ""}</td>${r.cells.map(c => `<td>${c === "yes" ? '<span class="dot-yes" title="Significant"></span>' : c === "no" ? '<span class="dot-no" title="Not significant"></span>' : "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="mx-legend"><span class="dot-yes" style="width:10px;height:10px"></span> significant &nbsp; <span class="dot-no" style="width:10px;height:10px"></span> not significant. ${esc(m.legend)}</p></div>`;

  function dataCase(p) {
    return `
      <header class="cs__hero">
        <div class="cs__meta"><span>${p.tool}</span><span>${p.year}</span>${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        <h2 id="modal-title">${esc(p.title)}</h2>
        <p>${esc(p.context)}</p>
        <div class="cs__links"><a class="btn btn--dark" href="${p.github}" target="_blank" rel="noopener">${icon("gh")} View on GitHub</a></div>
      </header>
      <div class="cs">
        <div class="cs__row">
          <div class="cs__box"><h3>Business problem</h3><p>${esc(p.problem)}</p></div>
          <div class="cs__box"><h3>Data</h3><p>${esc(p.data)}</p><h3 style="margin-top:16px">Tools</h3><div class="cs__tools">${p.tools.map(t => `<span>${esc(t)}</span>`).join("")}</div></div>
        </div>
        <div><h3 class="cs__h">Methodology</h3>${list(p.method, "cs__steps")}</div>
        ${p.chart ? `<div class="cs__row">${barChart(p.chart)}${p.table ? `<div><h3 class="cs__h">Full results</h3>${table(p.table)}</div>` : ""}</div>` : ""}
        ${p.matrix ? matrix(p.matrix) : ""}
        ${p.stats ? `<div class="stats4">${p.stats.map(s => `<div><b>${s.v}</b><span>${s.k}</span></div>`).join("")}</div>` : ""}
        ${p.personas ? `<div><h3 class="cs__h">Member personas</h3><div class="personas">${p.personas.map(x => `
          <div class="persona"><div class="persona__top"><span class="persona__n">${x.n}</span><span class="persona__h">${x.hours} h / week</span></div>
          <div class="persona__bar"><i style="width:${(x.n / 400 * 100).toFixed(0)}%"></i></div>
          <h4>${esc(x.name)}</h4><p>${esc(x.desc)}</p><p class="persona__act"><b>Strategy:</b> ${esc(x.action)}</p></div>`).join("")}</div></div>` : ""}
        <div><h3 class="cs__h">Key findings</h3><ul class="cs__find">${p.findings.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>
        <div class="cs__impl"><h3 class="cs__h">Business implications &amp; limits</h3><p>${esc(p.implications)}</p></div>
        ${gallery(p.gallery)}
        ${p.code ? `<div><h3 class="cs__h">From the code</h3><pre><code>${esc(p.code)}</code></pre></div>` : ""}
      </div>`;
  }

  function manualCase(p) {
    return `
      <header class="cs__hero">
        <div class="cs__meta"><span>Manual design</span><span>Figma</span></div>
        <h2 id="modal-title">${esc(p.title)}</h2>
        <p>${esc(p.short)}</p>
        ${p.figma ? `<div class="cs__links"><a class="btn btn--dark" href="${p.figma}" target="_blank" rel="noopener">${icon("figma")} Open in Figma</a></div>` : ""}
      </header>
      <div class="cs">
        ${p.todo ? `<div class="cs__note">${icon("figma")}<div><b>Content to be added.</b> This project’s Figma file hasn’t been connected yet, so the overview, problem, process, wireframes and final screens are not shown. Nothing here has been invented; it will be filled in from the actual Figma file.</div></div>` : ""}
        ${p.overview ? `<div class="cs__row"><div class="cs__box"><h3>Overview</h3><p>${esc(p.overview)}</p></div><div class="cs__box"><h3>Problem</h3><p>${esc(p.problem)}</p></div></div>` : ""}
        ${p.role ? `<div class="cs__box"><h3>My role</h3><p>${esc(p.role)}</p></div>` : ""}
        ${p.process ? `<div><h3 class="cs__h">Design process</h3>${list(p.process, "cs__steps")}</div>` : ""}
        ${gallery(p.gallery)}
      </div>`;
  }

  function aiCase(p) {
    return `
      <header class="cs__hero cs__hero--dark">
        <div class="cs__meta"><span>AI-assisted design</span><span>${p.year}</span><span>${esc(p.badge)}</span></div>
        <h2 id="modal-title">${esc(p.title)}</h2>
        <p>${esc(p.short)}</p>
        <div class="cs__links">
          <a class="btn btn--coral" href="${p.prototype}" target="_blank" rel="noopener">${icon("play")} Open live prototype</a>
          <a class="btn btn--ghost" href="${p.figma}" target="_blank" rel="noopener">${icon("figma")} Figma Make file</a>
          <a class="btn btn--ghost" href="${p.github}" target="_blank" rel="noopener">${icon("gh")} GitHub</a>
        </div>
      </header>
      <div class="cs">
        <div class="cs__note">${icon("sparkle")}<div><b>How this was designed:</b> ${esc(p.aiNote)}</div></div>
        <div class="cs__row">
          <div class="cs__box"><h3>Problem</h3><p>${esc(p.problem)}</p></div>
          <div class="cs__box"><h3>My contribution</h3><p>${esc(p.role)}</p><h3 style="margin-top:16px">AI tools</h3><div class="cs__tools">${p.aiTools.map(t => `<span>${esc(t)}</span>`).join("")}</div></div>
        </div>
        <div><h3 class="cs__h">Process: from research to prompt to prototype</h3>${list(p.process, "cs__steps")}</div>
        <div class="cs__impl"><h3 class="cs__h">Outcome</h3><p>${esc(p.outcome)}</p></div>
        <div><h3 class="cs__h">Try the prototype</h3>
          <div class="cs__frame"><div class="cs__frame-bar"><i></i><i></i><i></i>&nbsp; ${esc(p.title)} (generated code, running locally)<a href="${p.prototype}" target="_blank" rel="noopener">Open full screen ↗</a></div>
          <div class="cs__load" data-frame="${p.prototype}"><button class="btn btn--dark">${icon("play")} Load interactive prototype</button></div></div>
        </div>
        ${gallery(p.gallery)}
      </div>`;
  }

  /* ---------- Power BI dashboards (SVG charts) ---------- */
  const PAL = ["#ef6447", "#15110f", "#f4a48f", "#8a7a72", "#f2c811", "#c9b6aa"];
  const fmt = (v, unit = "") => unit === "%" ? v + "%" : Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(2) + "M" : Math.abs(v) >= 1e4 ? Math.round(v / 1e3) + "K" : v.toLocaleString("en-US");
  const svgOpen = (w, h, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" class="bisvg">`;

  function chBars(c) {
    const max = Math.max(...c.data.map(d => d[1]));
    return `<div class="bars">${c.data.map((d, i) => `
      <div class="bar ${i === 0 ? "is-best" : ""}"><span title="${esc(d[0])}">${esc(d[0])}</span>
      <div class="bar__track"><div class="bar__fill" data-w="${(d[1] / max * 100).toFixed(1)}"></div></div>
      <span class="bar__val">${fmt(d[1], c.unit)}</span></div>`).join("")}</div>`;
  }
  function chColumns(c) {
    const W = 420, H = 230, max = Math.max(...c.data.map(d => d[1])), n = c.data.length, bw = Math.min(70, (W - 40) / n * .6), step = (W - 40) / n;
    return svgOpen(W, H, c.title) + c.data.map((d, i) => {
      const h = d[1] / max * 160, x = 20 + step * i + (step - bw) / 2, y = 190 - h;
      return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="5" fill="${i === 0 ? PAL[0] : "#c9b6aa"}"/><text x="${x + bw / 2}" y="${y - 7}" text-anchor="middle" class="t-val">${fmt(d[1], c.unit)}</text><text x="${x + bw / 2}" y="210" text-anchor="middle" class="t-lab">${esc(d[0])}</text>`;
    }).join("") + `<line x1="14" x2="${W - 14}" y1="190" y2="190" class="t-axis"/></svg>`;
  }
  function chLine(c) {
    const W = 420, H = 230, v = c.data.map(d => d[1]), max = Math.max(...v), min = Math.min(...v) * .8, n = v.length;
    const X = i => 30 + i * (W - 60) / (n - 1), Y = val => 180 - (val - min) / (max - min) * 140;
    const pts = v.map((val, i) => `${X(i)},${Y(val)}`).join(" ");
    return svgOpen(W, H, c.title) + `<polygon points="${X(0)},180 ${pts} ${X(n - 1)},180" fill="rgba(239,100,71,.12)"/><polyline points="${pts}" fill="none" stroke="${PAL[0]}" stroke-width="3" stroke-linejoin="round"/>` +
      v.map((val, i) => `<circle cx="${X(i)}" cy="${Y(val)}" r="4.5" fill="#fff" stroke="${PAL[0]}" stroke-width="2.5"/>${n <= 8 ? `<text x="${X(i)}" y="${Y(val) - 11}" text-anchor="middle" class="t-val">${fmt(val)}</text>` : ""}<text x="${X(i)}" y="205" text-anchor="middle" class="t-lab">${esc(c.data[i][0])}</text>`).join("") +
      `<line x1="14" x2="${W - 14}" y1="180" y2="180" class="t-axis"/></svg>`;
  }
  function chDonut(c) {
    const tot = c.data.reduce((a, d) => a + d[1], 0), R = 70, C = 2 * Math.PI * R; let off = 0;
    const arcs = c.data.map((d, i) => { const len = d[1] / tot * C; const s = `<circle cx="100" cy="100" r="${R}" fill="none" stroke="${PAL[i % PAL.length]}" stroke-width="30" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)"/>`; off += len; return s; }).join("");
    return `<div class="donut">${svgOpen(200, 200, c.title)}${arcs}<text x="100" y="98" text-anchor="middle" class="t-big">${fmt(tot)}</text><text x="100" y="118" text-anchor="middle" class="t-lab">total</text></svg>
      <ul class="legend">${c.data.map((d, i) => `<li><i style="background:${PAL[i % PAL.length]}"></i>${esc(d[0])}<b>${(d[1] / tot * 100).toFixed(1)}%</b></li>`).join("")}</ul></div>`;
  }
  function chGrouped(c) {
    const W = 420, H = 240, max = Math.max(...c.data.flatMap(d => d.slice(1))), n = c.data.length, step = (W - 40) / n, bw = 46;
    return svgOpen(W, H, c.title) + c.data.map((d, i) => {
      const cx = 20 + step * i + step / 2;
      return d.slice(1).map((val, j) => { const h = val / max * 150, x = cx - bw - 4 + j * (bw + 8), y = 185 - h; return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="5" fill="${j ? "#c9b6aa" : PAL[0]}"/><text x="${x + bw / 2}" y="${y - 7}" text-anchor="middle" class="t-val">${fmt(val)}</text>`; }).join("") + `<text x="${cx}" y="205" text-anchor="middle" class="t-lab">${esc(d[0])}</text>`;
    }).join("") + `<line x1="14" x2="${W - 14}" y1="185" y2="185" class="t-axis"/></svg><ul class="legend legend--row">${c.series.map((s, j) => `<li><i style="background:${j ? "#c9b6aa" : PAL[0]}"></i>${esc(s)}</li>`).join("")}</ul>`;
  }
  function chPareto(c) {
    const W = 420, H = 240, max = Math.max(...c.data.map(d => d[1])), n = c.data.length, step = (W - 60) / n, bw = step * .55;
    const X = i => 30 + step * i + step / 2, Yp = p => 185 - p / 100 * 160;
    const line = c.data.map((d, i) => `${X(i)},${Yp(d[2])}`).join(" ");
    return svgOpen(W, H, c.title) + c.data.map((d, i) => { const h = d[1] / max * 120; return `<rect x="${X(i) - bw / 2}" y="${185 - h}" width="${bw}" height="${h}" rx="5" fill="#c9b6aa"/><text x="${X(i)}" y="205" text-anchor="middle" class="t-lab">${esc(d[0])}</text>`; }).join("") +
      `<line x1="20" x2="${W - 20}" y1="${Yp(80)}" y2="${Yp(80)}" stroke="#15110f" stroke-dasharray="6 5" stroke-width="1.5"/><text x="${W - 20}" y="${Yp(80) - 6}" text-anchor="end" class="t-val">Goal 80%</text>` +
      `<polyline points="${line}" fill="none" stroke="${PAL[0]}" stroke-width="3"/>` + c.data.map((d, i) => `<circle cx="${X(i)}" cy="${Yp(d[2])}" r="5" fill="${PAL[0]}"/><text x="${X(i)}" y="${Yp(d[2]) - 10}" text-anchor="middle" class="t-val">${d[2]}%</text>`).join("") +
      `<line x1="14" x2="${W - 14}" y1="185" y2="185" class="t-axis"/></svg>`;
  }
  const CH = { bars: chBars, columns: chColumns, line: chLine, donut: chDonut, grouped: chGrouped, pareto: chPareto };

  function biCase(b) {
    return `
      <header class="cs__hero cs__hero--bi">
        <div class="cs__meta"><span>Power BI</span><span>${b.pages.length} report pages</span></div>
        <h2 id="modal-title">${esc(b.title)}</h2>
        <p>${esc(b.focus)}</p>
      </header>
      <div class="cs">
        <div class="cs__note">${icon("grid")}<div><b>Data:</b> ${esc(b.dataset)}. Figures were computed from the report’s own data model with the same DAX logic, and the charts are redrawn here.</div></div>
        <div class="bikpis">${b.kpis.map(k => `<div><b>${esc(k[0])}</b><span>${esc(k[1])}</span></div>`).join("")}</div>
        <div class="bicharts">${b.charts.map(c => `<div class="chart bichart${b.charts.length === 1 ? " bichart--wide" : ""}"><h3 class="cs__h">${esc(c.title)}</h3>${CH[c.type](c)}</div>`).join("")}</div>
        <div><h3 class="cs__h">What the dashboard shows</h3><ul class="cs__find">${b.insights.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>
        <div><h3 class="cs__h">DAX I wrote for this report</h3><div class="dax">${b.dax.map(d => `<div><span>${esc(d[0])}</span><code>${esc(d[1])}</code></div>`).join("")}</div></div>
        <div><h3 class="cs__h">Report pages</h3><div class="cs__tools">${b.pages.map(p => `<span>${esc(p)}</span>`).join("")}</div></div>
      </div>`;
  }

  /* ---------- modal ---------- */
  const modal = $("#modal"), body = $("#modal-body"), panel = $(".modal__panel");
  let lastFocus = null;
  function openModal(key) {
    const [type, id] = key.split(":");
    const src = { data: D.dataProjects, manual: D.manualDesign, ai: D.aiDesign, bi: D.biDashboards }[type];
    const p = src && src.find(x => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    body.innerHTML = type === "data" ? dataCase(p) : type === "manual" ? manualCase(p) : type === "bi" ? biCase(p) : aiCase(p);
    modal.hidden = false; document.body.classList.add("no-scroll");
    modal.scrollTop = 0; panel.focus({ preventScroll: true });
    requestAnimationFrame(() => setTimeout(() => $$(".bar__fill", body).forEach(b => b.style.width = b.dataset.w + "%"), 60));
    if (location.hash !== "#" + type + "-" + id) history.replaceState(null, "", "#" + type + "-" + id);
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true; body.innerHTML = ""; document.body.classList.remove("no-scroll");
    history.replaceState(null, "", location.pathname);
    lastFocus && lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"); if (o) return openModal(o.dataset.open);
    if (e.target.closest("[data-close]")) return closeModal();
    const z = e.target.closest("[data-zoom]"); if (z) return zoom(z);
    const f = e.target.closest("[data-frame] button");
    if (f) { const box = f.parentElement; box.outerHTML = `<iframe src="${box.dataset.frame}" title="Interactive prototype" loading="lazy"></iframe>`; }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { if (!lb.hidden) return closeZoom(); closeModal(); }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-zoom]")) { e.preventDefault(); zoom(e.target); }
    if (e.key === "Tab" && !modal.hidden && lb.hidden) {
      const f = $$('a[href],button:not([disabled]),iframe,[tabindex="0"]', modal).filter(x => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    }
  });
  // deep links: #data-airbnb, #ai-saba …
  const m = location.hash.match(/^#(data|manual|ai|bi)-(\w+)$/);
  if (m) openModal(m[1] + ":" + m[2]);

  /* lightbox */
  const lb = $("#lightbox");
  function zoom(fig) { $("img", lb).src = fig.dataset.zoom; $("img", lb).alt = fig.dataset.cap; $("figcaption", lb).textContent = fig.dataset.cap; lb.hidden = false; $("button", lb).focus(); }
  function closeZoom() { lb.hidden = true; }
  lb.addEventListener("click", e => { if (e.target === lb || e.target.closest("button")) closeZoom(); });

  /* ---------- nav ---------- */
  const nav = $(".nav"), burger = $(".nav__burger"), menu = $("#mobile-menu");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", open); menu.hidden = !open;
  });
  menu.addEventListener("click", e => { if (e.target.closest("a")) { burger.setAttribute("aria-expanded", false); menu.hidden = true; } });

  const links = $$(".nav__links a");
  const spy = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["about", "projects", "design", "experience", "skills", "contact"].forEach(id => { const s = document.getElementById(id); s && spy.observe(s); });

  /* ---------- reveal ---------- */
  const rv = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); rv.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; rv.observe(el); });

  /* ---------- copy email ---------- */
  $$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copied"; b.classList.add("is-done"); }
    catch { b.textContent = "Select & copy"; }
    setTimeout(() => { b.textContent = "Copy"; b.classList.remove("is-done"); }, 1800);
  }));
})();
