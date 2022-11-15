import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dao from "./database/dao.js";
import navigationRouter from "./routes/navigation.routes.js";
import contentRouter from "./routes/content.routes.js";
import userRouter from "./routes/user.routes.js";
import pathRouter from "./routes/path.routes.js";
import moduleRouter from "./routes/module.routes.js";
import userPathRouter from "./routes/user_path.routes.js";
import userContentRouter from "./routes/user_content.routes.js";

const app = express();

// Configurando para renderizar arquivos .ejs na pasta views e acessando a public
app.set('views', './src/views'); 
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));

app.use(express.json()); //Processa JSON e coloca os dados no req.body
app.use(cors());
app.use(navigationRouter);
app.use(userRouter);
app.use(contentRouter);
app.use(pathRouter);
app.use(moduleRouter);
app.use(userPathRouter);
app.use(userContentRouter);

dao.setupDb(); // Cria tabelas do banco se não existir

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API running");
});
