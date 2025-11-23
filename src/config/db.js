import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conectarDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI no definido en dotenv");

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // corta si no se conecta en 5 seg
    });

    console.log("connectado a MongoDB");


    mongoose.connection.on("disconnected", () => {
      console.warn("connec lost MongoDB");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("Reconectado a MongoDB, Gracias papadio");
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};
