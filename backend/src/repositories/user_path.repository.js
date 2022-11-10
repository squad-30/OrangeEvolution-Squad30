import dao from "../database/dao.js";

export class UserPathRepository {
  // cria o relacionamento do usuário com a trilha
  static async insertUserPath(user_id, path_id) {
    return dao.run(
      `INSERT INTO user_path (user_path_user_id, user_path_path_id, progress) VALUES (?,?,?)`,
      [user_id, path_id, 0]
    );
  }

  // altera progresso do relacionamento do usuário com a trilha
  static async updateUserPathProgress(user_path_id, progress) {
    return dao.run(`UPDATE user_path SET progress=? WHERE user_path_id=?`, [
      progress,
      user_path_id,
    ]);
  }

  // encontra relacionamento de trilha com usuário por id de usuário
  static async getUserPath(user_path_user_id, user_path_path_id) {
    return dao.get(
      `SELECT * FROM user_path WHERE user_path_user_id=? AND user_path_path_id=?`,
      [user_path_user_id, user_path_path_id]
    );
  }

  // encontra relacionamento de trilha com usuário por id de usuário
  static async getUserPathsByUserId(user_id) {
    return dao.all(`SELECT * FROM user_path WHERE user_path_user_id=?`, [
      user_id,
    ]);
  }

  // deleta relacionamentos de usuário com trilhas por id de usuário
  static async deleteUserPathByUserId(user_id) {
    return dao.run(`DELETE FROM user_path WHERE user_path_user_id=?`, [
      user_id,
    ]);
  }
}
