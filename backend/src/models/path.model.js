import database from "../database/dao.js";

export class PathModel {
  static setupPath() {
    // Cria a tabela path, que recebe os dados das trilhas da plataforma
    database.run(
      `
      CREATE TABLE IF NOT EXISTS path (
        path_id INTEGER NOT NULL PRIMARY KEY,
        path_title TEXT NOT NULL,
        path_description TEXT NOT NULL)`,
      []
    );
  }
}
