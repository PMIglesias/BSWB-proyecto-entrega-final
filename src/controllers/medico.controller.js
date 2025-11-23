import Medico from "../models/Medico.js";

// listar
export const obtenerMedicos = async (req, res, next) => {
  try {
    const medicos = await Medico.find().lean();

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("medicos", {
        titulo: "Médicos",
        medicos,
        usuario: res.locals.usuario
      });
    }

    return res.json(medicos);

  } catch (error) {
    next(error);
  }
};

// get por id
export const obtenerMedico = async (req, res, next) => {
  try {
    const medico = await Medico.findById(req.params.id);
    if (!medico) return res.status(404).json({ mensaje: "Médico no encontrado" });
    res.json(medico);
  } catch (error) {
    next(error);
  }
};

// crear
export const crearMedico = async (req, res, next) => {
  try {
    const nuevoMedico = new Medico(req.body);
    await nuevoMedico.save();
    res.status(201).json({ mensaje: "Médico creado", medico: nuevoMedico });
  } catch (error) {
    next(error);
  }
};

// Actualizar 
export const actualizarMedico = async (req, res, next) => {
  try {
    const medico = await Medico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medico) return res.status(404).json({ mensaje: "Médico no encontrado" });
    res.json({ mensaje: "Médico actualizado", medico });
  } catch (error) {
    next(error);
  }
};

// delete
export const eliminarMedico = async (req, res, next) => {
  try {
    const medico = await Medico.findByIdAndDelete(req.params.id);
    if (!medico) return res.status(404).json({ mensaje: "Médico no encontrado" });
    res.json({ mensaje: "Médico eliminado" });
  } catch (error) {
    next(error);
  }
};
