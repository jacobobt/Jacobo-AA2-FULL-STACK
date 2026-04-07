import {
  crearUsuario,
  eliminarUsuario,
  inicializarAlmacenamiento,
  listarUsuarios
} from "./almacenaje.js";
import {
  capitalizarTexto,
  configurarBotonCerrarSesion,
  mostrarAlerta,
  obtenerClaseBadgeRol,
  pintarUsuarioEnNavbar
} from "./ui.js";

const formUsuario = document.getElementById("form-usuario");
const nombreUsuario = document.getElementById("nombre-usuario");
const apellidosUsuario = document.getElementById("apellidos-usuario");
const emailUsuario = document.getElementById("email-usuario");
const passwordUsuario = document.getElementById("password-usuario");
const rolUsuario = document.getElementById("rol-usuario");
const tablaUsuariosBody = document.getElementById("tabla-usuarios-body");
const mensajeUsuario = document.getElementById("mensaje-usuario");

async function inicializarPaginaUsuarios() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  pintarTablaUsuarios();

  formUsuario.addEventListener("submit", gestionarAltaUsuario);
}

function pintarTablaUsuarios() {
  const usuarios = listarUsuarios();

  if (usuarios.length === 0) {
    tablaUsuariosBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">No hay usuarios registrados.</td>
      </tr>
    `;
    return;
  }

  tablaUsuariosBody.innerHTML = "";

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");
    const claseRol = obtenerClaseBadgeRol(usuario.rol);

    fila.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre} ${usuario.apellidos}</td>
      <td>${usuario.email}</td>
      <td>${usuario.password}</td>
      <td><span class="badge ${claseRol}">${capitalizarTexto(usuario.rol)}</span></td>
      <td>
        <button class="btn btn-sm btn-danger" data-email="${usuario.email}">Eliminar</button>
      </td>
    `;

    const botonEliminar = fila.querySelector("button");
    botonEliminar.addEventListener("click", () => gestionarBorradoUsuario(usuario.email));

    tablaUsuariosBody.appendChild(fila);
  });
}

function obtenerDatosFormulario() {
  return {
    nombre: nombreUsuario.value,
    apellidos: apellidosUsuario.value,
    email: emailUsuario.value,
    password: passwordUsuario.value,
    rol: rolUsuario.value
  };
}

function gestionarAltaUsuario(evento) {
  evento.preventDefault();

  try {
    const datosUsuario = obtenerDatosFormulario();
    const usuario = crearUsuario(datosUsuario);

    pintarTablaUsuarios();
    pintarUsuarioEnNavbar();
    formUsuario.reset();

    mostrarAlerta(
      mensajeUsuario,
      `Usuario ${usuario.nombre} ${usuario.apellidos} creado correctamente en WebStorage.`,
      "success"
    );
  } catch (error) {
    mostrarAlerta(mensajeUsuario, error.message, "danger");
  }
}

function gestionarBorradoUsuario(email) {
  try {
    eliminarUsuario(email);
    pintarTablaUsuarios();
    pintarUsuarioEnNavbar();
    mostrarAlerta(mensajeUsuario, "Usuario eliminado correctamente.", "success");
  } catch (error) {
    mostrarAlerta(mensajeUsuario, error.message, "danger");
  }
}

window.addEventListener("DOMContentLoaded", inicializarPaginaUsuarios);
