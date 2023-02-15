// ==== Verificando se o id está no localStorage no momento do acesso à página para o caso de tentativa de acesso por meios não convencionais ==== //

// Id de usuário no LocalStorage
const currentId = localStorage.getItem("user_id");

if (!currentId) {
  alert("Você não está logado.");
  window.location.pathname = "/";
}

// ========== TROCANDO BOTÃO DE ENTRAR PARA PERFIL ==========

const openModalButton = document.querySelector("#open-modal");

if (localStorage.length !== 0) {
  openModalButton.innerHTML = "Perfil";
  openModalButton.setAttribute("href", "/profile");
}

// ========== INSERINDO DADOS DO USUÁRIO NA TELA ==========

const api = axios.create({
  baseURL: `https://orangeevolution-squad30.up.railway.app`,
});

// Tags para nome e email atuais
const profileName = document.querySelector(".profile_name span");
const profileEmail = document.querySelector(".profile_email span");

api
  .get(`/api/user/${currentId}`)
  .then((response) => {
    profileName.innerHTML = response.data.name;
    profileEmail.innerHTML = response.data.email;
  })
  .catch((error) => console.log(error));

// ========== EDITANDO DADOS DO USUÁRIO ==========

// Botões de editar
const editNameBtn = document.querySelector(".profile_name .edit_btn");
const editEmailBtn = document.querySelector(".profile_email .edit_btn");
// Botões de fechar/cancelar edição
const cancelEditNameBtn = document.querySelector(
  ".profile_name .close_edit_btn"
);
const cancelEditEmailBtn = document.querySelector(
  ".profile_email .close_edit_btn"
);
// Botões de confirmação de edição
const confirmEditNameBtn = document.querySelector(
  ".profile_name .confirm_edit_btn"
);
const confirmEditEmailBtn = document.querySelector(
  ".profile_email .confirm_edit_btn"
);
// Inputs para edições
const editNameInput = document.querySelector(".profile_name input");
const editEmailInput = document.querySelector(".profile_email input");

// Manipulando botões de lápis

editNameBtn.addEventListener("click", () => {
  // Mostrando e ocultando botões
  editNameBtn.classList.add("hide");
  cancelEditNameBtn.classList.remove("hide");
  confirmEditNameBtn.classList.remove("hide");
  // Mostrando área para a edição
  profileName.classList.add("hide");
  editNameInput.classList.remove("hide");
  // Colocando o nome atual na caixa para edição
  editNameInput.value = profileName.textContent;
});
editEmailBtn.addEventListener("click", () => {
  // Mostrando e ocultando botões
  editEmailBtn.classList.add("hide");
  cancelEditEmailBtn.classList.remove("hide");
  confirmEditEmailBtn.classList.remove("hide");
  // Mostrando área para a edição
  profileEmail.classList.add("hide");
  editEmailInput.classList.remove("hide");
  // Colocando o email atual na caixa para edição
  editEmailInput.value = profileEmail.textContent;
});

// Manipulando botões de cancelar edição

cancelEditNameBtn.addEventListener("click", () => {
  // Mostrando e ocultando botões
  cancelEditNameBtn.classList.add("hide");
  confirmEditNameBtn.classList.add("hide");
  editNameBtn.classList.remove("hide");
  // Removendo área para a edição
  profileName.classList.remove("hide");
  editNameInput.classList.add("hide");
});
cancelEditEmailBtn.addEventListener("click", () => {
  // Mostrando e ocultando botões
  cancelEditEmailBtn.classList.add("hide");
  confirmEditEmailBtn.classList.add("hide");
  editEmailBtn.classList.remove("hide");
  // Removendo área para a edição
  profileEmail.classList.remove("hide");
  editEmailInput.classList.add("hide");
});

// Editando Nome

