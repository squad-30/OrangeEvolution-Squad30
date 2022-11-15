// Verificando se id está no localStorage no momento do acesso à página para o caso de tentativa de acesso por meios não convencionais
const currentId = localStorage.getItem("user_id");

if (!currentId) {
  alert("Você não está logado.");
  window.location.pathname = "/";
}

// ========== TROCANDO BOTÃO DE ENTRAR PARA PERFIL ==========

const openModalButton = document.querySelector("#open-modal");

if(localStorage.length !== 0) {
  openModalButton.innerHTML = "Perfil";
  openModalButton.setAttribute("href", "/profile");
}

// =============== //

const api = axios.create({
  baseURL: `https://orangeevolution-squad30.up.railway.app`,
});

// Para obter os dados do usuário
const user = await api
  .get(`/api/user/${currentId}`)
  .then((response) => {
    console.log(response);

    localStorage.setItem("name", response.data.name);
    return response.data;
  })
  .catch((error) => console.error(error));

const user_id = user.user_id;
const isAdmin = user.is_admin;
let total = 0;

api.get(`/api/user_path/${user_id}`).then((response) => {
  const user_path = response.data.user_paths;

  for (let path of user_path) {
    api.get(`/api/path/${path.user_path_path_id}`).then(async (response) => {
      const pathTitle = response.data.path_title;
      const progress = path.progress;

      const allUserContent = await api
        .get(`/api/user_content/${user_id}`)
        .then((response) => {
          return response.data.allUser_content;
        });

      renderPath(
        user_id,
        isAdmin,
        allUserContent,
        pathTitle,
        path.user_path_path_id,
        progress
      );
    });
  }
});

