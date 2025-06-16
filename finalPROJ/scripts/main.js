document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("infoModal");
    const btn = document.getElementById("moreInfoBtn");
    const span = document.querySelector(".close-btn");

    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
