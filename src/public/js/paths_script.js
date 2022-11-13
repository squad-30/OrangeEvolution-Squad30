// Verificando se id está no localStorage no momento do acesso à página para o caso de tentativa de acesso por meios não convencionais
const currentId = localStorage.getItem("user_id");

if (!currentId) {
  alert("Você não está logado.");
  window.location.pathname = "/";
}

// =============== //

const homeBtn = document.querySelector("#homeBtn");
const aboutBtn = document.querySelector("#aboutBtn");
const profileBtn = document.querySelector("#profileBtn");

const api = axios.create({
  baseURL: "http://localhost:3000",
});

homeBtn.addEventListener("click", () => {
  window.location.pathname = "/";
});

aboutBtn.addEventListener("click", () => {
  window.location.pathname = "/about";
});

profileBtn.addEventListener("click", () => {
  window.location.pathname = "/profile";
});

// Para obter os dados do usuário
api
  .get(`/api/user/${currentId}`)
  .then((response) => {
    console.log(response);

    localStorage.setItem("name", response.data.name);

    if (response.data.is_admin == 1) {
      // COLOCAR AQUI AS FUNCIONALIDADES DO ADMIN
      document.querySelector("h2").innerHTML = "Bem vindo, admin.";
    }
  })
  .catch((error) => console.error(error));
