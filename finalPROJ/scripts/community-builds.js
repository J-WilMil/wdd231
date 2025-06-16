const communityBuildsContainer = document.getElementById("communityBuilds");

const sampleBuilds = [
    {
        name: "Blademaster Thorne",
        class: "Warrior",
        weapon: "Axe",
        armor: "Heavy",
        stats: { STR: 17, VIG: 8, INT: 2, DEX: 5, END: 10 }
    },
    {
        name: "Whisperleaf",
        class: "Rogue",
        weapon: "Bow",
        armor: "Light",
        stats: { STR: 5, VIG: 6, INT: 4, DEX: 15, END: 5 }
    },
    {
        name: "Eldrin the Wise",
        class: "Mage",
        weapon: "Staff",
        armor: "Medium",
        stats: { STR: 3, VIG: 5, INT: 17, DEX: 4, END: 7 }
    }
];

function displayBuildCard(build) {
    const card = document.createElement("div");
    card.className = "build-card";
    const statList = Object.entries(build.stats).map(([key, val]) => `<li>${key}: ${val}</li>`).join("");
    card.innerHTML = `
        <h3>${build.name}</h3>
        <p><strong>Class:</strong> ${build.class}</p>
        <p><strong>Weapon:</strong> ${build.weapon}</p>
        <p><strong>Armour:</strong> ${build.armor}</p>
        <p><strong>Stats:</strong></p>
        <ul>${statList}</ul>
    `;
    communityBuildsContainer.appendChild(card);
}

function loadAllBuilds() {
    communityBuildsContainer.innerHTML = "";
    sampleBuilds.forEach(displayBuildCard);
    const saved = JSON.parse(localStorage.getItem("communityBuilds")) || [];
    if (saved.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No saved builds yet. Create one in the Build Planner!";
        communityBuildsContainer.appendChild(message);
    } else {
        saved.forEach(displayBuildCard);
    }
}

document.getElementById("clearBuildsBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all community builds?")) {
        localStorage.removeItem("communityBuilds");
        loadAllBuilds();
    }
});

document.addEventListener("DOMContentLoaded", loadAllBuilds);
