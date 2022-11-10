import { UserContentRepository } from "../repositories/user_content.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";
import { ContentRepository } from "../repositories/content.repository.js";
import { PathRepository } from "../repositories/path.repository.js";
import { UserPathRepository } from "../repositories/user_path.repository.js";

export class UserContentController {
  static async updateUserContentStatus(req, res) {
    const { user_content_id, user_content_content_id, status } = req.body;

    UserContentRepository.updateUserContentStatus(user_content_id, status);

    let content = await ContentRepository.getContentById(
      user_content_content_id
    );

    let module = await ModuleRepository.getModuleById(
      content.content_module_id
    );

    let path = await PathRepository.getPathById(module.module_path_id);
    let userPath = await UserPathRepository.getUserPathById(path.path_id);
    let newProgress = userPath.progress;

    if (status === "completo") {
      newProgress++;

      UserPathRepository.updateUserPathProgress(path.path_id, newProgress);

      res.status(200);
      return res.json({ progress: newProgress });
    } else {
      newProgress--;

      UserPathRepository.updateUserPathProgress(path.path_id, newProgress);

      res.status(200);
      return res.json({ progress: newProgress });
    }
  }
}
