import Usuario from "../models/Usuario.js";

// Crear usuario
export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      if (req.headers.accept?.includes("text/html")) {
        req.flash("error_msg", "Error: El correo electrónico ya está registrado.");
        return res.redirect("/usuarios");
      }
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();

    if (req.headers.accept?.includes("text/html")) {
      req.flash("success_msg", "Usuario creado correctamente.");
      return res.redirect("/usuarios");
    }

    res.status(201).json({ mensaje: "Usuario creado correctamente", usuario });
  } catch (error) {
    next(error);
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().select("-password").lean();

    if (req.headers.accept?.includes("text/html")) {
      return res.render("usuarios", { usuarios }); // 'usuario' ya está en res.locals
    }

    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-password").lean();
    if (!usuario) {
      if (req.headers.accept?.includes("text/html")) {
        req.flash("error_msg", "Usuario no encontrado.");
        return res.redirect("/usuarios");
      }
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.headers.accept?.includes("text/html")) {
      // No hay una vista de detalle de usuario, así que no se usa por ahora
      // return res.render("usuarioDetalle", { usuario });
      return res.redirect("/usuarios");
    }

    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, rol } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol },
      { new: true, runValidators: true }
    ).select("-password").lean();

    if (!usuario) {
      if (req.headers.accept?.includes("text/html")) {
        req.flash("error_msg", "Usuario no encontrado.");
        return res.redirect("/usuarios");
      }
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.headers.accept?.includes("text/html")) {
      req.flash("success_msg", "Usuario actualizado correctamente.");
      return res.redirect("/usuarios");
    }

    res.json({ mensaje: "Usuario actualizado", usuario });
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      if (req.headers.accept?.includes("text/html")) {
        req.flash("error_msg", "Usuario no encontrado.");
        return res.redirect("/usuarios");
      }
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.headers.accept?.includes("text/html")) {
      req.flash("success_msg", "Usuario eliminado correctamente.");
      return res.redirect("/usuarios");
    }

    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};
