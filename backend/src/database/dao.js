import { openDb } from "./configDB.js";

// DAO(Data Access Object) se refere a um padrão utilizado para manipular o banco de dados de forma desacoplada.

export default class {
  static setupDb() {
    openDb().then((db) => {
      db.getDatabaseInstance().serialize(() => {
        // Cria a tabela user, que recebe os dados do usuário da plataforma.
        db.run(`
          CREATE TABLE IF NOT EXISTS user (
            user_id INTEGER NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin INTEGER NOT NULL)`);

        // Cria a tabela path, que recebe os dados das trilhas da plataforma
        db.run(`
          CREATE TABLE IF NOT EXISTS path (
            path_id INTEGER NOT NULL PRIMARY KEY,
            path_title TEXT NOT NULL,
            path_description TEXT NOT NULL)`);

        // Cria a tabela module, que recebe os dados dos módulos das trilhas
        db.run(`
          CREATE TABLE IF NOT EXISTS module (
            module_id INTEGER NOT NULL PRIMARY KEY,
            module_title TEXT NOT NULL,
            module_description TEXT NOT NULL,
            module_path_id INTEGER NOT NULL,
            FOREIGN KEY(module_path_id) REFERENCES path(path_id))`);

        // Cria a tabela content, que recebe os dados dos conteúdos da plataforma
        db.run(`
          CREATE TABLE IF NOT EXISTS content (
            content_id INTEGER NOT NULL PRIMARY KEY,
            content_title TEXT NOT NULL,
            content_description TEXT NOT NULL,
            author TEXT NOT NULL,
            type TEXT NOT NULL,
            length_min INTEGER NOT NULL,
            link TEXT NOT NULL,
            content_module_id INTEGER NOT NULL,
            FOREIGN KEY(content_module_id) REFERENCES module(module_id))`);

        // Cria a tabela user_path, que recebe os dados do relacionamento do usuário com a trilha
        db.run(`
          CREATE TABLE IF NOT EXISTS user_path (
            user_path_id INTEGER NOT NULL PRIMARY KEY,
            user_path_user_id INTEGER NOT NULL,
            user_path_path_id INTEGER NOT NULL,
            progress INTEGER NOT NULL,
            FOREIGN KEY(user_path_user_id) REFERENCES user(user_id),
            FOREIGN KEY(user_path_path_id) REFERENCES path(path_id))`);

        // Cria a tabela user_content, que recebe os dados do relacionamento do usuário com o conteúdo
        db.run(`
            CREATE TABLE IF NOT EXISTS user_content (
              user_content_id INTEGER NOT NULL PRIMARY KEY,
              user_content_user_id INTEGER NOT NULL,
              user_content_content_id INTEGER NOT NULL,
              status TEXT NOT NULL,
              FOREIGN KEY(user_content_user_id) REFERENCES user(user_id),
              FOREIGN KEY(user_content_content_id) REFERENCES content(content_id))`);
      });
      db.close();
    });
  }

  static get(stmt, params) {
    return new Promise((res, rej) => {
      openDb().then((db) => {
        db.get(stmt, params, (error, result) => {
          if (!result) {
            return rej(error.message);
          }
        }).then((data) => {
          return res(data);
        });
      });
    });
  }

  static all(stmt, params) {
    return new Promise((res, rej) => {
      openDb().then((db) => {
        db.all(stmt, params)
          .then((data) => {
            return res(data);
          })
          .catch((err) => {
            return rej(err);
          });
      });
    });
  }
}
