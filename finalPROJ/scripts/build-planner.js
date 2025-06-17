const classSelect = document.getElementById("classSelect");
const weaponSelect = document.getElementById("weaponSelect");
const armourSelect = document.getElementById("armourSelect");
const statDisplay = document.getElementById("statDisplay");
const classImage = document.getElementById("classImage");
const weaponImage = document.getElementById("weaponImage");
const armourImage = document.getElementById("armourImage");

const classImages = {
    Warrior: "images/warrior.webp",
    Mage: "images/mage.webp",
    Rogue: "images/rogue.webp"
};

const classes = {
    Warrior: { STR: 10, VIG: 8, INT: 2, DEX: 5, END: 7 },
    Mage: { STR: 2, VIG: 5, INT: 12, DEX: 4, END: 6 },
    Rogue: { STR: 5, VIG: 6, INT: 4, DEX: 10, END: 5 }
};

const weapons = {
    Sword: { STR: 3, DEX: 1 },
    Axe: { STR: 4, END: 1 },
    Staff: { INT: 5 },
    Bow: { STR: 1, DEX: 3 }
};

const armours = {
    Light: { DEX: 2 },
    Medium: { STR: 1, END: 1 },
    Heavy: { STR: 3, END: 2 }
};

function calculateStats(cls, weapon, armour) {
    const stats = { STR: 0, VIG: 0, INT: 0, DEX: 0, END: 0 };
    const base = classes[cls];
    const wpn = weapons[weapon];
    const arm = armours[armour];
    Object.keys(stats).forEach(stat => {
        stats[stat] += base[stat] || 0;
        stats[stat] += wpn[stat] || 0;
        stats[stat] += arm[stat] || 0;
    });
    return stats;
}

function updateItemHighlights() {
    document.querySelectorAll('.item').forEach(item => {
        const type = item.dataset.type;
        const name = item.dataset.name;

        item.classList.remove('selected');

        if (
            (type === 'class' && name === classSelect.value) ||
            (type === 'weapon' && name === weaponSelect.value) ||
            (type === 'armour' && name === armourSelect.value)
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

document.addEventListener("DOMContentLoaded", () => {
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

    classSelect.addEventListener("change", updateStats);
    weaponSelect.addEventListener("change", updateStats);
    armourSelect.addEventListener("change", updateStats);

    classSelect.value = "Warrior";
    weaponSelect.value = "Sword";
    armourSelect.value = "Medium";

    updateStats();
});

function saveBuild() {
    const name = prompt("Enter a name for your build:");
    if (!name || name.trim() === "") return;
    const selectedClass = classSelect.value;
    const selectedWeapon = weaponSelect.value;
    const selectedarmour = armourSelect.value;
    const stats = calculateStats(selectedClass, selectedWeapon, selectedarmour);
    const newBuild = {
        name: name.trim(),
        class: selectedClass,
        weapon: selectedWeapon,
        armour: selectedarmour,
        stats
    };
    const savedBuilds = JSON.parse(localStorage.getItem("communityBuilds")) || [];
    savedBuilds.push(newBuild);
    localStorage.setItem("communityBuilds", JSON.stringify(savedBuilds));
    alert("Build saved successfully! Visit the Community Builds page to see it.");
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const name = item.dataset.name;
        const stats = item.dataset.stats;

        modalTitle.textContent = name;
        modalBody.textContent = `Stat Bonus: ${stats}`;
        modal.style.display = 'block';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});
