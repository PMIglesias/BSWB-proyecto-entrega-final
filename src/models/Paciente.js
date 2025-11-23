import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  edad: { type: Number, required: true },
  diagnostico: { type: String, required: true, trim: true }
}, {
  timestamps: true
});

export default mongoose.model("Paciente", PacienteSchema);
