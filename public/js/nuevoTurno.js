document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formNuevoTurno");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pacienteId = form.pacienteId.value;
    const fechaHora = form.fechaHora.value;

    try {
      const response = await fetch("/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacienteId, fechaHora })
      });

      if (response.ok) {
        alert("Turno creado correctamente");
        window.location.href = "/turnos";
      } else {
        const error = await response.json();
        alert("Error creando turno: " + error.error);
      }
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }
  });
});
