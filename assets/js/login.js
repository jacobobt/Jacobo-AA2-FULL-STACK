// assets/js/login.js

import {
  inicializarDatos,
  obtenerTodos,
  STORE_USUARIOS
} from "./almacenamiento.js";

document.addEventListener("DOMContentLoaded", async () => {
  await inicializarLogin();
});

async function inicializarLogin() {
  try {
    await inicializarDatos();
    mostrarUsuarioActivo();
    configurarBotonCerrarSesion();
    configurarFormularioLogin();
  } catch (error) {
    console.error("Error al inicializar la página de login:", error);
    mostrarMensaje("Se produjo un error al cargar la página de login.", "danger");
  }
}

function configurarFormularioLogin() {
  const formLogin = document.getElementById("form-login");

  if (!formLogin) {
    console.warn("No se encontró el formulario con id 'form-login'.");
    return;
  }

  formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    await gestionarLogin();
  });
}

async function gestionarLogin() {
  const emailLogin = document.getElementById("email-login");
  const passwordLogin = document.getElementById("password-login");
  const formLogin = document.getElementById("form-login");

  const email = emailLogin.value.trim().toLowerCase();
  const password = passwordLogin.value.trim();

  if (!email || !password) {
    mostrarMensaje("Debes completar el correo y la contraseña.", "warning");
    return;
  }

  try {
    const usuarios = await obtenerTodos(STORE_USUARIOS);

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email.toLowerCase() === email &&
        usuario.password === password
    );

    if (!usuarioEncontrado) {
      mostrarMensaje(
        "Credenciales incorrectas. Revisa el correo y la contraseña.",
        "danger"
      );
      return;
    }

    const usuarioParaGuardar = {
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      apellidos: usuarioEncontrado.apellidos,
      email: usuarioEncontrado.email,
      rol: usuarioEncontrado.rol
    };

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioParaGuardar));

    mostrarUsuarioActivo();
    mostrarMensaje(
      `Login correcto. Bienvenido/a, ${usuarioEncontrado.nombre}.`,
      "success"
    );

    formLogin.reset();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    mostrarMensaje("No se pudo iniciar sesión.", "danger");
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

function configurarBotonCerrarSesion() {
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

function mostrarMensaje(texto, tipo = "info") {
  const mensajeLogin = document.getElementById("mensaje-login");

  if (!mensajeLogin) {
    return;
  }

  mensajeLogin.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}