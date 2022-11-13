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

// ========== EDIT PROFILE DATA ==========

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
// Texto com nome e email atuais
const profileName = document.querySelector(".profile_name span");
const profileEmail = document.querySelector(".profile_email span");
// Inputs para edições
const editNameInput = document.querySelector(".profile_name input");
const editEmailInput = document.querySelector(".profile_email input");

// ADICIONAR UM COMENTÁRIO EXPLICATIVO AQUI
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
  // ALÉM DISSO TBM VAI ABRIR A QUESTÃO TODA DA EDIÇÃO
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
  // ALÉM DISSO TBM VAI ABRIR A QUESTÃO TODA DA EDIÇÃO
});

// ALÉM DE ESCONDER TEM Q TIRAR A EDIÇÃO, O INPUT Q VOU COLOCAR
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

// FAZER ESSE ROLÊ DOS INPUTS E BOTÕES SUMINDO QND CLICAR NO BOTÃO DE CONFIRMAR TBM
