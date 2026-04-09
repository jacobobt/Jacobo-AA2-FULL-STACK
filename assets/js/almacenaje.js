import { usuariosIniciales, publicacionesIniciales } from "./datos.js";

/*
  Aquí guardamos los nombres de las claves que usaremos en localStorage.
  Lo hacemos en un objeto para no escribir los textos "a mano" cada vez
  y evitar errores de escritura.
*/
const CLAVES_STORAGE = {
  usuarios: "jobconnect_usuarios",
  usuarioActivo: "jobconnect_usuario_activo",
  publicacionesInicializadas: "jobconnect_publicaciones_inicializadas"
};

/*
  Constantes de IndexedDB.
  - DB_NAME: nombre de la base de datos del navegador.
  - DB_VERSION: versión de la base de datos.
  - STORE_PUBLICACIONES: "tabla" donde guardamos ofertas y demandas.
  - STORE_SELECCIONADAS: "tabla" donde guardamos qué publicaciones
    han sido seleccionadas en el dashboard.
*/
const DB_NAME = "jobconnect_producto2_db";
const DB_VERSION = 1;
const STORE_PUBLICACIONES = "publicaciones";
const STORE_SELECCIONADAS = "seleccionadas";

/*
  Esta función crea una copia profunda de un dato.
  ¿Por qué?
  Porque si devolvemos directamente el objeto o array original,
  podríamos modificarlo sin querer desde fuera.

  Usamos JSON para "copiar y pegar" el contenido.
  Sirve bien para datos simples como arrays y objetos normales.
*/
function clonarDato(dato) {
  return JSON.parse(JSON.stringify(dato));
}

/*
  Lee un valor de localStorage y lo convierte de texto JSON a objeto/array real.

  Parámetros:
  - clave: nombre bajo el que está guardado el dato
  - valorPorDefecto: lo que devolveremos si no existe nada o hay error

  localStorage solo guarda texto.
  Por eso, cuando guardamos arrays u objetos, primero los convertimos a JSON.
  Y cuando los leemos, hay que hacer JSON.parse.
*/
function leerJSONStorage(clave, valorPorDefecto) {
  const texto = localStorage.getItem(clave);

  // Si no hay nada guardado con esa clave, devolvemos el valor por defecto.
  if (!texto) {
    return clonarDato(valorPorDefecto);
  }

  try {
    // Intentamos convertir el texto JSON en array u objeto real.
    return JSON.parse(texto);
  } catch (error) {
    // Si el JSON está roto o da error, devolvemos copia del valor por defecto.
    return clonarDato(valorPorDefecto);
  }
}

/*
  Guarda un valor en localStorage en formato JSON.
  Recuerda: localStorage no guarda objetos ni arrays directamente,
  solo texto.
*/
function guardarJSONStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

/*
  Convierte cualquier valor a texto y elimina espacios al inicio y al final.

  Ejemplos:
  "  hola  " -> "hola"
  null -> ""
  undefined -> ""
*/
function normalizarTexto(texto) {
  return String(texto || "").trim();
}

/*
  Normaliza un email:
  - lo convierte a texto
  - quita espacios sobrantes
  - lo pasa a minúsculas

  Así evitamos problemas como:
  "JACOBO@MAIL.COM" y "jacobo@mail.com"
  que en esencia deberían considerarse el mismo correo.
*/
function normalizarEmail(email) {
  return normalizarTexto(email).toLowerCase();
}

/*
  Abre la base de datos IndexedDB.

  Esta función devuelve una Promise porque abrir IndexedDB es asíncrono:
  tarda un pequeño tiempo y no devuelve el resultado al instante.

  resolve(...) -> todo fue bien
  reject(...)  -> hubo un error
*/
function abrirBaseDeDatos() {
  return new Promise((resolve, reject) => {
    const peticion = indexedDB.open(DB_NAME, DB_VERSION);

    /*
      onupgradeneeded se ejecuta:
      - la primera vez que se crea la base de datos
      - o cuando cambiamos la versión (DB_VERSION)

      Aquí es donde se crean los object stores (como tablas).
    */
    peticion.onupgradeneeded = (evento) => {
      const db = evento.target.result;

      // Si no existe el store de publicaciones, lo creamos.
      if (!db.objectStoreNames.contains(STORE_PUBLICACIONES)) {
        const storePublicaciones = db.createObjectStore(STORE_PUBLICACIONES, {
          keyPath: "id",
          autoIncrement: true
        });

        /*
          Creamos índices para poder buscar/organizar mejor los datos.
          No son obligatorios para que funcione, pero ayudan a estructurar.
        */
        storePublicaciones.createIndex("tipo", "tipo", { unique: false });
        storePublicaciones.createIndex("fecha", "fecha", { unique: false });
        storePublicaciones.createIndex("emailContacto", "emailContacto", {
          unique: false
        });
      }

      // Si no existe el store de seleccionadas, lo creamos.
      if (!db.objectStoreNames.contains(STORE_SELECCIONADAS)) {
        db.createObjectStore(STORE_SELECCIONADAS, {
          keyPath: "publicacionId"
        });
      }
    };

    // Si la base de datos se abre bien, devolvemos la base.
    peticion.onsuccess = () => {
      resolve(peticion.result);
    };

    // Si falla, lanzamos error.
    peticion.onerror = () => {
      reject(new Error("No se pudo abrir la base de datos del navegador."));
    };
  });
}

