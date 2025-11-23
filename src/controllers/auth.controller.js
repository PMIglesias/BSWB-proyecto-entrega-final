import Usuario from "../models/Usuario.js";

//mostrar login
export const loginView = (req, res) => {
  res.render("login", { titulo: "Iniciar Sesión" });
};

// login con cookie 
export const loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: "Email o contraseña incorrectos" });

    const passwordValido = await usuario.compararPassword(password);
    if (!passwordValido) return res.status(400).json({ mensaje: "Email o contraseña incorrectos" });

    // guardar datos en la session
    req.session.userId = usuario._id;
    req.session.rol = usuario.rol;

    // res.json({ mensaje: "Login exitoso", usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
    
    // redirigir al index para pug
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const logoutUsuario = (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err)
    res.clearCookie("connect.sid"); // nombre por defecto de la qk de express-session
    res.json({ mensaje: "Logout exitoso" });
  });
};
