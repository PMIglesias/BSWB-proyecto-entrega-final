///DEPRECATED VIEJA

import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/pacientes.json");

export async function leerPacientes() {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error leyendo pacientes:", error);
    return [];
  }
}

export async function guardarPacientes(pacientes) {
  try {
    await writeFile(filePath, JSON.stringify(pacientes, null, 2));
  } catch (error) {
    console.error("Error guardando pacientes:", error);
  }
}
