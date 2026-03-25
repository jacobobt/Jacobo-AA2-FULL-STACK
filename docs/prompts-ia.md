# Registro de prompts IA - Producto 1 (JobConnect)

## Información general
- **Proyecto**: FULL STACK ATTACK - JobConnect
- **Producto**: Producto 1 (Frontend con HTML, CSS, Bootstrap y JavaScript)
- **Herramientas IA utilizadas**: ChatGPT
- **Objetivo del documento**: Registrar las consultas realizadas con IA generativa y cómo se han aplicado en el desarrollo del prototipo

---

## Criterio de documentación seguido
Se registran prompts relacionados con:
- Estructura del proyecto
- Diseño de interfaces
- Lógica JavaScript por pantalla
- Gestión de datos en memoria
- Mejora de UX y refactorización
- Documentación final del proyecto

> Nota: El contenido generado por IA se ha revisado, adaptado y aplicado manualmente al proyecto.

---

# 1) Prompts generales del proyecto (estructura y documentación)

## Prompt 1
- **Herramienta IA**: ChatGPT
- **Objetivo**: Preparar la estructura inicial del proyecto (carpetas, archivos y organización base)
- **Prompt usado**: Guía paso a paso para crear la estructura profesional de un proyecto frontend en VS Code con HTML, CSS, Bootstrap y JavaScript modular
- **Respuesta resumida**: Se propuso una estructura con páginas HTML, carpetas `assets`, `docs`, `evidencias`, archivos JS separados por pantalla y documentación base
- **Cómo se aplicó**: Se creó la base del proyecto `full-stack-attack-jobboard` con organización limpia y preparada para las 4 interfaces

## Prompt 2
- **Herramienta IA**: ChatGPT
- **Objetivo**: Definir la documentación necesaria para cumplir la rúbrica
- **Prompt usado**: Ayuda para identificar documentos obligatorios del producto (arquetipos, mockup, bibliografía, usabilidad, prompts IA)
- **Respuesta resumida**: Se definió una lista de documentos en `docs/` y `evidencias/` para cumplir requisitos de evaluación
- **Cómo se aplicó**: Se crearon los archivos de documentación y la estructura de carpetas correspondiente

## Prompt 3
- **Herramienta IA**: ChatGPT
- **Objetivo**: Redactar el README del proyecto de forma profesional
- **Prompt usado**: Redacción de README con descripción, objetivos, funcionalidades, estructura, ejecución, usuarios de prueba y limitaciones del prototipo
- **Respuesta resumida**: Se generó un README completo y organizado en secciones, listo para GitHub
- **Cómo se aplicó**: Se sustituyó el README inicial por una versión final con formato Markdown profesional

## Prompt 4
- **Herramienta IA**: ChatGPT
- **Objetivo**: Preparar el proyecto para Git y GitHub
- **Prompt usado**: Guía paso a paso para instalar Git, configurarlo en Windows, hacer commits y subir el repositorio a GitHub
- **Respuesta resumida**: Se indicó cómo instalar Git, configurar `user.name` y `user.email`, crear commits y publicar el repositorio remoto
- **Cómo se aplicó**: Se completó la instalación/configuración de Git y se subió el proyecto al repositorio GitHub del grupo

---

# 2) Prompts de diseño e interfaz (HTML/CSS/Bootstrap)

## Prompt 5
- **Herramienta IA**: ChatGPT
- **Objetivo**: Diseñar el esqueleto HTML de las 4 pantallas del prototipo
- **Prompt usado**: Creación paso a paso de la estructura HTML de dashboard, login, gestión de usuarios y gestión de ofertas/demandas con Bootstrap
- **Respuesta resumida**: Se generó una estructura base para las 4 interfaces con navegación, secciones, formularios y tablas
- **Cómo se aplicó**: Se crearon `index.html`, `login.html`, `usuarios.html` y `ofertas-demandas.html` con estructura responsive

## Prompt 6
- **Herramienta IA**: ChatGPT
- **Objetivo**: Aplicar estilos personalizados sobre Bootstrap
- **Prompt usado**: Propuesta de estilos CSS para mejorar la interfaz del proyecto (cards, badges, espaciado, tablas y secciones)
- **Respuesta resumida**: Se sugirieron estilos para tarjetas, badges de oferta/demanda, espaciado, navbar y mejoras visuales
- **Cómo se aplicó**: Se implementaron estilos en `assets/css/styles.css` para dar coherencia visual al prototipo

