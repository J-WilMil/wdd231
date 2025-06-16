const classSelect = document.getElementById("classSelect");
const weaponSelect = document.getElementById("weaponSelect");
const armorSelect = document.getElementById("armorSelect");
const statDisplay = document.getElementById("statDisplay");
const classImage = document.getElementById("classImage");

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

const armors = {
    Light: { DEX: 2 },
    Medium: { STR: 1, END: 1 },
    Heavy: { STR: 3, END: 2 }
};

function calculateStats(cls, weapon, armor) {
    const stats = { STR: 0, VIG: 0, INT: 0, DEX: 0, END: 0 };
    const base = classes[cls];
    const wpn = weapons[weapon];
    const arm = armors[armor];
    Object.keys(stats).forEach(stat => {
        stats[stat] += base[stat] || 0;
        stats[stat] += wpn[stat] || 0;
        stats[stat] += arm[stat] || 0;
    });
    return stats;
}

function updateStats() {
    if (classImages[classSelect.value]) {
        classImage.src = classImages[classSelect.value];
        classImage.alt = `${classSelect.value} Class Image`;
    }
    const stats = calculateStats(classSelect.value, weaponSelect.value, armorSelect.value);
    statDisplay.innerHTML = Object.entries(stats).map(([stat, val]) => `${stat}: ${val}`).join("<br>");
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
    Object.keys(armors).forEach(arm => {
        const option = document.createElement("option");
        option.value = arm;
        option.textContent = arm;
        armorSelect.appendChild(option);
    });
    classSelect.addEventListener("change", updateStats);
    weaponSelect.addEventListener("change", updateStats);
    armorSelect.addEventListener("change", updateStats);
    classSelect.value = "Warrior";
    weaponSelect.value = "Sword";
    armorSelect.value = "Medium";
    updateStats();
});

function saveBuild() {
    const name = prompt("Enter a name for your build:");
    if (!name || name.trim() === "") return;
    const selectedClass = classSelect.value;
    const selectedWeapon = weaponSelect.value;
    const selectedArmor = armorSelect.value;
    const stats = calculateStats(selectedClass, selectedWeapon, selectedArmor);
    const newBuild = {
        name: name.trim(),
        class: selectedClass,
        weapon: selectedWeapon,
        armor: selectedArmor,
        stats
    };
    const savedBuilds = JSON.parse(localStorage.getItem("communityBuilds")) || [];
    savedBuilds.push(newBuild);
    localStorage.setItem("communityBuilds", JSON.stringify(savedBuilds));
    alert("Build saved successfully! Visit the Community Builds page to see it.");
}
