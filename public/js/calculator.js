/* ============================================================
   CALCULATOR.JS — IBA BuildSmart Material Calculator
   A. Elnerge Technologies
   ============================================================ */

const MATERIAL_BASE = {
  '1bed':   { blocks: 1800, cement: 110, rods: 70,  sand: 4, gravel: 3 },
  '2bed':   { blocks: 2800, cement: 180, rods: 120, sand: 6, gravel: 4 },
  '3bed':   { blocks: 4200, cement: 260, rods: 180, sand: 9, gravel: 6 },
  'office': { blocks: 3600, cement: 220, rods: 160, sand: 8, gravel: 5 },
  'shop':   { blocks: 2000, cement: 140, rods: 90,  sand: 5, gravel: 3 },
};

const MATERIALS_CONFIG = [
  { key: 'blocks', icon: '🧱', name: 'Sandcrete Blocks',   unit: 'blocks',  multiplier: 0.9 },
  { key: 'cement', icon: '🏺', name: 'Cement (50kg bags)', unit: 'bags',    multiplier: 1   },
  { key: 'rods',   icon: '🔩', name: 'Iron Rods (12mm)',   unit: 'lengths', multiplier: 1   },
  { key: 'sand',   icon: '⛏️', name: 'Sharp Sand',         unit: 'trips',   multiplier: 1   },
  { key: 'gravel', icon: '🪨', name: 'Granite / Gravel',   unit: 'trips',   multiplier: 1   },
];

function calcMaterials() {
  const typeEl  = document.getElementById('build-type');
  const floorEl = document.getElementById('floors');
  if (!typeEl || !floorEl) return;

  const type   = typeEl.value;
  const floors = parseInt(floorEl.value, 10);
  const base   = MATERIAL_BASE[type];
  if (!base) return;

  const items = MATERIALS_CONFIG.map(mat => ({
    icon: mat.icon,
    name: mat.name,
    unit: mat.unit,
    qty:  Math.round(base[mat.key] * floors * mat.multiplier),
  }));

  items.push({ icon: '🪵', name: 'Roofing Timber', unit: 'pieces', qty: Math.round(40 * floors) });

  const output = document.getElementById('mat-out');
  if (!output) return;

  output.innerHTML = items.map(item => `
    <div class="material-row">
      <span class="material-icon">${item.icon}</span>
      <span class="material-name">${item.name}</span>
      <span class="material-qty">${item.qty.toLocaleString()}</span>
      <span class="material-unit">${item.unit}</span>
    </div>
  `).join('');
}