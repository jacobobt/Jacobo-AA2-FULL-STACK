// assets/js/almacenamiento.js

const NOMBRE_BD = "jobconnect_bd";
const VERSION_BD = 1;

const STORE_USUARIOS = "usuarios";
const STORE_PUBLICACIONES = "publicaciones";

// Datos iniciales que antes estaban en datos.js
const usuariosIniciales = [
    {
        id: 1,
        nombre: "Laura",
        apellidos: "Martínez",
        email: "laura@jobconnect.com",
        password: "1234",
        rol: "candidato"
    },
    {
        id: 2,
        nombre: "Carlos",
        apellidos: "Gómez",
        email: "carlos@techempresa.com",
        password: "1234",
        rol: "empresa"
    },
    {
        id: 3,
        nombre: "Ana",
        apellidos: "Ruiz",
        email: "ana@jobconnect.com",
        password: "1234",
        rol: "candidato"
    }
];

const publicacionesIniciales = [
    {
        id: 1,
        tipo: "oferta",
        titulo: "Desarrollador/a Web Junior",
        categoria: "Desarrollo Web",
        autor: "TechNova SL",
        ubicacion: "Barcelona",
        descripcion: "Buscamos perfil junior con conocimientos de HTML, CSS y JavaScript.",
        emailContacto: "rrhh@technova.com",
        fecha: "2025-02-10"
    },
    {
        id: 2,
        tipo: "demanda",
        titulo: "Busco prácticas en frontend",
        categoria: "Frontend",
        autor: "Laura Martínez",
        ubicacion: "Girona",
        descripcion: "Estudiante DAW interesada en prácticas para aprender React y UX/UI.",
        emailContacto: "laura@jobconnect.com",
        fecha: "2025-02-12"
    },
    {
        id: 3,
        tipo: "oferta",
        titulo: "Técnico/a soporte IT",
        categoria: "Sistemas",
        autor: "Innova Services",
        ubicacion: "Tarragona",
        descripcion: "Se requiere perfil para soporte técnico presencial y remoto.",
        emailContacto: "empleo@innovaservices.com",
        fecha: "2025-02-14"
    },
    {
        id: 4,
        tipo: "demanda",
        titulo: "Colaboración en proyecto startup",
        categoria: "Full Stack",
        autor: "Ana Ruiz",
        ubicacion: "Remoto",
        descripcion: "Busco colaborar en startup tecnológica para ganar experiencia práctica.",
        emailContacto: "ana@jobconnect.com",
        fecha: "2025-02-15"
    }
];

export function abrirBaseDeDatos() {
    return new Promise((resolve, reject) => {
        const peticion = indexedDB.open(NOMBRE_BD, VERSION_BD);

        peticion.onerror = () => {
            reject(new Error("No se pudo abrir la base de datos."));
        };

        peticion.onsuccess = () => {
            resolve(peticion.result);
        };

        peticion.onupgradeneeded = (evento) => {
            const db = evento.target.result;

            if (!db.objectStoreNames.contains(STORE_USUARIOS)) {
                const storeUsuarios = db.createObjectStore(STORE_USUARIOS, {
                    keyPath: "id"
                });

                storeUsuarios.createIndex("email", "email", { unique: true });
                storeUsuarios.createIndex("rol", "rol", { unique: false });
            }

            if (!db.objectStoreNames.contains(STORE_PUBLICACIONES)) {
                const storePublicaciones = db.createObjectStore(STORE_PUBLICACIONES, {
                    keyPath: "id"
                });

                storePublicaciones.createIndex("tipo", "tipo", { unique: false });
                storePublicaciones.createIndex("categoria", "categoria", { unique: false });
            }
        };
    });
}

export async function inicializarDatos() {
    const usuarios = await obtenerTodos(STORE_USUARIOS);
    const publicaciones = await obtenerTodos(STORE_PUBLICACIONES);

    if (usuarios.length === 0) {
        for (const usuario of usuariosIniciales) {
            await agregarElemento(STORE_USUARIOS, usuario);
        }
    }

    if (publicaciones.length === 0) {
        for (const publicacion of publicacionesIniciales) {
            await agregarElemento(STORE_PUBLICACIONES, publicacion);
        }
    }
}

export async function obtenerTodos(nombreStore) {
    const db = await abrirBaseDeDatos();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(nombreStore, "readonly");
        const store = transaccion.objectStore(nombreStore);
        const peticion = store.getAll();

        peticion.onerror = () => {
            reject(new Error(`No se pudieron obtener los datos de ${nombreStore}.`));
        };

        peticion.onsuccess = () => {
            resolve(peticion.result);
        };
    });
}

export async function obtenerElementoPorId(nombreStore, id) {
    const db = await abrirBaseDeDatos();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(nombreStore, "readonly");
        const store = transaccion.objectStore(nombreStore);
        const peticion = store.get(id);

        peticion.onerror = () => {
            reject(new Error(`No se pudo obtener el elemento con id ${id}.`));
        };

        peticion.onsuccess = () => {
            resolve(peticion.result);
        };
    });
}

export async function agregarElemento(nombreStore, elemento) {
    const db = await abrirBaseDeDatos();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(nombreStore, "readwrite");
        const store = transaccion.objectStore(nombreStore);
        const peticion = store.add(elemento);

        peticion.onerror = () => {
            reject(new Error(`No se pudo agregar el elemento a ${nombreStore}.`));
        };

        peticion.onsuccess = () => {
            resolve(peticion.result);
        };
    });
}

export async function actualizarElemento(nombreStore, elemento) {
    const db = await abrirBaseDeDatos();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(nombreStore, "readwrite");
        const store = transaccion.objectStore(nombreStore);
        const peticion = store.put(elemento);

        peticion.onerror = () => {
            reject(new Error(`No se pudo actualizar el elemento en ${nombreStore}.`));
        };

        peticion.onsuccess = () => {
            resolve(peticion.result);
        };
    });
}

export async function eliminarElemento(nombreStore, id) {
    const db = await abrirBaseDeDatos();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(nombreStore, "readwrite");
        const store = transaccion.objectStore(nombreStore);
        const peticion = store.delete(id);

        peticion.onerror = () => {
            reject(new Error(`No se pudo eliminar el elemento de ${nombreStore}.`));
        };

        peticion.onsuccess = () => {
            resolve(true);
        };
    });
}

export async function obtenerSiguienteId(nombreStore) {
    const elementos = await obtenerTodos(nombreStore);

    if (elementos.length === 0) {
        return 1;
    }

    const ids = elementos.map((elemento) => elemento.id);
    return Math.max(...ids) + 1;
}

export {
    STORE_USUARIOS,
    STORE_PUBLICACIONES
};