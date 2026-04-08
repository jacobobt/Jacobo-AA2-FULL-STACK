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
  document.getElementById(...) busca en la página un elemento por su id.

  Gracias a esto luego podemos:
  - leer lo que escribe el usuario en los inputs
  - modificar tablas
  - mostrar mensajes
  - dibujar el gráfico
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
  Esta función se ejecuta al cargar la página.
  Es la función principal de arranque de esta pantalla.

  Se encarga de:
  1. preparar el almacenamiento inicial
  2. pintar el usuario en la barra de navegación
  3. preparar el botón de cerrar sesión
  4. rellenar algunos datos automáticos del formulario
  5. pintar la tabla de publicaciones
  6. pintar el gráfico en canvas
  7. escuchar el envío del formulario
*/
async function inicializarPaginaPublicaciones() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  completarDatosSugeridos();
  await pintarTablaPublicaciones();
  await pintarGraficoCanvas();

  /*
    Aquí escuchamos el evento submit del formulario.
    Cuando el usuario pulse el botón de enviar,
    se ejecutará gestionarAltaPublicacion.
  */
  formPublicacion.addEventListener("submit", gestionarAltaPublicacion);
}

/*
  Esta función rellena automáticamente algunos campos del formulario.

  Hace dos cosas:
  1. pone la fecha de hoy en el input de fecha
  2. si hay usuario activo, rellena autor y email con sus datos
*/
function completarDatosSugeridos() {
  /*
    new Date() crea la fecha actual.
    toISOString() la convierte a texto tipo:
    "2026-04-08T10:30:00.000Z"

    split("T")[0] se queda solo con la parte de la fecha:
    "2026-04-08"
  */
  fechaPublicacion.value = new Date().toISOString().split("T")[0];

  /*
    Obtenemos el usuario activo desde localStorage
    usando la función del módulo almacenaje.js
  */
  const usuarioActivo = obtenerUsuarioActivo();

  /*
    Si hay un usuario logueado, rellenamos automáticamente
    el autor y el email para no tener que escribirlos a mano.
  */
  if (usuarioActivo) {
    autorPublicacion.value = `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
    emailPublicacion.value = usuarioActivo.email;
  }
}

/*
  Esta función recoge todos los datos escritos en el formulario
  y los devuelve en un objeto.

  Es muy útil porque así luego podemos pasar todos los datos
  de golpe a crearPublicacion(...).
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

  Hace esto:
  1. pide las publicaciones a IndexedDB
  2. si no hay ninguna, muestra una fila indicando que está vacío
  3. si sí hay, crea una fila por cada publicación
  4. añade un botón eliminar a cada fila
*/
async function pintarTablaPublicaciones() {
  const publicaciones = await listarPublicaciones();

  /*
    Si no hay publicaciones, metemos una única fila informativa
    dentro del cuerpo de la tabla.
  */
  if (publicaciones.length === 0) {
    tablaPublicacionesBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted">No hay ofertas o demandas registradas.</td>
      </tr>
    `;
    return;
  }

  /*
    Si sí hay publicaciones, vaciamos antes la tabla
    para evitar duplicados al repintar.
  */
  tablaPublicacionesBody.innerHTML = "";

  /*
    Recorremos el array de publicaciones.
    Por cada publicación, creamos una fila <tr>.
  */
  publicaciones.forEach((publicacion) => {
    const fila = document.createElement("tr");

    /*
      Elegimos una clase CSS diferente según el tipo:
      - oferta -> badge-oferta
      - demanda -> badge-demanda
    */
    const badgeClase = publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";

    /*
      innerHTML nos permite meter el contenido HTML de la fila.
      Aquí mostramos los datos de la publicación en distintas columnas.
    */
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

    /*
      Buscamos el botón eliminar que acabamos de crear dentro de esta fila.
    */
    const botonEliminar = fila.querySelector("button");

    /*
      Cuando el usuario pulse ese botón, se llamará a la función
      que elimina la publicación por id.
    */
    botonEliminar.addEventListener("click", async () => {
      await gestionarBorradoPublicacion(publicacion.id);
    });

    /*
      Finalmente añadimos la fila al cuerpo de la tabla.
    */
    tablaPublicacionesBody.appendChild(fila);
  });
}

/*
  Esta función se ejecuta cuando se envía el formulario
  para crear una nueva publicación.
*/
async function gestionarAltaPublicacion(evento) {
  /*
    Evita que el formulario recargue la página al enviarse,
    que es el comportamiento por defecto del navegador.
  */
  evento.preventDefault();

  try {
    /*
      Creamos la publicación con los datos del formulario.
    */
    await crearPublicacion(obtenerDatosFormulario());

    /*
      Después de guardar:
      - repintamos la tabla
      - repintamos el gráfico
    */
    await pintarTablaPublicaciones();
    await pintarGraficoCanvas();

    /*
      Reseteamos el formulario, es decir, vaciamos sus campos.
    */
    formPublicacion.reset();

    /*
      Volvemos a poner los datos sugeridos:
      fecha actual, autor y email si hay usuario activo.
    */
    completarDatosSugeridos();

    /*
      Mostramos un mensaje de éxito.
    */
    mostrarAlerta(
      mensajePublicacion,
      "Publicación guardada correctamente en IndexedDB.",
      "success"
    );
  } catch (error) {
    /*
      Si algo falla, mostramos el mensaje de error.
    */
    mostrarAlerta(mensajePublicacion, error.message, "danger");
  }
}