## Prompt 7
- **Herramienta IA**: ChatGPT
- **Objetivo**: Mejorar la usabilidad del frontend
- **Prompt usado**: Recomendaciones UX para prototipo de plataforma de empleo con navegación simple y formularios claros
- **Respuesta resumida**: Se propusieron mejoras como navbar consistente, feedback visual, mensajes de error/éxito y jerarquía visual
- **Cómo se aplicó**: Se adaptó la estructura de las páginas y se añadieron mensajes Bootstrap y barra de navegación consistente

## Prompt 8
- **Herramienta IA**: ChatGPT
- **Objetivo**: Preparar la documentación de mockup y arquetipos
- **Prompt usado**: Ayuda para redactar checklist de mockup y definición de arquetipos de usuario para una plataforma de empleo
- **Respuesta resumida**: Se generaron guías y texto base para documentar mockup, arquetipos y criterios de diseño
- **Cómo se aplicó**: Se completaron `docs/mockup/checklist-mockup.md` y `docs/arquetipos-usuarios.md`

---

# 3) Prompts de datos comunes y modularidad (datos.js / base JS)

## Prompt 9
- **Herramienta IA**: ChatGPT
- **Objetivo**: Crear el fichero `datos.js` con datos en memoria
- **Prompt usado**: Generar un módulo JS con arrays de usuarios y publicaciones para prototipo sin persistencia
- **Respuesta resumida**: Se creó una base de datos simulada en memoria con objetos JS para usuarios y ofertas/demandas
- **Cómo se aplicó**: Se implementó `assets/js/datos.js` como fuente común de datos del proyecto

## Prompt 10
- **Herramienta IA**: ChatGPT
- **Objetivo**: Añadir funciones auxiliares de conteo para el dashboard
- **Prompt usado**: Crear funciones JS modulares para contar ofertas, demandas y usuarios desde arrays
- **Respuesta resumida**: Se generaron funciones de utilidades (`obtenerTotalOfertas`, `obtenerTotalDemandas`, `obtenerTotalUsuarios`)
- **Cómo se aplicó**: Se exportaron y reutilizaron en `dashboard.js`

## Prompt 11
- **Herramienta IA**: ChatGPT
- **Objetivo**: Añadir funciones de alta y baja para usuarios/publicaciones
- **Prompt usado**: Diseñar funciones auxiliares para insertar y eliminar registros por ID en arrays en memoria
- **Respuesta resumida**: Se crearon funciones para obtener siguiente ID, agregar y eliminar elementos
- **Cómo se aplicó**: Se incorporaron funciones en `datos.js` para `usuarios.js` y `ofertas-demandas.js`

## Prompt 12
- **Herramienta IA**: ChatGPT
- **Objetivo**: Explicar el límite del Producto 1 (sin persistencia)
- **Prompt usado**: Confirmar comportamiento esperado de datos en memoria al recargar páginas y cómo documentarlo
- **Respuesta resumida**: Se aclaró que la pérdida de datos al recargar es correcta en Producto 1 y se recomendó documentarlo
- **Cómo se aplicó**: Se añadió la limitación del prototipo en el `README.md`

---

# 4) Prompts de la pantalla Dashboard (`index.html` + `dashboard.js`)

## Prompt 13
- **Herramienta IA**: ChatGPT
- **Objetivo**: Implementar el dashboard con resumen de datos
- **Prompt usado**: Crear `dashboard.js` para mostrar estadísticas de ofertas, demandas y usuarios desde `datos.js`
- **Respuesta resumida**: Se generó la lógica para leer el DOM y pintar los contadores del dashboard
- **Cómo se aplicó**: Se implementó `assets/js/dashboard.js` con renderizado de métricas principales

## Prompt 14
- **Herramienta IA**: ChatGPT
- **Objetivo**: Renderizar tarjetas de publicaciones en el dashboard
- **Prompt usado**: Crear tarjetas dinámicas con JS para mostrar publicaciones en Bootstrap diferenciando oferta/demanda
- **Respuesta resumida**: Se creó un render dinámico con creación de nodos, badges y contenido resumido por tarjeta
- **Cómo se aplicó**: El dashboard muestra tarjetas cargadas desde el array `publicaciones`

