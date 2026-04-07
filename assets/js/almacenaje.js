import { usuariosIniciales, publicacionesIniciales } from "./datos.js";

const CLAVES_STORAGE = {
  usuarios: "jobconnect_usuarios",
  usuarioActivo: "jobconnect_usuario_activo"
};

const DB_NAME = "jobconnect_producto2_db";
const DB_VERSION = 1;
const STORE_PUBLICACIONES = "publicaciones";
const STORE_SELECCIONADAS = "seleccionadas";

function clonarDato(dato) {
  return JSON.parse(JSON.stringify(dato));
}

function leerJSONStorage(clave, valorPorDefecto) {
  const texto = localStorage.getItem(clave);

  if (!texto) {
    return clonarDato(valorPorDefecto);
  }

  try {
    return JSON.parse(texto);
  } catch (error) {
    return clonarDato(valorPorDefecto);
  }
}

function guardarJSONStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function normalizarTexto(texto) {
  return String(texto || "").trim();
}

function normalizarEmail(email) {
  return normalizarTexto(email).toLowerCase();
}

function abrirBaseDeDatos() {
  return new Promise((resolve, reject) => {
    const peticion = indexedDB.open(DB_NAME, DB_VERSION);

    peticion.onupgradeneeded = (evento) => {
      const db = evento.target.result;

      if (!db.objectStoreNames.contains(STORE_PUBLICACIONES)) {
        const storePublicaciones = db.createObjectStore(STORE_PUBLICACIONES, {
          keyPath: "id",
          autoIncrement: true
        });

        storePublicaciones.createIndex("tipo", "tipo", { unique: false });
        storePublicaciones.createIndex("fecha", "fecha", { unique: false });
        storePublicaciones.createIndex("emailContacto", "emailContacto", {
          unique: false
        });
      }

      if (!db.objectStoreNames.contains(STORE_SELECCIONADAS)) {
        db.createObjectStore(STORE_SELECCIONADAS, {
          keyPath: "publicacionId"
        });
      }
    };

    peticion.onsuccess = () => {
      resolve(peticion.result);
    };

    peticion.onerror = () => {
      reject(new Error("No se pudo abrir la base de datos del navegador."));
    };
  });
}

function obtenerTodosDeStore(nombreStore) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readonly");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.getAll();

      peticion.onsuccess = () => resolve(peticion.result);
      peticion.onerror = () => reject(new Error(`No se pudo leer ${nombreStore}.`));
    } catch (error) {
      reject(error);
    }
  });
}

function obtenerUnoDeStore(nombreStore, clave) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readonly");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.get(clave);

      peticion.onsuccess = () => resolve(peticion.result || null);
      peticion.onerror = () => reject(new Error(`No se pudo leer el registro de ${nombreStore}.`));
    } catch (error) {
      reject(error);
    }
  });
}

function contarStore(nombreStore) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readonly");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.count();

      peticion.onsuccess = () => resolve(peticion.result);
      peticion.onerror = () => reject(new Error(`No se pudo contar ${nombreStore}.`));
    } catch (error) {
      reject(error);
    }
  });
}

function agregarEnStore(nombreStore, dato) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readwrite");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.add(dato);

      peticion.onsuccess = () => resolve(peticion.result);
      peticion.onerror = () => reject(new Error(`No se pudo guardar en ${nombreStore}.`));
    } catch (error) {
      reject(error);
    }
  });
}

function guardarEnStore(nombreStore, dato) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readwrite");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.put(dato);

      peticion.onsuccess = () => resolve(peticion.result);
      peticion.onerror = () => reject(new Error(`No se pudo actualizar ${nombreStore}.`));
    } catch (error) {
      reject(error);
    }
  });
}

function eliminarDeStore(nombreStore, clave) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readwrite");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.delete(clave);

      peticion.onsuccess = () => resolve(true);
      peticion.onerror = () => reject(new Error(`No se pudo eliminar en ${nombreStore}.`));
    } catch (error) {
      reject(error);
    }
  });
}

export async function inicializarAlmacenamiento() {
  inicializarUsuariosSiNoExisten();
  await inicializarPublicacionesSiNoExisten();
}

