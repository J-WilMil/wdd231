const showAll = document.querySelector("#showall");
const showCSE = document.querySelector("#showcse");
const showWDD = document.querySelector("#showwdd");

const allCourses = document.querySelectorAll(".course");
const cseCourses = document.querySelectorAll(".CSE");
const wddCourses = document.querySelectorAll(".WDD");

const buttons = [showAll, showCSE, showWDD]; // Store all buttons

// Function to reset all courses and remove 'open' from buttons
function resetCourses() {
    allCourses.forEach(course => course.classList.remove("open")); // Hide all courses
    buttons.forEach(button => button.classList.remove("active")); // Remove active state
}

// Function to show only selected courses
function showCourses(courses, button) {
    resetCourses(); // Hide all first
    courses.forEach(course => course.classList.add("open")); // Show selected courses
    button.classList.add("active"); // Highlight the clicked button
}

// Event listeners for buttons
showAll.addEventListener("click", () => showCourses(allCourses, showAll));
showCSE.addEventListener("click", () => showCourses(cseCourses, showCSE));
showWDD.addEventListener("click", () => showCourses(wddCourses, showWDD));
