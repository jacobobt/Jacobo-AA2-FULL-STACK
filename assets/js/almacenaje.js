import { usuariosIniciales, publicacionesIniciales } from "./datos.js";

/*
  Aquí guardamos los nombres de las claves que usaremos en localStorage.
  Lo hacemos en un objeto para no escribir los textos "a mano" cada vez
  y evitar errores de escritura.
*/
const CLAVES_STORAGE = {
  usuarios: "jobconnect_usuarios",
  usuarioActivo: "jobconnect_usuario_activo"
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
          keyPath: "id",       // la clave principal será la propiedad "id"
          autoIncrement: true  // el id se generará automáticamente
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
      //“Espera a que se abra la base de datos y guarda esa base en db.”
      const db = await abrirBaseDeDatos();
      //“Crea una transacción de solo lectura sobre el store indicado.”
      const transaccion = db.transaction(nombreStore, "readonly");
      //“Dentro de la transacción, obtén el store sobre el que quiero trabajar.”
      const store = transaccion.objectStore(nombreStore);
      //“dame todos los registros de este store”
      const peticion = store.getAll();

      //“Si la lectura sale bien, devuelve todos los registros obtenidos.” El resultado esta en peticion.result
      peticion.onsuccess = () => resolve(peticion.result);//resolve(...)la promesa principal devuelva ese resultado.
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

      //Si no encuentra nada:peticion.result puede venir vacío / undefined entonces devuelve null
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
      //ojo ya es readwrite porque vamos a modificar datos
      const transaccion = db.transaction(nombreStore, "readwrite");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.add(dato);

      peticion.onsuccess = () => resolve(peticion.result);//En un store con autoIncrement, el resultado suele ser la clave generada.
      //ej: const nuevoId = await agregarEnStore(STORE_PUBLICACIONES, nuevaPublicacion);
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

  En muchos contextos:

  add falla si ya existe esa clave
  put puede insertar o sobrescribir
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

  borrar publicaciones
  borrar seleccionadas
  quitar una publicación del área seleccionada del dashboard
*/
function eliminarDeStore(nombreStore, clave) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await abrirBaseDeDatos();
      const transaccion = db.transaction(nombreStore, "readwrite");
      const store = transaccion.objectStore(nombreStore);
      const peticion = store.delete(clave);

      //Simplemente devuelve true para indicar que fue bien.
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

  “Antes de empezar a trabajar, comprueba si ya hay datos guardados. 
  Si no los hay, mete los datos iniciales.”
  En Producto 1

  datos.js era la fuente principal.

  En Producto 2

  datos.js ya no es la fuente principal.
  Ahora solo sirve como semilla inicial.

  Y luego la fuente real pasa a ser:

  localStorage para usuarios
  IndexedDB para publicaciones
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
  Si todavía no hay publicaciones guardadas en IndexedDB,
  insertamos las publicaciones iniciales.

  Esto se hace una sola vez.
*/
async function inicializarPublicacionesSiNoExisten() {
  const totalPublicaciones = await contarStore(STORE_PUBLICACIONES);

  // Si ya hay publicaciones, no hacemos nada.
  if (totalPublicaciones > 0) {
    return;
  }

  // Si no hay publicaciones, añadimos las iniciales una por una.
  // No podemos usar un bucle forEach con async/await, así que usamos un for...of normal.
  //de una en una porque indexDB lo implementamos con add(dato) y no mete todo el array de golpe, 
  // sino que hay que ir añadiendo uno a uno. 
  // Si lo intentamos meter todo el array de golpe, 
  // no va a funcionar porque add() espera un solo objeto, no un array.
  for (const publicacion of publicacionesIniciales) {
    await agregarEnStore(STORE_PUBLICACIONES, publicacion);
  }
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

  // Validación: ningún campo puede quedar vacío.
  if (!nombre || !apellidos || !email || !password || !rol) {
    throw new Error("Todos los campos del usuario son obligatorios.");
  }

  // Validación simple de email.
  if (!email.includes("@")) {
    throw new Error("El correo electrónico no tiene un formato válido.");
  }

  // Validación simple de contraseña.
  if (password.length < 4) {
    throw new Error("La contraseña debe tener al menos 4 caracteres.");
  }

  // Comprobamos si ya existe un usuario con ese email.
  const usuarioDuplicado = usuarios.some((usuario) => usuario.email === email);

  if (usuarioDuplicado) {
    throw new Error("Ya existe un usuario con ese correo electrónico.");
  }

  /*
    Calculamos el siguiente id manualmente.
    Si no hay usuarios, empezamos en 1.
    Si ya hay, buscamos el id mayor y sumamos 1.
  */
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

  // Creamos un nuevo array sin el usuario a eliminar.
  const usuariosFiltrados = usuarios.filter((usuario) => usuario.email !== emailNormalizado);

  // Si no cambia el tamaño del array, es que no se encontró el usuario.
  if (usuariosFiltrados.length === usuarios.length) {
    throw new Error("No se encontró el usuario a eliminar.");
  }

  guardarJSONStorage(CLAVES_STORAGE.usuarios, usuariosFiltrados);//Sobrescribe el array antiguo con el nuevo array sin ese usuario.

  //Si borras al usuario que estaba logueado, también se cierra la sesión.
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
  //No pone id porque lo genera IndexedDB con autoIncrement.
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

  /*
    add() devuelve el id generado automáticamente por IndexedDB.
    Luego devolvemos el objeto completo con ese id añadido.
  */
  const nuevoId = await agregarEnStore(STORE_PUBLICACIONES, nuevaPublicacion);
  return { ...nuevaPublicacion, id: nuevoId };//...nuevaPublicacion copia todas las propiedades del objeto nuevaPublicacion 
  // y luego id:nuevoId añade esa propiedad id al nuevo objeto que se devuelve. 
  // Así el objeto resultante tiene todas las propiedades de nuevaPublicacion más la propiedad id con el valor generado por IndexedDB.
}

/*
  Elimina una publicación por id.

  Además, también la elimina de STORE_SELECCIONADAS
  por si estaba arrastrada/seleccionada en el dashboard.
*/
export async function eliminarPublicacion(idPublicacion) {
  //Muy importante porque en frontend muchas veces los ids vienen como string
  const id = Number(idPublicacion);

  //Valida que el id sea un entero válido.
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
  en el dashboard.Lee todas las selecciones del dashboard y devuelve solo sus ids.
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

  Así sabemos qué publicación fue seleccionada y cuándo.

  ¿Por qué guardarEnStore y no agregarEnStore?

  Porque STORE_SELECCIONADAS usa:

  keyPath: "publicacionId"

  Entonces put viene bien para:

  insertar si no estaba
  actualizar si ya estaba

  Así no da problemas si el usuario intenta volver a soltar la misma publicación.
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
  cuando una tarjeta vuelva al área de disponibles o cuando se quite de la selección.

  Conecta directamente con drag & drop.
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

    cuántas ofertas hay
    cuántas demandas hay
    cuántos usuarios hay
    cuántas publicaciones están seleccionadas
*/
export async function obtenerResumenDashboard() {
  const [publicaciones, idsSeleccionados] = await Promise.all([
    listarPublicaciones(),
    listarIdsSeleccionados()
  ]);
  //objeto resumen con los números que se muestran en el dashboard.
  return {
    totalOfertas: publicaciones.filter((publicacion) => publicacion.tipo === "oferta").length,
    totalDemandas: publicaciones.filter((publicacion) => publicacion.tipo === "demanda").length,
    totalUsuarios: listarUsuarios().length,
    totalSeleccionadas: idsSeleccionados.length
  };
}