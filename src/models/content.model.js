import database from "../database/dao.js";

export class ContentModel {
  static setupContent() {
    database.run(
      `
      CREATE TABLE IF NOT EXISTS content (
        content_id INTEGER NOT NULL PRIMARY KEY,
        content_title TEXT NOT NULL,
        content_description TEXT NOT NULL,
        author TEXT NOT NULL,
        type TEXT NOT NULL,
        length_min INTEGER NOT NULL,
        link TEXT NOT NULL,
        content_module_id INTEGER NOT NULL,
        FOREIGN KEY(content_module_id) REFERENCES module(module_id))`,
      []
    );
  }
}