function inicializarUsuariosSiNoExisten() {
  if (!localStorage.getItem(CLAVES_STORAGE.usuarios)) {
    guardarJSONStorage(CLAVES_STORAGE.usuarios, usuariosIniciales);
  }
}

async function inicializarPublicacionesSiNoExisten() {
  const totalPublicaciones = await contarStore(STORE_PUBLICACIONES);

  if (totalPublicaciones > 0) {
    return;
  }

  for (const publicacion of publicacionesIniciales) {
    await agregarEnStore(STORE_PUBLICACIONES, publicacion);
  }
}

export function listarUsuarios() {
  const usuarios = leerJSONStorage(CLAVES_STORAGE.usuarios, []);

  return usuarios.sort((a, b) => {
    const nombreA = `${a.nombre} ${a.apellidos}`.toLowerCase();
    const nombreB = `${b.nombre} ${b.apellidos}`.toLowerCase();
    return nombreA.localeCompare(nombreB);
  });
}

export function obtenerUsuarioActivo() {
  const emailActivo = normalizarEmail(localStorage.getItem(CLAVES_STORAGE.usuarioActivo));

  if (!emailActivo) {
    return null;
  }

  const usuarios = listarUsuarios();
  return usuarios.find((usuario) => usuario.email === emailActivo) || null;
}

export function guardarUsuarioActivo(email) {
  localStorage.setItem(CLAVES_STORAGE.usuarioActivo, normalizarEmail(email));
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVES_STORAGE.usuarioActivo);
}

export function crearUsuario(datosUsuario) {
  const usuarios = listarUsuarios();

  const nombre = normalizarTexto(datosUsuario.nombre);
  const apellidos = normalizarTexto(datosUsuario.apellidos);
  const email = normalizarEmail(datosUsuario.email);
  const password = normalizarTexto(datosUsuario.password);
  const rol = normalizarTexto(datosUsuario.rol);

  if (!nombre || !apellidos || !email || !password || !rol) {
    throw new Error("Todos los campos del usuario son obligatorios.");
  }

  if (!email.includes("@")) {
    throw new Error("El correo electrónico no tiene un formato válido.");
  }

  if (password.length < 4) {
    throw new Error("La contraseña debe tener al menos 4 caracteres.");
  }

  const usuarioDuplicado = usuarios.some((usuario) => usuario.email === email);

  if (usuarioDuplicado) {
    throw new Error("Ya existe un usuario con ese correo electrónico.");
  }

  const siguienteId = usuarios.length === 0
    ? 1
    : Math.max(...usuarios.map((usuario) => Number(usuario.id) || 0)) + 1;

  const nuevoUsuario = {
    id: siguienteId,
    nombre,
    apellidos,
    email,
    password,
    rol
  };

  usuarios.push(nuevoUsuario);
  guardarJSONStorage(CLAVES_STORAGE.usuarios, usuarios);

  return nuevoUsuario;
}

export function eliminarUsuario(email) {
  const emailNormalizado = normalizarEmail(email);
  const usuarios = listarUsuarios();
  const usuariosFiltrados = usuarios.filter((usuario) => usuario.email !== emailNormalizado);

  if (usuariosFiltrados.length === usuarios.length) {
    throw new Error("No se encontró el usuario a eliminar.");
  }

  guardarJSONStorage(CLAVES_STORAGE.usuarios, usuariosFiltrados);

  const usuarioActivo = obtenerUsuarioActivo();
  if (usuarioActivo && usuarioActivo.email === emailNormalizado) {
    cerrarSesion();
  }

  return true;
}

export function loguearUsuario(email, password) {
  const emailNormalizado = normalizarEmail(email);
  const passwordNormalizada = normalizarTexto(password);

  if (!emailNormalizado || !passwordNormalizada) {
    throw new Error("Debes introducir correo y contraseña.");
  }

  const usuarios = listarUsuarios();
  const usuario = usuarios.find(
    (item) => item.email === emailNormalizado && item.password === passwordNormalizada
  );

  if (!usuario) {
    throw new Error("Credenciales incorrectas. Revisa el correo y la contraseña.");
  }

  guardarUsuarioActivo(usuario.email);

  return usuario;
}

