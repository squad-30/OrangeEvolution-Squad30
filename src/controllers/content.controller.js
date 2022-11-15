import { ContentRepository } from "../repositories/content.repository.js";
import { PathRepository } from "../repositories/path.repository.js";
import { ModuleRepository } from "../repositories/module.repository.js";

export class ContentController {
  static async getContent(req, res) {
    const req_path_id = req.params.path_id;

    //seleciona trilha
    const path = await PathRepository.getPathById(req_path_id);

    // verifica existência da trilha
    if (!path) {
      return res.status(404).json({ msg: "Trilha não existente." });
    }

    // lista modulos da trilha
    const modules = await ModuleRepository.getModulesByPathId(req_path_id);

    // verifica se existem modulos na trilha
    if (modules.length < 1) {
      return res
        .status(404)
        .json({ msg: "Nenhum módulo cadastrado na trilha" });
    }
    // erro para baixo v

    const data = new Array();
    for (let module of modules) {
      const con = await ContentRepository.getModuleContent(module.module_id);
      data.push(con);
    }

    return res.status(200).json(data);
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

      return res.status(200).json({ msg: "Cadastrado com sucesso" });
    } else {
      return res.status(400).json({
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

      return res.status(200).json({ content_title: content_title });
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

      return res.status(200).json({ author: author });
    }

    if (type) {
      ContentRepository.updateContentType(type, content_id);

      return res.status(200).json({ type: type });
    }

    if (length_min) {
      ContentRepository.updateContentLength(length_min, content_id);

      return res.status(200).json({ length_min: length_min });
    }

    if (link) {
      const content = await ContentRepository.getModuleContentByLink(
        link,
        content_module_id
      );

      if (!content) {
        ContentRepository.updateContentLink(link, content_id);

        return res.status(200).json({ link: link });
      } else {
        return res.status(400).json({
          msg: "Já existe um conteúdo no módulo com este link.",
        });
      }
    }
  }

  // deleta conteúdo
  static async deleteContent(req, res) {
    const content_id = req.body.content_id;

    ContentRepository.deleteContentById(content_id);

    return res.status(200).json({
      msg: "Conteúdo excluído com sucesso.",
    });
  }

  static async getContentById(req, res) {
    console.log(req.body);
    const content_id = req.body.content_id;
    const content = await ContentRepository.getContentById(content_id);

    res.status(200).json(content);
  }
}
