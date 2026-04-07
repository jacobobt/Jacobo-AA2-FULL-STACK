import { cerrarSesion, obtenerUsuarioActivo } from "./almacenaje.js";

export function obtenerTextoUsuarioActivo() {
  const usuarioActivo = obtenerUsuarioActivo();

  if (!usuarioActivo) {
    return "-no login-";
  }

  return `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
}

export function pintarUsuarioEnNavbar() {
  const elementoUsuario = document.getElementById("usuarioActivo")
    || document.getElementById("usuario-logueado-nav");
  const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

  if (!elementoUsuario) {
    return;
  }

  const usuarioActivo = obtenerUsuarioActivo();

  if (!usuarioActivo) {
    elementoUsuario.textContent = "Usuario activo: -no login-";

    if (botonCerrarSesion) {
      botonCerrarSesion.classList.add("d-none");
    }

    return;
  }

  elementoUsuario.textContent = `Usuario activo: ${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;

  if (botonCerrarSesion) {
    botonCerrarSesion.classList.remove("d-none");
  }
}

export function configurarBotonCerrarSesion() {
  const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

  if (!botonCerrarSesion) {
    return;
  }

  botonCerrarSesion.addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "login.html";
  });
}

export function mostrarAlerta(elemento, texto, tipo = "secondary") {
  if (!elemento) {
    return;
  }

  elemento.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

export function limpiarAlerta(elemento) {
  if (!elemento) {
    return;
  }

  elemento.innerHTML = "";
}

export function obtenerClaseBadgeRol(rol) {
  return rol === "empresa" ? "badge-rol-empresa" : "badge-rol-candidato";
}

export function capitalizarTexto(texto) {
  const textoNormal = String(texto || "");

  if (!textoNormal) {
    return "";
  }

  return textoNormal.charAt(0).toUpperCase() + textoNormal.slice(1);
}
