import { openDb } from "./configDB.js";
import { UserModel } from "../models/user.model.js";
import { PathModel } from "../models/path.model.js";
import { ModuleModel } from "../models/module.model.js";
import { ContentModel } from "../models/content.model.js";
import { UserContentModel } from "../models/user_content.model.js";
import { UserPathModel } from "../models/user_path.model.js";

// DAO(Data Access Object) se refere a um padrão utilizado para manipular o banco de dados de forma desacoplada.

export default class {
  static setupDb() {
    openDb().then((db) => {
      db.getDatabaseInstance().serialize(() => {
        // Cria a tabela user, que recebe os dados do usuário da plataforma.
        UserModel.setupUser();

        // Cria a tabela path, que recebe os dados das trilhas da plataforma
        PathModel.setupPath();

        // Cria a tabela module, que recebe os dados dos módulos das trilhas
        ModuleModel.setupModule();

        // Cria a tabela content, que recebe os dados dos conteúdos da plataforma
        ContentModel.setupContent();

        // Cria a tabela user_path, que recebe os dados do relacionamento do usuário com a trilha
        UserPathModel.setupUserPath();

        // Cria a tabela user_content, que recebe os dados do relacionamento do usuário com o conteúdo
        UserContentModel.setupUserContent();
        db.close();
      });
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
        db.close();
      });
    });
  }

  static run(stmt, params) {
    return new Promise((res, rej) => {
      openDb().then((db) => {
        db.run(stmt, params, (error, result) => {
          if (!result) {
            return rej(error.message);
          }
        }).then((data) => {
          return res(data);
        });
        db.close();
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
        db.close();
      });
    });
  }
}
