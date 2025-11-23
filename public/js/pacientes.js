document.addEventListener("DOMContentLoaded", () => {

  const formPaciente = document.getElementById("formPaciente");
  const pacienteIdInput = document.getElementById("pacienteId");
  const nombreInput = document.getElementById("nombre");
  const edadInput = document.getElementById("edad");
  const diagnosticoInput = document.getElementById("diagnostico");
  const submitBtn = formPaciente.querySelector("button[type='submit']");

  formPaciente.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pacienteId = pacienteIdInput.value;
    const data = {
      nombre: nombreInput.value,
      edad: edadInput.value,
      diagnostico: diagnosticoInput.value
    };

    try {
      let response;
      if (pacienteId) {
        // editar paciente
        response = await fetch(`/pacientes/${pacienteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      } else {
        // crear paciente
        response = await fetch("/pacientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      }

      if (!response.ok) {
        const error = await response.json();
        alert("Error: " + (error.mensaje || error.error));
        return;
      }

      // reolad
      location.reload();
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }
  });

  // edit
  document.querySelectorAll(".btn-editar-paciente").forEach(btn => {
    btn.addEventListener("click", () => {
      const tr = btn.closest("tr");
      const pacienteId = tr.dataset.id;
      const nombre = btn.dataset.nombre;
      const edad = btn.dataset.edad;
      const diagnostico = btn.dataset.diagnostico;

      // form
      pacienteIdInput.value = pacienteId;
      nombreInput.value = nombre;
      edadInput.value = edad;
      diagnosticoInput.value = diagnostico;

      submitBtn.textContent = "Actualizar Paciente";
      nombreInput.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // modal del turno
  const modalTurno = document.getElementById("modalEliminarTurno");
  const fechaTurno = document.getElementById("fechaTurno");
  const horaTurno = document.getElementById("horaTurno");
  const btnCancelarTurno = document.getElementById("btnCancelar");
  const btnConfirmarEliminarTurno = document.getElementById("btnConfirmarEliminar");

  let pacienteIdTurno = null;
  let turnoIndex = null;

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      pacienteIdTurno = e.target.dataset.pacienteId;
      turnoIndex = e.target.dataset.turnoIndex;
      const fechaHoraTurnoVal = e.target.dataset.turnoFecha;
      const [fecha, hora] = fechaHoraTurnoVal.split(" ");

      fechaTurno.textContent = `Fecha: ${fecha}`;
      horaTurno.textContent = `Hora: ${hora}`;

      modalTurno.style.display = "flex";
    }
  });

  btnCancelarTurno.addEventListener("click", () => {
    modalTurno.style.display = "none";
    pacienteIdTurno = null;
    turnoIndex = null;
  });

  btnConfirmarEliminarTurno.addEventListener("click", async () => {
    if (pacienteIdTurno && turnoIndex !== null) {
      try {
        const response = await fetch(`/pacientes/${pacienteIdTurno}/turno/${turnoIndex}`, { method: "DELETE" });
        if (response.ok) location.reload();
        else {
          const error = await response.json();
          alert("Error al eliminar el turno: " + error.error);
        }
      } catch (error) {
        alert("Error de conexión: " + error.message);
      }
    }
    modalTurno.style.display = "none";
    pacienteIdTurno = null;
    turnoIndex = null;
  });

  modalTurno.addEventListener("click", (e) => {
    if (e.target === modalTurno) {
      modalTurno.style.display = "none";
      pacienteIdTurno = null;
      turnoIndex = null;
    }
  });

  // modla pac
  const modalPaciente = document.getElementById("modalEliminarPaciente");
  const btnCancelarPaciente = document.getElementById("btnCancelarPaciente");
  const btnConfirmarEliminarPaciente = document.getElementById("btnConfirmarEliminarPaciente");

  let pacienteIdEliminar = null;

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar-paciente")) {
      pacienteIdEliminar = e.target.dataset.pacienteId;
      modalPaciente.style.display = "flex";
    }
  });

  btnCancelarPaciente.addEventListener("click", () => {
    modalPaciente.style.display = "none";
    pacienteIdEliminar = null;
  });

  btnConfirmarEliminarPaciente.addEventListener("click", async () => {
    if (!pacienteIdEliminar) return;

    try {
      const response = await fetch(`/pacientes/${pacienteIdEliminar}`, { method: "DELETE" });
      if (response.ok) location.reload();
      else {
        const error = await response.json();
        alert("Error al eliminar paciente: " + error.error);
      }
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }

    modalPaciente.style.display = "none";
    pacienteIdEliminar = null;
  });

  modalPaciente.addEventListener("click", (e) => {
    if (e.target === modalPaciente) {
      modalPaciente.style.display = "none";
      pacienteIdEliminar = null;
    }
  });
});
