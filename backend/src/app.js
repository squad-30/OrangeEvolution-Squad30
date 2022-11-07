import express from "express";
import dao from "./database/dao.js";
import authenticationRouter from "./routes/authentication.routes.js";
import contentRouter from "./routes/content.routes.js";

const app = express();

app.use(express.json()); //Processa JSON e coloca os dados no req.body
app.use(authenticationRouter);
app.use(contentRouter);

dao.setupDb(); // Cria tabelas do banco se não existir

app.listen(3000, () => {
  console.log("API running");
});
