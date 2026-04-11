import {
  anadirPublicacionSeleccionada,
  inicializarAlmacenamiento,
  listarPublicacionesDisponibles,
  listarPublicacionesSeleccionadas,
  obtenerResumenDashboard,
  quitarPublicacionSeleccionada
} from "./almacenaje.js";
import { capitalizarTexto, configurarBotonCerrarSesion, mostrarAlerta, pintarUsuarioEnNavbar } from "./ui.js";

/*
  Clave usada en localStorage para recordar qué filtro del dashboard
  estaba activo la última vez.
*/
const CLAVE_FILTRO_DASHBOARD = "jobconnect_dashboard_filtro";

/*
  Referencias a elementos del HTML que vamos a usar en el dashboard.

  Estos cuatro muestran los números del resumen superior:
  - total de ofertas
  - total de demandas
  - total de usuarios
  - total de seleccionadas
*/
const totalOfertasElemento = document.getElementById("total-ofertas");
const totalDemandasElemento = document.getElementById("total-demandas");
const totalUsuariosElemento = document.getElementById("total-usuarios");
const totalSeleccionadasElemento = document.getElementById("total-seleccionadas");

/*
  Estos son los contenedores internos donde pintamos las tarjetas:
  - publicaciones disponibles
  - publicaciones seleccionadas
*/
const contenedorDisponibles = document.getElementById("contenedor-publicaciones");
const contenedorSeleccionadas = document.getElementById("contenedor-seleccionadas");

/*
  closest(".drop-zone") busca el ancestro más cercano que tenga la clase .drop-zone.

  Esto es importante porque el drag and drop se apoya en la zona visual completa,
  no solo en el contenedor interno de tarjetas.

  Así:
  - el área de drop es más grande
  - la experiencia al arrastrar mejora
  - el resaltado visual se aplica a toda la caja de destino
*/
const zonaDisponibles = contenedorDisponibles.closest(".drop-zone");
const zonaSeleccionadas = contenedorSeleccionadas.closest(".drop-zone");

/*
  Elemento donde mostraremos mensajes de éxito o error.
*/
const mensajeDashboard = document.getElementById("mensaje-dashboard");

/*
  Lista de botones de filtro.
  Se seleccionan con querySelectorAll porque puede haber varios.
*/
const botonesFiltro = document.querySelectorAll("[data-filtro]");

/*
  Guarda qué filtro está activo en este momento.
  Empieza en "todas", pero luego intentaremos recuperar
  el último valor guardado en localStorage.
*/
let filtroActual = "todas";

/*
  Función principal de arranque del dashboard.

  Hace estas tareas:
  1. prepara el almacenamiento inicial
  2. pinta el usuario activo en la navbar
  3. configura el botón de cerrar sesión
  4. recupera el filtro guardado
  5. configura los filtros
  6. configura las zonas de drag and drop
  7. pinta el resumen y las tarjetas
*/
async function inicializarDashboard() {
  await inicializarAlmacenamiento();
  pintarUsuarioEnNavbar();
  configurarBotonCerrarSesion();
  recuperarFiltroGuardado();
  actualizarEstadoVisualFiltros();
  configurarFiltros();
  configurarZonasDrop();
  await repintarDashboard();
}

/*
  Recupera desde localStorage el último filtro usado por el usuario.

  Si el valor guardado no es válido, se mantiene "todas".
*/
function recuperarFiltroGuardado() {
  const filtroGuardado = localStorage.getItem(CLAVE_FILTRO_DASHBOARD);

  if (
    filtroGuardado === "todas"
    || filtroGuardado === "oferta"
    || filtroGuardado === "demanda"
  ) {
    filtroActual = filtroGuardado;
  }
}

/*
  Guarda en localStorage el filtro actual del dashboard.
*/
function guardarFiltroActual() {
  localStorage.setItem(CLAVE_FILTRO_DASHBOARD, filtroActual);
}

