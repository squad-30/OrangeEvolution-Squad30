import dao from "../database/dao.js";

export default class {
  // insere nova trilha
  static async insertPath(title, description) {
    return dao.run(
      "INSERT INTO path (path_title, path_description) VALUES (?,?)",
      [title, description]
    );
  }

  // insere novo módulo
  static async insertModule(title, description, path_id) {
    return dao.run(
      "INSERT INTO module (module_title, module_description, module_path_id) VALUES (?,?,?)",
      [title, description, path_id]
    );
  }

  // insere novo conteúdo
  static async insertContent(
    title,
    description,
    author,
    type,
    length,
    link,
    module_id
  ) {
    return dao.run(
      "INSERT INTO content (content_title, content_description, author, type, length_min, link, content_module_id) VALUES (?,?,?,?,?,?,?)",
      [title, description, author, type, length, link, module_id]
    );
  }

  // busca trilha por título
  static async getPathByTitle(title) {
    return dao.get("SELECT * FROM path WHERE path_title=?", [title]);
  }

  // busca modulo por id
  static async getModuleById(module_id) {
    return dao.get("SELECT * FROM module WHERE module_id=?", [module_id]);
  }

  // busca modulos dentro da trilha
  static async getModulesFromPath(path_id) {
    return dao.all("SELECT * FROM module WHERE module_path_id=?", [path_id]);
  }

  // busca modulo dentro da trilha por titulo
  static async getModuleFromPathByTitle(title, path_id) {
    return dao.get(
      "SELECT * FROM module WHERE module_title=? AND module_path_id=?",
      [title, path_id]
    );
  }

  // busca conteudo dentro do modulo por link
  static async getModuleContentByLink(link, module_id) {
    return dao.get(
      "SELECT * FROM content WHERE link=? AND content_module_id=?",
      [link, module_id]
    );
  }

  // edita título do conteúdo
  static async updateContentTitle(title, content_id) {
    return dao.run("UPDATE content SET content_title=? WHERE content_id=?", [
      title,
      content_id,
    ]);
  }

  // edita descrição do conteúdo
  static async updateContentDescription(description, content_id) {
    return dao.run(
      "UPDATE content SET content_description=? WHERE content_id=?",
      [description, content_id]
    );
  }

  // edita autor do conteúdo
  static async updateContentAuthor(author, content_id) {
    return dao.run("UPDATE content SET author=? WHERE content_id=?", [
      author,
      content_id,
    ]);
  }

  // edita tipo do conteúdo
  static async updateContentType(type, content_id) {
    return dao.run("UPDATE content SET type=? WHERE content_id=?", [
      type,
      content_id,
    ]);
  }

  // edita duração do conteúdo
  static async updateContentLength(length, content_id) {
    return dao.run("UPDATE content SET length_min=? WHERE content_id=?", [
      length,
      content_id,
    ]);
  }

  // edita link do conteúdo
  static async updateContentLink(link, content_id) {
    return dao.run("UPDATE content SET link=? WHERE content_id=?", [
      link,
      content_id,
    ]);
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

  // edita título da trilha
  static async updatePathTitle(title, path_id) {
    return dao.run("UPDATE path SET path_title=? WHERE path_id=?", [
      title,
      path_id,
    ]);
  }

  // edita descrição da trilha
  static async updatePathDescription(description, path_id) {
    return dao.run("UPDATE path SET path_description=? WHERE path_id=?", [
      description,
      path_id,
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

  // deleta conteúdo por id
  static async deleteContentById(content_id) {
    return dao.run("DELETE FROM content WHERE content_id=?", [content_id]);
  }

  // deleta os conteúdos do módulo
  static async deleteAllModuleContent(module_id) {
    return dao.run("DELETE FROM content WHERE content_module_id=?", [
      module_id,
    ]);
  }

  // deleta trilha por id
  static async deletePathById(path_id) {
    return dao.run("DELETE FROM path WHERE path_id=?", [path_id]);
  }
}
