import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Usuario from "../src/models/Usuario.js";

let mongoServer;
let agent;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  agent = request.agent(app);

  // Crear usuario admin y loguearse
  await Usuario.create({
    nombre: "Admin",
    email: "admin@hospital.com",
    password: "123456",
    rol: "admin",
  });

  await agent.post("/auth/login").send({
    email: "admin@hospital.com",
    password: "123456",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("CRUD Turnos", () => {
  let pacienteId;
  let medicoId;
  let turnoId;

  beforeAll(async () => {
    // Crear paciente
    const pacienteRes = await agent.post("/pacientes").send({
      nombre: "Paciente Test",
      dni: "12345678",
      telefono: "1122334455",
      edad: 30,
      diagnostico: "Chequeo general",
    });
    pacienteId = pacienteRes.body._id; // paciente directo

    // Crear médico
    const medicoRes = await agent.post("/medicos").send({
      nombre: "Dr. Juan Pérez",
      especialidad: "Cardiología",
      matricula: "12345",
    });
    medicoId = medicoRes.body.medico._id; // medico está dentro de { medico: {...} }
  });

  test("Crear turno", async () => {
    const fechaHora = new Date().toISOString();

    const res = await agent.post("/turnos").send({
      pacienteId, // <- ahora coincide con tu controller
      medicoId,   // <- ahora coincide con tu controller
      fechaHora,
      motivo: "Consulta general",
    });

    console.log("TurnoRes:", res.body);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    turnoId = res.body._id; // ahora se setea correctamente
  });

  test("Listar turnos", async () => {
    const res = await agent.get("/turnos");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Eliminar turno", async () => {
    const res = await agent.delete(`/turnos/${turnoId}`);

    expect(res.status).toBe(204); // tu controller hace res.status(204).end()
  });

  test("No permitir eliminar turno inexistente", async () => {
    const res = await agent.delete(`/turnos/6740ffd2cfeab1590c000000`);
    expect(res.status).toBe(404);
  });
});
