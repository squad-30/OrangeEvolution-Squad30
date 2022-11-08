import repository from "../models/content.model.js";

export const content = async (req, res) => {
  const req_path_id = req.body.path.path_id;

  //seleciona trilha
  const path = await repository.getPathById(req_path_id);

  // verifica existência da trilha
  if (!path) {
    res.status(404);
    return res.json({ msg: "Trilha não existente." });
  }

  // lista modulos da trilha
  const modules = await repository.getModulesByPathId(req_path_id);

  // verifica se existem modulos na trilha
  if (modules.length < 1) {
    res.status(404);
    return res.json({ msg: "Nenhum módulo cadastrado na trilha" });
  }
  // erro para baixo v

  let data = [];
  modules.some(async (mod) => {
    // consulta os conteúdos do modulo
    const moduleContent = await repository.getModuleContent(mod.module_id);

    if (moduleContent) {
      const content = await repository.getPathContent(
        mod.module_id,
        path.path_id
      );
      data.push(content);
    }
    res.status(200);
    return res.json(data);
  });
};
