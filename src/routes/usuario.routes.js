import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuario.controller.js";
import { authMiddleware, rolMiddleware } from "../middlewares/auth.js";

const router = Router();

// solo admin-- podemos setear algunas rutas para los roles recepcioniutas que creen usuarios coon rol definido para medicos. lo vemos
router.get("/", authMiddleware(), rolMiddleware(["admin"]), obtenerUsuarios);
router.get("/:id", authMiddleware(), rolMiddleware(["admin"]), obtenerUsuarioPorId);
router.post("/", authMiddleware(), rolMiddleware(["admin"]), crearUsuario);
router.put("/:id", authMiddleware(), rolMiddleware(["admin"]), actualizarUsuario);
router.delete("/:id", authMiddleware(), rolMiddleware(["admin"]), eliminarUsuario);

export default router;
