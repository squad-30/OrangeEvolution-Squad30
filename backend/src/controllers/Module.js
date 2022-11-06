import { openDb } from "../database/configDB.js";

// Cria a tabela module, que recebe os dados dos módulos das trilhas
export async function createTableModule() {
  openDb().then((db) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS module (
      id INTEGER NOT NULL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      path_id INTEGER NOT NULL,
      FOREIGN KEY(path_id) REFERENCES path(id)
    );`);
  });
}
