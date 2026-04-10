# Arquitectura web frontend y usabilidad - Producto 2 (JobConnect)

## 1. Introducción
Este documento describe la arquitectura web utilizada en el **Producto 2** del proyecto **JobConnect**, así como los criterios de usabilidad aplicados durante su desarrollo.

En esta fase, el proyecto evoluciona respecto al Producto 1 incorporando:
- persistencia de datos en el navegador
- uso de APIs de HTML5
- programación modular en JavaScript
- mejora de la interacción del usuario

La aplicación sigue desarrollándose en **frontend**, sin framework de JavaScript y sin backend conectado todavía, utilizando:
- HTML5
- CSS3
- Bootstrap 5
- JavaScript modular (ES Modules)
- `localStorage`
- `IndexedDB`
- `Canvas`
- API nativa de **Drag & Drop**

El objetivo principal de esta versión es dejar el frontend preparado para que, en productos posteriores, la persistencia local pueda sustituirse por llamadas asíncronas a un backend real.

---

## 2. Arquitectura web frontend aplicada

## 2.1 Tipo de arquitectura utilizada
En este producto se utiliza una **arquitectura frontend modular con lógica en cliente y persistencia local en navegador**, donde:

- la interfaz se compone de varias páginas HTML enlazadas entre sí
- el diseño visual se apoya en Bootstrap y estilos personalizados
- la lógica de cada pantalla se implementa mediante módulos JavaScript
- la persistencia se reparte entre `localStorage` e `IndexedDB`
- no existe todavía servidor backend ni API externa conectada

Esta arquitectura es adecuada para el Producto 2 porque permite:
- mejorar la interacción de la aplicación
- trabajar con datos persistentes en el navegador
- separar responsabilidades por módulos
- preparar el proyecto para una futura integración full stack

---

## 2.2 Estructura general del proyecto
La aplicación se organiza en distintas pantallas, cada una con una responsabilidad concreta:

- `index.html` → dashboard principal con visualización y selección de publicaciones
- `login.html` → inicio de sesión del usuario
- `usuarios.html` → alta, consulta y borrado de usuarios
- `ofertas-demandas.html` → alta, consulta y borrado de publicaciones

Todas las páginas comparten una estructura visual homogénea:
- barra de navegación superior
- zona principal de contenido
- componentes Bootstrap
- scripts modulares específicos de cada vista

---

## 2.3 Estructura modular de JavaScript
El proyecto se ha organizado mediante módulos para mejorar el mantenimiento y la claridad del código.

### Módulos principales
- `assets/js/almacenaje.js` → módulo central de persistencia y operaciones CRUD
- `assets/js/int_1_dashboard.js` → lógica del dashboard y drag & drop
- `assets/js/int_2_login.js` → lógica del inicio de sesión
- `assets/js/int_3_empleos.js` → lógica de publicaciones y gráfico canvas
- `assets/js/int_4_usuarios.js` → lógica de alta, consulta y borrado de usuarios
- `assets/js/ui.js` → funciones comunes de interfaz y utilidades compartidas
- `assets/js/datos.js` → datos iniciales de semilla para la primera carga

### Ventajas de esta organización
Esta estructura modular permite:
- separar claramente la lógica por pantalla
- reutilizar funciones comunes
- reducir duplicidad de código
- facilitar pruebas y mantenimiento
- preparar la aplicación para futuras llamadas a un backend

---

## 2.4 Gestión de datos en Producto 2
Una de las diferencias más importantes respecto al Producto 1 es que en esta fase ya existe **persistencia en el navegador**.

### a) Uso de `localStorage`
Se utiliza `localStorage` para:
- guardar los usuarios del sistema
- guardar el usuario activo tras iniciar sesión
- controlar determinadas marcas internas de inicialización

Esto permite que los datos de usuario no se pierdan al recargar la página.

### b) Uso de `IndexedDB`
Se utiliza `IndexedDB` para:
- almacenar las publicaciones de tipo oferta y demanda
- almacenar las publicaciones seleccionadas en el dashboard

Esto aporta una persistencia más adecuada para estructuras de datos más dinámicas y cercanas a una pequeña base de datos local.

### c) Papel de `datos.js`
En Producto 2, `datos.js` ya no actúa como almacenamiento principal del sistema. Su función es servir como **fuente de datos iniciales** para sembrar la aplicación en la primera carga.

A partir de ese momento, la información real se gestiona desde:
- `localStorage` para usuarios y sesión
- `IndexedDB` para publicaciones y selecciones

---

## 2.5 Flujo general de funcionamiento
El funcionamiento general del proyecto se puede resumir así:

1. El usuario accede a una de las páginas del sistema.
2. El navegador carga el HTML, CSS y los módulos JavaScript necesarios.
3. Se inicializa el almacenamiento local si es necesario.
4. Cada pantalla recupera sus datos desde `localStorage` o `IndexedDB`.
5. JavaScript genera dinámicamente tablas, tarjetas, métricas y mensajes.
6. El usuario interactúa con formularios, botones o elementos arrastrables.
7. Las acciones realizadas actualizan la persistencia del navegador.
8. La interfaz se vuelve a renderizar para reflejar los cambios.

Este flujo permite que la aplicación mantenga los datos aunque se recargue la página, algo que no ocurría en el Producto 1.

---

## 2.6 Preparación para evolución futura
Aunque el proyecto todavía no conecta con backend, la arquitectura está preparada para evolucionar.

### Preparación del frontend
La aplicación ya está organizada para que, en una versión posterior:
- las funciones del módulo `almacenaje.js` puedan sustituir su lógica local por llamadas asíncronas
- la estructura modular se mantenga
- la interfaz no necesite rehacerse desde cero
- la aplicación pueda trabajar con una API remota en lugar de persistencia local

