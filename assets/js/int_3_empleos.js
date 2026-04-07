import {
  crearPublicacion,
  eliminarPublicacion,
  inicializarAlmacenamiento,
  listarPublicaciones,
  obtenerUsuarioActivo
} from "./almacenaje.js";
import { capitalizarTexto, configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

const formPublicacion = document.getElementById("form-publicacion");
const tipoPublicacion = document.getElementById("tipo-publicacion");
const tituloPublicacion = document.getElementById("titulo-publicacion");
const categoriaPublicacion = document.getElementById("categoria-publicacion");
const autorPublicacion = document.getElementById("autor-publicacion");
const ubicacionPublicacion = document.getElementById("ubicacion-publicacion");
const fechaPublicacion = document.getElementById("fecha-publicacion");
const descripcionPublicacion = document.getElementById("descripcion-publicacion");
const emailPublicacion = document.getElementById("email-publicacion");
const tablaPublicacionesBody = document.getElementById("tabla-publicaciones-body");
const mensajePublicacion = document.getElementById("mensaje-publicacion");
const canvasGrafico = document.getElementById("grafico-publicaciones");

async function inicializarPaginaPublicaciones() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  completarDatosSugeridos();
  await pintarTablaPublicaciones();
  await pintarGraficoCanvas();

  formPublicacion.addEventListener("submit", gestionarAltaPublicacion);
}

function completarDatosSugeridos() {
  fechaPublicacion.value = new Date().toISOString().split("T")[0];

  const usuarioActivo = obtenerUsuarioActivo();
  if (usuarioActivo) {
    autorPublicacion.value = `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
    emailPublicacion.value = usuarioActivo.email;
  }
}

function obtenerDatosFormulario() {
  return {
    tipo: tipoPublicacion.value,
    titulo: tituloPublicacion.value,
    categoria: categoriaPublicacion.value,
    autor: autorPublicacion.value,
    ubicacion: ubicacionPublicacion.value,
    fecha: fechaPublicacion.value,
    descripcion: descripcionPublicacion.value,
    emailContacto: emailPublicacion.value
  };
}

async function pintarTablaPublicaciones() {
  const publicaciones = await listarPublicaciones();

  if (publicaciones.length === 0) {
    tablaPublicacionesBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted">No hay ofertas o demandas registradas.</td>
      </tr>
    `;
    return;
  }

  tablaPublicacionesBody.innerHTML = "";

  publicaciones.forEach((publicacion) => {
    const fila = document.createElement("tr");
    const badgeClase = publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";

    fila.innerHTML = `
      <td>${publicacion.id}</td>
      <td><span class="badge ${badgeClase}">${capitalizarTexto(publicacion.tipo)}</span></td>
      <td>${publicacion.titulo}</td>
      <td>${publicacion.fecha}</td>
      <td>${publicacion.emailContacto}</td>
      <td>${publicacion.descripcion}</td>
      <td>${publicacion.ubicacion}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-id="${publicacion.id}">Eliminar</button>
      </td>
    `;

    const botonEliminar = fila.querySelector("button");
    botonEliminar.addEventListener("click", async () => {
      await gestionarBorradoPublicacion(publicacion.id);
    });

    tablaPublicacionesBody.appendChild(fila);
  });
}

async function gestionarAltaPublicacion(evento) {
  evento.preventDefault();

  try {
    await crearPublicacion(obtenerDatosFormulario());
    await pintarTablaPublicaciones();
    await pintarGraficoCanvas();
    formPublicacion.reset();
    completarDatosSugeridos();

    mostrarAlerta(
      mensajePublicacion,
      "Publicación guardada correctamente en IndexedDB.",
      "success"
    );
  } catch (error) {
    mostrarAlerta(mensajePublicacion, error.message, "danger");
  }
}

async function gestionarBorradoPublicacion(idPublicacion) {
  try {
    await eliminarPublicacion(idPublicacion);
    await pintarTablaPublicaciones();
    await pintarGraficoCanvas();
    mostrarAlerta(mensajePublicacion, "Publicación eliminada correctamente.", "success");
  } catch (error) {
    mostrarAlerta(mensajePublicacion, error.message, "danger");
  }
}

async function pintarGraficoCanvas() {
  if (!canvasGrafico || !canvasGrafico.getContext) {
    return;
  }

  const publicaciones = await listarPublicaciones();
  const totalOfertas = publicaciones.filter((publicacion) => publicacion.tipo === "oferta").length;
  const totalDemandas = publicaciones.filter((publicacion) => publicacion.tipo === "demanda").length;

  const ctx = canvasGrafico.getContext("2d");
  const ancho = canvasGrafico.width;
  const alto = canvasGrafico.height;

  ctx.clearRect(0, 0, ancho, alto);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ancho, alto);

  ctx.font = "bold 18px Arial";
  ctx.fillStyle = "#212529";
  ctx.fillText("Gráfico de ofertas y demandas", 20, 30);

  const maximo = Math.max(totalOfertas, totalDemandas, 1);
  const baseY = alto - 40;
  const alturaMaxima = 160;
  const anchoBarra = 120;
  const separacion = 80;
  const xOferta = 50;
  const xDemanda = xOferta + anchoBarra + separacion;

  const alturaOferta = (totalOfertas / maximo) * alturaMaxima;
  const alturaDemanda = (totalDemandas / maximo) * alturaMaxima;

  ctx.strokeStyle = "#adb5bd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, baseY);
  ctx.lineTo(ancho - 20, baseY);
  ctx.stroke();

  ctx.fillStyle = "#0d6efd";
  ctx.fillRect(xOferta, baseY - alturaOferta, anchoBarra, alturaOferta);

  ctx.fillStyle = "#198754";
  ctx.fillRect(xDemanda, baseY - alturaDemanda, anchoBarra, alturaDemanda);

  ctx.font = "16px Arial";
  ctx.fillStyle = "#212529";
  ctx.fillText(`Ofertas: ${totalOfertas}`, xOferta, baseY + 25);
  ctx.fillText(`Demandas: ${totalDemandas}`, xDemanda, baseY + 25);

  ctx.font = "bold 18px Arial";
  ctx.fillText(String(totalOfertas), xOferta + 35, baseY - alturaOferta - 10);
  ctx.fillText(String(totalDemandas), xDemanda + 35, baseY - alturaDemanda - 10);
}

window.addEventListener("DOMContentLoaded", inicializarPaginaPublicaciones);
