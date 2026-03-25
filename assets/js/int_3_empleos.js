import {
  inicializarPublicaciones,
  obtenerPublicaciones,
  registrarPublicacion,
  eliminarPublicacionPorId
} from "./almacenaje.js";
import { pintarUsuarioEnNavbar, configurarBotonCerrarSesion } from "./ui.js";

const formPublicacion = document.getElementById("form-publicacion");
const tipoPublicacion = document.getElementById("tipo-publicacion");
const tituloPublicacion = document.getElementById("titulo-publicacion");
const categoriaPublicacion = document.getElementById("categoria-publicacion");
const autorPublicacion = document.getElementById("autor-publicacion");
const ubicacionPublicacion = document.getElementById("ubicacion-publicacion");
const descripcionPublicacion = document.getElementById("descripcion-publicacion");
const emailPublicacion = document.getElementById("email-publicacion");
const fechaPublicacion = document.getElementById("fecha-publicacion");

const tablaPublicacionesBody = document.getElementById("tabla-publicaciones-body");
const mensajePublicacion = document.getElementById("mensaje-publicacion");

const canvasGrafico = document.getElementById("grafico-publicaciones");
const contextoGrafico = canvasGrafico ? canvasGrafico.getContext("2d") : null;

function dibujarGraficoPublicaciones(publicaciones) {
  if (!canvasGrafico || !contextoGrafico) return;

  const totalOfertas = publicaciones.filter(
    (publicacion) => publicacion.tipo === "oferta"
  ).length;

  const totalDemandas = publicaciones.filter(
    (publicacion) => publicacion.tipo === "demanda"
  ).length;

  const ancho = canvasGrafico.width;
  const alto = canvasGrafico.height;

  contextoGrafico.clearRect(0, 0, ancho, alto);

  contextoGrafico.fillStyle = "#ffffff";
  contextoGrafico.fillRect(0, 0, ancho, alto);

  contextoGrafico.fillStyle = "#212529";
  contextoGrafico.font = "18px Arial";
  contextoGrafico.fillText("Resumen de publicaciones", 20, 30);

  const baseY = 240;
  const anchoBarra = 120;
  const separacion = 100;
  const xOferta = 80;
  const xDemanda = xOferta + anchoBarra + separacion;

  const valorMaximo = Math.max(totalOfertas, totalDemandas, 1);
  const alturaMaxima = 140;

  const alturaOferta = (totalOfertas / valorMaximo) * alturaMaxima;
  const alturaDemanda = (totalDemandas / valorMaximo) * alturaMaxima;

  contextoGrafico.fillStyle = "#0d6efd";
  contextoGrafico.fillRect(
    xOferta,
    baseY - alturaOferta,
    anchoBarra,
    alturaOferta
  );

  contextoGrafico.fillStyle = "#198754";
  contextoGrafico.fillRect(
    xDemanda,
    baseY - alturaDemanda,
    anchoBarra,
    alturaDemanda
  );

  contextoGrafico.fillStyle = "#212529";
  contextoGrafico.font = "16px Arial";
  contextoGrafico.fillText(`Ofertas: ${totalOfertas}`, xOferta, 270);
  contextoGrafico.fillText(`Demandas: ${totalDemandas}`, xDemanda, 270);
}

async function prepararPaginaPublicaciones() {
  await inicializarPublicaciones();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  await pintarTablaPublicaciones();
  formPublicacion.addEventListener("submit", gestionarAltaPublicacion);
}

async function pintarTablaPublicaciones() {
  const publicaciones = await obtenerPublicaciones();
  dibujarGraficoPublicaciones(publicaciones);

  if (publicaciones.length === 0) {
    tablaPublicacionesBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">
          No hay publicaciones registradas.
        </td>
      </tr>
    `;
    return;
  }

  tablaPublicacionesBody.innerHTML = "";

  publicaciones.forEach((publicacion) => {
    const fila = document.createElement("tr");

    const badgeTipo =
      publicacion.tipo === "oferta"
        ? '<span class="badge text-bg-primary">Oferta</span>'
        : '<span class="badge text-bg-success">Demanda</span>';

    fila.innerHTML = `
      <td class="columna-id">${publicacion.id}</td>
      <td class="columna-tipo">${badgeTipo}</td>
      <td class="columna-detalle">
        <div class="detalle-publicacion">
          <div class="detalle-titulo">${publicacion.titulo}</div>
          <div class="detalle-meta">
            <span><strong>Categoría:</strong> ${publicacion.categoria}</span>
          </div>
          <div class="detalle-meta">
            <span><strong>Ubicación:</strong> ${publicacion.ubicacion}</span>
          </div>
        </div>
      </td>
      <td class="columna-fecha">${publicacion.fecha}</td>
      <td class="columna-email">${publicacion.emailContacto}</td>
      <td class="columna-acciones">
        <button class="btn btn-sm btn-danger" data-id="${publicacion.id}">
          Eliminar
        </button>
      </td>
    `;

    const botonEliminar = fila.querySelector("button");
    botonEliminar.addEventListener("click", async () => {
      await eliminarPublicacion(publicacion.id);
    });

    tablaPublicacionesBody.appendChild(fila);
  });
}

async function gestionarAltaPublicacion(evento) {
  evento.preventDefault();

  const tipo = tipoPublicacion.value;
  const titulo = tituloPublicacion.value.trim();
  const categoria = categoriaPublicacion.value.trim();
  const autor = autorPublicacion.value.trim();
  const ubicacion = ubicacionPublicacion.value.trim();
  const descripcion = descripcionPublicacion.value.trim();
  const emailContacto = emailPublicacion.value.trim().toLowerCase();
  const fecha = fechaPublicacion.value;

  if (
    !tipo ||
    !titulo ||
    !categoria ||
    !autor ||
    !ubicacion ||
    !descripcion ||
    !emailContacto ||
    !fecha
  ) {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }

  try {
    const resultado = await registrarPublicacion({
      tipo,
      titulo,
      categoria,
      autor,
      ubicacion,
      descripcion,
      emailContacto,
      fecha
    });

    if (!resultado.ok) {
      mostrarMensaje("No se pudo guardar la publicación.", "danger");
      return;
    }

    await pintarTablaPublicaciones();
    mostrarMensaje("Publicación guardada correctamente.", "success");
    formPublicacion.reset();
  } catch (error) {
    mostrarMensaje("Ha ocurrido un error al guardar la publicación.", "danger");
  }
}

async function eliminarPublicacion(idPublicacion) {
  try {
    await eliminarPublicacionPorId(idPublicacion);
    await pintarTablaPublicaciones();
    mostrarMensaje("Publicación eliminada correctamente.", "success");
  } catch (error) {
    mostrarMensaje("Ha ocurrido un error al eliminar la publicación.", "danger");
  }
}

function mostrarMensaje(texto, tipo) {
  mensajePublicacion.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

prepararPaginaPublicaciones();