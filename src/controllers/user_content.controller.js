import { UserContentRepository } from "../repositories/user_content.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";
import { ContentRepository } from "../repositories/content.repository.js";
import { PathRepository } from "../repositories/path.repository.js";
import { UserPathRepository } from "../repositories/user_path.repository.js";

export class UserContentController {
  static async getUserContent(req, res) {
    const user_id = req.params.user_id;
    const allUser_content =
      await UserContentRepository.getAllUserContentByUserId(user_id);

    return res.status(200).json({ allUser_content });
  }

  static async updateUserContentStatus(req, res) {
    const { user_content_user_id, user_content_content_id, status } = req.body;

    UserContentRepository.updateUserContentStatus(
      user_content_user_id,
      user_content_content_id,
      status
    );

    let content = await ContentRepository.getContentById(
      user_content_content_id
    );

    let module = await ModuleRepository.getModuleById(
      content.content_module_id
    );

    let path = await PathRepository.getPathById(module.module_path_id);
    let userPath = await UserPathRepository.getUserPath(
      user_content_user_id,
      path.path_id
    );
    let newProgress = userPath.progress;

    if (status === "completo") {
      newProgress++;

      UserPathRepository.updateUserPathProgress(
        userPath.user_path_id,
        newProgress
      );

      return res.status(200).json({ progress: newProgress });
    } else {
      newProgress--;

      UserPathRepository.updateUserPathProgress(
        userPath.user_path_id,
        newProgress
      );

      return res.status(200).json({ progress: newProgress });
    }
  }
}
