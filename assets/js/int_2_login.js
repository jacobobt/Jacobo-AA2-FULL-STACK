import { loguearUsuario, inicializarUsuarios } from "./almacenaje.js";
import { pintarUsuarioEnNavbar, configurarBotonCerrarSesion } from "./ui.js";

const formLogin = document.getElementById("form-login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");
const mensajeLogin = document.getElementById("mensaje-login");

function inicializarLogin() {
  inicializarUsuarios();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  formLogin.addEventListener("submit", gestionarLogin);
}

function gestionarLogin(evento) {
  evento.preventDefault();

  const email = emailLogin.value.trim();
  const password = passwordLogin.value.trim();

  if (!email || !password) {
    mostrarMensaje("Debes completar el correo y la contraseña.", "danger");
    return;
  }

  const usuarioActivo = loguearUsuario(email, password);

  if (!usuarioActivo) {
    mostrarMensaje(
      "Credenciales incorrectas. Revisa el correo y la contraseña.",
      "danger"
    );
    return;
  }

  pintarUsuarioEnNavbar();
  mostrarMensaje(`Login correcto. Bienvenido/a, ${usuarioActivo.nombre}.`, "success");
  formLogin.reset();
}

function mostrarMensaje(texto, tipo) {
  mensajeLogin.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

inicializarLogin();