'use strict';
const projectData = {
  bulkhead: {
    kicker: 'BEACH LAUNCH TEAM / 2026 – PRESENT',
    title: 'Bulkhead design & optimization',
    image: 'assets/bulkhead.webp',
    imageClass: 'image-bulkhead',
    alt: 'CAD rendering of a gold-colored annular rocket bulkhead',
    description: 'I performed hand-calculated stress and strain trade studies comparing bulkhead concepts, focusing on load paths, factors of safety, and available room for fluids and avionics. The selected design satisfied structural requirements while protecting critical routing space. I also supported CAD and design-for-manufacture reviews.',
    stats: [['2%', 'BULKHEAD DRY MASS REDUCTION'], ['8', 'BULKHEADS DESIGNED FOR MANUFACTURE']],
    tags: 'STRUCTURAL ANALYSIS / CAD / DFM'
  },
  copv: {
    kicker: 'BEACH LAUNCH TEAM / 2026 – PRESENT',
    title: 'COPV hydrostatic proof testing',
    image: '',
    imageClass: 'image-copv',
    description: 'I manually operated high-pressure pumping equipment during hydrostatic proof testing of a nitrogen-tank composite overwrapped pressure vessel (COPV). Working with the team, I logged real-time sensor data to support validation of structural safety margins.',
    stats: [['4,500 psi', 'HYDROSTATIC PROOF PRESSURE'], ['DAQ', 'REAL-TIME SENSOR LOGGING']],
    tags: 'HYDROSTATIC TESTING / DAQ / COPV'
  },
  valve: {
    kicker: 'PERSONAL PROJECT / DECEMBER 2025',
    title: 'Butterfly valve assembly',
    image: 'assets/valve.webp',
    imageClass: 'image-valve',
    alt: 'CATIA modeling view of butterfly valve mechanism',
    description: 'A personal CATIA design exercise centered on a complete multi-part mechanical assembly. I modeled component fitment and the lever-actuated mechanism to explore how individual parts work together under assembly constraints and intended kinematic movement.',
    stats: [['CATIA', 'CAD ASSEMBLY PLATFORM'], ['2025', 'PROJECT YEAR']],
    tags: 'CATIA / ASSEMBLY DESIGN / KINEMATICS'
  },
  rocket: {
    kicker: 'PERSONAL PROJECT / SEPTEMBER 2026 – PRESENT',
    title: 'L1 solid rocket design & build',
    image: 'assets/rocket-design.webp',
    imageClass: 'image-rocket',
    alt: 'OpenRocket side elevation of H-motor class model rocket',
    description: 'I am designing and fabricating a Level 1 high-power rocket for a commercial H-class motor. Work includes OpenRocket simulation, a fiberglass wet-layup airframe, and precision woodworking. The build remains in progress.',
    stats: [['H-class', 'PLANNED MOTOR CLASS'], ['OpenRocket', 'SIMULATION SOFTWARE']],
    tags: 'OPENROCKET / COMPOSITES / FABRICATION',
    detailMedia: [{
      src: 'assets/l1-simulation.png',
      alt: 'OpenRocket simulation graph titled Simulation 1 showing altitude, vertical acceleration, and vertical velocity versus time',
      title: 'Flight simulation profile',
      caption: 'Simulation output from OpenRocket showing the expected altitude, deployment timing, and flight behavior for the L1 build.'
    }]
  }
};

const copvSvg = document.querySelector('.copv-illustration');
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const closeDialog = document.querySelector('#dialog-close');
let lastProjectTrigger = null;

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function showProject(key, trigger) {
  const data = projectData[key];
  if (!data) return;
  lastProjectTrigger = trigger;
  const cover = data.image
    ? `<img src="${escapeHTML(data.image)}" alt="${escapeHTML(data.alt)}">`
    : copvSvg.outerHTML;
  dialogContent.innerHTML = `
    <div class="dialog-image ${escapeHTML(data.imageClass)}">${cover}</div>
    <div class="dialog-text">
      <div class="eyebrow"><span class="eyebrow-square"></span>${escapeHTML(data.kicker)}</div>
      <h2 id="dialog-heading">${escapeHTML(data.title)}</h2>
      <p>${escapeHTML(data.description)}</p>
      ${Array.isArray(data.detailMedia) ? `<div class="dialog-media-grid">${data.detailMedia.map(media => `<figure class="dialog-media-card"><img src="${escapeHTML(media.src)}" alt="${escapeHTML(media.alt)}" loading="lazy"><figcaption><strong>${escapeHTML(media.title || '')}</strong><span>${escapeHTML(media.caption || '')}</span></figcaption></figure>`).join('')}</div>` : ''}
      <div class="dialog-stats">${data.stats.map(stat => `<div class="dialog-stat"><strong>${escapeHTML(stat[0])}</strong><span>${escapeHTML(stat[1])}</span></div>`).join('')}</div>
      <span class="project-tags">${escapeHTML(data.tags)}</span><br>
      <a class="dialog-link" href="assets/Brandon-Pendery-Projects-and-Test-Campaign.pdf" target="_blank" rel="noopener">View portfolio PDF ↗</a>
    </div>`;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('dialog-open');
}
document.querySelectorAll('[data-project]').forEach(trigger => {
  trigger.addEventListener('click', () => showProject(trigger.dataset.project, trigger));
});
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastProjectTrigger?.focus({preventScroll:true});
});

const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-navigation');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); });

let toastTimer;
const toast = document.querySelector('#toast');
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}
document.querySelector('[data-copy-email]').addEventListener('click', async () => {
  const email = 'bpendery2021@gmail.com';
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
    await navigator.clipboard.writeText(email);
    showToast('Email address copied');
  } catch {
    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.click();
    showToast('Opening your email app');
  }
});
