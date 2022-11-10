import { UserRepository } from "../repositories/user.repository.js";
import { UserPathRepository } from "../repositories/user_path.repository.js";
import { UserContentRepository } from "../repositories/user_content.repository.js";

export class UserController {
  static async returnInvalidCredentials(res) {
    res.status(401);
    return res.json({ error: "Email e/ou senha inválidos. Tente novamente." });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    let user = await UserRepository.getUserByEmail(email);

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

  static async register(req, res) {
    const { name, email, password } = req.body;

    let user = await UserRepository.getUserByEmail(email);

    if (!user) {
      UserRepository.insertUser(name, email, password);

      res.status(200);
      return res.json({ msg: "Usuário cadastrado com sucesso." });
    } else {
      res.status(400);
      return res.json({ msg: "Email já cadastrado." });
    }
  }

  static async editProfile(req, res) {
    const { user_id, name, email, password } = req.body;

    UserRepository.updateUser(user_id, name, email, password);

    res.status(200);
    return res.json({ msg: "Perfil editado com sucesso." });
  }

  static async delete(req, res) {
    const { user_id } = req.body;
    UserContentRepository.deleteUserContentByUserId(user_id);
    UserPathRepository.deleteUserPathByUserId(user_id);
    UserRepository.deleteUserById(user_id);

    res.status(200);
    return res.json({ msg: "Usuário excluído com sucesso." });
  }
}
