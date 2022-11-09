import express from "express";
import cors from "cors";
import dao from "./database/dao.js";
import authenticationRouter from "./routes/authentication.routes.js";
import contentRouter from "./routes/content.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();

app.use(express.json()); //Processa JSON e coloca os dados no req.body
app.use(cors());
app.use(authenticationRouter);
app.use(contentRouter);
app.use(adminRouter);

dao.setupDb(); // Cria tabelas do banco se não existir

app.listen(3000, () => {
  console.log("API running");
});
