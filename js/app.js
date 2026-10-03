/* One page. Everything is generated from data/cards.js.
 * "#" shows all cards; "#border-wolf" shows that card enlarged, with the other cards beside it. */
(function () {
  'use strict';
  const app = document.getElementById('app');
  let cur = null; // card currently shown, if any
  const SITE = 'Card Suggestions by Pavel';
  const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lbl = (kind, id) => (TAXONOMY[kind] || {})[id] || id;
  const FAC = Object.fromEntries(FACTIONS.map((f) => [f.id, f]));
  const BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));
  const rank = (f, c) => { const i = (f.cards || []).indexOf(c.id); return i < 0 ? 999 : i; };
  const factionCards = (f) => CARDS.filter((c) => c.faction === f.id).sort((a, b) => rank(f, a) - rank(f, b));
  const ORDERED = FACTIONS.flatMap(factionCards);

  const SYM = {
    'scintillant-assembly': '<path d="M12 1l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/>',
    'ironhand-dominion': '<path fill-rule="evenodd" d="M12 2l9 5v10l-9 5-9-5V7zM12 8a4 4 0 1 0 .01 0z"/>',
    'magus': '<path fill-rule="evenodd" d="M1 12Q12 2 23 12 12 22 1 12zM12 8.5a3.5 3.5 0 1 0 .01 0z"/>',
    'order-of-undying': '<path fill-rule="evenodd" d="M5 22V10a7 7 0 0 1 14 0v12zM11 7h2v3h3v2h-3v5h-2v-5H8v-2h3z"/>'
  };
  const sym = (id) => `<svg viewBox="0 0 24 24" aria-hidden="true">${SYM[id] || ''}</svg>`;
  const coin = (c) => `<span class="coin" title="Cost: ${c.cost} gold">${c.cost}<small>gold</small></span>`;
  const types = (u) => arr(u.type).map((v) => esc(lbl('type', v))).join(', ');
  const chips = (u) => {
    const h = arr(u.traits).map((v) => `<span class="chip trait">${esc(lbl('trait', v))}</span>`).join('') + arr(u.mechanics).map((v) => `<span class="chip mech">${esc(lbl('mechanic', v))}</span>`).join('');
    return h ? `<div class="chips">${h}</div>` : '';
  };
  const STATS = ['attack', 'health', 'armor', 'movement', 'range', 'annex'];
  const statRow = (s = {}) => `<ul class="stats">${STATS.filter((k) => s[k] != null).map((k) => `<li class="stat stat-${k}"><b>${s[k]}${k === 'annex' ? '%' : ''}</b><span>${k}</span></li>`).join('')}</ul>`;
  const abHead = (a) => a.label || [a.name, arr(a.trigger).map((t) => lbl('trigger', t)).join(' / ')].filter(Boolean).join(' ');
  const abilities = (u) => ((u.abilities || []).length ? `<ul class="abilities">${u.abilities.map((a) => `<li class="ability"><span class="a-head">${esc(abHead(a))}${a.text ? ':' : ''}</span> ${esc(a.text || '')}</li>`).join('')}</ul>` : '');
  const altName = (c) => (c.alternateName ? `<p class="alt">or ${esc(c.alternateName)}</p>` : '');
  const plural = (n) => `${n} suggestion${n === 1 ? '' : 's'}`;
  const typeRarity = (c) => `<p class="types">${types(c)}</p><p class="rarity-line"><span class="rarity rarity-${c.rarity}">${esc(lbl('rarity', c.rarity))}</span></p>`;

  const tile = (c) => `<a class="tile" data-faction="${c.faction}" href="#${c.id}"><div class="tile-top"><div><h3>${esc(c.name)}</h3>${altName(c)}${typeRarity(c)}</div>${coin(c)}</div>${statRow(c.stats)}${chips(c)}</a>`;

  function home() {
    return `<section class="hero"><h1>${SITE}</h1><p>New units, organized by faction. ${plural(CARDS.length)} across ${FACTIONS.length} factions.<br>Select a card to read the details.</p></section>
      <div class="fcols">${FACTIONS.map((f) => `<section class="fcol" data-faction="${f.id}"><div class="fhead">${sym(f.id)}<h2>${esc(f.name)}</h2></div>${factionCards(f).map(tile).join('')}</section>`).join('')}</div>`;
  }

  const SEC_ORDER = ['why', 'concept', 'balance', 'concerns', 'designNotes', 'anotherAngle'];
  const SEC_TITLE = { why: 'Why This Card', concept: 'Concept', balance: 'Balance', concerns: 'Open Concern', designNotes: 'Design Notes', anotherAngle: 'Another Angle' };
  function section(c, k) {
    const s = (c.sections || {})[k], items = !s ? [] : Array.isArray(s) ? s : s.list || [];
    if (!items.length) return '';
    const title = (c.sectionTitles || {})[k] || SEC_TITLE[k];
    const body = Array.isArray(s) ? items.map((t) => `<p>${esc(t)}</p>`).join('') : `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
    return `<section class="sec" data-kind="${k}"><h2>${esc(title)}</h2>${body}</section>`;
  }
  const unitFace = (u, p) => `<section class="unit"><h2>${esc(u.name)}</h2><p class="note">Supporting unit of ${esc(p.name)}, not a separate suggestion.</p><p class="types">${types(u)}</p>${statRow(u.stats)}${chips(u)}${abilities(u)}</section>`;
  const mini = (c) => `<a class="mini${c === cur ? ' is-current' : ''}" data-faction="${c.faction}" href="#${c.id}"${c === cur ? ' aria-current="page"' : ''}><b>${esc(c.name)}</b><span>${c.cost} gold</span></a>`;

  function card(c) {
    const i = ORDERED.indexOf(c), prev = ORDERED[(i + ORDERED.length - 1) % ORDERED.length], next = ORDERED[(i + 1) % ORDERED.length];
    const notes = Object.entries(c.statNotes || {}).map(([k, v]) => `<p class="note">${k}: ${esc(v)}</p>`).join('');
    const others = FACTIONS.map((f) => { const cs = factionCards(f); return cs.length ? `<div class="ogroup" data-faction="${f.id}"><p class="ohead">${sym(f.id)}${esc(f.name)}</p>${cs.map(mini).join('')}</div>` : ''; }).join('');
    return `<p class="crumbs"><a href="#">All cards</a></p>
      <div class="stage"><div class="main" data-faction="${c.faction}">
        <div class="detail"><div>
          <article class="face"><header class="face-head"><div><h1>${esc(c.name)}</h1>${altName(c)}</div>${coin(c)}</header>
          <p class="faction-tag">${sym(c.faction)}${esc(FAC[c.faction].name)}</p>${typeRarity(c)}${statRow(c.stats)}${notes}${chips(c)}${abilities(c)}</article>
          ${(c.secondaryUnits || []).map((u) => unitFace(u, c)).join('')}
        </div><div>${SEC_ORDER.map((k) => section(c, k)).join('')}</div></div>
        <nav class="pager" aria-label="Cycle cards"><a href="#${prev.id}">Previous: ${esc(prev.name)}</a><a href="#${next.id}">Next: ${esc(next.name)}</a></nav>
      </div><aside class="others" aria-label="Other cards"><h2>Other cards</h2>${others}</aside></div>`;
  }

  function route() {
    cur = BY_ID[decodeURIComponent(location.hash.slice(1))] || null;
    app.innerHTML = cur ? card(cur) : home();
    document.title = cur ? `${cur.name} | ${SITE}` : SITE;
    window.scrollTo(0, 0);
  }
  document.addEventListener('keydown', (e) => {
    if (!cur || e.altKey || e.ctrlKey || e.metaKey) return;
    const i = ORDERED.indexOf(cur);
    if (e.key === 'ArrowRight') location.hash = ORDERED[(i + 1) % ORDERED.length].id;
    else if (e.key === 'ArrowLeft') location.hash = ORDERED[(i + ORDERED.length - 1) % ORDERED.length].id;
    else if (e.key === 'Escape') location.hash = '';
  });
  window.addEventListener('hashchange', route);
  route();
})();
