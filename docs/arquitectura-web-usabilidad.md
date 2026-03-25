# Arquitectura web y usabilidad - Producto 2

## 1. Introducción

El Producto 2 de JobConnect parte de la base visual y estructural construida en el Producto 1, pero introduce una arquitectura más completa y una experiencia de usuario más avanzada gracias al uso de almacenamiento persistente e interacción mediante APIs de HTML5.

La aplicación sigue una organización modular en JavaScript vanilla, donde cada página tiene su propio archivo de lógica y existe un módulo central encargado de la persistencia de datos. Esta arquitectura permite mejorar la claridad del proyecto, la separación de responsabilidades y la escalabilidad futura de la aplicación.

---

## 2. Arquitectura general del proyecto

La arquitectura de JobConnect en el Producto 2 está basada en una separación por capas y responsabilidades.

### 2.1 Capa de presentación
Está formada por las páginas HTML:
- `index.html`
- `login.html`
- `usuarios.html`
- `ofertas-demandas.html`

Estas páginas contienen la estructura visual de la aplicación y se apoyan en Bootstrap y CSS personalizado para mostrar la información al usuario.

### 2.2 Capa de lógica por interfaz
Cada página HTML está asociada a un módulo JavaScript específico:
- `int_1_dashboard.js`
- `int_2_login.js`
- `int_4_usuarios.js`
- `int_3_empleos.js`

Cada módulo controla la lógica concreta de su pantalla:
- lectura de formularios
- validación
- pintado dinámico
- interacción del usuario
- mensajes visuales

### 2.3 Capa de servicios comunes
El archivo `ui.js` centraliza funciones de interfaz reutilizadas en varias páginas.

Se encarga de:
- pintar el usuario activo en la navbar
- mostrar u ocultar el botón de cerrar sesión
- gestionar el cierre de sesión

### 2.4 Capa de persistencia
El archivo `almacenaje.js` actúa como núcleo de almacenamiento y acceso a datos.

Gestiona:
- usuarios
- sesión activa
- publicaciones
- selección del dashboard
- acceso a `localStorage`
- acceso a `IndexedDB`

### 2.5 Datos base
El archivo `datos-iniciales.js` contiene la información inicial de:
- usuarios
- publicaciones

Esto permite que la aplicación tenga datos de ejemplo desde el primer uso.

---

## 3. Tecnologías empleadas en la arquitectura

La aplicación utiliza las siguientes tecnologías:

- HTML5
- CSS3
- Bootstrap 5
- JavaScript vanilla
- localStorage
- IndexedDB
- Canvas API
- Drag and Drop API
- Git y GitHub

Cada una de estas tecnologías cumple una función concreta dentro de la arquitectura del sistema.

---

## 4. Uso de almacenamiento en el navegador

Uno de los principales cambios arquitectónicos del Producto 2 es la incorporación de persistencia real en el navegador.

### 4.1 localStorage
Se utiliza para:
- guardar usuarios
- guardar el usuario activo
- mantener la sesión iniciada

Ventajas:
- simplicidad de uso
- persistencia tras recargar la página
- adecuado para datos pequeños y directos

### 4.2 IndexedDB
Se utiliza para:
- almacenar ofertas y demandas
- almacenar la selección del dashboard

Ventajas:
- permite manejar estructuras de datos más complejas
- es más adecuada para colecciones de objetos
- permite separar la persistencia de publicaciones de la persistencia de usuarios

---

## 5. Uso de APIs HTML5

### 5.1 Canvas
En `int_3_empleos.js` se utiliza la API Canvas para dibujar un gráfico nativo que representa:
- el número de ofertas
- el número de demandas

Esto mejora la comprensión visual de los datos y cumple uno de los requisitos técnicos del Producto 2.

### 5.2 Drag and Drop
En `int_1_dashboard.js` se usa la API Drag and Drop para:
- arrastrar publicaciones desde el panel principal
- soltarlas en la zona de selección
- deseleccionarlas arrastrándolas de nuevo a la zona principal

Esto añade una interacción más dinámica y mejora la experiencia del usuario.

---

## 6. Usabilidad de la aplicación

La aplicación ha sido diseñada teniendo en cuenta criterios básicos de usabilidad.

### 6.1 Claridad visual
Se ha buscado que:
- los títulos sean visibles
- la estructura sea limpia
- las tablas sean legibles
- los formularios estén bien agrupados
- la navegación sea consistente

### 6.2 Consistencia
Todas las páginas mantienen:
- la misma barra de navegación
- la misma línea visual
- la misma lógica de mensajes
- el mismo estilo de formularios y botones

Esto facilita el aprendizaje de la interfaz por parte del usuario.

### 6.3 Retroalimentación
El sistema proporciona feedback mediante mensajes visuales cuando:
- un login falla
- un usuario se registra correctamente
- una publicación se elimina
- una acción no se puede realizar

Esto mejora la comprensión del estado de la aplicación.

### 6.4 Persistencia de información
El hecho de que usuarios, sesión, publicaciones y selección del dashboard permanezcan al recargar la página mejora mucho la experiencia respecto al Producto 1.

### 6.5 Interacción intuitiva
El uso de arrastrar y soltar en el dashboard y el gráfico visual con Canvas hacen que la aplicación resulte más clara y más cercana a una webapp real.

---

## 7. Mejoras respecto al Producto 1

El Producto 2 mejora la arquitectura y la usabilidad del Producto 1 en varios aspectos:

- se pasa de datos en memoria a almacenamiento persistente
- se separan mejor las responsabilidades de los módulos
- se introduce una capa clara de persistencia
- se añade representación gráfica con Canvas
- se incorpora interacción drag and drop
- se mejora el diseño de la tabla de publicaciones
- se mejora el comportamiento de la sesión activa

---

## 8. Escalabilidad y mantenimiento

La arquitectura modular del proyecto facilita:

- localizar mejor los errores
- modificar una página sin afectar a las demás
- ampliar funcionalidad en el futuro
- preparar el terreno para Productos posteriores

Esto es importante porque el proyecto puede crecer hacia una arquitectura full stack más completa, donde la persistencia local del navegador pueda ser sustituida o complementada por un backend real.

---

## 9. Conclusión

La arquitectura del Producto 2 de JobConnect está mejor organizada, más modular y más sólida que la del Producto 1. Se ha conseguido una separación razonable entre presentación, lógica de interfaz, servicios comunes y persistencia.

Además, desde el punto de vista de usabilidad, la aplicación resulta más intuitiva, más visual y más útil para el usuario, gracias a la persistencia, al gráfico con Canvas, a la interacción drag and drop y a una mejora general del diseño de la interfaz.