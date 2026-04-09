// assets/js/dashboard.js

import {
  inicializarDatos,
  obtenerTodos,
  STORE_USUARIOS,
  STORE_PUBLICACIONES
} from "./almacenamiento.js";

let publicacionesGlobales = [];
let publicacionesFiltradas = [];
let publicacionesSeleccionadas = [];

document.addEventListener("DOMContentLoaded", async () => {
  await inicializarDashboard();
});

async function inicializarDashboard() {
  try {
    await inicializarDatos();
    mostrarUsuarioActivo();
    configurarBotonCerrarSesion();

    await cargarDatosDashboard();
    configurarFiltros();
    configurarZonaDrop();
    configurarBotonLimpiarSeleccion();
  } catch (error) {
    console.error("Error al inicializar el dashboard:", error);
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
    aplicarFiltro("todas");
  });
}

async function cargarDatosDashboard() {
  const usuarios = await obtenerTodos(STORE_USUARIOS);
  const publicaciones = await obtenerTodos(STORE_PUBLICACIONES);

  publicacionesGlobales = publicaciones;

  const ofertas = publicaciones.filter(
    (publicacion) => publicacion.tipo === "oferta"
  );

  const demandas = publicaciones.filter(
    (publicacion) => publicacion.tipo === "demanda"
  );

  renderizarTotales(usuarios, ofertas, demandas);
  aplicarFiltro("todas");
  dibujarGraficoCanvas(usuarios.length, ofertas.length, demandas.length);
}

function renderizarTotales(usuarios, ofertas, demandas) {
  document.getElementById("total-usuarios").textContent = usuarios.length;
  document.getElementById("total-ofertas").textContent = ofertas.length;
  document.getElementById("total-demandas").textContent = demandas.length;
}

function configurarFiltros() {
  document.getElementById("btn-filtro-todas").addEventListener("click", () => {
    aplicarFiltro("todas");
  });

  document.getElementById("btn-filtro-otras").addEventListener("click", () => {
    aplicarFiltro("otras");
  });

  document.getElementById("btn-filtro-propias").addEventListener("click", () => {
    aplicarFiltro("propias");
  });
}

function aplicarFiltro(tipoFiltro) {
  actualizarBotonesFiltro(tipoFiltro);

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (tipoFiltro === "todas") {
    publicacionesFiltradas = [...publicacionesGlobales];
  }

  if (tipoFiltro === "otras") {
    if (!usuarioActivo) {
      publicacionesFiltradas = [...publicacionesGlobales];
    } else {
      publicacionesFiltradas = publicacionesGlobales.filter(
        (publicacion) => publicacion.emailContacto !== usuarioActivo.email
      );
    }
  }

  if (tipoFiltro === "propias") {
    if (!usuarioActivo) {
      publicacionesFiltradas = [];
    } else {
      publicacionesFiltradas = publicacionesGlobales.filter(
        (publicacion) => publicacion.emailContacto === usuarioActivo.email
      );
    }
  }

  renderizarPublicacionesDashboard(publicacionesFiltradas);
}

function actualizarBotonesFiltro(tipoActivo) {
  const configuracion = [
    { id: "btn-filtro-todas", tipo: "todas" },
    { id: "btn-filtro-otras", tipo: "otras" },
    { id: "btn-filtro-propias", tipo: "propias" }
  ];

  configuracion.forEach((boton) => {
    const elemento = document.getElementById(boton.id);

    if (!elemento) {
      return;
    }

    if (boton.tipo === tipoActivo) {
      elemento.classList.remove("btn-outline-primary");
      elemento.classList.add("btn-primary");
    } else {
      elemento.classList.remove("btn-primary");
      elemento.classList.add("btn-outline-primary");
    }
  });
}