/*
  Configura los botones de filtro.

  Por cada botón:
  - escucha el click
  - actualiza filtroActual según su data-filtro
  - guarda el filtro elegido
  - cambia el aspecto visual de los botones
  - vuelve a pintar las tarjetas
*/
function configurarFiltros() {
  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", async () => {
      filtroActual = boton.dataset.filtro;
      guardarFiltroActual();
      actualizarEstadoVisualFiltros();
      await pintarTarjetas();
    });
  });
}

/*
  Cambia el estilo de los botones según cuál está activo.

  Si el botón coincide con filtroActual:
  - se pone como activo con btn-primary

  Si no coincide:
  - se deja como secundario con borde usando btn-outline-primary
*/
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

/*
  Configura el comportamiento drag and drop de las dos zonas:
  - zona de disponibles
  - zona de seleccionadas

  Aquí está una de las partes más importantes del dashboard.
*/
function configurarZonasDrop() {
  /*
    Recorremos las dos zonas drop.
    A ambas les damos comportamiento común:
    - dragover
    - dragleave
  */
  [zonaDisponibles, zonaSeleccionadas].forEach((zona) => {
    zona.addEventListener("dragover", (evento) => {
      /*
        preventDefault() es obligatorio en drag and drop
        para permitir que esta zona acepte el drop.
      */
      evento.preventDefault();

      /*
        Añadimos una clase visual mientras la tarjeta pasa por encima,
        para que el usuario vea que esa zona acepta el drop.
      */
      zona.classList.add("drop-zone-activa");
    });

    zona.addEventListener("dragleave", (evento) => {
      /*
        Esta mejora evita que el resaltado se quite antes de tiempo.

        evento.relatedTarget es el elemento al que se mueve el puntero.
        Si ese nuevo elemento sigue estando dentro de la misma zona,
        NO quitamos la clase.

        Solo quitamos el resaltado si realmente se salió de la zona completa.
      */
      if (!zona.contains(evento.relatedTarget)) {
        zona.classList.remove("drop-zone-activa");
      }
    });
  });

  /*
    Qué pasa cuando soltamos una tarjeta en la zona de disponibles.

    Lógica:
    - significa que la publicación deja de estar seleccionada
    - se elimina del store de seleccionadas
    - se repinta el dashboard
  */
  zonaDisponibles.addEventListener("drop", async (evento) => {
    evento.preventDefault();

    /*
      Quitamos el resaltado visual de la zona.
    */
    zonaDisponibles.classList.remove("drop-zone-activa");

    /*
      Recuperamos el id de la publicación arrastrada
      desde dataTransfer.
    */
    const id = evento.dataTransfer.getData("text/plain");

    try {
      /*
        Quitamos la publicación de la selección.
      */
      await quitarPublicacionSeleccionada(id);

      /*
        Actualizamos pantalla: resumen + tarjetas.
      */
      await repintarDashboard();

      /*
        Mostramos mensaje de éxito.
      */
      mostrarAlerta(mensajeDashboard, "Publicación devuelta al listado general.", "success");
    } catch (error) {
      /*
        Si algo falla, mostramos error.
      */
      mostrarAlerta(mensajeDashboard, error.message, "danger");
    }
  });

  /*
    Qué pasa cuando soltamos una tarjeta en la zona de seleccionadas.

    Lógica:
    - significa que el usuario quiere guardarla en su selección
    - se guarda en el store de seleccionadas
    - se repinta el dashboard
  */
  zonaSeleccionadas.addEventListener("drop", async (evento) => {
    evento.preventDefault();

    /*
      Quitamos el resaltado visual de la zona.
    */
    zonaSeleccionadas.classList.remove("drop-zone-activa");

    /*
      Recuperamos el id de la publicación arrastrada.
    */
    const id = evento.dataTransfer.getData("text/plain");

    try {
      /*
        Guardamos la publicación como seleccionada.
      */
      await anadirPublicacionSeleccionada(id);

      /*
        Repintamos dashboard para reflejar el cambio.
      */
      await repintarDashboard();

      /*
        Mostramos mensaje de éxito.
      */
      mostrarAlerta(mensajeDashboard, "Publicación añadida a la selección del usuario.", "success");
    } catch (error) {
      /*
        Si algo falla, mostramos error.
      */
      mostrarAlerta(mensajeDashboard, error.message, "danger");
    }
  });
}

