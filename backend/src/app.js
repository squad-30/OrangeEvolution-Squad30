import express from "express";
// import { openDb } from "./database/configDB.js";
import {
  createTableUser,
  createTableUserPath,
  createTableUserContent,
} from "./controllers/User.js";
import { createTablePath } from "./controllers/Path.js";
import { createTableModule } from "./controllers/Module.js";
import { createTableContent } from "./controllers/Content.js";

const app = express();
app.use(express.json()); //Processa JSON e coloca os dados no req.body

// Executa funções de criação de tabelas
createTableUser();
createTablePath();
createTableModule();
createTableContent();
createTableUserPath();
createTableUserContent();

app.listen(3000, () => {
  console.log("API running");
});
