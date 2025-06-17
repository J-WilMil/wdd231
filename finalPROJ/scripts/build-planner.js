const classSelect = document.getElementById("classSelect");
const weaponSelect = document.getElementById("weaponSelect");
const armourSelect = document.getElementById("armourSelect");
const statDisplay = document.getElementById("statDisplay");
const classImage = document.getElementById("classImage");
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

let classes = {};
let weapons = {};
let armours = {};
let classImages = {};

async function fetchData() {
  try {
    const response = await fetch('data/data.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    classes = data.classes;
    weapons = data.weapons;
    armours = data.armours;
    classImages = data.classImages;

    initialize();
    setupItemListeners();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function initialize() {
  Object.keys(classes).forEach(cls => {
    const option = document.createElement("option");
    option.value = cls;
    option.textContent = cls;
    classSelect.appendChild(option);
  });
  Object.keys(weapons).forEach(wpn => {
    const option = document.createElement("option");
    option.value = wpn;
    option.textContent = wpn;
    weaponSelect.appendChild(option);
  });
  Object.keys(armours).forEach(arm => {
    const option = document.createElement("option");
    option.value = arm;
    option.textContent = arm;
    armourSelect.appendChild(option);
  });

  classSelect.value = "Warrior";
  weaponSelect.value = "Sword";
  armourSelect.value = "Medium";

  classSelect.addEventListener("change", updateStats);
  weaponSelect.addEventListener("change", updateStats);
  armourSelect.addEventListener("change", updateStats);

  updateStats();
}

function calculateStats(cls, weapon, armour) {
  const stats = { STR: 0, VIG: 0, INT: 0, DEX: 0, END: 0 };
  const base = classes[cls];
  const wpn = weapons[weapon];
  const arm = armours[armour];
  Object.keys(stats).forEach(stat => {
    stats[stat] += (base[stat] || 0) + (wpn[stat] || 0) + (arm[stat] || 0);
  });
  return stats;
}

function updateItemHighlights() {
  const cls = classSelect.value;
  const wpn = weaponSelect.value;
  const arm = armourSelect.value;

  document.querySelectorAll('.item').forEach(item => {
    item.classList.remove('selected');
    const type = item.dataset.type;
    const name = item.dataset.name;

    if (
      (type === 'class' && name === cls) ||
      (type === 'weapon' && name === wpn) ||
      (type === 'armour' && name === arm)
    ) {
      item.classList.add('selected');
    }
  });
}

function updateStats() {
  const cls = classSelect.value;
  const wpn = weaponSelect.value;
  const arm = armourSelect.value;

  if (classImages[cls]) {
    classImage.src = classImages[cls];
    classImage.alt = `${cls} Class Image`;
  }

  const stats = calculateStats(cls, wpn, arm);
  statDisplay.innerHTML = Object.entries(stats)
    .map(([stat, val]) => `${stat}: ${val}`)
    .join("<br>");

  updateItemHighlights();
}

function setupItemListeners() {
  const itemGrid = document.querySelector('.item-grid');
  
  itemGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (!item) return;

    modalTitle.textContent = item.dataset.name;
    modalBody.textContent = `Stat Bonus: ${item.dataset.stats}`;
    modal.style.display = 'block';
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchData);
