import { openDb } from "../database/configDB.js";

// Cria a tabela path, que recebe os dados das trilhas da plataforma
export async function createTablePath() {
  openDb().then((db) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS path (
      id INTEGER NOT NULL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL 
    );`);
  });
}
