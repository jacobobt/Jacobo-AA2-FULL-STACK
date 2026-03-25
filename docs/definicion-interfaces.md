# Definición de interfaces - Producto 2

## 1. Introducción

En el Producto 2 del proyecto JobConnect se ha realizado una evolución de la interfaz desarrollada en el Producto 1. La aplicación mantiene las cuatro páginas principales, pero ahora incorpora persistencia de datos en el navegador y una interacción más avanzada mediante APIs de HTML5.

Las interfaces han sido diseñadas para ofrecer una navegación clara, coherente y sencilla, manteniendo una estructura visual homogénea en toda la aplicación. Además, se ha mejorado la experiencia de usuario añadiendo almacenamiento persistente, gráfico con Canvas y selección de publicaciones mediante Drag and Drop.

---

## 2. Objetivo de las interfaces

El objetivo principal de las interfaces de JobConnect es permitir al usuario gestionar de forma simple e intuitiva la información principal de la aplicación:

- iniciar sesión
- consultar el dashboard general
- gestionar usuarios
- gestionar ofertas y demandas de empleo
- visualizar información resumida y gráfica
- seleccionar y deseleccionar publicaciones en el dashboard

Todas las páginas comparten una misma línea visual basada en Bootstrap y una barra de navegación superior con acceso directo a las diferentes secciones.

---

## 3. Interfaces principales de la aplicación

### 3.1 Dashboard principal (`index.html`)

El dashboard es la página principal de la aplicación y actúa como panel general de consulta.

#### Elementos principales
- barra de navegación superior
- indicador del usuario logueado
- botón de cerrar sesión
- tarjetas resumen con el número de ofertas, demandas y usuarios
- contenedor de publicaciones recientes
- zona de selección de publicaciones

#### Funcionalidad
- muestra un resumen general de la aplicación
- carga las publicaciones almacenadas en IndexedDB
- genera tarjetas dinámicas con la información de cada publicación
- permite seleccionar publicaciones arrastrándolas a la zona inferior
- permite deseleccionar publicaciones arrastrándolas de nuevo al área principal
- mantiene guardada la selección del dashboard en IndexedDB

#### Mejoras respecto al Producto 1
- persistencia real de la selección
- interacción mediante Drag and Drop
- actualización automática del resumen
- mejor separación visual entre zona principal y zona de selección

---

### 3.2 Pantalla de login (`login.html`)

La interfaz de login permite autenticar al usuario en la aplicación.

#### Elementos principales
- barra de navegación
- formulario de correo electrónico
- formulario de contraseña
- botón de iniciar sesión
- zona de mensajes informativos

#### Funcionalidad
- valida que los campos estén completos
- autentica al usuario contra los datos almacenados
- guarda la sesión activa en localStorage
- muestra mensajes de error si las credenciales no son correctas
- muestra mensajes de éxito si el acceso se realiza correctamente
- actualiza la barra de navegación con el usuario activo

#### Mejoras respecto al Producto 1
- la sesión persiste al recargar la página
- el usuario activo se mantiene visible en la barra superior
- existe control de cierre de sesión desde la interfaz

---

### 3.3 Gestión de usuarios (`usuarios.html`)

La interfaz de usuarios está orientada al alta, consulta y borrado de usuarios del sistema.

#### Elementos principales
- barra de navegación
- formulario de alta de usuario
- tabla de usuarios registrados
- mensajes de validación y estado

#### Campos del formulario
- nombre
- apellidos
- correo electrónico
- contraseña
- rol

#### Funcionalidad
- permite crear nuevos usuarios
- valida que todos los campos obligatorios estén informados
- evita correos electrónicos duplicados
- muestra todos los usuarios guardados
- permite eliminar usuarios desde la tabla
- mantiene los datos en localStorage incluso tras recargar la página

#### Mejoras respecto al Producto 1
- persistencia real de usuarios
- gestión centralizada desde `almacenaje.js`
- mayor robustez en validación de datos
- actualización dinámica de la tabla

---

### 3.4 Gestión de ofertas y demandas (`ofertas-demandas.html`)

Esta interfaz está destinada al alta, consulta y borrado de publicaciones laborales.

#### Elementos principales
- barra de navegación
- formulario de nueva publicación
- tabla de publicaciones
- gráfico de barras con Canvas
- mensajes de validación y confirmación

#### Campos del formulario
- tipo de publicación
- título
- categoría profesional
- empresa o persona
- ubicación
- descripción
- fecha
- email de contacto

#### Funcionalidad
- permite registrar ofertas y demandas
- guarda las publicaciones en IndexedDB
- muestra las publicaciones en una tabla estructurada
- permite eliminar publicaciones
- actualiza automáticamente el gráfico con Canvas
- conserva la información al recargar la página

#### Mejoras respecto al Producto 1
- uso de IndexedDB
- incorporación del campo fecha
- gráfico visual con Canvas
- tabla mejor maquetada y más legible
- persistencia real de publicaciones

---

## 4. Elementos comunes de interfaz

Las cuatro páginas comparten un conjunto de elementos comunes para asegurar coherencia visual y funcional.

### 4.1 Barra de navegación
La barra superior permite acceder rápidamente a:
- dashboard
- login
- ofertas y demandas
- usuarios

También muestra:
- el correo del usuario activo si existe sesión
- el botón de cerrar sesión

### 4.2 Estilo visual homogéneo
Se ha utilizado Bootstrap 5 como base principal, combinado con estilos personalizados en `styles.css` para conseguir:
- mejor espaciado
- tablas más legibles
- formularios más claros
- tarjetas más limpias
- mejor integración visual de los componentes

### 4.3 Mensajes al usuario
Las interfaces muestran mensajes visuales mediante alertas Bootstrap para informar sobre:
- errores de validación
- operaciones correctas
- errores de almacenamiento
- confirmaciones de alta o borrado

---

## 5. Persistencia e interacción avanzada

Uno de los cambios más importantes del Producto 2 es que las interfaces ya no trabajan solamente con datos en memoria.

### 5.1 localStorage
Se utiliza para:
- almacenar usuarios
- guardar el usuario activo
- mantener la sesión iniciada

### 5.2 IndexedDB
Se utiliza para:
- almacenar ofertas y demandas
- almacenar la selección del dashboard

### 5.3 Canvas
Se utiliza en la pantalla de ofertas y demandas para representar gráficamente:
- número de ofertas
- número de demandas

### 5.4 Drag and Drop
Se utiliza en el dashboard para:
- seleccionar publicaciones
- deseleccionar publicaciones
- mantener una interacción más dinámica y visual

---

## 6. Valoración general de las interfaces

Las interfaces del Producto 2 presentan una mejora clara respecto al Producto 1, tanto en funcionalidad como en experiencia de usuario. La aplicación resulta más completa, más interactiva y más alineada con los objetivos del enunciado, ya que incorpora persistencia, visualización gráfica y manipulación dinámica de información desde el navegador.

La estructura modular del proyecto también facilita que cada interfaz tenga una responsabilidad bien definida y que el mantenimiento del código sea más sencillo.