/*
  Mueve una publicación al bloque de seleccionadas usando doble clic.
*/
async function moverASeleccionadas(idPublicacion) {
  try {
    await anadirPublicacionSeleccionada(idPublicacion);
    await repintarDashboard();
    mostrarAlerta(mensajeDashboard, "Publicación añadida a la selección del usuario.", "success");
  } catch (error) {
    mostrarAlerta(mensajeDashboard, error.message, "danger");
  }
}

/*
  Devuelve una publicación al bloque de disponibles.

  Esta función se reutiliza en dos acciones distintas:
  - doble clic sobre una tarjeta seleccionada
  - botón con X dentro de la propia tarjeta seleccionada
*/
async function moverADisponibles(idPublicacion) {
  try {
    await quitarPublicacionSeleccionada(idPublicacion);
    await repintarDashboard();
    mostrarAlerta(mensajeDashboard, "Publicación devuelta al listado general.", "success");
  } catch (error) {
    mostrarAlerta(mensajeDashboard, error.message, "danger");
  }
}

/*
  Repinta todo el dashboard.

  Reutiliza:
  - pintarResumen()
  - pintarTarjetas()

  Esto es útil porque cuando cambias algo,
  normalmente quieres actualizar ambas partes.
*/
async function repintarDashboard() {
  await pintarResumen();
  await pintarTarjetas();
}

/*
  Pide el resumen al módulo de almacenamiento
  y coloca cada dato en su elemento HTML correspondiente.
*/
async function pintarResumen() {
  const resumen = await obtenerResumenDashboard();

  totalOfertasElemento.textContent = resumen.totalOfertas;
  totalDemandasElemento.textContent = resumen.totalDemandas;
  totalUsuariosElemento.textContent = resumen.totalUsuarios;
  totalSeleccionadasElemento.textContent = resumen.totalSeleccionadas;
}

/*
  Pinta las tarjetas de ambas zonas:
  - disponibles
  - seleccionadas

  Además aplica el filtro actual a las disponibles.
*/
async function pintarTarjetas() {
  const publicacionesDisponibles = await listarPublicacionesDisponibles();
  const publicacionesSeleccionadas = await listarPublicacionesSeleccionadas();

  /*
    Filtramos solo las disponibles.

    Si filtroActual es "todas", se dejan pasar todas.
    Si no, se dejan solo las del tipo elegido.
  */
  const disponiblesFiltradas = publicacionesDisponibles.filter((publicacion) => {
    if (filtroActual === "todas") {
      return true;
    }

    return publicacion.tipo === filtroActual;
  });

  /*
    Pintamos tarjetas en la zona de disponibles.
    Si no hay publicaciones, se mostrará el texto vacío.
  */
  renderizarTarjetas(
    contenedorDisponibles,
    disponiblesFiltradas,
    "No hay publicaciones disponibles en este bloque.",
    "disponibles"
  );

  /*
    Pintamos tarjetas en la zona de seleccionadas.
  */
  renderizarTarjetas(
    contenedorSeleccionadas,
    publicacionesSeleccionadas,
    "Arrastra aquí las publicaciones que quieras guardar.",
    "seleccionadas"
  );
}

