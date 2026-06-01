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

  // Scroll to top of main content
  const main = document.getElementById('main');
  if (main) main.scrollTo(0, 0);

  // Init demo calculator if navigating to demo
  if (name === 'demo') {
    setTimeout(calcMaterials, 100);
  }
}