import database from "../database/dao.js";

export class UserContentModel {
  static setupUserContent() {
    // Cria a tabela content, que recebe os dados dos conteúdos da plataforma
    database.run(
      `
      CREATE TABLE IF NOT EXISTS user_content (
        user_content_id INTEGER NOT NULL PRIMARY KEY,
        user_content_user_id INTEGER NOT NULL,
        user_content_content_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY(user_content_user_id) REFERENCES user(user_id),
        FOREIGN KEY(user_content_content_id) REFERENCES content(content_id))`,
      []
    );
  }
}
