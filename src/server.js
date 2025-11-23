import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { conectarDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await conectarDB();
    console.log("Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error iniciando la app:", error);
    process.exit(1);
  }
};

startServer();