export async function listarPublicaciones() {
  const publicaciones = await obtenerTodosDeStore(STORE_PUBLICACIONES);

  return publicaciones.sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();

    if (fechaA !== fechaB) {
      return fechaB - fechaA;
    }

    return Number(b.id) - Number(a.id);
  });
}

export async function crearPublicacion(datosPublicacion) {
  const tipo = normalizarTexto(datosPublicacion.tipo).toLowerCase();
  const titulo = normalizarTexto(datosPublicacion.titulo);
  const categoria = normalizarTexto(datosPublicacion.categoria);
  const autor = normalizarTexto(datosPublicacion.autor);
  const ubicacion = normalizarTexto(datosPublicacion.ubicacion);
  const descripcion = normalizarTexto(datosPublicacion.descripcion);
  const emailContacto = normalizarEmail(datosPublicacion.emailContacto);
  const fecha = normalizarTexto(datosPublicacion.fecha);

  if (!tipo || !titulo || !categoria || !autor || !ubicacion || !descripcion || !emailContacto || !fecha) {
    throw new Error("Todos los campos de la publicación son obligatorios.");
  }

  if (tipo !== "oferta" && tipo !== "demanda") {
    throw new Error("El tipo de publicación debe ser oferta o demanda.");
  }

  if (!emailContacto.includes("@")) {
    throw new Error("El email de contacto no es válido.");
  }

  if (descripcion.length < 10) {
    throw new Error("La descripción debe tener al menos 10 caracteres.");
  }

  const nuevaPublicacion = {
    tipo,
    titulo,
    categoria,
    autor,
    ubicacion,
    descripcion,
    emailContacto,
    fecha
  };

  const nuevoId = await agregarEnStore(STORE_PUBLICACIONES, nuevaPublicacion);
  return { ...nuevaPublicacion, id: nuevoId };
}

export async function eliminarPublicacion(idPublicacion) {
  const id = Number(idPublicacion);

  if (!Number.isInteger(id)) {
    throw new Error("El identificador de la publicación no es válido.");
  }

  const publicacion = await obtenerUnoDeStore(STORE_PUBLICACIONES, id);

  if (!publicacion) {
    throw new Error("No se encontró la publicación a eliminar.");
  }

  await eliminarDeStore(STORE_PUBLICACIONES, id);
  await eliminarDeStore(STORE_SELECCIONADAS, id);
  return true;
}

export async function listarIdsSeleccionados() {
  const registros = await obtenerTodosDeStore(STORE_SELECCIONADAS);
  return registros.map((registro) => Number(registro.publicacionId));
}

export async function anadirPublicacionSeleccionada(idPublicacion) {
  const id = Number(idPublicacion);
  const publicacion = await obtenerUnoDeStore(STORE_PUBLICACIONES, id);

  if (!publicacion) {
    throw new Error("No existe la publicación que intentas seleccionar.");
  }

  await guardarEnStore(STORE_SELECCIONADAS, {
    publicacionId: id,
    fechaSeleccion: new Date().toISOString()
  });

  return true;
}

export async function quitarPublicacionSeleccionada(idPublicacion) {
  const id = Number(idPublicacion);
  await eliminarDeStore(STORE_SELECCIONADAS, id);
  return true;
}

export async function listarPublicacionesSeleccionadas() {
  const [publicaciones, idsSeleccionados] = await Promise.all([
    listarPublicaciones(),
    listarIdsSeleccionados()
  ]);

  return publicaciones.filter((publicacion) => idsSeleccionados.includes(Number(publicacion.id)));
}

export async function listarPublicacionesDisponibles() {
  const [publicaciones, idsSeleccionados] = await Promise.all([
    listarPublicaciones(),
    listarIdsSeleccionados()
  ]);

  return publicaciones.filter((publicacion) => !idsSeleccionados.includes(Number(publicacion.id)));
}

export async function obtenerResumenDashboard() {
  const [publicaciones, idsSeleccionados] = await Promise.all([
    listarPublicaciones(),
    listarIdsSeleccionados()
  ]);

  return {
    totalOfertas: publicaciones.filter((publicacion) => publicacion.tipo === "oferta").length,
    totalDemandas: publicaciones.filter((publicacion) => publicacion.tipo === "demanda").length,
    totalUsuarios: listarUsuarios().length,
    totalSeleccionadas: idsSeleccionados.length
  };
}
