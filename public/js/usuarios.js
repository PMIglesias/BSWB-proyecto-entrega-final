document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formUsuario");
    const usuarioIdInput = document.getElementById("usuarioId");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rolSelect = document.getElementById("rol");
  
    const modalUsuario = document.getElementById("modalEliminarUsuario");
    const btnCancelarUsuario = document.getElementById("btnCancelarUsuario");
    const btnConfirmarEliminarUsuario = document.getElementById("btnConfirmarEliminarUsuario");
  
    let usuarioAEliminar = null;
  
    // editar
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-editar-usuario")) {
        const id = e.target.dataset.usuarioId;
        const nombre = e.target.dataset.nombre;
        const email = e.target.dataset.email;
        const rol = e.target.dataset.rol;
  
        usuarioIdInput.value = id;
        nombreInput.value = nombre;
        emailInput.value = email;
        passwordInput.value = "";
        rolSelect.value = rol;
  
        // cambiar la accion del formulario para editar
        form.action = `/usuarios/${id}`;
        form.method = "POST";
      }
  
      //  del usuario 
      if (e.target.classList.contains("btn-eliminar-usuario")) {
        usuarioAEliminar = e.target.dataset.usuarioId;
        modalUsuario.style.display = "flex";
      }
    });
  
    // creat actualizar user
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const id = usuarioIdInput.value;
      const url = id ? `/usuarios/${id}` : "/usuarios";
      const method = id ? "PUT" : "POST";
  
      const payload = {
        nombre: nombreInput.value,
        email: emailInput.value,
        rol: rolSelect.value
      };
  
      if (passwordInput.value) payload.password = passwordInput.value;
  
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
  
        if (response.ok) {
          location.reload();
        } else {
          const error = await response.json();
          alert(error.mensaje || "Error al guardar usuario");
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
      }
    });
  
    //  cancel deleet 
    btnCancelarUsuario.addEventListener("click", () => {
      modalUsuario.style.display = "none";
      usuarioAEliminar = null;
    });
  
    //  delete
    btnConfirmarEliminarUsuario.addEventListener("click", async () => {
      if (!usuarioAEliminar) return;
  
      try {
        const response = await fetch(`/usuarios/${usuarioAEliminar}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
  
        if (response.ok) location.reload();
        else {
          const error = await response.json();
          alert(error.mensaje || "Error al eliminar usuario");
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
      }
  
      modalUsuario.style.display = "none";
      usuarioAEliminar = null;
    });
  
    // cerrar modal
    modalUsuario.addEventListener("click", (e) => {
      if (e.target === modalUsuario) {
        modalUsuario.style.display = "none";
        usuarioAEliminar = null;
      }
    });
  });
  