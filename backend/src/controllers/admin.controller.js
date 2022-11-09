import repository from "../models/admin.model.js";

// atualiza título ou descrição da trilha
export const updatePath = async (req, res) => {
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
export const updateModule = async (req, res) => {
  const { module_id, module_title, module_description, module_path_id } =
    req.body;

  console.log(req.body);
  if (module_title) {
    console.log("entrou no if do module");
    const module = await repository.getModuleFromPathByTitle(
      module_title,
      module_path_id
    );
    console.log(module);
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

// deleta trilha

// deleta módulo

// deleta conteúdo

// cria trilha

// cria módulo

// cria conteúdo
