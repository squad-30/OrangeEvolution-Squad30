import dao from "../database/dao.js";

export default class {
  // encontra usuário por id
  static async getContentById(id) {
    return dao.get("SELECT * FROM content WHERE content_id=?", [id]);
  }

  //lista conteudos do módulo
  static async getModuleContent(module_id) {
    return dao.all("SELECT * FROM content WHERE module_id=?", [module_id]);
  }

  //lista conteúdos da trilha com infos dos módulos
  static async getPathContent(module_id, path_id) {
    return dao.all(
      "SELECT content_id, content_title, content_description, author, type, length_min, link, module_title, path_title FROM content INNER JOIN module ON module.module_id=? INNER JOIN path ON path.path_id=?",
      [module_id, path_id]
    );
  }

  // encontra modulo por id
  static async getModuleById(id) {
    return dao.get("SELECT * FROM module WHERE module_id=?", [id]);
  }

  // lista modulos da trilha
  static async getModulesByPathId(path_id) {
    return dao.all("SELECT * FROM module WHERE path_id=?", [path_id]);
  }

  // encontra trilha por id
  static async getPathById(id) {
    return dao.get("SELECT * FROM path WHERE path_id=?", [id]);
  }
}
