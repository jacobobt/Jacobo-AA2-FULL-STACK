import { inicializarAlmacenamiento, loguearUsuario, obtenerUsuarioActivo } from "./almacenaje.js";
import { configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

/*
  Aquí guardamos referencias a elementos del HTML de la página login.

  Los vamos a usar para:
  - leer el correo y la contraseña
  - escuchar el envío del formulario
  - mostrar mensajes
  - mostrar qué usuario está activo en esta página
*/
const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email-login");
const inputPassword = document.getElementById("password-login");
const mensajeLogin = document.getElementById("mensaje-login");
const usuarioActivoPagina = document.getElementById("usuario-activo-pagina");

/*
  Esta es la función principal de arranque de la página login.

  Hace estas tareas:
  1. inicializa el almacenamiento por si aún no existen datos iniciales
  2. pinta el usuario activo en la navbar
  3. configura el botón de cerrar sesión
  4. muestra en la propia página qué usuario está logueado
  5. conecta el formulario con la función que hará el login
*/
async function inicializarPaginaLogin() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  mostrarUsuarioActivoEnPagina();

  /*
    Cuando el usuario envíe el formulario,
    se ejecutará gestionarLogin.
  */
  formLogin.addEventListener("submit", gestionarLogin);
}

/*
  Esta función muestra en la página si hay un usuario activo o no.

  Usa obtenerUsuarioActivo(), que mira en localStorage
  cuál es el usuario actualmente logueado.
*/
function mostrarUsuarioActivoEnPagina() {
  const usuarioActivo = obtenerUsuarioActivo();

  /*
    Si no hay usuario activo, mostramos un mensaje informativo
    diciendo que no hay nadie logueado.
  */
  if (!usuarioActivo) {
    usuarioActivoPagina.textContent = "Ahora mismo no hay ningún usuario logueado.";
    return;
  }

  /*
    Si sí hay usuario activo, mostramos su nombre, apellidos y email.
  */
  usuarioActivoPagina.textContent = `Ahora mismo está logueado ${usuarioActivo.nombre} ${usuarioActivo.apellidos} (${usuarioActivo.email}).`;
}

/*
  Esta función valida los datos escritos en el formulario.

  Hace dos cosas:
  1. limpia espacios sobrantes
  2. comprueba que email y contraseña no estén vacíos

  Si falta algo, lanza un error.
  Si todo está bien, devuelve un objeto con email y password.
*/
function validarFormulario() {
  /*
    trim() quita espacios al principio y al final.
    toLowerCase() pone el email en minúsculas.
    Esto ayuda a evitar errores por mayúsculas o espacios.
  */
  const email = inputEmail.value.trim().toLowerCase();
  const password = inputPassword.value.trim();

  /*
    Si falta email o contraseña, se lanza un error.
    Ese error luego lo capturará gestionarLogin().
  */
  if (!email || !password) {
    throw new Error("Debes completar el correo y la contraseña.");
  }

  /*
    Devolvemos un objeto con los datos ya validados y limpios.
  */
  return { email, password };
}

/*
  Esta función se ejecuta cuando el usuario envía el formulario login.
*/
async function gestionarLogin(evento) {
  /*
    Evita el comportamiento por defecto del formulario,
    que sería recargar la página.
  */
  evento.preventDefault();

  try {
    /*
      Primero validamos el formulario y extraemos email y password.
    */
    const { email, password } = validarFormulario();

    /*
      Intentamos loguear al usuario.
      loguearUsuario(...) comprobará si las credenciales son correctas
      y guardará el usuario activo en localStorage.
    */
    const usuario = loguearUsuario(email, password);

    /*
      Después de un login correcto:
      - actualizamos la navbar
      - actualizamos el texto de usuario activo en la página
      - mostramos una alerta de éxito
    */
    pintarUsuarioEnNavbar();
    mostrarUsuarioActivoEnPagina();
    mostrarAlerta(mensajeLogin, `Inicio de sesión correcto. Bienvenido/a, ${usuario.nombre}.`, "success");

    /*
      Limpiamos el formulario.
    */
    formLogin.reset();
  } catch (error) {
    /*
      Si ocurre cualquier error:
      - campos vacíos
      - credenciales incorrectas
      - etc.

      mostramos el mensaje en la zona de alertas.
    */
    mostrarAlerta(mensajeLogin, error.message, "danger");
  }
}

/*
  Cuando el DOM ya está cargado,
  arrancamos toda la lógica de la página login.
*/
window.addEventListener("DOMContentLoaded", inicializarPaginaLogin);