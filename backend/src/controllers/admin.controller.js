import repository from "../models/admin.model.js";

// cria conteúdo
const insertContent = async (req, res) => {
  const {
    content_title,
    content_description,
    author,
    type,
    length_min,
    link,
    content_module_id,
  } = req.body;

  const content = await repository.getModuleContentByLink(
    link,
    content_module_id
  );

  if (!content) {
    repository.insertContent(
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
};

// cria módulo
const insertModule = async (req, res) => {
  const { module_title, module_description, module_path_id } = req.body;

  const module = await repository.getModuleFromPathByTitle(
    module_title,
    module_path_id
  );

  if (!module) {
    repository.insertModule(module_title, module_description, module_path_id);
    res.status(200);
    return res.json({ msg: "Cadastrado com sucesso" });
  } else {
    res.status(400);
    return res.json({
      msg: "Já existe um módulo na trilha com este título.",
    });
  }
};

// cria trilha
const insertPath = async (req, res) => {
  const { path_title, path_description } = req.body;

  const path = await repository.getPathByTitle(path_title);

  if (!path) {
    repository.insertPath(path_title, path_description);
    res.status(200);
    return res.json({ msg: "Cadastrado com sucesso" });
  } else {
    res.status(400);
    return res.json({
      msg: "Já existe uma trilha com este título.",
    });
  }
};

// atualiza título ou descrição da trilha
const updatePath = async (req, res) => {
  const { path_id, path_title, path_description } = req.body;
  if (path_title) {
    const path = await repository.getPathByTitle(path_title);
    if (!path) {
      repository.updatePathTitle(path_title, path_id);
      res.status(200);
      return res.json({ path_title: path_title });
    } else {
      res.status(400);
      return res.json({ msg: "Já existe uma trilha com este título." });
    }
  }

  if (path_description) {
    repository.updatePathDescription(path_description, path_id);
    res.status(200);
    return res.json({ path_description: path_description });
  }
};

// atualiza título ou descrição do módulo
const updateModule = async (req, res) => {
  const { module_id, module_title, module_description, module_path_id } =
    req.body;

  if (module_title) {
    const module = await repository.getModuleFromPathByTitle(
      module_title,
      module_path_id
    );

    if (!module) {
      repository.updateModuleTitle(module_title, module_id);
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
    repository.updateModuleDescription(module_description, module_id);
    res.status(200);
    return res.json({ module_description: module_description });
  }
};

// pode atualizar os campos de título, descrição, autor, tipo, duração e link do conteúdo
const updateContent = async (req, res) => {
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
    repository.updateContentTitle(content_title, content_id);
    res.status(200);
    return res.json({ content_title: content_title });
  }

  if (content_description) {
    repository.updateContentDescription(content_description, content_id);
    res.status(200);
    return res.json({ content_description: content_description });
  }

  if (author) {
    repository.updateContentAuthor(author, content_id);
    res.status(200);
    return res.json({ author: author });
  }

  if (type) {
    repository.updateContentType(type, content_id);
    res.status(200);
    return res.json({ type: type });
  }

  if (length_min) {
    repository.updateContentLength(length_min, content_id);
    res.status(200);
    return res.json({ length_min: length_min });
  }

  if (link) {
    const content = await repository.getModuleContentByLink(
      link,
      content_module_id
    );

    if (!content) {
      repository.updateContentLink(link, content_id);
      res.status(200);
      return res.json({ link: link });
    } else {
      res.status(400);
      return res.json({
        msg: "Já existe um conteúdo no módulo com este link.",
      });
    }
  }
};

// deleta conteúdo
const deleteContent = async (req, res) => {
  const content_id = req.body.content_id;

  repository.deleteContentById(content_id);

  res.status(200);
  return res.json({
    msg: "Conteúdo excluído com sucesso.",
  });
};

// deleta módulo
const deleteModule = async (req, res) => {
  const module_id = req.body.module_id;

  repository.deleteAllModuleContent(module_id);
  repository.deleteModuleById(module_id);

  res.status(200);
  return res.json({
    msg: "Módulo excluído com sucesso.",
  });
};

// deleta trilha
const deletePath = async (req, res) => {
  const path_id = req.body.path_id;
  const modules = await repository.getModulesFromPath(path_id);

  modules.map(async (mod) => {
    const module = await repository.getModuleById(mod.module_id);
    repository.deleteAllModuleContent(module.module_id);
  });

  repository.deletePathModules(path_id);
  repository.deletePathById(path_id);

  res.status(200);
  return res.json({
    msg: "Trilha excluída com sucesso.",
  });
};

export {
  updatePath,
  updateModule,
  updateContent,
  insertContent,
  insertModule,
  insertPath,
  deleteContent,
  deleteModule,
  deletePath,
};
