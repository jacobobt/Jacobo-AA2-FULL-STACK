import {
  crearPublicacion,
  eliminarPublicacion,
  inicializarAlmacenamiento,
  listarPublicaciones,
  obtenerUsuarioActivo
} from "./almacenaje.js";
import { capitalizarTexto, configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

/*
  Aquí guardamos referencias a elementos del HTML.
*/
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

/*
  Temporizador para evitar redibujar demasiadas veces seguidas el gráfico
  cuando cambia el tamaño de la ventana.
*/
let resizeTimeoutId = null;

/*
  Esta función se ejecuta al cargar la página.
*/
async function inicializarPaginaPublicaciones() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  completarDatosSugeridos();
  await pintarTablaPublicaciones();
  await pintarGraficoCanvas();

  formPublicacion.addEventListener("submit", gestionarAltaPublicacion);

  window.addEventListener("resize", () => {
    if (resizeTimeoutId) {
      window.clearTimeout(resizeTimeoutId);
    }

    resizeTimeoutId = window.setTimeout(() => {
      pintarGraficoCanvas();
    }, 150);
  });
}

/*
  Esta función rellena automáticamente algunos campos del formulario.
*/
function completarDatosSugeridos() {
  fechaPublicacion.value = new Date().toISOString().split("T")[0];
  const usuarioActivo = obtenerUsuarioActivo();

  if (usuarioActivo) {
    autorPublicacion.value = `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
    emailPublicacion.value = usuarioActivo.email;
  }
}

/*
  Esta función recoge todos los datos escritos en el formulario.
*/
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

/*
  Esta función pinta la tabla HTML con todas las publicaciones.
*/
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
      await gestionarBorradoPublicacion(publicacion.id, publicacion.titulo);
    });

    tablaPublicacionesBody.appendChild(fila);
  });
}

/*
  Esta función se ejecuta cuando se envía el formulario.
*/
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

/*
  Esta función elimina una publicación por su id.
*/
async function gestionarBorradoPublicacion(idPublicacion, tituloPublicacion) {
  const confirmarBorrado = window.confirm(
    `¿Seguro que quieres eliminar la publicación "${tituloPublicacion}"?`
  );

  if (!confirmarBorrado) {
    mostrarAlerta(mensajePublicacion, "Eliminación cancelada por el usuario.", "secondary");
    return;
  }

  try {
    await eliminarPublicacion(idPublicacion);
    await pintarTablaPublicaciones();
    await pintarGraficoCanvas();

    mostrarAlerta(
      mensajePublicacion,
      `Publicación "${tituloPublicacion}" eliminada correctamente.`,
      "success"
    );
  } catch (error) {
    mostrarAlerta(mensajePublicacion, error.message, "danger");
  }
}

/*
  Ajusta el tamaño interno del canvas para que se vea nítido
  en cualquier resolución o densidad de píxeles.
*/
function prepararCanvasHD(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const anchoVisual = canvas.clientWidth || canvas.width || 760;
  const altoVisual = canvas.clientHeight || canvas.height || 420;

  canvas.width = Math.round(anchoVisual * dpr);
  canvas.height = Math.round(altoVisual * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  return {
    ctx,
    ancho: anchoVisual,
    alto: altoVisual
  };
}

/*
  Dibuja un rectángulo con esquinas redondeadas.
*/
function dibujarRectanguloRedondeado(ctx, x, y, ancho, alto, radio) {
  const radioSeguro = Math.min(radio, ancho / 2, alto / 2);

  ctx.beginPath();
  ctx.moveTo(x + radioSeguro, y);
  ctx.lineTo(x + ancho - radioSeguro, y);
  ctx.quadraticCurveTo(x + ancho, y, x + ancho, y + radioSeguro);
  ctx.lineTo(x + ancho, y + alto - radioSeguro);
  ctx.quadraticCurveTo(x + ancho, y + alto, x + ancho - radioSeguro, y + alto);
  ctx.lineTo(x + radioSeguro, y + alto);
  ctx.quadraticCurveTo(x, y + alto, x, y + alto - radioSeguro);
  ctx.lineTo(x, y + radioSeguro);
  ctx.quadraticCurveTo(x, y, x + radioSeguro, y);
  ctx.closePath();
}

/*
  Esta función dibuja un gráfico más completo y visualmente mejor resuelto.
*/
async function pintarGraficoCanvas() {
  if (!canvasGrafico || !canvasGrafico.getContext) {
    return;
  }

  const publicaciones = await listarPublicaciones();
  const totalOfertas = publicaciones.filter((publicacion) => publicacion.tipo === "oferta").length;
  const totalDemandas = publicaciones.filter((publicacion) => publicacion.tipo === "demanda").length;
  const totalPublicaciones = totalOfertas + totalDemandas;

  const { ctx, ancho, alto } = prepararCanvasHD(canvasGrafico);

  ctx.clearRect(0, 0, ancho, alto);

  /*
    Fondo general del gráfico con un degradado más tecnológico.
  */
  const fondo = ctx.createLinearGradient(0, 0, 0, alto);
  fondo.addColorStop(0, "#0e1b33");
  fondo.addColorStop(1, "#08111f");
  ctx.fillStyle = fondo;
  ctx.fillRect(0, 0, ancho, alto);

  /*
    Marco exterior.
  */
  ctx.strokeStyle = "rgba(108, 209, 255, 0.22)";
  ctx.lineWidth = 1;
  dibujarRectanguloRedondeado(ctx, 12, 12, ancho - 24, alto - 24, 18);
  ctx.stroke();

  /*
    Título y subtítulo internos del gráfico.
  */
  ctx.fillStyle = "#f6fbff";
  ctx.font = "700 20px Inter";
  ctx.fillText("Distribución actual de publicaciones", 28, 42);

  ctx.fillStyle = "#8ea6c8";
  ctx.font = "500 13px Inter";
  ctx.fillText(
    totalPublicaciones === 0
      ? "Todavía no hay publicaciones registradas en el sistema."
      : `Total registradas: ${totalPublicaciones} publicaciones activas en IndexedDB.`,
    28,
    64
  );

  const area = {
    izquierda: 72,
    derecha: ancho - 48,
    arriba: 96,
    abajo: alto - 66
  };

  const maximo = Math.max(totalOfertas, totalDemandas, 1);
  const pasos = 4;
  const alturaArea = area.abajo - area.arriba;

  /*
    Dibujamos líneas horizontales de referencia.
  */
  for (let i = 0; i <= pasos; i += 1) {
    const valor = Math.round((maximo / pasos) * i);
    const y = area.abajo - ((alturaArea / pasos) * i);

    ctx.strokeStyle = i === 0 ? "rgba(108, 209, 255, 0.28)" : "rgba(108, 209, 255, 0.12)";
    ctx.lineWidth = i === 0 ? 1.6 : 1;
    ctx.beginPath();
    ctx.moveTo(area.izquierda, y);
    ctx.lineTo(area.derecha, y);
    ctx.stroke();

    ctx.fillStyle = "#84a1c9";
    ctx.font = "500 12px Inter";
    ctx.textAlign = "right";
    ctx.fillText(String(valor), area.izquierda - 12, y + 4);
  }

  const datos = [
    {
      etiqueta: "Ofertas",
      valor: totalOfertas,
      colorSuperior: "#4ce7ff",
      colorInferior: "#1b8fff",
      brillo: "rgba(76, 231, 255, 0.36)",
      x: area.izquierda + 78
    },
    {
      etiqueta: "Demandas",
      valor: totalDemandas,
      colorSuperior: "#50ffc3",
      colorInferior: "#1eb892",
      brillo: "rgba(80, 255, 195, 0.30)",
      x: area.izquierda + 278
    }
  ];

  const anchoBarra = Math.min(120, Math.max(92, (area.derecha - area.izquierda - 180) / 2));

  /*
    Ajustamos posiciones si el ancho disponible es menor.
  */
  if (ancho < 700) {
    datos[0].x = area.izquierda + 28;
    datos[1].x = area.izquierda + 168;
  }

  datos.forEach((dato) => {
    const alturaBarra = (dato.valor / maximo) * (alturaArea - 24);
    const x = dato.x;
    const y = area.abajo - alturaBarra;

    const gradienteBarra = ctx.createLinearGradient(x, y, x, area.abajo);
    gradienteBarra.addColorStop(0, dato.colorSuperior);
    gradienteBarra.addColorStop(1, dato.colorInferior);

    ctx.save();
    ctx.shadowColor = dato.brillo;
    ctx.shadowBlur = 22;
    ctx.fillStyle = gradienteBarra;
    dibujarRectanguloRedondeado(ctx, x, y, anchoBarra, alturaBarra, 16);
    ctx.fill();
    ctx.restore();

    /*
      Brillo superior para dar más profundidad visual.
    */
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    dibujarRectanguloRedondeado(ctx, x + 6, y + 6, anchoBarra - 12, Math.max(12, alturaBarra * 0.18), 12);
    ctx.fill();

    /*
      Valor numérico encima de la barra.
    */
    ctx.textAlign = "center";
    ctx.fillStyle = "#f8fcff";
    ctx.font = "700 19px Inter";
    ctx.fillText(String(dato.valor), x + (anchoBarra / 2), y - 12);

    /*
      Etiqueta principal debajo de la barra.
    */
    ctx.fillStyle = "#d8ebff";
    ctx.font = "600 14px Inter";
    ctx.fillText(dato.etiqueta, x + (anchoBarra / 2), area.abajo + 28);

    /*
      Porcentaje sobre el total.
    */
    const porcentaje = totalPublicaciones === 0 ? 0 : Math.round((dato.valor / totalPublicaciones) * 100);
    ctx.fillStyle = "#8ea6c8";
    ctx.font = "500 12px Inter";
    ctx.fillText(`${porcentaje}% del total`, x + (anchoBarra / 2), area.abajo + 48);
  });

  /*
    Chip informativo superior derecho.
  */
  const chipTexto = totalPublicaciones === 0
    ? "Sin datos disponibles"
    : `Balance actual · ${totalOfertas} ofertas / ${totalDemandas} demandas`;

  ctx.textAlign = "left";
  ctx.font = "600 12px Inter";
  const chipAncho = Math.min(248, ctx.measureText(chipTexto).width + 28);
  const chipX = ancho - chipAncho - 26;
  const chipY = 28;

  ctx.fillStyle = "rgba(70, 213, 255, 0.10)";
  dibujarRectanguloRedondeado(ctx, chipX, chipY, chipAncho, 30, 999);
  ctx.fill();

  ctx.strokeStyle = "rgba(108, 209, 255, 0.18)";
  ctx.stroke();

  ctx.fillStyle = "#d8f8ff";
  ctx.fillText(chipTexto, chipX + 14, chipY + 19);

  /*
    Mensaje central si todavía no hay datos.
  */
  if (totalPublicaciones === 0) {
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(232, 243, 255, 0.78)";
    ctx.font = "600 16px Inter";
    ctx.fillText("Añade publicaciones para generar la comparativa visual.", ancho / 2, alto / 2 + 10);
  }
}

/*
  DOMContentLoaded se dispara cuando el HTML ya está cargado.
*/
window.addEventListener("DOMContentLoaded", inicializarPaginaPublicaciones);