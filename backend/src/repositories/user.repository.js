import dao from "../database/dao.js";

export class UserRepository {
  // insere novo usuário
  static async insertUser(name, email, password) {
    return dao.run(
      "INSERT INTO user (name, email, password, is_admin) VALUES (?,?,?,0)",
      [name, email, password]
    );
  }

  // lista todos os usuários
  static async getAllUsers() {
    return dao.all("SELECT * FROM user", []);
  }

  // encontra usuário por id
  static async getUserById(id) {
    return dao.get("SELECT * FROM user WHERE user_id=?", [id]);
  }

  // encontra usuário por email
  static async getUserByEmail(email) {
    const resposta = dao.get("SELECT * FROM user WHERE email=?", [email]);
    return resposta;
  }

  // encotra usuário por email e senha
  static async getUserByEmailAndPassword(email, password) {
    return dao.get("SELECT * FROM user WHERE email=? AND password=?", [
      email,
      password,
    ]);
  }
}
