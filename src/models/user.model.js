import database from "../database/dao.js";

export class UserModel {
  static setupUser() {
    // Cria a tabela user, que recebe os dados do usuário da plataforma.
    database.run(
      `
          CREATE TABLE IF NOT EXISTS user (
            user_id INTEGER NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin INTEGER NOT NULL)`,
      []
    );
  }
}
