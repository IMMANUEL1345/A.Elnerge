/* ============================================================
   NAVIGATION.JS — Section Switching, Breadcrumb & Sidebar
   A. Elnerge Technologies
   ============================================================ */

const sectionNames = {
  home:       'Home',
  products:   'IBA Suite',
  story:      'Our Story',
  demo:       'Interactive Demo',
  team:       'Our Team',
  gallery:    'Media Gallery',
  why:        'Why Elnerge',
  industries: 'Industries',
  contact:    'Contact Us',
};

// All section IDs
const ALL_SECTIONS = [
  'sec-home',
  'sec-products',
  'sec-story',
  'sec-demo',
  'sec-team',
  'sec-gallery',
  'sec-why',
  'sec-industries',
  'sec-contact',
];

// ── HIDE ALL SECTIONS ON PAGE LOAD ──
// Runs immediately when script loads — before browser paints
(function init() {
  ALL_SECTIONS.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active');
    }
  });

  // Show only home section by default
  const home = document.getElementById('sec-home');
  if (home) {
    home.style.display = 'block';
    home.classList.add('active');
  }
})();

// ── NAVIGATE TO A SECTION ──
function go(name, linkEl) {

  // Hide ALL sections using inline style (overrides everything)
  ALL_SECTIONS.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active');
    }
  });

  // Show ONLY the target section
  const target = document.getElementById('sec-' + name);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }

  // Update breadcrumb text
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = sectionNames[name] || name;

  // Update active sidebar link highlight
  document.querySelectorAll('.sidebar-link').forEach(function(l) {
    l.classList.remove('active');
  });
  if (linkEl) {
    linkEl.classList.add('active');
  }

  // Scroll to very top — all browser methods covered
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // On mobile — close sidebar after navigation
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  }

  // Init BuildSmart calculator when demo section opens
  if (name === 'demo') {
    setTimeout(calcMaterials, 150);
  }
}

// ── SIDEBAR TOGGLE (hamburger ☰ button) ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('main');
  if (!sidebar) return;

  if (window.innerWidth <= 768) {
    // Mobile: slide in/out overlay
    sidebar.classList.toggle('open');
  } else {
    // Desktop: collapse/expand and shift main content
    sidebar.classList.toggle('collapsed');
    if (main) main.classList.toggle('expanded');
  }
}

// ── CLOSE SIDEBAR WHEN CLICKING OUTSIDE ON MOBILE ──
document.addEventListener('click', function(e) {
  const sidebar   = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (
    window.innerWidth <= 768 &&
    sidebar &&
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    toggleBtn &&
    !toggleBtn.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});