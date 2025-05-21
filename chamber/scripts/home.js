const spotlightsContainer = document.getElementById("spotlights-container");
const weatherContainer = document.getElementById("weather");

async function fetchWeather() {
  const apiKey = "e6bcc7da30ae0e3188e4811eb466768f"; 
  const city = "Manila";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();

    const current = data.list[0];
    const forecast = [data.list[8], data.list[16], data.list[24]];

    let html = `
      <p><strong>Now:</strong> ${current.main.temp.toFixed(1)}°F - ${current.weather[0].description}</p>
      <ul>
        ${forecast.map((f, i) => `<li><strong>Day ${i + 1}:</strong> ${f.main.temp.toFixed(1)}°F</li>`).join("")}
      </ul>
    `;
    weatherContainer.innerHTML = html;
  } catch (error) {
    weatherContainer.innerHTML = "<p>Unable to fetch weather data.</p>";
    console.error(error);
  }
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    const goldSilver = data.members.filter(m => m.level === 2 || m.level === 3);

    const count = Math.floor(Math.random() * 2) + 2;
    const selected = goldSilver.sort(() => 0.5 - Math.random()).slice(0, count);

    selected.forEach(member => {
      const card = document.createElement("section");
      card.classList.add("business-card");
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> Timbuktu, Mali</p>
        <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
        <p><strong>Membership Level:</strong> ${member.level === 3 ? 'Gold' : 'Silver'}</p>
      `;
      spotlightsContainer.appendChild(card);
    });
  } catch (err) {
    spotlightsContainer.innerHTML = "<p>Error loading spotlights.</p>";
    console.error(err);
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");
hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("show");
});

fetchWeather();
loadSpotlights();