confirmEditNameBtn.addEventListener("click", () => {
  const newName = editNameInput.value;

  api.get(`/api/user/${currentId}`).then((response) => {
    // Dados necessários para a requisição de edição
    const email = response.data.email;
    const password = response.data.password;

    api
      .put("/api/user/", {
        user_id: currentId,
        name: newName,
        email: email,
        password: password,
      })
      .then(() => {
        setTimeout(() => {
          alert("Usuário atualizado com sucesso.");
        }, 150);
        // Escrevendo e armazenando novo nome com o sucesso
        profileName.innerHTML = newName;
        localStorage.setItem("name", newName);
      })
      .catch((error) => {
        alert("Houve um erro. Tente novamente mais tarde.");
        console.log(error);
      });
  });

  // Removendo área input e mostrando o nome, agora atualizado
  cancelEditNameBtn.classList.add("hide");
  confirmEditNameBtn.classList.add("hide");
  editNameBtn.classList.remove("hide");
  profileName.classList.remove("hide");
  editNameInput.classList.add("hide");
});

// Editando email

confirmEditEmailBtn.addEventListener("click", () => {
  const newEmail = editEmailInput.value;

  api.get(`/api/user/${currentId}`).then((response) => {
    // Dados necessários para a requisição de edição
    const name = response.data.name;
    const password = response.data.password;

    api
      .put("/api/user/", {
        user_id: currentId,
        name: name,
        email: newEmail,
        password: password,
      })
      .then((response) => {
        setTimeout(() => {
          alert("Usuário atualizado com sucesso.");
        }, 150);
        // Escrevendo e armazenando novo email com o sucesso
        profileEmail.innerHTML = newEmail;
        localStorage.setItem("email", newEmail);
      })
      .catch((error) => {
        alert("Houve um erro. Tente novamente mais tarde.");
        console.log(error);
      });
  });

  // Removendo área input e mostrando o email, agora atualizado
  cancelEditEmailBtn.classList.add("hide");
  confirmEditEmailBtn.classList.add("hide");
  editEmailBtn.classList.remove("hide");
  profileEmail.classList.remove("hide");
  editEmailInput.classList.add("hide");
});

// ========== MODALS ==========

// Modais de editar senha e deletar conta
const editPasswordModal = document.querySelector("#edit_password_modal");
const deleteAccountModal = document.querySelector("#delete_account_modal");

// Botões para abrir modais
const openEditPasswordModalBtn = document.querySelector("#edit_password_btn");
const openDeleteAccountModalBtn = document.querySelector("#delete_account_btn");

// Botão para cancelar modal
const cancelModalBtns = document.querySelectorAll("dialog .cancel_button");

// Botões para fechar modal
const closeModalBtns = document.querySelectorAll("dialog .close_btn");

// Inputs dos modais
const modalInputs = document.querySelectorAll("dialog input");

// Funções para abertura dos modais
openEditPasswordModalBtn.addEventListener("click", () =>
  editPasswordModal.showModal()
);
openDeleteAccountModalBtn.addEventListener("click", () =>
  deleteAccountModal.showModal()
);

// Funções para fechamento dos modais apagando o conteúdo que tiver
cancelModalBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    editPasswordModal.close();
    deleteAccountModal.close();
    modalInputs.forEach((input) => (input.value = ""));
  })
);
closeModalBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    editPasswordModal.close();
    deleteAccountModal.close();
    modalInputs.forEach((input) => (input.value = ""));
  })
);

// ========== ALTERAÇÃO DE SENHA ==========

const editPasswordBtn = document.querySelector("dialog .edit_button");

editPasswordBtn.addEventListener("click", () => {
  const currentPassword = document.querySelector(
    "dialog #current_password"
  ).value;
  const newPassword = document.querySelector("dialog #new_password").value;
  const newPasswordConfirmed = document.querySelector(
    "dialog #confirm_new_password"
  ).value;

  if (newPassword === newPasswordConfirmed) {
    api
      .put("/api/user/changepassword", {
        user_id: currentId,
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        password: currentPassword,
        new_password: newPassword,
      })
      .then((response) => {
        alert(response.data.msg);
        editPasswordModal.close();
        modalInputs.forEach((input) => (input.value = ""));
      })
      .catch((error) => {
        console.error(error);
        alert("Houve um erro. Tente novamente.");
      });
  } else {
    alert("As senhas não batem.");
  }
});
