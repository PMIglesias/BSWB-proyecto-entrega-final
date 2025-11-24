export const authMiddleware = () => {
  return (req, res, next) => {
    if (!req.session.userId) {
      
      // reuquin para detectar si es navegador (HTML) o API (JSON)
      const aceptaHTML = req.headers.accept?.includes("text/html");

      if (aceptaHTML) {
        return res.redirect("/auth/login"); // para vistas
      }

      return res.status(401).json({ mensaje: "No autorizado" }); // para API
    }

    res.locals.usuario = {
      id: req.session.userId,
      rol: req.session.rol,
      nombre: req.session.nombre || "Usuario",
    };

    next();
  };
};


export const rolMiddleware = (rolesPermitidos) => {
  return (req, res, next) => {
    const userRol = req.session.rol;

    if (!userRol || !rolesPermitidos.includes(userRol)) {

      const aceptaHTML = req.headers.accept?.includes("text/html");
  //  Si es navegador redirigir
      if (aceptaHTML) {
        return res.status(403).render("error", { message: "Acceso denegado" });
      }
  //  Si es api respuesta
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }

    next();
  };
};
