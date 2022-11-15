import dao from "../database/dao.js";

export class ModuleRepository {
  // insere novo módulo
  static async insertModule(title, description, path_id) {
    return dao.run(
      "INSERT INTO module (module_title, module_description, module_path_id) VALUES (?,?,?)",
      [title, description, path_id]
    );
  }

  // busca modulo por id
  static async getModuleById(module_id) {
    return dao.get("SELECT * FROM module WHERE module_id=?", [module_id]);
  }

  // busca modulo dentro da trilha por titulo
  static async getModuleFromPathByTitle(title, path_id) {
    return dao.get(
      "SELECT * FROM module WHERE module_title=? AND module_path_id=?",
      [title, path_id]
    );
  }

  // edita título do módulo
  static async updateModuleTitle(title, module_id) {
    return dao.run("UPDATE module SET module_title=? WHERE module_id=?", [
      title,
      module_id,
    ]);
  }

  // edita descrição do módulo
  static async updateModuleDescription(description, module_id) {
    return dao.run("UPDATE module SET module_description=? WHERE module_id=?", [
      description,
      module_id,
    ]);
  }

  // deleta módulo por id
  static async deleteModuleById(module_id) {
    return dao.run("DELETE FROM module WHERE module_id=?", [module_id]);
  }

  // deleta os módulos da trilha
  static async deletePathModules(path_id) {
    return dao.run("DELETE FROM module WHERE module_path_id=?", [path_id]);
  }

  // encontra modulo por id
  static async getModuleById(id) {
    return dao.get("SELECT * FROM module WHERE module_id=?", [id]);
  }

  // lista modulos da trilha
  static async getModulesByPathId(path_id) {
    return dao.all("SELECT * FROM module WHERE module_path_id=?", [path_id]);
  }
}
