import mongoose from "mongoose";

const MedicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  especialidad: { type: String, required: true, trim: true },
  matricula: { type: String, required: true, unique: true, trim: true },
  telefono: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
}, {
  timestamps: true
});

export default mongoose.model("Medico", MedicoSchema);
