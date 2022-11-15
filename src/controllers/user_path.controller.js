import { UserPathRepository } from "../repositories/user_path.repository.js";
import { UserContentRepository } from "../repositories/user_content.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";
import { ContentRepository } from "../repositories/content.repository.js";

export class UserPathController {
  static async insertUserPath(req, res) {
    const { user_path_user_id, user_path_path_id } = req.body;

    UserPathRepository.insertUserPath(user_path_user_id, user_path_path_id);

    const modules = await ModuleRepository.getModulesByPathId(
      user_path_path_id
    );

    modules.map(async (mod) => {
      const module = await ModuleRepository.getModuleById(mod.module_id);
      const moduleContent = await ContentRepository.getModuleContent(
        module.module_id
      );

      moduleContent.map(async (cont) => {
        const content = await ContentRepository.getContentById(cont.content_id);
        UserContentRepository.insertUserContent(
          user_path_user_id,
          content.content_id
        );
      });
    });

    return res.status(200).json({
      msg: "Relacionamento de trilha com usuário feito com sucesso.",
    });
  }

  static async getUserPaths(req, res) {
    const user_id = req.params.user_id;
    const user_paths = await UserPathRepository.getUserPathsByUserId(user_id);

    return res.status(200).json({ user_paths });
  }
}
