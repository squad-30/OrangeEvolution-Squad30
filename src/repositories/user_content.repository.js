import dao from "../database/dao.js";

export class UserContentRepository {
  // cria relacionamento entre usuário e conteúdo
  static async insertUserContent(user_id, content_id) {
    return dao.run(
      `INSERT INTO user_content (user_content_user_id, user_content_content_id, status) VALUES (?,?,"incompleto")`,
      [user_id, content_id]
    );
  }

  static async getAllUserContentByUserId(user_id) {
    return dao.all(
      `SELECT * FROM user_content where user_content_user_id = ? order by user_content_content_id asc`,
      [user_id]
    );
  }

  // altera o progresso do usuário na trilha
  static async updateUserContentStatus(
    user_content_user_id,
    user_content_content_id,
    status
  ) {
    return dao.run(
      `UPDATE user_content SET status=? WHERE user_content_user_id=? AND user_content_content_id=?`,
      [status, user_content_user_id, user_content_content_id]
    );
  }

  // deleta relacionamentos do usuário com conteúdos
  static async deleteUserContentByUserId(user_id) {
    return dao.run(`DELETE FROM user_content WHERE user_content_user_id=?`, [
      user_id,
    ]);
  }
}
