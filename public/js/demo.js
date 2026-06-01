/* ============================================================
   DEMO.JS — Interactive Demo Walkthrough Logic
   A. Elnerge Technologies
   ============================================================ */

const demoState = {
  current: 'tradedesk',
  screenIndex: {
    tradedesk:   0,
    educlass:    0,
    sanctuary:   0,
    buildsmart:  0,
    innvue:      0,
    transitflow: 0,
  },
  screenCount: {
    tradedesk:   4,
    educlass:    4,
    sanctuary:   4,
    buildsmart:  4,
    innvue:      4,
    transitflow: 4,
  },
};

// ── SWITCH PRODUCT TAB ──
function switchDemo(name, tabEl) {
  document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));

  const panel = document.getElementById('p-' + name);
  if (panel) panel.classList.add('active');

  const tab = tabEl || document.getElementById('dt-' + name);
  if (tab) tab.classList.add('active');

  demoState.current = name;
  syncScreenNav(name, demoState.screenIndex[name]);

  if (name === 'buildsmart') setTimeout(calcMaterials, 80);
}

// ── SHOW A SPECIFIC SCREEN ──
function showScreen(product, idx, li) {
  document.querySelectorAll('#p-' + product + ' .screen').forEach(s => s.classList.remove('active'));

  const screen = document.getElementById(product + '-' + idx);
  if (screen) screen.classList.add('active');

  demoState.screenIndex[product] = idx;

  if (li) {
    document.querySelectorAll('#n-' + product + ' li').forEach(l => l.classList.remove('active'));
    li.classList.add('active');
  }

  if (product === 'buildsmart' && idx === 0) setTimeout(calcMaterials, 50);
}

// ── SYNC SIDEBAR NAV DOTS ──
function syncScreenNav(product, idx) {
  document.querySelectorAll('#n-' + product + ' li').forEach((l, i) => {
    l.classList.toggle('active', i === idx);
  });

  document.querySelectorAll('#p-' + product + ' .screen').forEach(s => s.classList.remove('active'));

  const screen = document.getElementById(product + '-' + idx);
  if (screen) screen.classList.add('active');
}

// ── NEXT / BACK BUTTONS ──
function demoNext() {
  const p    = demoState.current;
  const next = Math.min(demoState.screenIndex[p] + 1, demoState.screenCount[p] - 1);
  demoState.screenIndex[p] = next;
  syncScreenNav(p, next);
}

function demoBack() {
  const p    = demoState.current;
  const prev = Math.max(demoState.screenIndex[p] - 1, 0);
  demoState.screenIndex[p] = prev;
  syncScreenNav(p, prev);
}