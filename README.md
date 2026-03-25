# FULL STACK ATTACK - JobConnect (Producto 2)

## Descripción
**JobConnect** es una plataforma colaborativa de ofertas y demandas de empleo desarrollada por el grupo **FULL STACK ATTACK**.

Este proyecto corresponde al **Producto 2**, centrado en la mejora de la aplicación construida en el **Producto 1** mediante el uso de diferentes **APIs de HTML5** y la incorporación de **persistencia en el navegador**.

La aplicación ha sido desarrollada con:
- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript vanilla**

La aplicación permite:
- Visualización de ofertas y demandas de empleo
- Login de usuario
- Gestión de usuarios
- Gestión de publicaciones
- Dashboard con resumen de datos
- Drag and Drop de publicaciones
- Gráfico de ofertas y demandas con Canvas
- Persistencia de datos en el navegador

---

## Objetivos del Producto 2
- Mejorar la aplicación desarrollada en el **Producto 1**
- Incorporar persistencia de datos en el navegador
- Utilizar APIs de HTML5 en un caso práctico real
- Modularizar el proyecto en archivos JavaScript especializados
- Preparar el frontend para futuras integraciones con backend
- Mantener una estructura profesional, clara y escalable

---

## Funcionalidades implementadas

### Interfaz 1 - Dashboard (`index.html`)
- Resumen de:
  - número de ofertas
  - número de demandas
  - número de usuarios
- Visualización de tarjetas de publicaciones
- Zona de selección mediante **Drag and Drop**
- Almacenamiento de publicaciones seleccionadas en **IndexedDB**

### Interfaz 2 - Login (`login.html`)
- Formulario de acceso con email y contraseña
- Validación de campos obligatorios
- Comprobación de credenciales
- Guardado de sesión en `localStorage`
- Visualización del correo en la barra de navegación
- Botón de cerrar sesión

### Interfaz 3 - Gestión de ofertas y demandas (`ofertas-demandas.html`)
- Alta de publicaciones de tipo oferta o demanda
- Listado dinámico en tabla
- Eliminación de publicaciones
- Validaciones básicas de formulario
- Gráfico dinámico realizado con **Canvas**
- Actualización automática del gráfico al añadir o eliminar publicaciones

### Interfaz 4 - Gestión de usuarios (`usuarios.html`)
- Alta de usuarios
- Listado dinámico en tabla
- Eliminación de usuarios
- Validación de campos obligatorios
- Control de correos duplicados

### Mejoras UX y técnicas
- Navbar común en todas las pantallas
- Botón de cerrar sesión
- Script común de UI (`ui.js`) para gestión de sesión en la interfaz
- Uso de `localStorage` para usuarios y sesión activa
- Uso de **IndexedDB** para publicaciones y selección del dashboard
- Uso de **Canvas API**
- Uso de **Drag and Drop API**
- Separación entre lógica de interfaz y lógica de almacenamiento

---

## Tecnologías utilizadas
- HTML5
- CSS3
- Bootstrap 5
- JavaScript vanilla
- localStorage
- IndexedDB
- Canvas API
- Drag and Drop API
- Git (control de versiones)
- GitHub
- VS Code

---

## Estructura del proyecto

    .
    ├── index.html
    ├── login.html
    ├── ofertas-demandas.html
    ├── usuarios.html
    ├── README.md
    ├── assets
    │   ├── css
    │   │   └── styles.css
    │   └── js
    │       ├── almacenaje.js
    │       ├── datos-iniciales.js
    │       ├── int_1_dashboard.js
    │       ├── int_2_login.js
    │       ├── int_3_empleos.js
    │       ├── int_4_usuarios.js
    │       └── ui.js
    └── docs
        ├── producto2-uml-requisitos.md
        └── uml
            ├── diagrama-componentes-producto2.pdf
            └── diagrama-modulos-funciones-producto2.pdf

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

## Persistencia de datos

En esta versión ya existe persistencia real en el navegador.

### localStorage
Se utiliza para almacenar:
- usuarios
- usuario activo
- sesión iniciada

### IndexedDB
Se utiliza para almacenar:
- publicaciones de empleo
- selección del dashboard

---

## Datos iniciales

La aplicación carga datos iniciales definidos en `datos-iniciales.js`.

Esto permite que:
- el sistema no empiece vacío
- se puedan hacer pruebas desde el primer momento
- existan usuarios y publicaciones base

---

## Organización de módulos JavaScript

### `almacenaje.js`
- Módulo central de persistencia y acceso a datos
- Gestiona usuarios, sesión activa, IndexedDB, publicaciones y selección del dashboard

### `ui.js`
- Módulo común de interfaz
- Gestiona la visualización del usuario activo en la navbar
- Controla el botón de cerrar sesión
- Redirige al login al cerrar sesión

### `int_2_login.js`
- Controla la lógica de la pantalla de login

### `int_4_usuarios.js`
- Controla la lógica de alta, listado y borrado de usuarios

### `int_3_empleos.js`
- Controla la lógica de publicaciones
- Gestiona el gráfico Canvas

### `int_1_dashboard.js`
- Controla la lógica del dashboard
- Gestiona la funcionalidad de Drag and Drop

### `datos-iniciales.js`
- Contiene los datos base para inicializar la aplicación

---

## Documentación incluida

En la carpeta `docs/` se incluye:
- Documento de requisitos y UML del Producto 2
- Diagrama de componentes en PDF
- Diagrama UML de módulos y funciones en PDF

---

## Mejoras respecto al Producto 1

Las principales mejoras incorporadas en este producto son:
- Persistencia real en el navegador
- Uso de `localStorage`
- Uso de **IndexedDB**
- Uso de **Canvas**
- Uso de **Drag and Drop**
- Modularización más clara del código
- Mejora visual y funcional de la gestión de publicaciones
- Separación entre lógica de interfaz y lógica de almacenamiento

---

## Estado del proyecto

✅ **Producto 2 funcional**

### Funcionalidades actualmente operativas

- Login funcional
- Gestión de usuarios funcional
- Gestión de ofertas y demandas funcional
- Dashboard funcional
- Persistencia en navegador
- Gráfico Canvas funcional
- Drag and Drop funcional
- Documentación UML preparada

---

## Autoría

Proyecto realizado por el equipo **FULL STACK ATTACK** para la asignatura de desarrollo full stack.

Este **Producto 2** ha sido desarrollado a partir de la base del **Producto 1**, ampliando la funcionalidad e interacción de la aplicación según los requisitos del enunciado.