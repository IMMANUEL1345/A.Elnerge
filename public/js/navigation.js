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

// ── NAVIGATE TO A SECTION ──
function go(name, linkEl) {

  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Show target section
  const target = document.getElementById('sec-' + name);
  if (target) target.classList.add('active');

  // Update breadcrumb text
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = sectionNames[name] || name;

  // Update active sidebar link highlight
  if (linkEl) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    linkEl.classList.add('active');
  }

  // Scroll to top — works across all browsers
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // On mobile — close sidebar after navigation
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }

  // Init BuildSmart calculator when demo section opens
  if (name === 'demo') {
    setTimeout(calcMaterials, 100);
  }
}

// ── SIDEBAR TOGGLE (hamburger button) ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('main');

  if (!sidebar) return;

  if (window.innerWidth <= 768) {
    // Mobile: slide in/out
    sidebar.classList.toggle('open');
  } else {
    // Desktop: collapse/expand with margin shift
    sidebar.classList.toggle('collapsed');
    if (main) main.classList.toggle('expanded');
  }
}

// ── CLOSE SIDEBAR WHEN CLICKING OUTSIDE (mobile) ──
document.addEventListener('click', function(e) {
  const sidebar    = document.getElementById('sidebar');
  const toggleBtn  = document.getElementById('sidebar-toggle');

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