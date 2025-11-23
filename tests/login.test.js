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

  agent = request.agent(app); // mantiene cookies / sesión
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("Debe permitir login con credenciales correctas", async () => {
  await Usuario.create({
    nombre: "Test User",
    email: "test@mail.com",
    password: "123456",
    rol: "admin"
  });

  const res = await agent
    .post("/auth/login")
    .send({ email: "test@mail.com", password: "123456" });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("mensaje", "Login exitoso");
});

test("Debe permitir logout destruyendo la sesión", async () => {
  const res = await agent.post("/auth/logout");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("mensaje", "Logout exitoso");
});

test("No debe permitir acceder a rutas protegidas después del logout", async () => {
  const res = await agent.get("/pacientes");

  // Depende de tu implementación:s
  expect(res.status).toBe(401); // o 302 si redirige al login
  expect(res.body).toHaveProperty("mensaje", "No autorizado");

});
