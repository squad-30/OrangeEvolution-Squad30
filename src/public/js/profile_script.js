// ========== MODALS ==========

// Modais de editar senha e deletar conta
const editingPasswordModal = document.querySelector("#editing_password_modal");
const deleteAccountModal = document.querySelector("#delete_account_modal");

// Botões para abrir modais
const editingPasswordBtn = document.querySelector("#editing_password_btn");
const deleteAccountBtn = document.querySelector("#delete_account_btn");

// Botão para cancelar modal
const cancelModalBtns = document.querySelectorAll("dialog .cancel_button");

// Botões para fechar modal
const closeModalBtns = document.querySelectorAll("dialog .close_btn");

// Inputs dos modais
const modalInputs = document.querySelectorAll("dialog input");

// Funções para abertura dos modais
editingPasswordBtn.addEventListener("click", () => editingPasswordModal.showModal());
deleteAccountBtn.addEventListener("click", () => deleteAccountModal.showModal());

// Funções para fechamento dos modais apagando o conteúdo que tiver
cancelModalBtns.forEach(btn => btn.addEventListener("click", () => {
    editingPasswordModal.close();
    deleteAccountModal.close();
    modalInputs.forEach(input => input.value = '');
}));
closeModalBtns.forEach(btn => btn.addEventListener("click", () => {
    editingPasswordModal.close();
    deleteAccountModal.close();
    modalInputs.forEach(input => input.value = '');
}));

