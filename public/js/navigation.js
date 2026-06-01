/* ============================================================
   NAVIGATION.JS — Section Switching & Breadcrumb
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

/**
 * Navigate to a section
 * @param {string} name - Section key (e.g. 'products')
 * @param {HTMLElement|null} linkEl - The sidebar link that was clicked
 */
function go(name, linkEl) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Show the target section
  const target = document.getElementById('sec-' + name);
  if (target) target.classList.add('active');

  // Update breadcrumb
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = sectionNames[name] || name;

  // Update active sidebar link
  if (linkEl) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    linkEl.classList.add('active');
  }

  // Scroll page to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Also scroll #main to top in case it has overflow
  const main = document.getElementById('main');
  if (main) main.scrollTop = 0;

  // Close sidebar on mobile after navigation
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.remove('open');
  }

  // Init demo calculator if navigating to demo
  if (name === 'demo') {
    setTimeout(calcMaterials, 100);
  }
}

// ── MOBILE SIDEBAR TOGGLE ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (
    window.innerWidth <= 768 &&
    sidebar &&
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    e.target !== toggleBtn
  ) {
    sidebar.classList.remove('open');
  }
});