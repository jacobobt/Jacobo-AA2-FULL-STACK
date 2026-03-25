# Arquitectura web frontend y usabilidad - Producto 1 (JobConnect)

## 1. Introducción
Este documento describe de forma simple la arquitectura web utilizada en el **Producto 1** del proyecto **JobConnect**, así como los criterios de usabilidad aplicados en el diseño del prototipo.

El Producto 1 está orientado al desarrollo de un **frontend funcional** con:
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES Modules)

No existe backend ni base de datos en esta fase, por lo que los datos se gestionan en memoria mediante arrays y objetos JavaScript.

---

## 2. Arquitectura web frontend aplicada

## 2.1 Tipo de arquitectura utilizada
En este producto se utiliza una **arquitectura frontend estática con lógica en cliente**, donde:

- La interfaz se compone de varias páginas HTML
- El estilo se aplica con CSS y Bootstrap
- La interacción y la lógica se implementan con JavaScript
- Los datos se almacenan temporalmente en memoria (`datos.js`)
- No hay servidor de aplicaciones ni API en este producto

Es una arquitectura adecuada para un **prototipo inicial**, ya que permite:
- validar la interfaz
- probar la interacción
- organizar el código
- preparar la base para futuras mejoras (Producto 2, 3 y 4)

---

## 2.2 Estructura modular del frontend
El proyecto se ha organizado de forma modular para facilitar su mantenimiento:

- `index.html` → dashboard principal
- `login.html` → acceso de usuario
- `usuarios.html` → gestión de usuarios
- `ofertas-demandas.html` → gestión de publicaciones

### Archivos JavaScript
- `datos.js` → datos comunes y funciones auxiliares
- `dashboard.js` → lógica del dashboard
- `login.js` → lógica de autenticación (prototipo)
- `usuarios.js` → alta, listado y baja de usuarios
- `ofertas-demandas.js` → alta, listado y baja de publicaciones
- `ui.js` → funciones comunes de sesión y navegación

Esta separación permite aplicar buenas prácticas de desarrollo:
- **responsabilidad por archivo**
- **reutilización de código**
- **mejor legibilidad**
- **facilidad de pruebas**

---

## 2.3 Gestión de datos en el Producto 1
Los datos se almacenan en arrays de objetos JavaScript dentro de `datos.js`, por ejemplo:
- usuarios
- publicaciones (ofertas y demandas)

### Características de esta gestión
- Los datos se manipulan con JavaScript en memoria
- No existe persistencia real
- Al recargar la página, se recuperan los datos iniciales
- Las altas y bajas son válidas solo durante la ejecución de la página

Este comportamiento está alineado con el enunciado del Producto 1.

---

## 2.4 Flujo general de funcionamiento del prototipo
1. El usuario abre una de las páginas del sistema.
2. El navegador carga el HTML, CSS y JS correspondientes.
3. El script de la página importa datos desde `datos.js`.
4. JavaScript genera contenido dinámico (tablas, tarjetas, contadores).
5. El usuario interactúa con formularios y botones.
6. Los eventos (`submit`, `click`) modifican los arrays en memoria.
7. La interfaz se actualiza con renderizado dinámico.

---

## 2.5 Preparación para arquitectura futura
Aunque este producto no tiene backend, el proyecto ya está preparado para evolucionar hacia una arquitectura más completa:

### Futuras mejoras esperadas
- **Producto 2**: uso de APIs HTML5 y mejoras de interacción
- **Producto 3**: backend con Node.js, Express, GraphQL y MongoDB
- **Producto 4**: integración full stack (frontend + backend)

La organización actual facilita esa evolución porque:
- la lógica está separada por módulos
- los datos se concentran en un punto común (`datos.js`)
- cada pantalla tiene una responsabilidad clara

---

## 3. Usabilidad aplicada en el prototipo

## 3.1 Objetivo de usabilidad
El objetivo principal de usabilidad en este producto ha sido crear una interfaz:
- clara
- fácil de entender
- rápida de usar
- coherente entre pantallas

Dado que se trata de una plataforma de empleo, la usabilidad es importante para que el usuario pueda:
- consultar información
- iniciar sesión
- publicar ofertas/demandas
- gestionar usuarios

sin confusión.

---

## 3.2 Principios de usabilidad aplicados

### a) Consistencia visual y funcional
Se ha mantenido una estructura similar en todas las pantallas:
- barra de navegación superior
- bloques principales con títulos claros
- formularios con estilo uniforme
- tablas/listados con formato Bootstrap

Esto reduce la curva de aprendizaje del usuario.

---

### b) Feedback inmediato al usuario
El sistema ofrece respuesta visual después de cada acción mediante mensajes Bootstrap (`alert`):
- errores de validación
- login correcto/incorrecto
- alta de registros
- eliminación de registros

Esto mejora la comprensión del estado del sistema.

---

### c) Formularios claros y sencillos
Los formularios se han diseñado con:
- etiquetas descriptivas
- campos agrupados
- validaciones básicas
- estructura ordenada

Así se evita que el usuario introduzca datos incompletos o erróneos.

---

### d) Navegación simple
Las pantallas principales están claramente separadas:
- Dashboard
- Login
- Gestión de usuarios
- Gestión de ofertas/demandas

Además, se muestra el correo del usuario en sesión para mejorar la orientación del usuario dentro de la aplicación.

---

### e) Diseño responsive con Bootstrap
Se utiliza Bootstrap para garantizar una buena visualización en distintos tamaños de pantalla:
- uso de contenedores
- rejilla (`row`, `col`)
- tablas y formularios adaptados
- componentes visuales reutilizables

Esto facilita la accesibilidad y la experiencia de uso.

---

## 3.3 Usabilidad del login (prototipo)
Aunque el login del Producto 1 es una simulación, se han aplicado buenas prácticas:
- validación de campos obligatorios
- comprobación de credenciales en memoria
- almacenamiento temporal de sesión en `localStorage`
- visualización del usuario activo en navbar
- botón de cerrar sesión

Esto permite representar una experiencia realista dentro de las limitaciones del prototipo.

---

## 3.4 Limitaciones de usabilidad en esta fase
Al tratarse de un prototipo inicial, existen limitaciones esperadas:
- no hay persistencia real
- no hay control de permisos por usuario
- no hay conexión entre páginas mediante backend
- no hay autenticación segura real

Estas limitaciones forman parte del alcance del Producto 1 y se abordarán en productos posteriores.

---

## 4. Conclusión
La arquitectura frontend utilizada en el Producto 1 es adecuada para un prototipo funcional y cumple con los objetivos de aprendizaje del módulo.

Se ha aplicado una estructura modular, clara y escalable, junto con principios básicos de usabilidad que mejoran la experiencia del usuario.

El proyecto queda preparado para evolucionar hacia una solución full stack en fases posteriores, manteniendo una base ordenada y profesional.