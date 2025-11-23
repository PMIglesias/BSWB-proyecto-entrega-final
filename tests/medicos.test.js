import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Usuario from "../src/models/Usuario.js";
import Medico from "../src/models/Medico.js";

let mongoServer;
let agent;

beforeAll(async () => {
  // MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  agent = request.agent(app); // mantiene cookies y sesión

  // Crear usuario admin
  await Usuario.create({
    nombre: "Admin",
    email: "admin@hospital.com",
    password: "123456",
    rol: "admin",
  });

  // Login admin
  await agent
    .post("/auth/login")
    .send({ email: "admin@hospital.com", password: "123456" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("CRUD Médicos", () => {
  let medicoId;

  test("Crear médico", async () => {
    const res = await agent.post("/medicos").send({
      nombre: "Dr. Juan Pérez",
      especialidad: "Cardiología",
      matricula: "12345",
    });

    expect(res.status).toBe(201);
    expect(res.body.medico).toHaveProperty("_id");
    medicoId = res.body.medico._id;
  });

  test("Obtener todos los médicos", async () => {
    const res = await agent.get("/medicos");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Obtener médico por ID", async () => {
    const res = await agent.get(`/medicos/${medicoId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", medicoId);
  });

  test("Actualizar médico", async () => {
    const res = await agent.put(`/medicos/${medicoId}`).send({
      nombre: "Dr. Juan Modificado",
      especialidad: "Neurología",
    });

    expect(res.status).toBe(200);
    expect(res.body.medico.nombre).toBe("Dr. Juan Modificado");
  });

  test("Eliminar médico", async () => {
    const res = await agent.delete(`/medicos/${medicoId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Médico eliminado");
  });

  test("No permitir eliminar médico inexistente", async () => {
    const res = await agent.delete(`/medicos/6740ffd2cfeab1590c000000`);
    expect(res.status).toBe(404);
  });

});
