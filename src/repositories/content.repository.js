import dao from "../database/dao.js";

export class ContentRepository {
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

  // encontra conteúdo por id
  static async getContentById(id) {
    return dao.get("SELECT * FROM content WHERE content_id=?", [id]);
  }

  //lista conteudos do módulo
  static async getModuleContent(module_id) {
    return dao.all("SELECT * FROM content WHERE content_module_id=?", [
      module_id,
    ]);
  }
}
