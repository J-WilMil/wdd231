const hambutton = document.querySelector("#menu");
const mainnav = document.querySelector(".navigation");

hambutton.addEventListener("click", ()=> {
    mainnav.classList.toggle("show");
    hambutton.classList.toggle("show");
});