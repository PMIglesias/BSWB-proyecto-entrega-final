document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalEliminarTurno");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnConfirmar = document.getElementById("btnConfirmarEliminar");
    let turnoIdEliminar = null;
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-eliminar-turno")) {
        turnoIdEliminar = e.target.dataset.turnoId;
        modal.style.display = "flex";
      }
    });
  
    btnCancelar.addEventListener("click", () => {
      modal.style.display = "none";
      turnoIdEliminar = null;
    });
  
    btnConfirmar.addEventListener("click", async () => {
      if (!turnoIdEliminar) return;
  
      try {
        const response = await fetch(`/turnos/${turnoIdEliminar}`, { method: "DELETE" });
        if (response.ok) location.reload();
        else {
          const error = await response.json();
          alert("Error al eliminar turno: " + error.error);
        }
      } catch (error) {
        alert("Error de conexión: " + error.message);
      }
  
      modal.style.display = "none";
      turnoIdEliminar = null;
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        turnoIdEliminar = null;
      }
    });
  });
  