/*
  Lee TODOS los registros de un object store de IndexedDB.
  “Ve a ese almacén y tráeme todo lo que haya dentro.”

  Ejemplo:
  - obtenerTodosDeStore("publicaciones")
  - obtenerTodosDeStore("seleccionadas")
*/
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

/*
  Lee UN solo registro de un object store usando su clave primaria.

  Ejemplo:
  - obtenerUnoDeStore("publicaciones", 3)
    -> devuelve la publicación con id 3
*/
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

/*
  Cuenta cuántos registros hay en un store.

  Ejemplo:
  - contarStore("publicaciones")
    -> devuelve cuántas publicaciones hay guardadas
*/
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

/*
  Añade un nuevo registro al store.

  IMPORTANTE:
  - add() se usa para insertar uno nuevo
  - si ya existe esa clave, puede fallar
*/
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

/*
  Guarda o actualiza un registro en el store.

  IMPORTANTE:
  - put() inserta si no existe
  - o actualiza si ya existe

  Es muy útil cuando queremos "dejar guardado" algo sin preocuparnos
  de si ya estaba antes o no.

  add(...) → añadir nuevo
  put(...) → guardar/actualizar
*/
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

/*
  Elimina un registro del store por su clave.
  Se usa para:
  - borrar publicaciones
  - borrar seleccionadas
  - quitar una publicación del área seleccionada del dashboard
*/
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

/*
  Función principal de arranque del almacenamiento.

  Se encarga de:
  1. asegurarse de que existan usuarios iniciales en localStorage
  2. asegurarse de que existan publicaciones iniciales en IndexedDB

  En Producto 2, datos.js ya no es la fuente principal.
  Solo actúa como semilla inicial.
*/
export async function inicializarAlmacenamiento() {
  inicializarUsuariosSiNoExisten();
  await inicializarPublicacionesSiNoExisten();
}

/*
  Si todavía no hay usuarios guardados en localStorage,
  guardamos los usuarios iniciales.
*/
function inicializarUsuariosSiNoExisten() {
  if (!localStorage.getItem(CLAVES_STORAGE.usuarios)) {
    guardarJSONStorage(CLAVES_STORAGE.usuarios, usuariosIniciales);
  }
}

/*
  Inserta las publicaciones iniciales solo una vez.

  Antes, si el store quedaba vacío porque el usuario borraba todas las
  publicaciones manualmente, al refrescar se volvían a insertar.
  Ahora evitamos eso guardando una marca en localStorage.

  Así:
  - la primera vez se cargan las publicaciones iniciales
  - después ya no se vuelven a sembrar, aunque el store quede vacío
*/
async function inicializarPublicacionesSiNoExisten() {
  const yaInicializadas =
    localStorage.getItem(CLAVES_STORAGE.publicacionesInicializadas) === "true";

  // Si ya se cargaron una vez, no volvemos a insertarlas.
  if (yaInicializadas) {
    return;
  }

  const totalPublicaciones = await contarStore(STORE_PUBLICACIONES);

  // Solo sembramos si de verdad no hay publicaciones guardadas.
  if (totalPublicaciones === 0) {
    for (const publicacion of publicacionesIniciales) {
      await agregarEnStore(STORE_PUBLICACIONES, publicacion);
    }
  }

  // Marcamos que la siembra inicial ya se realizó.
  localStorage.setItem(CLAVES_STORAGE.publicacionesInicializadas, "true");
}

