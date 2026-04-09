// assets/js/usuarios.js

import {
  inicializarDatos,
  obtenerTodos,
  agregarElemento,
  eliminarElemento,
  obtenerSiguienteId,
  STORE_USUARIOS
} from "./almacenamiento.js";

document.addEventListener("DOMContentLoaded", async () => {
  await inicializarAplicacion();
});

async function inicializarAplicacion() {
  try {
    await inicializarDatos();
    mostrarUsuarioActivo();
    await cargarUsuarios();
    configurarFormulario();
    configurarCierreSesion();
  } catch (error) {
    console.error("Error al inicializar la página de usuarios:", error);
    mostrarMensaje("Se produjo un error al cargar la página de usuarios.", "danger");
  }
}

function mostrarUsuarioActivo() {
  const elementoUsuarioActivo = document.getElementById("usuario-logueado-nav");
  const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

  if (!elementoUsuarioActivo) {
    return;
  }

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioActivo) {
    elementoUsuarioActivo.textContent = `Sesión iniciada: ${usuarioActivo.email}`;
    botonCerrarSesion?.classList.remove("d-none");
  } else {
    elementoUsuarioActivo.textContent = "No has iniciado sesión";
    botonCerrarSesion?.classList.add("d-none");
  }
}

function configurarCierreSesion() {
  const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

  if (!botonCerrarSesion) {
    return;
  }

  botonCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    mostrarUsuarioActivo();
    mostrarMensaje("Has cerrado sesión correctamente.", "info");
  });
}

async function cargarUsuarios() {
  try {
    const usuarios = await obtenerTodos(STORE_USUARIOS);
    renderizarTablaUsuarios(usuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    mostrarMensaje("No se pudieron cargar los usuarios.", "danger");
  }
}

function renderizarTablaUsuarios(usuarios) {
  const tbody = document.getElementById("tabla-usuarios-body");

  if (!tbody) {
    console.warn("No se encontró el tbody con id 'tabla-usuarios-body'.");
    return;
  }

  tbody.innerHTML = "";

  if (usuarios.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">
          No hay usuarios registrados.
        </td>
      </tr>
    `;
    return;
  }

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre} ${usuario.apellidos}</td>
      <td>${usuario.email}</td>
      <td>${capitalizarTexto(usuario.rol)}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-id="${usuario.id}">
          Eliminar
        </button>
      </td>
    `;

    const botonEliminar = fila.querySelector("button");
    botonEliminar.addEventListener("click", async () => {
      await borrarUsuario(usuario.id);
    });

    tbody.appendChild(fila);
  });
}

function configurarFormulario() {
  const formulario = document.getElementById("form-usuario");

  if (!formulario) {
    console.warn("No se encontró el formulario con id 'form-usuario'.");
    return;
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    await crearUsuarioDesdeFormulario(formulario);
  });
}

async function crearUsuarioDesdeFormulario(formulario) {
  const nombre = document.getElementById("nombre-usuario").value.trim();
  const apellidos = document.getElementById("apellidos-usuario").value.trim();
  const email = document.getElementById("email-usuario").value.trim();
  const password = document.getElementById("password-usuario").value.trim();
  const rol = document.getElementById("rol-usuario").value.trim();

  if (!nombre || !apellidos || !email || !password || !rol) {
    mostrarMensaje("Debes completar todos los campos.", "warning");
    return;
  }

  try {
    const usuarios = await obtenerTodos(STORE_USUARIOS);

    const emailYaExiste = usuarios.some(
      (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
    );

    if (emailYaExiste) {
      mostrarMensaje("Ya existe un usuario con ese correo electrónico.", "warning");
      return;
    }

    const nuevoUsuario = {
      id: await obtenerSiguienteId(STORE_USUARIOS),
      nombre,
      apellidos,
      email,
      password,
      rol
    };

    await agregarElemento(STORE_USUARIOS, nuevoUsuario);

    mostrarMensaje("Usuario creado correctamente.", "success");
    formulario.reset();
    await cargarUsuarios();
  } catch (error) {
    console.error("Error al crear usuario:", error);
    mostrarMensaje("No se pudo crear el usuario.", "danger");
  }
}

async function borrarUsuario(id) {
  const confirmar = confirm("¿Seguro que quieres eliminar este usuario?");

  if (!confirmar) {
    return;
  }

  try {
    await eliminarElemento(STORE_USUARIOS, id);
    mostrarMensaje("Usuario eliminado correctamente.", "success");
    await cargarUsuarios();
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    mostrarMensaje("No se pudo eliminar el usuario.", "danger");
  }
}

function mostrarMensaje(texto, tipo = "info") {
  const contenedorMensaje = document.getElementById("mensaje-usuario");

  if (!contenedorMensaje) {
    return;
  }

  contenedorMensaje.innerHTML = `
    <div class="alert alert-${tipo} mb-0" role="alert">
      ${texto}
    </div>
  `;
}

function capitalizarTexto(texto) {
  if (!texto) {
    return "";
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}