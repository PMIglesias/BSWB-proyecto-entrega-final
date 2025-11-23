import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "recepcionista", "medico"], default: "recepcionista" },
}, {
  timestamps: true
});

// encriptar password antes de guardar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// comparar contraseñas
UsuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Usuario", UsuarioSchema);
