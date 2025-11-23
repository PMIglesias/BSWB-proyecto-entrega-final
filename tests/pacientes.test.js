import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Usuario from "../src/models/Usuario.js";
import Paciente from "../src/models/Paciente.js";

let mongoServer;
let agent;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  agent = request.agent(app); // mantiene cookies

  // Crear usuario admin
  await Usuario.create({
    nombre: "Admin",
    email: "admin@hospital.com",
    password: "123456",
    rol: "admin"
  });

  // Login para obtener sesión
  await agent
    .post("/auth/login")
    .send({ email: "admin@hospital.com", password: "123456" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Rutas de Pacientes", () => {

  test("Debe permitir acceder a /pacientes con login", async () => {
    const res = await agent.get("/pacientes");

    expect(res.status).toBe(200); // tu controlador devuelve lista
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Debe permitir crear un paciente", async () => {
    const nuevo = {
      nombre: "Juan Pérez",
      dni: "12345678",
      telefono: "1122334455",
      edad: 35,
      diagnostico: "Control general"
    };
  
    const res = await agent.post("/pacientes").send(nuevo);
  
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.nombre).toBe("Juan Pérez");
  });
  

  test("No debe permitir acceder a /pacientes sin login", async () => {
    const nuevoCliente = request(app); // nuevo agente SIN cookies
    const res = await nuevoCliente.get("/pacientes");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("mensaje", "No autorizado");
  });

});
