# FULL STACK ATTACK - JobConnect (Producto 1)

## Descripción
**JobConnect** es una plataforma colaborativa de ofertas y demandas de empleo desarrollada por el grupo **FULL STACK ATTACK**.

Este proyecto corresponde al **Producto 1**, centrado en el desarrollo del **frontend** con:
- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript básico (ES Modules)**

La aplicación permite simular:
- Visualización de ofertas y demandas de empleo
- Login de usuario (prototipo)
- Gestión de usuarios
- Gestión de publicaciones (ofertas/demandas)

---

## Objetivos del Producto 1
- Aplicar HTML5, CSS3 y Bootstrap en una interfaz web responsive
- Practicar JavaScript básico con eventos, arrays, objetos y DOM
- Organizar el proyecto con estructura profesional
- Implementar un prototipo funcional sin backend ni base de datos
- Documentar el uso de IA, arquetipos, usabilidad y arquitectura frontend

---

## Funcionalidades implementadas

### Interfaz 1 - Dashboard (`index.html`)
- Resumen de:
  - número de ofertas
  - número de demandas
  - número de usuarios
- Visualización de tarjetas de publicaciones
- Diferenciación visual entre ofertas y demandas

### Interfaz 2 - Login (`login.html`)
- Formulario de acceso con email y contraseña
- Validación de credenciales contra datos en memoria
- Mensajes de error/éxito
- Guardado de sesión en `localStorage`
- Visualización del correo en la barra de navegación

### Interfaz 3 - Gestión de ofertas y demandas (`ofertas-demandas.html`)
- Alta de publicaciones (oferta/demanda)
- Listado dinámico en tabla
- Eliminación de publicaciones
- Validaciones básicas de formulario

### Interfaz 4 - Gestión de usuarios (`usuarios.html`)
- Alta de usuarios
- Listado dinámico en tabla
- Eliminación de usuarios
- Validaciones básicas de formulario

### Mejoras UX
- Navbar común en todas las pantallas
- Botón de cerrar sesión
- Script común de UI (`ui.js`) para gestión de sesión en la interfaz

---

## Tecnologías utilizadas
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES Modules)
- Git (control de versiones)
- VS Code
- Trello (planificación del equipo)

---

## Estructura del proyecto

    full-stack-attack-jobboard/
    ├── index.html
    ├── login.html
    ├── ofertas-demandas.html
    ├── usuarios.html
    ├── assets/
    │   ├── css/
    │   │   └── styles.css
    │   ├── js/
    │   │   ├── datos.js
    │   │   ├── ui.js
    │   │   ├── dashboard.js
    │   │   ├── login.js
    │   │   ├── ofertas-demandas.js
    │   │   └── usuarios.js
    │   └── img/
    ├── docs/
    │   ├── prompts-ia.md
    │   ├── arquetipos-usuarios.md
    │   ├── definicion-interfaces.md
    │   ├── bibliografia.md
    │   ├── arquitectura-web-usabilidad.md
    │   └── mockup/
    │       └── checklist-mockup.md
    ├── evidencias/
    │   └── mapa-conceptual/
    ├── .gitignore
    └── README.md

---

## Cómo ejecutar el proyecto

### Opción recomendada (VS Code + Live Server)

1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Instala la extensión **Live Server**.
3. Abre `index.html` con:
   - clic derecho → **Open with Live Server**

### Navegación entre pantallas

- `index.html` → **Dashboard**
- `login.html` → **Login**
- `ofertas-demandas.html` → **Gestión de ofertas y demandas**
- `usuarios.html` → **Gestión de usuarios**

---

## Usuarios de prueba (login)

Puedes iniciar sesión con cualquiera de estos usuarios:

- **laura@jobconnect.com** / `1234`
- **carlos@techempresa.com** / `1234`
- **ana@jobconnect.com** / `1234`

---

## Limitación del prototipo (Producto 1)

En esta versión **no existe persistencia real de datos** (no hay backend ni base de datos).

Las altas y bajas de usuarios, ofertas y demandas se realizan **en memoria**.  
Por tanto:

- al recargar la página
- o al cambiar de pantalla

se recuperan los datos iniciales definidos en `assets/js/datos.js`.

Esta limitación está prevista en el enunciado del **Producto 1** y se resolverá en productos posteriores.

---

## Documentación incluida

En la carpeta `docs/` se incluye:

- Registro de prompts usados con IA generativa
- Arquetipos de usuario
- Definición funcional de interfaces
- Checklist de mockup
- Bibliografía y recursos
- Descripción simple de arquitectura frontend y usabilidad

---

## Estado del proyecto

✅ **Producto 1 funcional (frontend prototipo)**

### Pendiente de completar para la entrega final

- Repositorio remoto en GitHub
- Evidencias (capturas)
- Mapa conceptual en imagen
- Mockup final adjunto