/*
  Devuelve la lista de usuarios ordenada alfabéticamente por nombre + apellidos.
*/
export function listarUsuarios() {
  const usuarios = leerJSONStorage(CLAVES_STORAGE.usuarios, []);

  return usuarios.sort((a, b) => {
    const nombreA = `${a.nombre} ${a.apellidos}`.toLowerCase();
    const nombreB = `${b.nombre} ${b.apellidos}`.toLowerCase();
    return nombreA.localeCompare(nombreB);
  });
}

/*
  Devuelve el usuario que está actualmente logueado.

  ¿Cómo lo sabe?
  1. Mira en localStorage qué email está guardado como usuario activo
  2. Busca ese email dentro del array de usuarios
*/
export function obtenerUsuarioActivo() {
  const emailActivo = normalizarEmail(localStorage.getItem(CLAVES_STORAGE.usuarioActivo));

  if (!emailActivo) {
    return null;
  }

  const usuarios = listarUsuarios();
  return usuarios.find((usuario) => usuario.email === emailActivo) || null;
}

/*
  Guarda en localStorage el email del usuario activo.
  Esto permite "recordar" el login entre páginas.
*/
export function guardarUsuarioActivo(email) {
  localStorage.setItem(CLAVES_STORAGE.usuarioActivo, normalizarEmail(email));
}

/*
  Cierra sesión eliminando el usuario activo de localStorage.
*/
export function cerrarSesion() {
  localStorage.removeItem(CLAVES_STORAGE.usuarioActivo);
}

/*
  Crea un nuevo usuario.

  Pasos:
  1. lee usuarios actuales
  2. normaliza los datos
  3. valida campos
  4. comprueba duplicados
  5. calcula un nuevo id
  6. lo guarda en localStorage
*/
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

/*
  Elimina un usuario por email.

  Además, si el usuario eliminado era el que estaba logueado,
  se cierra la sesión automáticamente.
*/
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

/*
  Intenta iniciar sesión con email y contraseña.

  Si encuentra un usuario que coincida, guarda su email como usuario activo.
*/
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

/*
  Devuelve todas las publicaciones ordenadas:
  1. primero por fecha más reciente
  2. si empatan en fecha, por id descendente
*/
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

/*
  Crea una nueva publicación en IndexedDB.

  Pasos:
  1. normaliza datos
  2. valida
  3. construye el objeto
  4. lo guarda en STORE_PUBLICACIONES
*/
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

/*
  Elimina una publicación por id.

  Además, también la elimina de STORE_SELECCIONADAS
  por si estaba arrastrada/seleccionada en el dashboard.
*/
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

/*
  Devuelve solo los ids de las publicaciones seleccionadas
  en el dashboard.
*/
export async function listarIdsSeleccionados() {
  const registros = await obtenerTodosDeStore(STORE_SELECCIONADAS);
  return registros.map((registro) => Number(registro.publicacionId));
}

/*
  Añade una publicación a la lista de seleccionadas.

  Aquí no guardamos la publicación completa,
  sino un registro con:
  - publicacionId
  - fechaSeleccion

  STORE_SELECCIONADAS usa keyPath: "publicacionId",
  por eso usamos put para insertar o actualizar sin errores.
*/
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

/*
  Quita una publicación de la lista de seleccionadas.
*/
export async function quitarPublicacionSeleccionada(idPublicacion) {
  const id = Number(idPublicacion);
  await eliminarDeStore(STORE_SELECCIONADAS, id);
  return true;
}

/*
  Devuelve solo las publicaciones que están seleccionadas.

  ¿Cómo?
  1. lee todas las publicaciones
  2. lee los ids seleccionados
  3. filtra las publicaciones cuyo id esté en la lista de seleccionados
*/
export async function listarPublicacionesSeleccionadas() {
  const [publicaciones, idsSeleccionados] = await Promise.all([
    listarPublicaciones(),
    listarIdsSeleccionados()
  ]);

  return publicaciones.filter((publicacion) => idsSeleccionados.includes(Number(publicacion.id)));
}

/*
  Devuelve solo las publicaciones que NO están seleccionadas.
*/
export async function listarPublicacionesDisponibles() {
  const [publicaciones, idsSeleccionados] = await Promise.all([
    listarPublicaciones(),
    listarIdsSeleccionados()
  ]);

  return publicaciones.filter((publicacion) => !idsSeleccionados.includes(Number(publicacion.id)));
}

/*
  Devuelve un objeto con los números resumen del dashboard:
  - cuántas ofertas hay
  - cuántas demandas hay
  - cuántos usuarios hay
  - cuántas publicaciones están seleccionadas
*/
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