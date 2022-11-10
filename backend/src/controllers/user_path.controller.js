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

    modules.some(async (mod) => {
      const module = await ModuleRepository.getModuleById(mod.module_id);
      const moduleContent = await ContentRepository.getModuleContent(
        module.module_id
      );

      moduleContent.some(async (cont) => {
        const content = await ContentRepository.getContentById(cont.content_id);
        UserContentRepository.insertUserContent(
          user_path_user_id,
          content.content_id
        );
      });
    });

    res.status(200);
    return res.json({
      msg: "Relacionamento de trilha com usuário feito com sucesso.",
    });
  }
}
