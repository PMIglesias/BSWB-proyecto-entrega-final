import mongoose from "mongoose";

const TurnoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente", required: true },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: "Medico", required: true },
  fechaHora: { type: String, required: true }, // "YYYY-MM-DD HH:MM"
  motivo: { type: String, trim: true },
  estado: { type: String, enum: ["pendiente", "confirmado", "cancelado", "realizado"], default: "pendiente" }
}, {
  timestamps: true
});

export default mongoose.model("Turno", TurnoSchema);
