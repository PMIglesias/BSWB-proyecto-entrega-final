import Turno from "../models/Turno.js";
import Paciente from "../models/Paciente.js";
import Medico from "../models/Medico.js";

// Listar todos los turnos (JSON o HTML)
export const listarTurnos = async (req, res, next) => {
  try {
    const turnos = await Turno.find().populate("paciente", "nombre edad diagnostico").populate("medico", "nombre especialidad").lean();
    const pacientes = await Paciente.find().lean();
    const medicos = await Medico.find().lean();

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("turnos", { turnos, pacientes, medicos, usuario: res.locals.usuario });
    }
    return res.json(turnos);
  } catch (error) {
    next(error);
  }
};

// Crear turno
export const crearTurno = async (req, res, next) => {
  try {
    const { pacienteId, medicoId, fechaHora } = req.body; // < agregamos medicoId

    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });

    const medico = await Medico.findById(medicoId);
    if (!medico) return res.status(404).json({ error: "Médico no encontrado" });

    const turno = await Turno.create({
      paciente: paciente._id,
      medico: medico._id,
      fechaHora
    });

    // redirigir al listado de turnos si vienen del navegador
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/turnos");
    }

    return res.status(201).json(turno);

  } catch (error) {
    next(error);
  }
};

// Eliminar turno
export const eliminarTurno = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminado = await Turno.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ error: "Turno no encontrado" });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
