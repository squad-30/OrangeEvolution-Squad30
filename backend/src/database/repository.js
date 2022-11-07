import dao from "./dao.js";

export default class {
  static async getAllUsers() {
    return dao.all("SELECT * FROM user", []);
  }

  static async getUserById(id) {
    return dao.get("SELECT * FROM user WHERE id=?", [id]);
  }

  static async getUserByEmail(email) {
    const resposta = dao.get("SELECT * FROM user WHERE email=?", [email]);
    return resposta;
  }

  static async getUserByEmailAndPassword(email, password) {
    return dao.get("SELECT * FROM user WHERE email=? AND password=?", [
      email,
      password,
    ]);
  }
}
