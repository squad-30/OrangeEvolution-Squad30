import { ContentRepository } from "../repositories/content.repository.js";
import { PathRepository } from "../repositories/path.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";

export class ContentController {
  static async getContent(req, res) {
    const req_path_id = req.body.path.path_id;

    //seleciona trilha
    const path = await PathRepository.getPathById(req_path_id);

    // verifica existência da trilha
    if (!path) {
      res.status(404);
      return res.json({ msg: "Trilha não existente." });
    }

    // lista modulos da trilha
    const modules = await ModuleRepository.getModulesByPathId(req_path_id);

    // verifica se existem modulos na trilha
    if (modules.length < 1) {
      res.status(404);
      return res.json({ msg: "Nenhum módulo cadastrado na trilha" });
    }
    // erro para baixo v

    let data = [];
    modules.some(async (mod) => {
      // consulta os conteúdos do modulo
      const moduleContent = await ContentRepository.getModuleContent(
        mod.module_id
      );

      if (moduleContent) {
        const content = await ContentRepository.getPathContent(
          mod.module_id,
          path.path_id
        );
        data.push(content);
      }
      res.status(200);
      return res.json(data);
    });
  }

  // cria conteúdo
  static async insertContent(req, res) {
    const {
      content_title,
      content_description,
      author,
      type,
      length_min,
      link,
      content_module_id,
    } = req.body;

    const content = await ContentRepository.getModuleContentByLink(
      link,
      content_module_id
    );

    if (!content) {
      ContentRepository.insertContent(
        content_title,
        content_description,
        author,
        type,
        length_min,
        link,
        content_module_id
      );
      res.status(200);
      return res.json({ msg: "Cadastrado com sucesso" });
    } else {
      res.status(400);
      return res.json({
        msg: "Já existe um conteúdo no módulo com este link.",
      });
    }
  }

  // pode atualizar os campos de título, descrição, autor, tipo, duração e link do conteúdo
  static async updateContent(req, res) {
    const {
      content_id,
      content_title,
      content_description,
      author,
      type,
      length_min,
      link,
      content_module_id,
    } = req.body;

    if (content_title) {
      ContentRepository.updateContentTitle(content_title, content_id);
      res.status(200);
      return res.json({ content_title: content_title });
    }

    if (content_description) {
      ContentRepository.updateContentDescription(
        content_description,
        content_id
      );
      res.status(200);
      return res.json({ content_description: content_description });
    }

    if (author) {
      ContentRepository.updateContentAuthor(author, content_id);
      res.status(200);
      return res.json({ author: author });
    }

    if (type) {
      ContentRepository.updateContentType(type, content_id);
      res.status(200);
      return res.json({ type: type });
    }

    if (length_min) {
      ContentRepository.updateContentLength(length_min, content_id);
      res.status(200);
      return res.json({ length_min: length_min });
    }

    if (link) {
      const content = await ContentRepository.getModuleContentByLink(
        link,
        content_module_id
      );

      if (!content) {
        ContentRepository.updateContentLink(link, content_id);
        res.status(200);
        return res.json({ link: link });
      } else {
        res.status(400);
        return res.json({
          msg: "Já existe um conteúdo no módulo com este link.",
        });
      }
    }
  }

  // deleta conteúdo
  static async deleteContent(req, res) {
    const content_id = req.body.content_id;

    ContentRepository.deleteContentById(content_id);

    res.status(200);
    return res.json({
      msg: "Conteúdo excluído com sucesso.",
    });
  }
}