/*
  Esta función elimina una publicación por su id.
*/
async function gestionarBorradoPublicacion(idPublicacion) {
  try {
    /*
      Eliminamos la publicación en IndexedDB.
    */
    await eliminarPublicacion(idPublicacion);

    /*
      Luego actualizamos la tabla y el gráfico para reflejar el cambio.
    */
    await pintarTablaPublicaciones();
    await pintarGraficoCanvas();

    /*
      Mostramos mensaje de éxito.
    */
    mostrarAlerta(mensajePublicacion, "Publicación eliminada correctamente.", "success");
  } catch (error) {
    /*
      Si algo falla, mostramos error.
    */
    mostrarAlerta(mensajePublicacion, error.message, "danger");
  }
}

/*
  Esta función dibuja un gráfico sencillo en un canvas HTML5.

  El gráfico muestra:
  - total de ofertas
  - total de demandas

  Cada uno como una barra vertical.
*/
async function pintarGraficoCanvas() {
  /*
    Comprobamos que el canvas existe y que soporta getContext.
    Si no existe o no se puede usar, salimos.
  */
  if (!canvasGrafico || !canvasGrafico.getContext) {
    return;
  }

  /*
    Leemos todas las publicaciones para calcular cuántas ofertas
    y cuántas demandas hay.
  */
  const publicaciones = await listarPublicaciones();
  const totalOfertas = publicaciones.filter((publicacion) => publicacion.tipo === "oferta").length;
  const totalDemandas = publicaciones.filter((publicacion) => publicacion.tipo === "demanda").length;

  /*
    getContext("2d") devuelve el contexto de dibujo 2D del canvas.
    Con ctx podremos dibujar rectángulos, texto, líneas, etc.
  */
  const ctx = canvasGrafico.getContext("2d");

  /*
    Guardamos ancho y alto del canvas para usar esas medidas
    al dibujar.
  */
  const ancho = canvasGrafico.width;
  const alto = canvasGrafico.height;

  /*
    Limpiamos completamente el canvas.
  */
  ctx.clearRect(0, 0, ancho, alto);

  /*
    Pintamos un fondo blanco en todo el canvas.
  */
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ancho, alto);

  /*
    Escribimos el título del gráfico.
  */
  ctx.font = "bold 18px Arial";
  ctx.fillStyle = "#212529";
  ctx.fillText("Gráfico de ofertas y demandas", 20, 30);

  /*
    maximo será el mayor valor entre ofertas y demandas.
    Sirve para calcular la altura proporcional de las barras.

    Ponemos también 1 para evitar divisiones raras si ambos son 0.
  */
  const maximo = Math.max(totalOfertas, totalDemandas, 1);

  /*
    Definimos varias medidas y posiciones para el dibujo.
  */
  const baseY = alto - 40;
  const alturaMaxima = 160;
  const anchoBarra = 120;
  const separacion = 80;
  const xOferta = 50;
  const xDemanda = xOferta + anchoBarra + separacion;

  /*
    Calculamos la altura de cada barra de forma proporcional.
    Si una categoría tiene más elementos, su barra será más alta.
  */
  const alturaOferta = (totalOfertas / maximo) * alturaMaxima;
  const alturaDemanda = (totalDemandas / maximo) * alturaMaxima;

  /*
    Dibujamos una línea horizontal que actúa como base del gráfico.
  */
  ctx.strokeStyle = "#adb5bd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, baseY);
  ctx.lineTo(ancho - 20, baseY);
  ctx.stroke();

  /*
    Dibujamos la barra azul de ofertas.
    fillRect(x, y, ancho, alto)

    Ojo:
    el eje Y en canvas crece hacia abajo,
    por eso restamos altura a baseY.
  */
  ctx.fillStyle = "#0d6efd";
  ctx.fillRect(xOferta, baseY - alturaOferta, anchoBarra, alturaOferta);

  /*
    Dibujamos la barra verde de demandas.
  */
  ctx.fillStyle = "#198754";
  ctx.fillRect(xDemanda, baseY - alturaDemanda, anchoBarra, alturaDemanda);

  /*
    Escribimos las etiquetas inferiores con el total de cada tipo.
  */
  ctx.font = "16px Arial";
  ctx.fillStyle = "#212529";
  ctx.fillText(`Ofertas: ${totalOfertas}`, xOferta, baseY + 25);
  ctx.fillText(`Demandas: ${totalDemandas}`, xDemanda, baseY + 25);

  /*
    Escribimos el número encima de cada barra.
  */
  ctx.font = "bold 18px Arial";
  ctx.fillText(String(totalOfertas), xOferta + 35, baseY - alturaOferta - 10);
  ctx.fillText(String(totalDemandas), xDemanda + 35, baseY - alturaDemanda - 10);
}

/*
  DOMContentLoaded se dispara cuando el HTML ya está cargado.
  En ese momento arrancamos toda la lógica de esta página.
*/
window.addEventListener("DOMContentLoaded", inicializarPaginaPublicaciones);