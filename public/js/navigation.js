/* ============================================================
   NAVIGATION.JS — Section Switching, Breadcrumb & Sidebar
   A. Elnerge Technologies
   ============================================================ */

const sectionMap = {
  home:       'Home',
  products:   'IBA Suite',
  story:      'Our Story',
  services:   'Our Services',
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
  document.querySelectorAll('.page-section').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });

  // Show target section
  const target = document.getElementById('sec-' + name);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }

  // Update breadcrumb
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = sectionMap[name] || name;

  // Update active sidebar link
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  // Scroll to top
  window.scrollTo(0, 0);

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }

  // Init BuildSmart calculator when demo opens
  if (name === 'demo') setTimeout(calcMaterials, 150);
}

// ── SIDEBAR TOGGLE ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('main');
  if (!sidebar) return;
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('open');
  } else {
    sidebar.classList.toggle('collapsed');
    if (main) main.classList.toggle('expanded');
  }
}

// Close sidebar on outside click (mobile)
document.addEventListener('click', e => {
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

// ── INIT on page load ──
window.addEventListener('load', () => {

  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });

  // Show home
  const home = document.getElementById('sec-home');
  if (home) {
    home.style.display = 'block';
    home.classList.add('active');
  }

  // Set copyright year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Init calculator
  calcMaterials();
});


// ── HERO SLIDESHOW ──
let currentSlide   = 0;
const totalSlides  = 5;
let slideshowTimer = null;

function goToSlide(index) {
  // Remove active from current slide and dot
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // Set new active
  currentSlide = index;
  if (slides[currentSlide]) slides[currentSlide].classList.add('active');
  if (dots[currentSlide])   dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
}

function startSlideshow() {
  // Auto advance every 3 seconds
  slideshowTimer = setInterval(nextSlide, 3000);
}

function stopSlideshow() {
  if (slideshowTimer) clearInterval(slideshowTimer);
}

// Start slideshow when page loads
window.addEventListener('load', () => {
  startSlideshow();

  // Pause on hover
  const wrap = document.querySelector('.hero-slideshow-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', stopSlideshow);
    wrap.addEventListener('mouseleave', startSlideshow);
  }
});