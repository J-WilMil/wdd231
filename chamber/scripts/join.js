document.getElementById("timestamp").value = new Date().toISOString();

window.addEventListener("load", () => {
  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transition = `opacity 0.5s ease ${i * 0.3}s`;
    setTimeout(() => card.style.opacity = 1, 100);
  });
});

document.querySelectorAll("[data-modal]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(link.getAttribute("data-modal")).style.display = "flex";
  });
});

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
  });
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});
