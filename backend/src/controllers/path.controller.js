import { ContentRepository } from "../repositories/content.repository.js";
import { PathRepository } from "../repositories/path.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";

export class PathController {
  // cria trilha
  static async insertPath(req, res) {
    const { path_title, path_description } = req.body;

    const path = await PathRepository.getPathByTitle(path_title);

    if (!path) {
      PathRepository.insertPath(path_title, path_description);
      res.status(200);
      return res.json({ msg: "Cadastrado com sucesso" });
    } else {
      res.status(400);
      return res.json({
        msg: "Já existe uma trilha com este título.",
      });
    }
  }

  // atualiza título ou descrição da trilha
  static async updatePath(req, res) {
    const { path_id, path_title, path_description } = req.body;
    if (path_title) {
      const path = await PathRepository.getPathByTitle(path_title);
      if (!path) {
        PathRepository.updatePathTitle(path_title, path_id);
        res.status(200);
        return res.json({ path_title: path_title });
      } else {
        res.status(400);
        return res.json({ msg: "Já existe uma trilha com este título." });
      }
    }

    if (path_description) {
      PathRepository.updatePathDescription(path_description, path_id);
      res.status(200);
      return res.json({ path_description: path_description });
    }
  }

  // deleta trilha
  static async deletePath(req, res) {
    const path_id = req.body.path_id;
    const modules = await ModuleRepository.getModulesFromPath(path_id);

    modules.map(async (mod) => {
      const module = await ModuleRepository.getModuleById(mod.module_id);
      ContentRepository.deleteAllModuleContent(module.module_id);
    });

    ModuleRepository.deletePathModules(path_id);
    PathRepository.deletePathById(path_id);

    res.status(200);
    return res.json({
      msg: "Trilha excluída com sucesso.",
    });
  }
}
