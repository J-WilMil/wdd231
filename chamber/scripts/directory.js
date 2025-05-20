const memberContainer = document.querySelector('#member-cards');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (err) {
    memberContainer.innerHTML = `<p>Error loading member data.</p>`;
    console.error(err);
  }
}

function displayMembers(members) {
  memberContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('business-card');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><em>${member.tagline}</em></p>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p><strong>Email:</strong> ${member.email}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
    `;
    memberContainer.appendChild(card);
  });
}

gridBtn.addEventListener('click', () => {
  memberContainer.classList.add('grid-view');
  memberContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  memberContainer.classList.add('list-view');
  memberContainer.classList.remove('grid-view');
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("show");
});

loadMembers();
