// ====== Utilidades de interfaz (UI) comunes ======

export function obtenerUsuarioLogueado() {
  const usuarioGuardado = localStorage.getItem("usuarioLogueado");

  if (!usuarioGuardado) return null;

  try {
    return JSON.parse(usuarioGuardado);
  } catch (error) {
    return null;
  }
}

export function pintarUsuarioEnNavbar() {
  const elementoUsuarioNav = document.getElementById("usuario-logueado-nav");
  const botonLogout = document.getElementById("btn-cerrar-sesion");

  if (!elementoUsuarioNav) return;

  const usuario = obtenerUsuarioLogueado();

  if (!usuario) {
    elementoUsuarioNav.textContent = "No has iniciado sesión";

    if (botonLogout) {
      botonLogout.classList.add("d-none");
    }

    return;
  }

  elementoUsuarioNav.textContent = `Sesión: ${usuario.email}`;

  if (botonLogout) {
    botonLogout.classList.remove("d-none");
  }
}

export function configurarBotonCerrarSesion() {
  const botonLogout = document.getElementById("btn-cerrar-sesion");

  if (!botonLogout) return;

  botonLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
  });
}