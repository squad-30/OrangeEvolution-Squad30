import { openDb } from "./configDB.js";

// DAO(Data Access Object) se refere a um padrão utilizado para manipular o banco de dados de forma desacoplada.

export default class {
  static setupDb() {
    openDb().then((db) => {
      db.getDatabaseInstance().serialize(() => {
        // Cria a tabela user, que recebe os dados do usuário da plataforma.
        db.run(`
          CREATE TABLE IF NOT EXISTS user (
            id INTEGER NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin INTEGER NOT NULL)`);

        // Cria a tabela path, que recebe os dados das trilhas da plataforma
        db.run(`
          CREATE TABLE IF NOT EXISTS path (
            id INTEGER NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL)`);

        // Cria a tabela module, que recebe os dados dos módulos das trilhas
        db.exec(`
          CREATE TABLE IF NOT EXISTS module (
            id INTEGER NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            path_id INTEGER NOT NULL,
            FOREIGN KEY(path_id) REFERENCES path(id))`);

        // Cria a tabela content, que recebe os dados dos conteúdos da plataforma
        db.run(`
          CREATE TABLE IF NOT EXISTS content (
            id INTEGER NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            author TEXT NOT NULL,
            type TEXT NOT NULL,
            length_min INTEGER NOT NULL,
            link TEXT NOT NULL,
            module_id INTEGER NOT NULL,
            FOREIGN KEY(module_id) REFERENCES module(id))`);

        // Cria a tabela user_path, que recebe os dados do relacionamento do usuário com a trilha
        db.run(`
          CREATE TABLE IF NOT EXISTS user_path (
            id INTEGER NOT NULL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            path_id INTEGER NOT NULL,
            progress INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES user(id),
            FOREIGN KEY(path_id) REFERENCES path(id))`);

        // Cria a tabela user_content, que recebe os dados do relacionamento do usuário com o conteúdo
        db.run(`
            CREATE TABLE IF NOT EXISTS user_content (
              id INTEGER NOT NULL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              content_id INTEGER NOT NULL,
              status TEXT NOT NULL,
              FOREIGN KEY(user_id) REFERENCES user(id),
              FOREIGN KEY(content_id) REFERENCES content(id))`);
      });
      db.close();
    });
  }

  static get(stmt, params) {
    return new Promise((res, rej) => {
      openDb().then((db) => {
        db.get(stmt, params, (error, result) => {
          if (!result) {
            console.log(rej);
            return rej(error.message);
          }
        }).then((data) => {
          return res(data);
        });
      });
    });
  }
}
