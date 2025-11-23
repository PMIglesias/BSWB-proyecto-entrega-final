import { Router } from "express";
import {
  obtenerPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
  
  asignarTurno
} from "../controllers/pacientes.controller.js";
import { authMiddleware, rolMiddleware } from "../middlewares/auth.js";

const router = Router();


router.get("/", authMiddleware({ redirect: true }), rolMiddleware(["admin", "recepcionista"]), obtenerPacientes);

router.get("/:id", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), obtenerPaciente);
router.post("/", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), crearPaciente);
router.put("/:id", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), actualizarPaciente);
router.delete("/:id", authMiddleware(), rolMiddleware(["admin"]), eliminarPaciente);
router.post("/asignar-turno", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), asignarTurno);

export default router;
