import { inicializarAlmacenamiento, loguearUsuario, obtenerUsuarioActivo } from "./almacenaje.js";
import { configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email-login");
const inputPassword = document.getElementById("password-login");
const mensajeLogin = document.getElementById("mensaje-login");
const usuarioActivoPagina = document.getElementById("usuario-activo-pagina");

async function inicializarPaginaLogin() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  mostrarUsuarioActivoEnPagina();

  formLogin.addEventListener("submit", gestionarLogin);
}

function mostrarUsuarioActivoEnPagina() {
  const usuarioActivo = obtenerUsuarioActivo();

  if (!usuarioActivo) {
    usuarioActivoPagina.textContent = "Ahora mismo no hay ningún usuario logueado.";
    return;
  }

  usuarioActivoPagina.textContent = `Ahora mismo está logueado ${usuarioActivo.nombre} ${usuarioActivo.apellidos} (${usuarioActivo.email}).`;
}

function validarFormulario() {
  const email = inputEmail.value.trim().toLowerCase();
  const password = inputPassword.value.trim();

  if (!email || !password) {
    throw new Error("Debes completar el correo y la contraseña.");
  }

  return { email, password };
}

async function gestionarLogin(evento) {
  evento.preventDefault();

  try {
    const { email, password } = validarFormulario();
    const usuario = loguearUsuario(email, password);

    pintarUsuarioEnNavbar();
    mostrarUsuarioActivoEnPagina();
    mostrarAlerta(mensajeLogin, `Inicio de sesión correcto. Bienvenido/a, ${usuario.nombre}.`, "success");

    formLogin.reset();
  } catch (error) {
    mostrarAlerta(mensajeLogin, error.message, "danger");
  }
}

window.addEventListener("DOMContentLoaded", inicializarPaginaLogin);
