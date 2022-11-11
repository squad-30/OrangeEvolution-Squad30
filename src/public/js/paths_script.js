const homeBtn = document.querySelector("#homeBtn");
const aboutBtn = document.querySelector("#aboutBtn");
const profileBtn = document.querySelector("#profileBtn");

homeBtn.addEventListener("click", () => {
    window.location.pathname = '/';
});

aboutBtn.addEventListener("click", () => {
    window.location.pathname = '/about';
});

profileBtn.addEventListener("click", () => {
    window.location.pathname = '/profile';
});