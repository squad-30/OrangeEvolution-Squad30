import dao from "../database/dao.js";

export class PathRepository {
  // insere nova trilha
  static async insertPath(title, description) {
    return dao.run(
      "INSERT INTO path (path_title, path_description) VALUES (?,?)",
      [title, description]
    );
  }

  // busca trilha por título
  static async getPathByTitle(title) {
    return dao.get("SELECT * FROM path WHERE path_title=?", [title]);
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

  // deleta trilha por id
  static async deletePathById(path_id) {
    return dao.run("DELETE FROM path WHERE path_id=?", [path_id]);
  }

  // encontra trilha por id
  static async getPathById(id) {
    return dao.get("SELECT * FROM path WHERE path_id=?", [id]);
  }
}
