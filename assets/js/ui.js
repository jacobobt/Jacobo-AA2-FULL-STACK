import { cerrarSesion, obtenerUsuarioActivo } from "./almacenaje.js";

/*
  Esta función devuelve un texto simple con el nombre del usuario activo.

  Si no hay ningún usuario logueado, devuelve "-no login-".
  Si sí hay usuario activo, devuelve "Nombre Apellidos".

  Sirve como función auxiliar para mostrar fácilmente el usuario actual.
*/
export function obtenerTextoUsuarioActivo() {
  const usuarioActivo = obtenerUsuarioActivo();

  /*
    Si no hay usuario activo, devolvemos un texto por defecto.
  */
  if (!usuarioActivo) {
    return "-no login-";
  }

  /*
    Si sí hay usuario activo, devolvemos su nombre completo.
  */
  return `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
}

/*
  Esta función pinta en la navbar el usuario activo.

  Hace estas tareas:
  1. busca el elemento HTML donde debe mostrarse el usuario
  2. busca el botón de cerrar sesión
  3. si no hay usuario activo, muestra "-no login-" y oculta el botón
  4. si sí hay usuario activo, muestra su nombre y enseña el botón
*/
export function pintarUsuarioEnNavbar() {
  /*
    Aquí se intenta buscar primero un elemento con id "usuarioActivo".
    Si no existe, intenta buscar otro con id "usuario-logueado-nav".

    El operador || significa:
    "usa el primero si existe; si no, usa el segundo".
  */
  const elementoUsuario = document.getElementById("usuarioActivo")
    || document.getElementById("usuario-logueado-nav");

  /*
    Buscamos también el botón de cerrar sesión.
  */
  const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

  /*
    Si no existe ningún elemento donde pintar el usuario,
    no podemos hacer nada, así que salimos.
  */
  if (!elementoUsuario) {
    return;
  }

  /*
    Obtenemos el usuario activo desde almacenaje.js
  */
  const usuarioActivo = obtenerUsuarioActivo();

  /*
    Si no hay usuario activo:
    - mostramos texto indicando que no hay login
    - ocultamos el botón de cerrar sesión si existe
  */
  if (!usuarioActivo) {
    elementoUsuario.textContent = "Usuario activo: -no login-";

    if (botonCerrarSesion) {
      /*
        d-none es una clase de Bootstrap que oculta el elemento.
      */
      botonCerrarSesion.classList.add("d-none");
    }

    return;
  }

  /*
    Si sí hay usuario activo:
    - mostramos su nombre en la navbar
    - enseñamos el botón de cerrar sesión si existe
  */
  elementoUsuario.textContent = `Usuario activo: ${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;

  if (botonCerrarSesion) {
    botonCerrarSesion.classList.remove("d-none");
  }
}

/*
  Esta función configura el botón de cerrar sesión.

  Hace esto:
  1. busca el botón en el HTML
  2. si existe, le añade un evento click
  3. al pulsarlo:
     - cierra la sesión
     - redirige a login.html
*/
export function configurarBotonCerrarSesion() {
  const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

  /*
    Si el botón no existe en esta página, salimos sin hacer nada.
  */
  if (!botonCerrarSesion) {
    return;
  }

  /*
    Cuando el usuario pulse el botón:
    - se borra el usuario activo de localStorage
    - se redirige a la página de login
  */
  botonCerrarSesion.addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "login.html";
  });
}

/*
  Esta función muestra una alerta Bootstrap dentro de un elemento HTML.

  Parámetros:
  - elemento: el contenedor donde se pondrá la alerta
  - texto: el mensaje que queremos enseñar
  - tipo: el tipo de alerta Bootstrap (success, danger, warning, secondary, etc.)

  Si no se pasa tipo, por defecto usa "secondary".
*/
export function mostrarAlerta(elemento, texto, tipo = "secondary") {
  /*
    Si no existe el elemento donde mostrar la alerta,
    no hacemos nada.
  */
  if (!elemento) {
    return;
  }

  /*
    Insertamos HTML dentro del elemento.
    Se genera un div con clases Bootstrap de alerta.
  */
  elemento.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

/*
  Esta función limpia la alerta de un elemento.

  Lo que hace es vaciar su contenido HTML.
*/
export function limpiarAlerta(elemento) {
  /*
    Si no existe el elemento, salimos.
  */
  if (!elemento) {
    return;
  }

  /*
    Dejamos el contenido vacío.
  */
  elemento.innerHTML = "";
}

/*
  Esta función devuelve una clase CSS para el badge del rol.

  Si el rol es "empresa", devuelve una clase concreta.
  Si no, devuelve la de candidato.

  Esto permite que los roles se vean con estilos visuales diferentes.
*/
export function obtenerClaseBadgeRol(rol) {
  return rol === "empresa" ? "badge-rol-empresa" : "badge-rol-candidato";
}

/*
  Esta función pone en mayúscula la primera letra de un texto.

  Ejemplo:
  "empresa" -> "Empresa"
  "candidato" -> "Candidato"

  También protege por si el texto viene vacío, null o undefined.
*/
export function capitalizarTexto(texto) {
  /*
    Convertimos cualquier valor a string.
    Si texto es null o undefined, usamos "".
  */
  const textoNormal = String(texto || "");

  /*
    Si después de normalizar está vacío,
    devolvemos string vacío.
  */
  if (!textoNormal) {
    return "";
  }

  /*
    charAt(0) toma el primer carácter
    toUpperCase() lo pone en mayúscula
    slice(1) toma el resto del texto desde la posición 1

    Luego se unen ambas partes.
  */
  return textoNormal.charAt(0).toUpperCase() + textoNormal.slice(1);
}