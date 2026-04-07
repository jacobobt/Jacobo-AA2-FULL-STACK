import {
  anadirPublicacionSeleccionada,
  inicializarAlmacenamiento,
  listarPublicacionesDisponibles,
  listarPublicacionesSeleccionadas,
  obtenerResumenDashboard,
  quitarPublicacionSeleccionada
} from "./almacenaje.js";
import { capitalizarTexto, configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

const totalOfertasElemento = document.getElementById("total-ofertas");
const totalDemandasElemento = document.getElementById("total-demandas");
const totalUsuariosElemento = document.getElementById("total-usuarios");
const totalSeleccionadasElemento = document.getElementById("total-seleccionadas");
const contenedorDisponibles = document.getElementById("contenedor-publicaciones");
const contenedorSeleccionadas = document.getElementById("contenedor-seleccionadas");
const mensajeDashboard = document.getElementById("mensaje-dashboard");
const botonesFiltro = document.querySelectorAll("[data-filtro]");

let filtroActual = "todas";

async function inicializarDashboard() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  configurarFiltros();
  configurarZonasDrop();
  await repintarDashboard();
}

function configurarFiltros() {
  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", async () => {
      filtroActual = boton.dataset.filtro;
      actualizarEstadoVisualFiltros();
      await pintarTarjetas();
    });
  });
}

function actualizarEstadoVisualFiltros() {
  botonesFiltro.forEach((boton) => {
    if (boton.dataset.filtro === filtroActual) {
      boton.classList.remove("btn-outline-primary");
      boton.classList.add("btn-primary");
    } else {
      boton.classList.remove("btn-primary");
      boton.classList.add("btn-outline-primary");
    }
  });
}

function configurarZonasDrop() {
  [contenedorDisponibles, contenedorSeleccionadas].forEach((zona) => {
    zona.addEventListener("dragover", (evento) => {
      evento.preventDefault();
      zona.classList.add("drop-zone-activa");
    });

    zona.addEventListener("dragleave", () => {
      zona.classList.remove("drop-zone-activa");
    });
  });

  contenedorDisponibles.addEventListener("drop", async (evento) => {
    evento.preventDefault();
    contenedorDisponibles.classList.remove("drop-zone-activa");
    const id = evento.dataTransfer.getData("text/plain");

    try {
      await quitarPublicacionSeleccionada(id);
      await repintarDashboard();
      mostrarAlerta(mensajeDashboard, "Publicación devuelta al listado general.", "success");
    } catch (error) {
      mostrarAlerta(mensajeDashboard, error.message, "danger");
    }
  });

  contenedorSeleccionadas.addEventListener("drop", async (evento) => {
    evento.preventDefault();
    contenedorSeleccionadas.classList.remove("drop-zone-activa");
    const id = evento.dataTransfer.getData("text/plain");

    try {
      await anadirPublicacionSeleccionada(id);
      await repintarDashboard();
      mostrarAlerta(mensajeDashboard, "Publicación añadida a la selección del usuario.", "success");
    } catch (error) {
      mostrarAlerta(mensajeDashboard, error.message, "danger");
    }
  });
}

async function repintarDashboard() {
  await pintarResumen();
  await pintarTarjetas();
}

async function pintarResumen() {
  const resumen = await obtenerResumenDashboard();

  totalOfertasElemento.textContent = resumen.totalOfertas;
  totalDemandasElemento.textContent = resumen.totalDemandas;
  totalUsuariosElemento.textContent = resumen.totalUsuarios;
  totalSeleccionadasElemento.textContent = resumen.totalSeleccionadas;
}

async function pintarTarjetas() {
  const publicacionesDisponibles = await listarPublicacionesDisponibles();
  const publicacionesSeleccionadas = await listarPublicacionesSeleccionadas();

  const disponiblesFiltradas = publicacionesDisponibles.filter((publicacion) => {
    if (filtroActual === "todas") {
      return true;
    }

    return publicacion.tipo === filtroActual;
  });

  renderizarTarjetas(contenedorDisponibles, disponiblesFiltradas, "No hay publicaciones disponibles en este bloque.");
  renderizarTarjetas(contenedorSeleccionadas, publicacionesSeleccionadas, "Arrastra aquí las publicaciones que quieras guardar.");
}

function renderizarTarjetas(contenedor, publicaciones, textoVacio) {
  if (publicaciones.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary mb-0">${textoVacio}</div>
    `;
    return;
  }

  contenedor.innerHTML = "";

  publicaciones.forEach((publicacion) => {
    const columna = document.createElement("div");
    columna.className = "col-12";

    const badgeClase = publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";

    columna.innerHTML = `
      <article class="card card-publicacion h-100 tarjeta-arrastrable" draggable="true" data-id="${publicacion.id}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2 flex-wrap">
            <span class="badge ${badgeClase}">${capitalizarTexto(publicacion.tipo)}</span>
            <small class="text-muted">${publicacion.fecha}</small>
          </div>
          <h3 class="h5">${publicacion.titulo}</h3>
          <p class="mb-2"><strong>Categoría:</strong> ${publicacion.categoria}</p>
          <p class="mb-2"><strong>Autor:</strong> ${publicacion.autor}</p>
          <p class="mb-2"><strong>Ubicación:</strong> ${publicacion.ubicacion}</p>
          <p class="mb-2"><strong>Contacto:</strong> ${publicacion.emailContacto}</p>
          <p class="mb-0 text-muted">${publicacion.descripcion}</p>
        </div>
      </article>
    `;

    const tarjeta = columna.querySelector(".tarjeta-arrastrable");

    tarjeta.addEventListener("dragstart", (evento) => {
      evento.dataTransfer.setData("text/plain", String(publicacion.id));
      tarjeta.classList.add("tarjeta-dragging");
    });

    tarjeta.addEventListener("dragend", () => {
      tarjeta.classList.remove("tarjeta-dragging");
    });

    contenedor.appendChild(columna);
  });
}

window.addEventListener("DOMContentLoaded", inicializarDashboard);
