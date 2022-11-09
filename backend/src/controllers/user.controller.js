import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
  static async returnInvalidCredentials(res) {
    res.status(401);
    return res.json({ error: "Email e/ou senha inválidos. Tente novamente." });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    let user = await UserRepository.getUserByEmail(email);

    // console.log(user);
    if (!user) {
      console.log("email não existe");
      return UserController.returnInvalidCredentials(res);
    }

    if (user.email === email && user.password === password) {
      res.status(200);
      return res.json({ msg: "Login efetuado com sucesso!" });
    } else {
      console.log("email não bate com senha");
      return UserController.returnInvalidCredentials(res);
    }
  }
}
