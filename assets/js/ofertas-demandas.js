// assets/js/ofertas-demandas.js

import {
  inicializarDatos,
  obtenerTodos,
  agregarElemento,
  eliminarElemento,
  obtenerSiguienteId,
  STORE_PUBLICACIONES
} from "./almacenamiento.js";

document.addEventListener("DOMContentLoaded", async () => {
  await inicializarPaginaPublicaciones();
});

async function inicializarPaginaPublicaciones() {
  try {
    await inicializarDatos();
    mostrarUsuarioActivo();
    configurarBotonCerrarSesion();
    configurarFormulario();
    configurarFiltro();
    await cargarPublicaciones();
  } catch (error) {
    console.error("Error al inicializar la página de publicaciones:", error);
    mostrarMensaje("Se produjo un error al cargar la página.", "danger");
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

function configurarFormulario() {
  const formulario = document.getElementById("form-publicacion");

  if (!formulario) {
    console.warn("No se encontró el formulario con id 'form-publicacion'.");
    return;
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    await crearPublicacionDesdeFormulario(formulario);
  });
}

function configurarFiltro() {
  const filtro = document.getElementById("filtro-tipo");

  if (!filtro) {
    return;
  }

  filtro.addEventListener("change", async () => {
    await cargarPublicaciones();
  });
}

async function crearPublicacionDesdeFormulario(formulario) {
  const tipo = document.getElementById("tipo-publicacion").value.trim();
  const titulo = document.getElementById("titulo-publicacion").value.trim();
  const categoria = document.getElementById("categoria-publicacion").value.trim();
  const autor = document.getElementById("autor-publicacion").value.trim();
  const ubicacion = document.getElementById("ubicacion-publicacion").value.trim();
  const emailContacto = document.getElementById("email-publicacion").value.trim();
  const fecha = document.getElementById("fecha-publicacion").value;
  const descripcion = document.getElementById("descripcion-publicacion").value.trim();

  if (!tipo || !titulo || !categoria || !autor || !ubicacion || !emailContacto || !fecha || !descripcion) {
    mostrarMensaje("Debes completar todos los campos de la publicación.", "warning");
    return;
  }

  try {
    const nuevaPublicacion = {
      id: await obtenerSiguienteId(STORE_PUBLICACIONES),
      tipo,
      titulo,
      categoria,
      autor,
      ubicacion,
      descripcion,
      emailContacto,
      fecha
    };

    await agregarElemento(STORE_PUBLICACIONES, nuevaPublicacion);

    mostrarMensaje("Publicación creada correctamente.", "success");
    formulario.reset();
    await cargarPublicaciones();
  } catch (error) {
    console.error("Error al crear publicación:", error);
    mostrarMensaje("No se pudo crear la publicación.", "danger");
  }
}

async function cargarPublicaciones() {
  try {
    const publicaciones = await obtenerTodos(STORE_PUBLICACIONES);
    const filtro = document.getElementById("filtro-tipo");
    const valorFiltro = filtro ? filtro.value : "todas";

    let publicacionesFiltradas = publicaciones;

    if (valorFiltro !== "todas") {
      publicacionesFiltradas = publicaciones.filter(
        (publicacion) => publicacion.tipo === valorFiltro
      );
    }

    renderizarPublicaciones(publicacionesFiltradas);
  } catch (error) {
    console.error("Error al cargar publicaciones:", error);
    mostrarMensaje("No se pudieron cargar las publicaciones.", "danger");
  }
}

function renderizarPublicaciones(publicaciones) {
  const contenedor = document.getElementById("contenedor-publicaciones");

  if (!contenedor) {
    console.warn("No se encontró el contenedor de publicaciones.");
    return;
  }

  contenedor.innerHTML = "";

  if (publicaciones.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-light border text-muted mb-0">
          No hay publicaciones registradas con ese filtro.
        </div>
      </div>
    `;
    return;
  }

  publicaciones.forEach((publicacion) => {
    const columna = document.createElement("div");
    columna.className = "col-12";

    columna.innerHTML = `
      <article class="card h-100 shadow-sm border-0">
        <div class="card-body">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2 mb-2">
            <div>
              <span class="badge ${publicacion.tipo === "oferta" ? "text-bg-primary" : "text-bg-success"} mb-2">
                ${capitalizarTexto(publicacion.tipo)}
              </span>
              <h3 class="h5 mb-1">${publicacion.titulo}</h3>
              <p class="text-muted mb-0">${publicacion.categoria}</p>
            </div>
            <button class="btn btn-danger btn-sm btn-eliminar-publicacion" data-id="${publicacion.id}">
              Eliminar
            </button>
          </div>

          <p class="mb-2"><strong>Autor:</strong> ${publicacion.autor}</p>
          <p class="mb-2"><strong>Ubicación:</strong> ${publicacion.ubicacion}</p>
          <p class="mb-2"><strong>Contacto:</strong> ${publicacion.emailContacto}</p>
          <p class="mb-2"><strong>Fecha:</strong> ${publicacion.fecha}</p>
          <p class="mb-0"><strong>Descripción:</strong> ${publicacion.descripcion}</p>
        </div>
      </article>
    `;

    const botonEliminar = columna.querySelector(".btn-eliminar-publicacion");
    botonEliminar.addEventListener("click", async () => {
      await borrarPublicacion(publicacion.id);
    });

    contenedor.appendChild(columna);
  });
}

async function borrarPublicacion(id) {
  const confirmar = confirm("¿Seguro que quieres eliminar esta publicación?");

  if (!confirmar) {
    return;
  }

  try {
    await eliminarElemento(STORE_PUBLICACIONES, id);
    mostrarMensaje("Publicación eliminada correctamente.", "success");
    await cargarPublicaciones();
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    mostrarMensaje("No se pudo eliminar la publicación.", "danger");
  }
}

function mostrarMensaje(texto, tipo = "info") {
  const contenedorMensaje = document.getElementById("mensaje-publicacion");

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