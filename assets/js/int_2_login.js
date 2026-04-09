import { inicializarAlmacenamiento, loguearUsuario, obtenerUsuarioActivo } from "./almacenaje.js";
import { configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

/*
  Referencias a los elementos HTML de la página de login.

  Estos elementos se usan para:
  - leer el email y la contraseña escritos por el usuario
  - detectar el envío del formulario
  - mostrar mensajes de éxito o error
  - enseñar en la propia página qué usuario está activo
*/
const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email-login");
const inputPassword = document.getElementById("password-login");
const mensajeLogin = document.getElementById("mensaje-login");
const usuarioActivoPagina = document.getElementById("usuario-activo-pagina");

/*
  Tiempo de espera antes de redirigir al dashboard
  cuando el login ha sido correcto.
*/
const TIEMPO_REDIRECCION_LOGIN = 1200;

/*
  Tiempo de espera antes de redirigir al dashboard
  si el usuario ya tenía una sesión activa al entrar en login.
*/
const TIEMPO_REDIRECCION_SESION_ACTIVA = 1500;

/*
  Función principal de arranque de la página login.

  Flujo:
  1. inicializa el almacenamiento por si es la primera carga
  2. pinta el usuario activo en la navbar
  3. configura el botón de cerrar sesión
  4. muestra en esta página el usuario activo actual
  5. si ya hay sesión activa, redirige al dashboard
  6. si no la hay, conecta el formulario con la función que gestiona el login
*/
async function inicializarPaginaLogin() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  mostrarUsuarioActivoEnPagina();

  /*
    Mejora funcional:
    si el usuario ya estaba logueado antes de entrar en login,
    no tiene sentido volver a iniciar sesión.
  */
  const usuarioActivo = obtenerUsuarioActivo();

  if (usuarioActivo) {
    desactivarFormularioLogin();

    mostrarAlerta(
      mensajeLogin,
      `Ya hay una sesión activa con ${usuarioActivo.nombre}. Redirigiendo al dashboard...`,
      "info",
      TIEMPO_REDIRECCION_SESION_ACTIVA
    );

    window.setTimeout(redirigirAlDashboard, TIEMPO_REDIRECCION_SESION_ACTIVA);
    return;
  }

  /*
    Si no hay sesión activa, permitimos usar el formulario normalmente.
  */
  formLogin.addEventListener("submit", gestionarLogin);
}

/*
  Desactiva temporalmente el formulario de login.

  Esto se usa cuando ya existe una sesión activa para evitar
  que el usuario interactúe con el formulario antes de ser redirigido.
*/
function desactivarFormularioLogin() {
  inputEmail.disabled = true;
  inputPassword.disabled = true;

  const botonSubmit = formLogin.querySelector('button[type="submit"]');
  if (botonSubmit) {
    botonSubmit.disabled = true;
  }
}

/*
  Muestra dentro de la página si hay un usuario activo o no.

  Usa obtenerUsuarioActivo(), que consulta localStorage
  y devuelve el usuario actualmente logueado.
*/
function mostrarUsuarioActivoEnPagina() {
  const usuarioActivo = obtenerUsuarioActivo();

  /*
    Si no hay nadie logueado, mostramos un mensaje informativo.
  */
  if (!usuarioActivo) {
    usuarioActivoPagina.textContent = "Ahora mismo no hay ningún usuario logueado.";
    return;
  }

  /*
    Si sí hay usuario activo, mostramos su nombre completo y su email.
  */
  usuarioActivoPagina.textContent = `Ahora mismo está logueado ${usuarioActivo.nombre} ${usuarioActivo.apellidos} (${usuarioActivo.email}).`;
}

/*
  Valida y normaliza los datos introducidos en el formulario.

  Hace dos cosas:
  1. limpia espacios sobrantes
  2. comprueba que email y contraseña no estén vacíos

  Si falta algún dato, lanza un error.
  Si todo está correcto, devuelve un objeto con email y password.
*/
function validarFormulario() {
  /*
    trim() elimina espacios al principio y al final.
    toLowerCase() convierte el email a minúsculas para evitar
    errores por mayúsculas al comparar credenciales.
  */
  const email = inputEmail.value.trim().toLowerCase();
  const password = inputPassword.value.trim();

  /*
    Si alguno de los dos campos está vacío, detenemos el proceso.
  */
  if (!email || !password) {
    throw new Error("Debes completar el correo y la contraseña.");
  }

  /*
    Devolvemos los datos ya limpios para usarlos en el login.
  */
  return { email, password };
}

/*
  Redirige al usuario al dashboard principal.
*/
function redirigirAlDashboard() {
  window.location.href = "index.html";
}

/*
  Gestiona el envío del formulario de login.
*/
async function gestionarLogin(evento) {
  /*
    Evitamos que el formulario recargue la página al enviarse.
  */
  evento.preventDefault();

  try {
    /*
      Primero validamos y obtenemos los datos del formulario.
    */
    const { email, password } = validarFormulario();

    /*
      Intentamos iniciar sesión con esas credenciales.
      Si son correctas, loguearUsuario() guarda además
      el usuario activo en localStorage.
    */
    const usuario = loguearUsuario(email, password);

    /*
      Después de un login correcto:
      - actualizamos la navbar
      - actualizamos el texto de usuario activo en esta página
      - mostramos una alerta de éxito
    */
    pintarUsuarioEnNavbar();
    mostrarUsuarioActivoEnPagina();
    mostrarAlerta(
      mensajeLogin,
      `Inicio de sesión correcto. Bienvenido/a, ${usuario.nombre}. Redirigiendo al dashboard...`,
      "success",
      TIEMPO_REDIRECCION_LOGIN
    );

    /*
      Limpiamos el formulario para dejarlo vacío.
    */
    formLogin.reset();

    /*
      Tras un login correcto, redirigimos automáticamente
      al usuario al dashboard principal.
    */
    window.setTimeout(redirigirAlDashboard, TIEMPO_REDIRECCION_LOGIN);
  } catch (error) {
    /*
      Si ocurre cualquier error, por ejemplo:
      - campos vacíos
      - credenciales incorrectas

      mostramos el mensaje en la zona de alertas.
    */
    mostrarAlerta(mensajeLogin, error.message, "danger");
  }
}

/*
  Cuando el DOM está completamente cargado,
  arrancamos toda la lógica de la página de login.
*/
window.addEventListener("DOMContentLoaded", inicializarPaginaLogin);