import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Função de conexão ao banco de dados.
export async function openDb() {
  return open({
    filename: "./src/database/database.db", //Local do arquivo do banco de dados.
    driver: sqlite3.Database,
  });
}
