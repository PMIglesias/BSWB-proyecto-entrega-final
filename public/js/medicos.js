document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalEliminarMedico");
    const btnCancelar = document.getElementById("btnCancelarMedico");
    const btnConfirmar = document.getElementById("btnConfirmarEliminarMedico");
  
    let medicoIdEliminar = null;
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-eliminar-medico")) {
        medicoIdEliminar = e.target.dataset.medicoId;
        modal.style.display = "flex";
      }
    });
  
    btnCancelar.addEventListener("click", () => {
      modal.style.display = "none";
      medicoIdEliminar = null;
    });
  
    btnConfirmar.addEventListener("click", async () => {
      if (!medicoIdEliminar) return;
      try {
        const response = await fetch(`/medicos/${medicoIdEliminar}`, { method: "DELETE" });
        if (response.ok) location.reload();
        else {
          const error = await response.json();
          alert("Error al eliminar médico: " + error.mensaje);
        }
      } catch (error) {
        alert("Error de conexión: " + error.message);
      }
      modal.style.display = "none";
      medicoIdEliminar = null;
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        medicoIdEliminar = null;
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    // form
    const btnNuevo = document.getElementById("btnNuevoMedico");
    const formContainer = document.getElementById("formMedico");
    const formTitulo = document.getElementById("formTitulo");
    const form = document.getElementById("formularioMedico");
  
    const medicoIdInput = document.getElementById("medicoId");
    const nombreInput = document.getElementById("nombre");
    const especialidadInput = document.getElementById("especialidad");
    const matriculaInput = document.getElementById("matricula");
    const telefonoInput = document.getElementById("telefono");
    const emailInput = document.getElementById("email");
  
    btnNuevo.addEventListener("click", () => {
      formTitulo.textContent = "Nuevo Médico";
      medicoIdInput.value = "";
      nombreInput.value = "";
      especialidadInput.value = "";
      matriculaInput.value = "";
      telefonoInput.value = "";
      emailInput.value = "";
      formContainer.style.display = "block";
    });
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-editar")) {
        const id = e.target.dataset.id;
        formTitulo.textContent = "Editar Médico";
        medicoIdInput.value = id;
        nombreInput.value = e.target.dataset.nombre;
        especialidadInput.value = e.target.dataset.especialidad;
        matriculaInput.value = e.target.dataset.matricula;
        telefonoInput.value = e.target.dataset.telefono || "";
        emailInput.value = e.target.dataset.email || "";
        formContainer.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = medicoIdInput.value;
      const metodo = id ? "PUT" : "POST";
      const url = id ? `/medicos/${id}` : "/medicos";
  
      const body = {
        nombre: nombreInput.value,
        especialidad: especialidadInput.value,
        matricula: matriculaInput.value,
        telefono: telefonoInput.value,
        email: emailInput.value
      };
  
      try {
        const response = await fetch(url, {
          method: metodo,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
  
        if (response.ok) {
          location.reload();
        } else {
          const error = await response.json();
          alert("Error: " + error.mensaje || error.error);
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
      }
    });
  
    // delte
    const modal = document.getElementById("modalEliminar");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");
    let medicoIdEliminar = null;
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-eliminar")) {
        medicoIdEliminar = e.target.dataset.id;
        modal.style.display = "flex";
      }
    });
  
    btnCancelar.addEventListener("click", () => {
      modal.style.display = "none";
      medicoIdEliminar = null;
    });
  
    btnConfirmarEliminar.addEventListener("click", async () => {
      if (!medicoIdEliminar) return;
      try {
        const response = await fetch(`/medicos/${medicoIdEliminar}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
        if (response.ok) location.reload();
        else {
          const error = await response.json();
          alert("Error al eliminar médico: " + error.mensaje || error.error);
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
      }
      modal.style.display = "none";
      medicoIdEliminar = null;
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        medicoIdEliminar = null;
      }
    });
  });
  