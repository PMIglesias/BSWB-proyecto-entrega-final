export function validarPaciente(req, res, next) {
  const { nombre, edad, diagnostico } = req.body;
  if (!nombre || !edad || !diagnostico) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  next();
}
