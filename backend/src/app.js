import express from "express";
import cors from "cors";
import dao from "./database/dao.js";
import contentRouter from "./routes/content.routes.js";
import userRouter from "./routes/user.routes.js";
import pathRouter from "./routes/path.routes.js";
import moduleRouter from "./routes/module.routes.js";

const app = express();

app.use(express.json()); //Processa JSON e coloca os dados no req.body
app.use(cors());
app.use(userRouter);
app.use(contentRouter);
app.use(pathRouter);
app.use(moduleRouter);

dao.setupDb(); // Cria tabelas do banco se não existir

app.listen(3000, () => {
  console.log("API running");
});
