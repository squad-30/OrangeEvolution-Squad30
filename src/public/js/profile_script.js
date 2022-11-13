// ==== Verificando se id está no localStorage no momento do acesso a página para o caso de tentativa de acesso por meios não convencionais ====

// Id de usuário no LocalStorage
const currentId = localStorage.getItem("user_id");

if(!currentId) {
    alert("Você não está logado.");
    window.location.pathname = '/';
}

// ========== INSERINDO DADOS DO USUÁRIO NA TELA ==========

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Tags para nome e email atuais
const profileName = document.querySelector(".profile_name span");
const profileEmail = document.querySelector(".profile_email span");

api.get(`/api/user/${currentId}`)
.then((response) => {
  console.log(response);
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
  editEmailBtn.classList.add("hide");
  cancelEditEmailBtn.classList.remove("hide");
  confirmEditEmailBtn.classList.remove("hide");
  // Mostrando área para a edição
  profileEmail.classList.add("hide");
  editEmailInput.classList.remove("hide");
  // Colocando o email atual na caixa para edição
  editEmailInput.value = profileEmail.textContent;
});


cancelEditNameBtn.addEventListener("click", () => {
  cancelEditNameBtn.classList.add("hide");
  confirmEditNameBtn.classList.add("hide");
  editNameBtn.classList.remove("hide");
  // Removendo área para a edição
  profileName.classList.remove("hide");
  editNameInput.classList.add("hide");
});
cancelEditEmailBtn.addEventListener("click", () => {
  cancelEditEmailBtn.classList.add("hide");
  confirmEditEmailBtn.classList.add("hide");
  editEmailBtn.classList.remove("hide");
  // Removendo área para a edição
  profileEmail.classList.remove("hide");
  editEmailInput.classList.add("hide");
});

// ========== MODALS ==========

// Modais de editar senha e deletar conta
const editPasswordModal = document.querySelector("#edit_password_modal");
const deleteAccountModal = document.querySelector("#delete_account_modal");

// Botões para abrir modais
const editPasswordBtn = document.querySelector("#edit_password_btn");
const deleteAccountBtn = document.querySelector("#delete_account_btn");

// Botão para cancelar modal
const cancelModalBtns = document.querySelectorAll("dialog .cancel_button");

// Botões para fechar modal
const closeModalBtns = document.querySelectorAll("dialog .close_btn");

// Inputs dos modais
const modalInputs = document.querySelectorAll("dialog input");

// Funções para abertura dos modais
editPasswordBtn.addEventListener("click", () => editPasswordModal.showModal());
deleteAccountBtn.addEventListener("click", () =>
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

const changePasswordBtn = document.querySelector("dialog .edit_button");

changePasswordBtn.addEventListener("click", () => {
  const currentPassword = document.querySelector("dialog #current_password").value;
  const newPassword = document.querySelector("dialog #new_password").value;
  const newPasswordConfirmed = document.querySelector("dialog #confirm_new_password").value;

  if(newPassword === newPasswordConfirmed) {
    api.put("/api/user/changepassword", {
      user_id: currentId,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      password: currentPassword,
      new_password: newPassword
    })
    .then((response) => {
      alert(response.data.msg);
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    alert("As senhas não batem.");
  }
});

// ========== LOGOUT BUTTON ==========

const logoutBtn = document.querySelector("#logout_btn");

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  alert("Você saiu e está sendo redirecionado.");
  window.location.pathname = '/';
});