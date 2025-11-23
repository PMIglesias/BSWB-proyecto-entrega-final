import { Router } from "express";
import { loginUsuario, logoutUsuario, loginView } from "../controllers/auth.controller.js";

const router = Router();

// mostrar login!!!!!
router.get("/login", loginView);

// login
router.post("/login", loginUsuario);

// logout
router.post("/logout", logoutUsuario);

export default router;
