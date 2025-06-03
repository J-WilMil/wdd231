async function loadDiscoverCards() {
  const response = await fetch('data/discover.json');
  const data = await response.json();
  const container = document.getElementById('discoverCards');

  data.forEach(item => {
    const card = document.createElement('section');
    card.classList.add('discover-card');
    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure><img src="${item.image}" alt="${item.title}"></figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    container.appendChild(card);
  });
}
loadDiscoverCards();

const message = document.getElementById('visitor-message');
const now = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit"));

if (!lastVisit) {
  message.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days === 0) {
    message.textContent = "Back so soon! Awesome!";
  } else {
    message.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
  }
}
localStorage.setItem("lastVisit", now);

data.forEach((item, index) => {
  const card = document.createElement('section');
  card.classList.add('discover-card');
  card.innerHTML = `
    <h2>${item.title}</h2>
    <figure><img src="${item.image}" alt="${item.title}"></figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button data-index="${index}">Learn More</button>
  `;
  container.appendChild(card);
});

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.getAttribute("data-index");
    const item = data[index];
    openModal(item);
  }
});

function openModal(item) {
  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-image").src = item.image;
  document.getElementById("modal-image").alt = item.title;
  document.getElementById("modal-description").textContent = item.description;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
