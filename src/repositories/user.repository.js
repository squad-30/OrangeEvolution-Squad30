import dao from "../database/dao.js";

export class UserRepository {
  // insere novo usuário
  static async insertUser(name, email, password) {
    return dao.run(
      "INSERT INTO user (name, email, password, is_admin) VALUES (?,?,?,0)",
      [name, email, password]
    );
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

  // encontra usuário por email e senha
  static async getUserByEmailAndPassword(email, password) {
    return dao.get("SELECT * FROM user WHERE email=? AND password=?", [
      email,
      password,
    ]);
  }

  // edita usuário
  static async updateUser(user_id, name, email, password) {
    return dao.run(
      "UPDATE user SET name=?, email=?, password=? WHERE user_id=?",
      [name, email, password, user_id]
    );
  }

  // deleta usuário por id
  static async deleteUserById(user_id) {
    return dao.run("DELETE FROM user WHERE user_id=?", [user_id]);
  }
}
