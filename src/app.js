import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash"; // Importar connect-flash
import { conectarDB } from "./config/db.js";
import indexRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB
await conectarDB();

// configs
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

// sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretiten",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 3600000 }
  })
);

// Middleware de connect-flash
app.use(flash());

// Middleware para pasar mensajes flash y usuario a las vistas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.usuario = req.session.userId
    ? { id: req.session.userId, rol: req.session.rol, nombre: req.session.nombre || "Usuario" }
    : null;
  next();
});

// Logger simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// rutas desde index.js
app.use("/", indexRoutes);

// handle 404
app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) return res.render("error", { message: "Página no encontrada" });
  return res.json({ error: "Not found" });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ha ocurrido un error interno en el servidor.";
  res.status(statusCode).render("error", {
    title: `Error ${statusCode}`,
    message: message,
  });
});


// iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