function renderizarPublicacionesDashboard(publicaciones) {
  const contenedor = document.getElementById("contenedor-publicaciones-dashboard");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  if (publicaciones.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-light border text-muted mb-0">
        No hay publicaciones para mostrar con este filtro.
      </div>
    `;
    return;
  }

  publicaciones.forEach((publicacion) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = `card shadow-sm border-0 publicacion-draggable ${publicacion.tipo === "oferta" ? "border-start border-4 border-primary" : "border-start border-4 border-success"
      }`;
    tarjeta.setAttribute("draggable", "true");
    tarjeta.dataset.id = publicacion.id;

    tarjeta.innerHTML = `
      <div class="card-body">
        <h3 class="h5 mb-1">
          ${capitalizarTexto(publicacion.tipo)}: ${publicacion.titulo}
        </h3>
        <p class="fw-semibold mb-1">${publicacion.fecha}</p>
        <p class="mb-2">${publicacion.descripcion}</p>
        <p class="small text-muted mb-0">
          Publicado por: ${publicacion.autor || publicacion.emailContacto}
        </p>
      </div>
    `;

    tarjeta.addEventListener("dragstart", (evento) => {
      evento.dataTransfer.setData("text/plain", String(publicacion.id));
    });

    contenedor.appendChild(tarjeta);
  });
}

function configurarZonaDrop() {
  const zonaDrop = document.getElementById("zona-drop");

  if (!zonaDrop) {
    return;
  }

  zonaDrop.addEventListener("dragover", (evento) => {
    evento.preventDefault();
    zonaDrop.classList.add("border-primary");
  });

  zonaDrop.addEventListener("dragleave", () => {
    zonaDrop.classList.remove("border-primary");
  });

  zonaDrop.addEventListener("drop", (evento) => {
    evento.preventDefault();
    zonaDrop.classList.remove("border-primary");

    const idPublicacion = Number(evento.dataTransfer.getData("text/plain"));
    const publicacion = publicacionesGlobales.find((item) => item.id === idPublicacion);

    if (!publicacion) {
      return;
    }

    const yaExiste = publicacionesSeleccionadas.some((item) => item.id === publicacion.id);

    if (!yaExiste) {
      publicacionesSeleccionadas.push(publicacion);
    }

    renderizarSeleccion();
  });
}

function renderizarSeleccion() {
  const zonaDrop = document.getElementById("zona-drop");
  const textoZonaDrop = document.getElementById("texto-zona-drop");

  if (!zonaDrop) {
    return;
  }

  if (publicacionesSeleccionadas.length === 0) {
    zonaDrop.innerHTML = `
      <p class="text-center text-muted mb-0" id="texto-zona-drop">
        Arrastra aquí una oferta o demanda
      </p>
    `;
    return;
  }

  zonaDrop.innerHTML = "";

  publicacionesSeleccionadas.forEach((publicacion) => {
    const tarjetaSeleccionada = document.createElement("div");
    tarjetaSeleccionada.className = "card mb-3 border";

    tarjetaSeleccionada.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div>
            <span class="badge ${publicacion.tipo === "oferta" ? "text-bg-primary" : "text-bg-success"
      } mb-2">
              ${capitalizarTexto(publicacion.tipo)}
            </span>
            <h3 class="h6 mb-1">${publicacion.titulo}</h3>
            <p class="mb-1"><strong>Fecha:</strong> ${publicacion.fecha}</p>
            <p class="mb-1"><strong>Contacto:</strong> ${publicacion.emailContacto}</p>
            <p class="mb-0">${publicacion.descripcion}</p>
          </div>
          <button class="btn btn-sm btn-outline-danger btn-quitar-seleccion">
            Quitar
          </button>
        </div>
      </div>
    `;

    const botonQuitar = tarjetaSeleccionada.querySelector(".btn-quitar-seleccion");
    botonQuitar.addEventListener("click", () => {
      publicacionesSeleccionadas = publicacionesSeleccionadas.filter(
        (item) => item.id !== publicacion.id
      );
      renderizarSeleccion();
    });

    zonaDrop.appendChild(tarjetaSeleccionada);
  });
}

function configurarBotonLimpiarSeleccion() {
  const boton = document.getElementById("btn-limpiar-seleccion");

  if (!boton) {
    return;
  }

  boton.addEventListener("click", () => {
    publicacionesSeleccionadas = [];
    renderizarSeleccion();
  });
}

function dibujarGraficoCanvas(totalUsuarios, totalOfertas, totalDemandas) {
  const canvas = document.getElementById("grafico-dashboard");

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const datos = [
    { etiqueta: "Usuarios", valor: totalUsuarios, x: 110 },
    { etiqueta: "Ofertas", valor: totalOfertas, x: 300 },
    { etiqueta: "Demandas", valor: totalDemandas, x: 490 }
  ];

  const baseY = 280;
  const anchoBarra = 80;
  const alturaMaxima = 170;
  const valorMaximo = Math.max(totalUsuarios, totalOfertas, totalDemandas, 1);

  ctx.font = "18px Arial";
  ctx.fillStyle = "#212529";
  ctx.fillText("Resumen gráfico del sistema", 20, 30);

  ctx.beginPath();
  ctx.moveTo(70, 60);
  ctx.lineTo(70, baseY);
  ctx.lineTo(640, baseY);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.stroke();

  datos.forEach((item) => {
    const altura = (item.valor / valorMaximo) * alturaMaxima;
    const y = baseY - altura;

    ctx.fillStyle = "#0d6efd";
    ctx.fillRect(item.x, y, anchoBarra, altura);

    ctx.fillStyle = "#212529";
    ctx.fillText(String(item.valor), item.x + 28, y - 10);
    ctx.fillText(item.etiqueta, item.x - 5, baseY + 25);
  });
}

function capitalizarTexto(texto) {
  if (!texto) {
    return "";
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}