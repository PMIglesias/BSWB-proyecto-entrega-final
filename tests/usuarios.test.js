import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Usuario from "../src/models/Usuario.js";

let mongoServer;
let agent;

beforeAll(async () => {
  // Crear servidor Mongo en memoria
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

  // Login para obtener sesión
  await agent
    .post("/auth/login")
    .send({ email: "admin@hospital.com", password: "123456" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("CRUD Usuarios", () => {
  let usuarioId;

  test("Crear usuario", async () => {
    const res = await agent.post("/usuarios").send({
      nombre: "Usuario Test",
      email: "test@ejemplo.com",
      password: "123456",
      rol: "recepcionista",
    });

    expect(res.status).toBe(201);
    expect(res.body.usuario).toHaveProperty("_id");
    usuarioId = res.body.usuario._id;
  });

  test("Obtener todos los usuarios", async () => {
    const res = await agent.get("/usuarios");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Obtener usuario por ID", async () => {
    const res = await agent.get(`/usuarios/${usuarioId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", usuarioId);
  });

  test("Actualizar usuario", async () => {
    const res = await agent.put(`/usuarios/${usuarioId}`).send({
      nombre: "Usuario Modificado",
      email: "modificado@ejemplo.com",
      rol: "admin",
    });

    expect(res.status).toBe(200);
    expect(res.body.usuario.nombre).toBe("Usuario Modificado");
  });

  test("Eliminar usuario", async () => {
    const res = await agent.delete(`/usuarios/${usuarioId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Usuario eliminado");
  });

  test("No permitir eliminar usuario inexistente", async () => {
    const res = await agent.delete(`/usuarios/6740ffd2cfeab1590c000000`);
    expect(res.status).toBe(404);
  });
});
