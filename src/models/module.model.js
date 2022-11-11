import database from "../database/dao.js";

export class ModuleModel {
  static setupModule() {
    // Cria a tabela module, que recebe os dados dos módulos das trilhas
    database.run(
      `
      CREATE TABLE IF NOT EXISTS module (
        module_id INTEGER NOT NULL PRIMARY KEY,
        module_title TEXT NOT NULL,
        module_description TEXT NOT NULL,
        module_path_id INTEGER NOT NULL,
        FOREIGN KEY(module_path_id) REFERENCES path(path_id))`,
      []
    );
  }
}