## Prompt 15
- **Herramienta IA**: ChatGPT
- **Objetivo**: Gestionar el caso sin publicaciones en dashboard
- **Prompt usado**: Añadir manejo de estado vacío en dashboard con alerta visual Bootstrap
- **Respuesta resumida**: Se propuso mostrar un mensaje de alerta cuando no existan publicaciones
- **Cómo se aplicó**: Se dejó controlado el caso vacío con `alert alert-secondary`

## Prompt 16
- **Herramienta IA**: ChatGPT
- **Objetivo**: Mostrar la sesión del usuario en la navbar del dashboard
- **Prompt usado**: Leer `localStorage` en `dashboard.js` y mostrar el correo del usuario logueado
- **Respuesta resumida**: Se incorporó lógica de lectura de sesión simulada para reflejar el correo en la navegación
- **Cómo se aplicó**: La navbar del dashboard muestra “Sesión: correo” si existe login previo

---

# 5) Prompts de la pantalla Login (`login.html` + `login.js`)

## Prompt 17
- **Herramienta IA**: ChatGPT
- **Objetivo**: Implementar el formulario de login con JS
- **Prompt usado**: Crear `login.js` con listener `submit`, validación básica y comprobación de credenciales
- **Respuesta resumida**: Se generó la lógica para capturar email/password y validar contra el array `usuarios`
- **Cómo se aplicó**: Se implementó el login funcional del prototipo en `assets/js/login.js`

## Prompt 18
- **Herramienta IA**: ChatGPT
- **Objetivo**: Mostrar mensajes de error y éxito en el login
- **Prompt usado**: Añadir feedback visual con componentes `alert` de Bootstrap tras validar el formulario
- **Respuesta resumida**: Se creó una función para renderizar mensajes dinámicos de error/éxito
- **Cómo se aplicó**: El usuario recibe feedback claro si falla o acierta el login

## Prompt 19
- **Herramienta IA**: ChatGPT
- **Objetivo**: Guardar sesión simulada en `localStorage`
- **Prompt usado**: Almacenar datos básicos del usuario autenticado en `localStorage` tras login correcto
- **Respuesta resumida**: Se propuso guardar un objeto con id, nombre, email y rol para simular sesión
- **Cómo se aplicó**: Se usa `localStorage.setItem("usuarioLogueado", ...)` en el login

## Prompt 20
- **Herramienta IA**: ChatGPT
- **Objetivo**: Mostrar el correo del usuario autenticado en la navbar
- **Prompt usado**: Actualizar la barra de navegación del login y del resto de páginas con los datos de sesión
- **Respuesta resumida**: Se integró la lógica de sesión para reflejar la cuenta activa en la interfaz
- **Cómo se aplicó**: La navbar muestra el correo del usuario si ha iniciado sesión correctamente

---

# 6) Prompts de la pantalla Usuarios (`usuarios.html` + `usuarios.js`)

## Prompt 21
- **Herramienta IA**: ChatGPT
- **Objetivo**: Implementar alta de usuarios con formulario
- **Prompt usado**: Crear `usuarios.js` para capturar formulario de alta, validar y añadir usuarios a un array en memoria
- **Respuesta resumida**: Se generó la lógica de alta con listener `submit`, validaciones y creación de objeto usuario
- **Cómo se aplicó**: Se añadió funcionalidad de alta de usuario en `usuarios.html`

## Prompt 22
- **Herramienta IA**: ChatGPT
- **Objetivo**: Renderizar tabla de usuarios dinámicamente
- **Prompt usado**: Pintar una tabla Bootstrap desde el array `usuarios` con JavaScript
- **Respuesta resumida**: Se creó una función `pintarTablaUsuarios()` que recorre el array y genera filas
- **Cómo se aplicó**: La pantalla de usuarios muestra listado dinámico al cargar y tras cambios

## Prompt 23
- **Herramienta IA**: ChatGPT
- **Objetivo**: Eliminar usuarios por ID
- **Prompt usado**: Añadir botones de eliminación por fila con `addEventListener` y borrado del array
- **Respuesta resumida**: Se implementó la eliminación mediante botones y función auxiliar `eliminarUsuarioPorId`
- **Cómo se aplicó**: Cada fila incluye botón “Eliminar” con borrado en memoria y refresco de tabla

## Prompt 24
- **Herramienta IA**: ChatGPT
- **Objetivo**: Añadir validaciones básicas en la gestión de usuarios
- **Prompt usado**: Validar campos obligatorios, longitud mínima de contraseña y email duplicado
- **Respuesta resumida**: Se añadieron validaciones simples y mensajes de feedback visual
- **Cómo se aplicó**: La interfaz impide altas inválidas y muestra mensajes Bootstrap al usuario

