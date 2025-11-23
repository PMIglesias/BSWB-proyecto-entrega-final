import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Paciente from "../src/models/Paciente.js";
import Turno from "../src/models/Turno.js";

const MONGO_URI = process.env.MONGO_URI ;

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("conecta2 para seed");

    const file = await fs.readFile(path.join(process.cwd(), "data", "pacientes.json"), "utf-8");
    const pacientes = JSON.parse(file);

    // vaciar colecciones 
    await Turno.deleteMany({});
    await Paciente.deleteMany({});

    for (const p of pacientes) {
      const nuevo = await Paciente.create({
        nombre: p.nombre,
        edad: p.edad,
        diagnostico: p.diagnostico
      });
      if (p.turnos && p.turnos.length) {
        for (const t of p.turnos) {
          await Turno.create({ paciente: nuevo._id, fechaHora: t });
        }
      }
    }

    console.log("Seed completado");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