En este sentido, el Producto 2 actúa como una base intermedia entre el prototipo inicial y la futura integración completa del sistema.

---

## 3. Uso de APIs HTML5 en el proyecto

## 3.1 Web Storage
La API Web Storage se ha utilizado mediante `localStorage` para:
- guardar usuarios
- recuperar usuarios registrados
- recordar qué usuario ha iniciado sesión
- mantener información básica de estado entre páginas

Su uso encaja especialmente bien en la gestión de sesión simulada y en el mantenimiento del componente de usuarios.

---

## 3.2 IndexedDB
`IndexedDB` se ha utilizado para almacenar de forma persistente:
- ofertas y demandas
- publicaciones seleccionadas en el dashboard

Su uso aporta más flexibilidad que `localStorage` para trabajar con estructuras más amplias y operaciones CRUD más cercanas a una base de datos real.

---

## 3.3 Canvas
La API `Canvas` se ha utilizado en la pantalla de ofertas y demandas para representar visualmente la relación entre publicaciones de tipo oferta y demanda.

El gráfico se genera de manera nativa, sin librerías externas, cumpliendo así con el requisito del enunciado.

---

## 3.4 Drag & Drop
La API nativa de arrastrar y soltar se ha utilizado en el dashboard para permitir que el usuario:
- visualice publicaciones disponibles
- arrastre publicaciones al área de selección
- quite publicaciones seleccionadas si es necesario

Esta funcionalidad mejora la interacción y hace el dashboard más visual, dinámico e intuitivo.

---

## 4. Usabilidad aplicada en el proyecto

## 4.1 Objetivo de usabilidad
El objetivo principal de usabilidad en esta fase ha sido construir una interfaz:
- clara
- intuitiva
- coherente entre pantallas
- visualmente ordenada
- fácil de utilizar sin necesidad de instrucciones complejas

Dado que se trata de una aplicación de empleo, era importante que el usuario pudiera:
- iniciar sesión con facilidad
- gestionar usuarios sin confusión
- crear publicaciones correctamente
- visualizar y seleccionar ofertas o demandas de forma rápida

---

## 4.2 Principios de usabilidad aplicados

### a) Consistencia visual
Todas las pantallas mantienen una misma línea visual:
- navbar común
- estilos compartidos
- estructura basada en Bootstrap
- mensajes de feedback con componentes similares

Esto ayuda a que el usuario entienda rápido cómo moverse por la aplicación.

---

### b) Claridad en la navegación
Las secciones principales están claramente diferenciadas:
- Dashboard
- Login
- Usuarios
- Ofertas y demandas

Además, la barra de navegación muestra el usuario activo o el estado sin sesión, lo que mejora la orientación dentro del sistema.

---

### c) Feedback inmediato
La interfaz informa al usuario del resultado de sus acciones mediante:
- mensajes de error
- mensajes de éxito
- alertas visuales
- actualización dinámica de tablas y tarjetas

Esto reduce la incertidumbre y mejora la comprensión del estado de la aplicación.

---

### d) Formularios sencillos y directos
Los formularios se han diseñado con:
- campos bien etiquetados
- estructura ordenada
- validación básica de datos
- botones claramente visibles

Esto facilita el alta de usuarios y publicaciones, evitando errores frecuentes.

---

### e) Interacción visual mejorada
Producto 2 añade mejoras claras de interacción respecto a la fase anterior:
- persistencia real en navegador
- gráfico canvas
- drag & drop en el dashboard
- actualización dinámica del contenido

Estas mejoras hacen que la aplicación sea más cercana a un entorno real de uso.

---

### f) Diseño responsive
Bootstrap permite que la aplicación mantenga una presentación correcta en diferentes tamaños de pantalla mediante:
- contenedores
- filas y columnas
- tarjetas
- tablas
- formularios adaptables

Esto mejora la accesibilidad y la comodidad de uso.

---

## 4.3 Usabilidad por componentes

### Login
En la pantalla de login se han aplicado criterios de usabilidad como:
- formulario simple
- validación de credenciales
- mensajes claros
- persistencia del usuario activo

### Usuarios
En la pantalla de usuarios se prioriza:
- alta sencilla
- visualización clara del listado
- borrado accesible
- actualización inmediata de la tabla

### Ofertas y demandas
En esta pantalla se ha buscado:
- facilitar el alta de publicaciones
- mostrar la información de forma tabulada
- representar datos mediante canvas
- mantener una organización visual clara

### Dashboard
En el dashboard se ha trabajado especialmente:
- la visualización rápida de publicaciones
- la interacción mediante tarjetas
- la selección por arrastre
- la persistencia de publicaciones seleccionadas

---

## 4.4 Limitaciones actuales
Aunque el Producto 2 mejora mucho respecto al anterior, todavía existen limitaciones lógicas de esta fase:

- no hay autenticación real contra servidor
- no existe cifrado de contraseñas
- no hay control avanzado de permisos
- la persistencia depende del navegador local
- la aplicación no es multiusuario real
- no existe sincronización remota de datos

Estas limitaciones son coherentes con el alcance del producto y forman parte de la evolución prevista del proyecto.

---

## 5. Conclusión
La arquitectura aplicada en el **Producto 2** de JobConnect mejora de forma clara la base construida en el Producto 1.

La incorporación de `localStorage`, `IndexedDB`, `Canvas` y `Drag & Drop`, junto con una estructura modular en JavaScript, permite disponer de una aplicación frontend más completa, persistente y preparada para crecer.

Además, los criterios de usabilidad aplicados contribuyen a que la experiencia del usuario sea más clara, ordenada y coherente, dejando una base sólida para la futura integración con backend en fases posteriores.