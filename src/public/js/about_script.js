// ========== MODAL DE LOGIN ==========

const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

if (localStorage.length == 0) {
  [openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });
}

// ========== TROCANDO BOTÃO DE ENTRAR PARA PERFIL ==========

if (localStorage.length !== 0) {
  openModalButton.innerHTML = "Perfil";
  openModalButton.setAttribute("href", "/profile");
}

// ========== FUNCIONALIDADE DE LOGIN ==========

const api = axios.create({
  baseURL: `https://orangeevolution-squad30.up.railway.app`,
});

login();

function login() {
  const loginBtn = document.querySelector("#form-btn-login");

  loginBtn.addEventListener("click", () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    api
      .post("/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        alert(response.data.msg);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);

        const token = response.data.token;

        api
          .post("/api/user/token", {
            token: token,
          })
          .then((response) => {
            localStorage.setItem("user_id", response.data.user_id);
            window.location.pathname = "/paths";
          });
      })
      .catch((error) => {
        alert("Email e/ou senha inválidos. Tente novamente.");
        console.log(error);
      });
  });
}

// ========== FUNCIONALIDADE DE CADASTRO ==========

const registerModalBtn = document.querySelector("#form-btn-cad");

registerModalBtn.addEventListener("click", () => {
  modal.innerHTML = `
    <div class="modal-header">
      <button id="close-modal">&#10006;</button> 
    </div>
    <div class="modal-body">
        <form class="modal-form" action="#" >
            <label for="registerName">Nome *</label>
            <input type="text" id="registerName" required>

            <label for="registerEmail">Email *</label>
            <input type="text" id="registerEmail" required>

            <label for="registerPassword">Senha *</label>
            <input type="password" id="registerPassword" />

            <p class="modal-form-p">* Itens obrigatórios</p>

            <div id="modal-btn">
                <button class="form-btn" id="form-btn-cancel" type="button">Cancelar</button>
                <button class="form-btn" id="form-btn-register">Cadastrar</button>
            </div>
        </form>
    </div>   
  `;

  const registerBtn = document.querySelector("#form-btn-register");
  const closeModalButton = document.querySelector("#close-modal");
  const cancelModalButton = document.querySelector("#form-btn-cancel");

  registerBtn.addEventListener("click", () => {
    const registerName = document.querySelector("#registerName").value;
    const registerEmail = document.querySelector("#registerEmail").value;
    const registerPassword = document.querySelector("#registerPassword").value;

    api
      .post("/api/user/", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      })
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((error) => {
        alert("Houve um erro. Tente novamente.");
        console.log(error);
      });
  });

  [cancelModalButton, closeModalButton].forEach((el) => {
    el.addEventListener("click", () => {
      toggleModal();
      modal.innerHTML = `
        <div class="modal-header">
            <button id="close-modal">&#10006;</button> 
        </div>
        <div class="modal-body">
            <form class="modal-form" action="#" >
                <label for="email">Email *</label>
                <input type="email" id="email" required>

                <label for="password">Senha *</label>
                <input type="password" id="password" />

                <p class="modal-form-p">* Itens obrigatórios</p>

                <div id="modal-btn">
                    <button class="form-btn" id="form-btn-cad"  type="button">Cadastrar</button>
                    <button class="form-btn" id="form-btn-login">Fazer Login</button>
                </div>
            </form>
        </div>
      `;
      login();
    });
  });
});
