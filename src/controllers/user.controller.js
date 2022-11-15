import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/user.repository.js";
import { UserPathRepository } from "../repositories/user_path.repository.js";
import { UserContentRepository } from "../repositories/user_content.repository.js";

export class UserController {
  static async returnInvalidCredentials(res) {
    return res
      .status(401)
      .json({ error: "Email e/ou senha inválidos. Tente novamente." });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    let user = await UserRepository.getUserByEmail(email);

    if (!user) {
      console.log("email não existe");
      return UserController.returnInvalidCredentials(res);
    }

    if (user.email === email && user.password === password) {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          user_id: user.user_id,
        },
        secret
      );

      return res
        .status(200)
        .json({ msg: "Login efetuado com sucesso!", token });
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

      return res.status(200).json({ msg: "Usuário cadastrado com sucesso." });
    } else {
      return res.status(400).json({ msg: "Email já cadastrado." });
    }
  }

  static async editProfile(req, res) {
    const { user_id, name, email, password } = req.body;

    UserRepository.updateUser(user_id, name, email, password);

    return res.status(200).json({ msg: "Perfil editado com sucesso." });
  }

  static async delete(req, res) {
    const { user_id } = req.body;
    const user = await UserRepository.getUserById(user_id);

    UserContentRepository.deleteUserContentByUserId(user_id);
    UserPathRepository.deleteUserPathByUserId(user_id);
    UserRepository.deleteUserById(user_id);

    return res.status(200).json({ msg: "Usuário excluído com sucesso." });
  }

  static async changePassword(req, res) {
    const { user_id, name, email, password, new_password } = req.body;
    let user = await UserRepository.getUserByEmail(email);

    if (user.email === email && user.password === password) {
      UserRepository.updateUser(user_id, name, email, new_password);

      return res.status(200).json({ msg: "Senha alterada com sucesso!" });
    }

    return res
      .status(404)
      .json({ msg: "Senha atual informada está incorreta!" });
  }

  static async getUserById(req, res) {
    const user_id = req.params.user_id;

    const user = await UserRepository.getUserById(user_id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não existe!" });
    }

    return res.status(200).json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
    });
  }

  static jwtVerify(req, res) {
    const token = req.body.token;
    const secret = process.env.SECRET;

    const verify = jwt.verify(token, secret);

    return res.status(200).json(verify);
  }
}
