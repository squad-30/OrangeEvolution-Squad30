import { openDb } from "../database/configDB.js";

// Cria a tabela content, que recebe os dados dos conteúdos da plataforma
export async function createTableContent() {
  openDb().then((db) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER NOT NULL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      type TEXT NOT NULL,
      length_min INTEGER NOT NULL,
      link TEXT NOT NULL,
      module_id INTEGER NOT NULL,
      FOREIGN KEY(module_id) REFERENCES module(id)
    );`);
  });
}