const renderPath = function (
  userId,
  isAdmin,
  allUserContent,
  pathTitl,
  pathId,
  progresso
) {
  let lineContainer = document.createElement("line-container");
  lineContainer.classList.add("line-container");

  let lineWrapper = document.createElement("div");
  lineWrapper.classList.add("line-wrapper");

  let line = document.createElement("div");
  line.classList.add("line");

  let mainSection = document.createElement("section");
  mainSection.classList.add("main-section");

  let contentSection = document.createElement("section");
  contentSection.classList.add("content-section");

  let titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  let pathTitle = document.createElement("h2");
  pathTitle.classList.add("path-title");

  let contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  let videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");

  let videoWrapper = document.createElement("div");
  videoWrapper.classList.add("video-wrapper");

  let iframeNew = document.createElement("iframe");
  iframeNew.setAttribute("frameborder", "0");
  iframeNew.setAttribute("allowfullscreen", "");
  iframeNew.src = "";
  iframeNew.classList.add("responsive-iframe");

  let rightContentContainer = document.createElement("div");
  rightContentContainer.classList.add("right-content-container");

  let progressBarNew = document.createElement("div");
  progressBarNew.setAttribute("data-js", "progressbar");
  progressBarNew.classList.add("progress-bar-container");

  let adminButton = document.createElement("button");
  adminButton.classList.add("admin-button");

  let barBehind = document.createElement("div");
  barBehind.classList.add("bar-behind");

  let barFront = document.createElement("div");
  barFront.setAttribute("data-progress-bar-front", "1");
  barFront.classList.add("bar-front");

  let barText = document.createElement("span");
  barText.setAttribute("data-progress-bar-text", "1");
  barText.classList.add("percent-text");

  let accordionWrapper = document.createElement("div");
  accordionWrapper.classList.add("accordion-wrapper");

  let accordionContainer = document.createElement("div");
  accordionContainer.classList.add("accordion-container");

  let accordionNew = document.createElement("div");
  accordionNew.setAttribute("data-js", "accordion");
  accordionNew.classList.add("accordion");

  const content = document.querySelector(".content");
  content.prepend(lineContainer);
  content.prepend(mainSection);

  lineContainer.appendChild(lineWrapper);
  lineWrapper.appendChild(line);
  mainSection.appendChild(contentSection);
  contentSection.appendChild(titleContainer);
  contentSection.appendChild(contentContainer);
  titleContainer.appendChild(pathTitle);
  contentContainer.appendChild(videoContainer);
  contentContainer.appendChild(rightContentContainer);
  videoContainer.appendChild(videoWrapper);
  videoWrapper.appendChild(iframeNew);
  rightContentContainer.appendChild(accordionWrapper);
  if (isAdmin === 1) {
    rightContentContainer.appendChild(adminButton);
    adminButton.textContent = "Adicionar sessão";
  } else {
    rightContentContainer.appendChild(progressBarNew);
    progressBarNew.appendChild(barBehind);
    barBehind.appendChild(barFront);
    barFront.appendChild(barText);
  }
  accordionWrapper.appendChild(accordionContainer);
  accordionContainer.appendChild(accordionNew);

  pathTitle.textContent = pathTitl;

  if (isAdmin === 1) {
    pathTitle.innerHTML += `&nbsp<svg class="title-edit-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5875 26.9999H6.00001C5.73479 26.9999 5.48044 26.8945 5.2929 26.707C5.10536 26.5195 5.00001 26.2651 5.00001 25.9999V20.4124C4.99955 20.2825 5.02471 20.1539 5.07404 20.0338C5.12338 19.9136 5.19591 19.8044 5.28751 19.7124L20.2875 4.71239C20.3806 4.61791 20.4915 4.54287 20.6138 4.49165C20.7361 4.44044 20.8674 4.41406 21 4.41406C21.1326 4.41406 21.2639 4.44044 21.3862 4.49165C21.5085 4.54287 21.6195 4.61791 21.7125 4.71239L27.2875 10.2874C27.382 10.3804 27.457 10.4914 27.5082 10.6137C27.5595 10.736 27.5858 10.8673 27.5858 10.9999C27.5858 11.1325 27.5595 11.2638 27.5082 11.3861C27.457 11.5084 27.382 11.6193 27.2875 11.7124L12.2875 26.7124C12.1955 26.804 12.0863 26.8765 11.9661 26.9259C11.846 26.9752 11.7174 27.0003 11.5875 26.9999V26.9999Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 8L24 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  iframeNew.src = "https://www.youtube.com/embed/pNF9cLdMVeQ";

  api.get(`/api/content/${pathId}`).then((response) => {
    const path = response.data;
    let total = 1;
    for (let i = 0; i < path.length; i++) {
      const modules = path[i];
      let accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");

      let button = document.createElement("button");
      button.setAttribute(`data-accordion-header`, i);

      button.classList.add("accordion-header");

      let strong = document.createElement("strong");
      strong.setAttribute(`data-accordion-header`, i);
      strong.classList.add("accordion-header-text");

      let arrowContainer = document.createElement("div");
      arrowContainer.setAttribute(`data-accordion-header`, i);
      arrowContainer.classList.add("arrow-container");

      let arrowIcon = document.createElement("i");
      arrowIcon.classList.add("fas", "fa-angle-down");
      arrowIcon.setAttribute(`data-accordion-header`, i);

      accordionNew.appendChild(accordionItem);
      accordionItem.appendChild(button);
      button.appendChild(strong);
      button.appendChild(arrowContainer);
      arrowContainer.appendChild(arrowIcon);

      let y = -1;

      for (let conts of modules) {
        api.get(`/api/module/${conts.content_module_id}`).then((response) => {
          const moduleTitle = response.data.module_title;
          const contentTitle = conts.content_title;
          const contentLink = conts.link;
          const contentType = conts.type;
          const contentId = conts.content_id;

          y++;

          let link = document.createElement("a");
          link.classList.add("link");

          let accordionBody = document.createElement("div");
          accordionBody.setAttribute(`data-accordion-body`, i);
          accordionBody.classList.add("accordion-body");

          let accordionBodyTextNew = document.createElement("p");
          accordionBodyTextNew.classList.add("accordion-body-text");
          accordionBodyTextNew.setAttribute("data-accordion-body-text", total);
          console.log(total);

          let checkboxContainer = document.createElement("div");
          checkboxContainer.classList.add("checkbox-container");

          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add = "checkbox";
          checkbox.setAttribute("data-accordion-body", i);

          let bodyTextEditIcon = document.createElement("svg");
          bodyTextEditIcon.setAttribute("data-accordion-body", i);
          bodyTextEditIcon.classList.add("edit-icon");
          bodyTextEditIcon.setAttribute("iwidth", "32");
          bodyTextEditIcon.setAttribute("height", "32");
          bodyTextEditIcon.setAttribute("viewBox", "0 0 32 32");
          bodyTextEditIcon.setAttribute("fill", "none");
          bodyTextEditIcon.setAttribute("xlmns", "http://www.w3.org/2000/svg");

          let editIconFirstPath = document.createElement("path");
          editIconFirstPath.setAttribute("data-accordion-body", i);
          editIconFirstPath.setAttribute(
            "d",
            "M11.5875 26.9999H6.00001C5.73479 26.9999 5.48044 26.8945 5.2929 26.707C5.10536 26.5195 5.00001 26.2651 5.00001 25.9999V20.4124C4.99955 20.2825 5.02471 20.1539 5.07404 20.0338C5.12338 19.9136 5.19591 19.8044 5.28751 19.7124L20.2875 4.71239C20.3806 4.61791 20.4915 4.54287 20.6138 4.49165C20.7361 4.44044 20.8674 4.41406 21 4.41406C21.1326 4.41406 21.2639 4.44044 21.3862 4.49165C21.5085 4.54287 21.6195 4.61791 21.7125 4.71239L27.2875 10.2874C27.382 10.3804 27.457 10.4914 27.5082 10.6137C27.5595 10.736 27.5858 10.8673 27.5858 10.9999C27.5858 11.1325 27.5595 11.2638 27.5082 11.3861C27.457 11.5084 27.382 11.6193 27.2875 11.7124L12.2875 26.7124C12.1955 26.804 12.0863 26.8765 11.9661 26.9259C11.846 26.9752 11.7174 27.0003 11.5875 26.9999V26.9999Z"
          );
          editIconFirstPath.setAttribute("stroke-width", "2");
          editIconFirstPath.setAttribute("stroke-linecap", "round");
          editIconFirstPath.setAttribute("stroke-linejoin", "round");

          let editIconSecondPath = document.createElement("path");
          editIconSecondPath.setAttribute("data-accordion-body", i);
          editIconSecondPath.setAttribute("d", "M17 8L24 15");
          editIconSecondPath.setAttribute("stroke-width", "2");
          editIconSecondPath.setAttribute("stroke-linecap", "round");
          editIconSecondPath.setAttribute("stroke-linejoin", "round");

          // checkboxContainer.appendChild(bodyTextEditIcon);

          if (allUserContent[total - 1].status === "completo") {
            checkbox.checked = true;
          }

          accordionItem.appendChild(link);
          link.appendChild(accordionBody);
          accordionBody.appendChild(accordionBodyTextNew);
          accordionBody.appendChild(checkboxContainer);
          checkboxContainer.appendChild(checkbox);
          bodyTextEditIcon.appendChild(editIconFirstPath);
          bodyTextEditIcon.appendChild(editIconSecondPath);

          if (isAdmin === 1) {
            checkboxContainer.replaceChild(bodyTextEditIcon, checkbox);
          }

          strong.textContent = `0${i + 1}: ${moduleTitle}`;

          if (isAdmin === 1) {
            strong.innerHTML += `&nbsp<svg class="edit-icon" data-accordion-icon="${i}" iwidth="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5875 26.9999H6.00001C5.73479 26.9999 5.48044 26.8945 5.2929 26.707C5.10536 26.5195 5.00001 26.2651 5.00001 25.9999V20.4124C4.99955 20.2825 5.02471 20.1539 5.07404 20.0338C5.12338 19.9136 5.19591 19.8044 5.28751 19.7124L20.2875 4.71239C20.3806 4.61791 20.4915 4.54287 20.6138 4.49165C20.7361 4.44044 20.8674 4.41406 21 4.41406C21.1326 4.41406 21.2639 4.44044 21.3862 4.49165C21.5085 4.54287 21.6195 4.61791 21.7125 4.71239L27.2875 10.2874C27.382 10.3804 27.457 10.4914 27.5082 10.6137C27.5595 10.736 27.5858 10.8673 27.5858 10.9999C27.5858 11.1325 27.5595 11.2638 27.5082 11.3861C27.457 11.5084 27.382 11.6193 27.2875 11.7124L12.2875 26.7124C12.1955 26.804 12.0863 26.8765 11.9661 26.9259C11.846 26.9752 11.7174 27.0003 11.5875 26.9999V26.9999Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8L24 15"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            `;

            const editIcon = document.querySelector(
              `[data-accordion-icon="${i}"]`
            );
            editIcon.addEventListener("click", (e) => {
              const miniForm = document.createElement("form");
              const textBox = document.createElement("input");
              textBox.classList.add("textbox");
              textBox.setAttribute("type", "text");
              miniForm.appendChild(textBox);
              textBox.value = moduleTitle;
              strong.replaceChildren(miniForm);

              miniForm.addEventListener("submit", (e) => {
                e.preventDefault;
                console.log("teste");
                api
                  .put("/api/module/", {
                    module_id: conts.content_module_id,
                    module_title: textBox.value,
                    path_id: pathId,
                  })
                  .then((response) => {
                    console.log(response);
                    window.location.reload();
                  });
              });
            });
          }

          accordionBodyTextNew.textContent = `${contentTitle}`;

          if (isAdmin === 1) {
            console.log(total);
            accordionBodyTextNew.innerHTML += `&nbsp<svg class="edit-icon" data-accordion-icon-body="${total}" iwidth="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5875 26.9999H6.00001C5.73479 26.9999 5.48044 26.8945 5.2929 26.707C5.10536 26.5195 5.00001 26.2651 5.00001 25.9999V20.4124C4.99955 20.2825 5.02471 20.1539 5.07404 20.0338C5.12338 19.9136 5.19591 19.8044 5.28751 19.7124L20.2875 4.71239C20.3806 4.61791 20.4915 4.54287 20.6138 4.49165C20.7361 4.44044 20.8674 4.41406 21 4.41406C21.1326 4.41406 21.2639 4.44044 21.3862 4.49165C21.5085 4.54287 21.6195 4.61791 21.7125 4.71239L27.2875 10.2874C27.382 10.3804 27.457 10.4914 27.5082 10.6137C27.5595 10.736 27.5858 10.8673 27.5858 10.9999C27.5858 11.1325 27.5595 11.2638 27.5082 11.3861C27.457 11.5084 27.382 11.6193 27.2875 11.7124L12.2875 26.7124C12.1955 26.804 12.0863 26.8765 11.9661 26.9259C11.846 26.9752 11.7174 27.0003 11.5875 26.9999V26.9999Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8L24 15"  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `;

            const editIcon = document.querySelector(
              `[data-accordion-icon-body="${total}"]`
            );
            const bodyText = document.querySelector(
              `[data-accordion-icon-body="${total}"]`
            );

            editIcon.addEventListener("click", (e) => {
              const miniForm = document.createElement("form");
              const textBox = document.createElement("input");
              textBox.classList.add("textbox");
              textBox.setAttribute("type", "text");
              miniForm.appendChild(textBox);
              textBox.value = accordionBodyTextNew.textContent;
              accordionBodyTextNew.replaceChildren(miniForm);
            });
          }

          checkbox.addEventListener("change", (e) => {
            if (checkbox.checked) {
              api
                .put("/api/user_content", {
                  user_content_user_id: userId,
                  user_content_content_id: contentId,
                  status: "completo",
                })
                .then((resp) => {
                  console.log(resp);
                });
              progresso++;
            } else {
              api
                .put("/api/user_content", {
                  user_content_user_id: userId,
                  user_content_content_id: contentId,
                  status: "incompleto",
                })
                .then((resp) => {
                  console.log(resp);
                });
              progresso--;
            }
            let percent = Math.round((progresso / (total - 1)) * 100);
            if (progresso > 0) {
              barFront.style.width = `${(percent / 100) * 356}px`;
            } else {
              barFront.style.width = "0px";
            }
            if (percent >= 40) {
              barText.textContent = `${percent}% Concluído`;
            } else {
              barText.textContent = `${percent}%`;
            }
          });

          if (contentType !== "video") {
            if (isAdmin === 1) {
              e.preventDefault();
              link.href = "";
            } else {
              link.href = `${contentLink}`;
              link.setAttribute("target", "_blank");
            }
            accordionBodyTextNew.innerHTML += `&nbsp<svg
          width="15"
          height="15"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6667 18.6667H2.33333V2.33333H10.5V0H2.33333C1.03833 0 0 1.05 0 2.33333V18.6667C0 19.95 1.03833 21 2.33333 21H18.6667C19.95 21 21 19.95 21 18.6667V10.5H18.6667V18.6667ZM12.8333 0V2.33333H17.0217L5.55333 13.8017L7.19833 15.4467L18.6667 3.97833V8.16667H21V0H12.8333Z"
            fill="black"
          />
        </svg>`;
          } else {
            accordionBodyTextNew.addEventListener("click", (e) => {
              let lastActive = document.querySelector(".accordion-body-active");

              if (lastActive) {
                lastActive.classList.remove("accordion-body-active");
              }

              iframeNew.src = `${contentLink}`.replace("watch?v=", "embed/");
              accordionBody.classList.add("accordion-body-active");
              e.preventDefault();
            });
          }
          total++;

          let percent = Math.round((progresso / (total - 1)) * 100);

          if (progresso === total) {
            barFront.style.width = `356px`;
          } else if (progresso > 0) {
            barFront.style.width = `${(percent / 100) * 356}px`;
          } else {
            barFront.style.width = "0px";
          }

          if (percent >= 40) {
            barText.textContent = `${percent}% Concluído`;
          } else {
            barText.textContent = `${percent}%`;
          }
        });
      }
    }
    const titleEditIcon = document.querySelector(".title-edit-icon");
    if (titleEditIcon) {
      titleEditIcon.addEventListener("click", (e) => {
        console.log("clicou no lapis");

        const miniForm = document.createElement("form");
        const textBox = document.createElement("input");
        textBox.setAttribute("type", "text");
        textBox.classList.add("textbox-title");
        miniForm.appendChild(textBox);
        textBox.value = pathTitle.textContent;
        pathTitle.replaceChildren(miniForm);

        miniForm.addEventListener("submit", (e) => {
          e.preventDefault;
          console.log("teste");
          api
            .put("/api/path/", { path_id: pathId, path_title: textBox.value })
            .then((response) => {
              window.location.reload();
            });
        });
      });
    }

    accordionNew.addEventListener("click", (e) => {
      const accordionHeaderId = e.target.dataset.accordionHeader;
      console.log(accordionHeaderId);

      const clickedAccordionHeader = document.querySelector(
        `[data-accordion-header="${accordionHeaderId}"]`
      );

      const clickedAccordionEditIcon = document.querySelector(
        `[data-accordion-icon="${accordionHeaderId}"]`
      );

      const accordionItemToBeOpened = document.querySelectorAll(
        `[data-accordion-body="${accordionHeaderId}"]`
      );

      [...accordionItemToBeOpened].filter((item) => {
        item.classList.toggle("active");
      });
      clickedAccordionHeader.classList.toggle("active");
      clickedAccordionEditIcon.classList.toggle("active");
    });

    if (isAdmin === 1) {
      const cta = document.querySelector(".cta");
      cta.textContent = "Adicionar nova trilha";
    }
  });
};