---

# 7) Prompts de la pantalla Ofertas y Demandas (`ofertas-demandas.html` + `ofertas-demandas.js`)

## Prompt 25
- **Herramienta IA**: ChatGPT
- **Objetivo**: Implementar alta de publicaciones (ofertas/demandas)
- **Prompt usado**: Crear `ofertas-demandas.js` para registrar publicaciones con formulario y guardarlas en array
- **Respuesta resumida**: Se generó la lógica de captura de formulario, validación y alta de objetos publicación
- **Cómo se aplicó**: Se añadió el alta de ofertas y demandas en la pantalla de gestión

## Prompt 26
- **Herramienta IA**: ChatGPT
- **Objetivo**: Renderizar tabla de publicaciones dinámicamente
- **Prompt usado**: Pintar una tabla Bootstrap con publicaciones desde `datos.js` y distinguir tipo por color
- **Respuesta resumida**: Se creó la función para pintar la tabla y mostrar badges para oferta y demanda
- **Cómo se aplicó**: La tabla de publicaciones se actualiza en tiempo real tras altas y bajas

## Prompt 27
- **Herramienta IA**: ChatGPT
- **Objetivo**: Eliminar publicaciones por ID
- **Prompt usado**: Añadir botones de borrado en cada fila de la tabla con listeners de click
- **Respuesta resumida**: Se implementó la baja de publicaciones usando función auxiliar `eliminarPublicacionPorId`
- **Cómo se aplicó**: Se permite eliminar ofertas/demandas desde la tabla del prototipo

## Prompt 28
- **Herramienta IA**: ChatGPT
- **Objetivo**: Validar formulario de publicaciones
- **Prompt usado**: Añadir validación de campos obligatorios y longitud mínima de descripción en el formulario de publicaciones
- **Respuesta resumida**: Se añadieron controles de validación y mensajes de error/éxito con Bootstrap
- **Cómo se aplicó**: La pantalla de ofertas/demandas controla entradas inválidas antes de guardar

---

# 8) Prompts de refactorización y UX común (`ui.js`)

## Prompt 29
- **Herramienta IA**: ChatGPT
- **Objetivo**: Evitar repetir la lógica de sesión en varias páginas
- **Prompt usado**: Refactorizar la gestión de usuario logueado en un script común reutilizable
- **Respuesta resumida**: Se propuso crear `ui.js` con funciones compartidas para sesión y navbar
- **Cómo se aplicó**: Se creó `assets/js/ui.js` y se importó en `dashboard.js`, `login.js`, `usuarios.js` y `ofertas-demandas.js`

## Prompt 30
- **Herramienta IA**: ChatGPT
- **Objetivo**: Implementar botón “Cerrar sesión”
- **Prompt usado**: Añadir un botón de logout en la navbar con limpieza de `localStorage` y redirección a login
- **Respuesta resumida**: Se definió la lógica para ocultar/mostrar botón y cerrar sesión correctamente
- **Cómo se aplicó**: Se añadió botón `Cerrar sesión` en las 4 pantallas y su comportamiento en `ui.js`

## Prompt 31
- **Herramienta IA**: ChatGPT
- **Objetivo**: Mantener coherencia visual entre pantallas
- **Prompt usado**: Revisar la navbar y la experiencia de uso para que todas las páginas se comporten igual con la sesión
- **Respuesta resumida**: Se recomendó centralizar la actualización de la navbar y reutilizar funciones comunes
- **Cómo se aplicó**: Todas las pantallas muestran el mismo comportamiento de sesión y logout

## Prompt 32
- **Herramienta IA**: ChatGPT
- **Objetivo**: Revisión final del Producto 1 antes de subir a GitHub
- **Prompt usado**: Checklist final de validación del prototipo para comprobar JS, docs, rúbrica y entrega
- **Respuesta resumida**: Se realizó una revisión general del estado del proyecto, README, Git y requisitos del producto
- **Cómo se aplicó**: Se corrigieron detalles finales y se publicó el repositorio en GitHub

---

## Observaciones finales
- Las respuestas generadas por IA se han utilizado como **apoyo técnico y guía**, adaptándose al enunciado del Producto 1.
- El código final ha sido **revisado, probado y ajustado manualmente**.
- El prototipo cumple con el enfoque del producto: **frontend funcional con datos en memoria y sin persistencia real**.