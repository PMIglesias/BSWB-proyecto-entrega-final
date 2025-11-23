import express from "express";
import pacientesRoutes from "./pacientes.routes.js";
import turnosRoutes from "./turnos.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import authRoutes from "./auth.routes.js";
import medicoRoutes  from "./medico.routes.js"
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Rutas raiz

router.get("/", authMiddleware({ redirect: true }), (req, res) => {
  res.render("index", {
    titulo: "Clínica - Inicio",
    usuario: res.locals.usuario
  });
});


//  API 
router.use("/auth", authRoutes);            // login
router.use("/pacientes", pacientesRoutes);  //  pacientes + asignar turno
router.use("/turnos", turnosRoutes);        
router.use("/usuarios", usuarioRoutes);     

router.use("/medicos", medicoRoutes);     


export default router;
