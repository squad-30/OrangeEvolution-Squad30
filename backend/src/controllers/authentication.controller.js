import repository from "../models/authentication.model.js";

export const returnInvalidCredentials = (res) => {
  res.status(401);
  return res.json({ error: "Email e/ou senha inválidos. Tente novamente." });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await repository.getUserByEmail(email);

  // console.log(user);
  if (!user) {
    console.log("email não existe");
    return returnInvalidCredentials(res);
  }

  if (user.email === email && user.password === password) {
    res.status(200);
    return res.json({ msg: "Login efetuado com sucesso!" });
  } else {
    console.log("email não bate com senha");
    return returnInvalidCredentials(res);
  }
};
