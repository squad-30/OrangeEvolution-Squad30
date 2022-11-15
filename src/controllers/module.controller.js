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
      return res.status(200).json({ msg: "Cadastrado com sucesso" });
    } else {
      return res.status(400).json({
        msg: "Já existe um módulo na trilha com este título.",
      });
    }
  }

  static async getModule(req, res) {
    const module_id = req.params.module_id;

    const module = await ModuleRepository.getModuleById(module_id);

    return res.status(200).json(module);
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

        return res.status(200).json({ module_title: module_title });
      } else {
        return res.status(400).json({
          msg: "Já existe um módulo na trilha com este título.",
        });
      }
    }

    if (module_description) {
      ModuleRepository.updateModuleDescription(module_description, module_id);

      return res.status(200).json({ module_description: module_description });
    }
  }

  // deleta módulo
  static async deleteModule(req, res) {
    const module_id = req.body.module_id;

    ContentRepository.deleteAllModuleContent(module_id);
    ModuleRepository.deleteModuleById(module_id);

    return res.status(200).json({
      msg: "Módulo excluído com sucesso.",
    });
  }
}
