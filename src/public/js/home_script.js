const api = axios.create({
  baseURL: "http://localhost:3000",
});

const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const aboutBtn = document.querySelector("#aboutBtn");
const tokenBtn = document.querySelector("#tokenBtn");

aboutBtn.addEventListener("click", () => {
  window.location.pathname = "/about";
});

loginBtn.addEventListener("click", function click() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  api
    .post("/api/user/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      alert(response.data.msg);
      console.log(email + "" + password);

      console.log(response.data.token);
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', email)
      const token = response.data.token;
      
      api.post("/api/user/token", {
        token: token
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('user_id', response.data.user_id);
        
        window.location.pathname = "/paths";
      });
    })
    .catch((error) => {
      alert("Email e/ou senha inválidos. Tente novamente.");
      console.log(error);
      console.log(email + " " + password);
    });

});

registerBtn.addEventListener("click", function click() {
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
      console.log(response);
      alert(response.data.msg);
    })
    .catch((error) => {
      alert("Houve um erro. Tente novamente.");
      console.log(error);
    });
});