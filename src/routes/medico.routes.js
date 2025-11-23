import { Router } from "express";
import {
  obtenerMedicos,
  obtenerMedico,
  crearMedico,
  actualizarMedico,
  eliminarMedico
} from "../controllers/medico.controller.js";
import { authMiddleware, rolMiddleware } from "../middlewares/auth.js";

const router = Router();


router.get("/", authMiddleware({ redirect: true }), obtenerMedicos);
router.get("/:id", authMiddleware({ redirect: true }), obtenerMedico);


router.post("/", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), crearMedico);
router.put("/:id", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), actualizarMedico);
router.delete("/:id", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), eliminarMedico);

export default router;