/*
  Crea visualmente las tarjetas HTML dentro del contenedor indicado.

  Parámetros:
  - contenedor: dónde se van a insertar las tarjetas
  - publicaciones: array de publicaciones a mostrar
  - textoVacio: mensaje que se mostrará si no hay elementos
  - origen: indica si la tarjeta pertenece al bloque de disponibles
    o al bloque de seleccionadas
*/
function renderizarTarjetas(contenedor, publicaciones, textoVacio, origen) {
  /*
    Si no hay publicaciones, mostramos un mensaje
    dentro del contenedor.
  */
  if (publicaciones.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary mb-0">${textoVacio}</div>
    `;
    return;
  }

  /*
    Si sí hay publicaciones, vaciamos primero el contenedor
    para evitar duplicados.
  */
  contenedor.innerHTML = "";

  /*
    Recorremos todas las publicaciones
    y creamos una tarjeta por cada una.
  */
  publicaciones.forEach((publicacion) => {
    const columna = document.createElement("div");
    columna.className = "col-12";

    /*
      Elegimos una clase CSS para el badge
      según sea oferta o demanda.
    */
    const badgeClase = publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";

    /*
      En las tarjetas seleccionadas añadimos un botón con X.

      Este botón permite devolver la publicación al listado general
      sin necesidad de arrastrarla ni hacer doble clic.
    */
    const botonQuitarSeleccion = origen === "seleccionadas"
      ? `
        <button
          type="button"
          class="btn-close btn-quitar-seleccion"
          aria-label="Devolver publicación al listado general"
          title="Devolver al listado general"
        ></button>
      `
      : "";

    /*
      Construimos el HTML de la tarjeta.

      draggable="true" es clave:
      permite que la tarjeta se pueda arrastrar.

      data-id guarda el id en el HTML,
      aunque el valor importante luego se mete en dataTransfer.
    */
    columna.innerHTML = `
      <article class="card card-publicacion h-100 tarjeta-arrastrable" draggable="true" data-id="${publicacion.id}">
        <div class="card-body position-relative">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2 flex-wrap tarjeta-cabecera-publicacion">
            <div class="d-flex align-items-start gap-2 flex-wrap pe-4">
              <span class="badge ${badgeClase}">${capitalizarTexto(publicacion.tipo)}</span>
              <small class="text-muted">${publicacion.fecha}</small>
            </div>
            ${botonQuitarSeleccion}
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

    /*
      Buscamos el article que actuará como tarjeta arrastrable.
    */
    const tarjeta = columna.querySelector(".tarjeta-arrastrable");

    /*
      Si la tarjeta pertenece a seleccionadas,
      buscamos también el botón con X para configurar su click.
    */
    const botonCerrar = columna.querySelector(".btn-quitar-seleccion");

    /*
      dragstart ocurre cuando el usuario empieza a arrastrar la tarjeta.

      Aquí guardamos el id de la publicación en dataTransfer,
      que es como la "mochila" temporal del arrastre.

      Después, en el drop, recuperaremos este mismo id.
    */
    tarjeta.addEventListener("dragstart", (evento) => {
      evento.dataTransfer.setData("text/plain", String(publicacion.id));

      /*
        Añadimos clase visual para dar feedback mientras se arrastra.
      */
      tarjeta.classList.add("tarjeta-dragging");
    });

    /*
      dragend ocurre cuando termina el arrastre,
      tanto si se soltó bien como si no.

      Quitamos la clase visual.
    */
    tarjeta.addEventListener("dragend", () => {
      tarjeta.classList.remove("tarjeta-dragging");
    });

    /*
      Mejora funcional:
      además del drag & drop, permitimos mover la tarjeta con doble clic.

      - Si la tarjeta está en "disponibles", pasa a "seleccionadas"
      - Si la tarjeta está en "seleccionadas", vuelve a "disponibles"
    */
    tarjeta.addEventListener("dblclick", async () => {
      if (origen === "disponibles") {
        await moverASeleccionadas(publicacion.id);
      } else {
        await moverADisponibles(publicacion.id);
      }
    });

    /*
      Si existe el botón con X, añadimos su acción.

      Detenemos la propagación para que al pulsar la X
      no se lance también el doble clic de la tarjeta.
    */
    if (botonCerrar) {
      botonCerrar.addEventListener("dblclick", (evento) => {
        evento.preventDefault();
        evento.stopPropagation();
      });

      botonCerrar.addEventListener("click", async (evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        await moverADisponibles(publicacion.id);
      });
    }

    /*
      Añadimos la tarjeta ya montada al contenedor.
    */
    contenedor.appendChild(columna);
  });
}

/*
  Cuando el DOM ya está cargado,
  arrancamos toda la lógica del dashboard.
*/
window.addEventListener("DOMContentLoaded", inicializarDashboard);