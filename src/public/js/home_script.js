const api = axios.create({
  baseURL: "http://localhost:3000",
});

const loginBtn = document.querySelector("#loginBtn");
const aboutBtn = document.querySelector("#aboutBtn");

aboutBtn.addEventListener("click", () => {
  window.location.pathname = "/about";
});

loginBtn.addEventListener("click", function click() {
  window.location.pathname = "/paths";
});