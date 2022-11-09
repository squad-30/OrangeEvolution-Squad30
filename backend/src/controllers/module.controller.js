import { ContentRepository } from "../repositories/content.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";

export class ModuleController {
  // cria módulo
  static async insertModule(req, res) {
    const { module_title, module_description, module_path_id } = req.body;

    const module = await ModuleRepository.getModuleFromPathByTitle(
      module_title,
      module_path_id
    );

    if (!module) {
      ModuleRepository.insertModule(
        module_title,
        module_description,
        module_path_id
      );
      res.status(200);
      return res.json({ msg: "Cadastrado com sucesso" });
    } else {
      res.status(400);
      return res.json({
        msg: "Já existe um módulo na trilha com este título.",
      });
    }
  }

  // atualiza título ou descrição do módulo
  static async updateModule(req, res) {
    const { module_id, module_title, module_description, module_path_id } =
      req.body;

    if (module_title) {
      const module = await ModuleRepository.getModuleFromPathByTitle(
        module_title,
        module_path_id
      );

      if (!module) {
        ModuleRepository.updateModuleTitle(module_title, module_id);
        res.status(200);
        return res.json({ module_title: module_title });
      } else {
        res.status(400);
        return res.json({
          msg: "Já existe um módulo na trilha com este título.",
        });
      }
    }

    if (module_description) {
      ModuleRepository.updateModuleDescription(module_description, module_id);
      res.status(200);
      return res.json({ module_description: module_description });
    }
  }

  // deleta módulo
  static async deleteModule(req, res) {
    const module_id = req.body.module_id;

    ContentRepository.deleteAllModuleContent(module_id);
    ModuleRepository.deleteModuleById(module_id);

    res.status(200);
    return res.json({
      msg: "Módulo excluído com sucesso.",
    });
  }
}
