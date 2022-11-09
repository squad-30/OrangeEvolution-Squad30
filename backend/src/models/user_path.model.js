import database from "../database/dao.js";

export class UserPathModel {
  static setupUserPath() {
    // Cria a tabela user_path, que recebe os dados do relacionamento do usuário com a trilha
    database.run(
      `
      CREATE TABLE IF NOT EXISTS user_path (
        user_path_id INTEGER NOT NULL PRIMARY KEY,
        user_path_user_id INTEGER NOT NULL,
        user_path_path_id INTEGER NOT NULL,
        progress INTEGER NOT NULL,
        FOREIGN KEY(user_path_user_id) REFERENCES user(user_id),
        FOREIGN KEY(user_path_path_id) REFERENCES path(path_id))`,
      []
    );
  }
}
