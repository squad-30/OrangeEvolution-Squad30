import { openDb } from "../database/configDB.js";

// Cria a tabela user, que recebe os dados do usuário da plataforma.
export async function createTableUser() {
  openDb().then((db) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      is_admin INTEGER NOT NULL
    );`);
  });
}

// Cria a tabela user_path, que recebe os dados do relacionamento do usuário com a trilha
export async function createTableUserPath() {
  openDb().then((db) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS user_path (
      id INTEGER NOT NULL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      path_id INTEGER NOT NULL,
      progress INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES user(id),
      FOREIGN KEY(path_id) REFERENCES path(id)
    );`);
  });
}

// Cria a tabela user_content, que recebe os dados do relacionamento do usuário com o conteúdo
export async function createTableUserContent() {
  openDb().then((db) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS user_content (
      id INTEGER NOT NULL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      content_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES user(id),
      FOREIGN KEY(content_id) REFERENCES content(id)
    );`);
  });
}
