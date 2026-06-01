/* ============================================================
   DEMO.JS — Interactive Demo Walkthrough Logic
   A. Elnerge Technologies
   ============================================================ */

// State: tracks current product and current screen index per product
const demoState = {
  current: 'tradedesk',
  screenIndex: {
    tradedesk:  0,
    educlass:   0,
    sanctuary:  0,
    buildsmart: 0,
    innvue:     0,
    transitflow: 0,
  },
  screenCount: {
    tradedesk:  4,
    educlass:   4,
    sanctuary:  4,
    buildsmart: 4,
    innvue:     4,
    transitflow: 4,
  },
};

/**
 * Switch between product demo panels
 * @param {string} name - Product key (e.g. 'tradedesk')
 * @param {HTMLElement|null} tabEl - The tab button that was clicked
 */
function switchDemo(name, tabEl) {
  // Hide all panels and deactivate all tabs
  document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));

  // Show the selected panel
  const panel = document.getElementById('p-' + name);
  if (panel) panel.classList.add('active');

  // Activate the tab
  const tab = tabEl || document.getElementById('dt-' + name);
  if (tab) tab.classList.add('active');

  // Update state
  demoState.current = name;

  // Sync the screen nav to the current screen for this product
  syncScreenNav(name, demoState.screenIndex[name]);

  // Init the BuildSmart calculator if that product is selected
  if (name === 'buildsmart') {
    setTimeout(calcMaterials, 80);
  }
}

/**
 * Switch to a specific screen within the current product demo
 * @param {string} product - Product key
 * @param {number} idx - Screen index (0-based)
 * @param {HTMLElement|null} liEl - The nav list item that was clicked
 */
function showScreen(product, idx, liEl) {
  // Hide all screens in this panel
  document.querySelectorAll('#p-' + product + ' .screen').forEach(s => s.classList.remove('active'));

  // Show the target screen
  const screen = document.getElementById(product + '-' + idx);
  if (screen) screen.classList.add('active');

  // Update state
  demoState.screenIndex[product] = idx;

  // Update sidebar nav active state
  if (liEl) {
    document.querySelectorAll('#n-' + product + ' li').forEach(l => l.classList.remove('active'));
    liEl.classList.add('active');
  }

  // If BuildSmart calculator screen is shown, init the calculator
  if (product === 'buildsmart' && idx === 0) {
    setTimeout(calcMaterials, 50);
  }
}

/**
 * Sync the sidebar nav dots to the current screen index
 * Called internally after state changes
 */
function syncScreenNav(product, idx) {
  // Update sidebar nav
  document.querySelectorAll('#n-' + product + ' li').forEach((li, i) => {
    li.classList.toggle('active', i === idx);
  });

  // Show the correct screen
  document.querySelectorAll('#p-' + product + ' .screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(product + '-' + idx);
  if (screen) screen.classList.add('active');
}

/**
 * Go to the next screen in the current demo
 */
function demoNext() {
  const p     = demoState.current;
  const max   = demoState.screenCount[p] - 1;
  const next  = Math.min(demoState.screenIndex[p] + 1, max);
  demoState.screenIndex[p] = next;
  syncScreenNav(p, next);
}

/**
 * Go to the previous screen in the current demo
 */
function demoBack() {
  const p    = demoState.current;
  const prev = Math.max(demoState.screenIndex[p] - 1, 0);
  demoState.screenIndex[p] = prev;
  syncScreenNav(p, prev);
}