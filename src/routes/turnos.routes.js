import { Router } from "express";
import {
  listarTurnos,
  crearTurno,
  eliminarTurno,
  
} from "../controllers/turnos.controller.js";
import { authMiddleware, rolMiddleware } from "../middlewares/auth.js";

const router = Router();


router.get("/", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), listarTurnos);
router.post("/", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), crearTurno);
router.delete("/:id", authMiddleware(), rolMiddleware(["admin", "recepcionista"]), eliminarTurno);

export default router;
