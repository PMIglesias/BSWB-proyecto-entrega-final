
export const authMiddleware = (options = { redirect: false }) => {
  return (req, res, next) => {
    if (!req.session.userId) {
      if (options.redirect) {
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

export const rolMiddleware = (rolesPermitidos, options = { redirect: false }) => {
  return (req, res, next) => {
    const userRol = req.session.rol;
    if (!userRol || !rolesPermitidos.includes(userRol)) {
      if (options.redirect) {
        return res.status(403).render("error", { message: "Acceso denegado" });
      }
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }
    next();
  };
};


//seteado para funcionar en apis y en viiews de pug