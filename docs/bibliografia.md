# Bibliografía y recursos consultados - Producto 2 (JobConnect)

## 1. Introducción
En este documento se recogen las principales fuentes de información, documentación técnica y recursos de consulta utilizados durante el desarrollo del **Producto 2** del proyecto **JobConnect**.

En esta fase del proyecto, las referencias se han centrado especialmente en:
- el uso de **JavaScript modular**
- la persistencia en navegador mediante **localStorage** e **IndexedDB**
- la utilización de APIs de HTML5 como **Canvas** y **Drag & Drop**
- el apoyo visual y estructural de **Bootstrap 5**
- la consulta de buenas prácticas de desarrollo frontend

Estas fuentes han servido tanto para resolver dudas técnicas como para fundamentar decisiones de implementación, estructura y usabilidad.

---

## 2. Documentación técnica principal

### Mozilla Developer Network (MDN)
MDN ha sido una de las fuentes principales de consulta, especialmente para comprender el funcionamiento nativo de las APIs web utilizadas en el proyecto.

Se ha consultado documentación sobre:
- JavaScript
- módulos ES
- `localStorage`
- `IndexedDB`
- `Canvas`
- Drag & Drop API
- manipulación del DOM
- eventos del navegador

**Utilidad en el proyecto**:
- implementación de persistencia local
- uso de funciones asíncronas
- gestión de eventos
- generación de gráficos nativos
- interacción entre componentes de la interfaz

---

### Bootstrap 5 Documentation
La documentación oficial de Bootstrap se ha utilizado para estructurar y dar estilo a la interfaz del proyecto.

Se ha consultado especialmente para:
- sistema de rejilla
- formularios
- tablas
- tarjetas
- botones
- utilidades de espaciado y alineación
- componentes visuales reutilizables

**Utilidad en el proyecto**:
- maquetación responsive
- consistencia visual entre pantallas
- mejora de la usabilidad
- organización clara del contenido

---

## 3. Recursos concretos por tecnología

## 3.1 JavaScript modular
Se han revisado recursos sobre programación modular en JavaScript para organizar la lógica del proyecto en archivos separados y reutilizables.

**Aplicación en el proyecto**:
- separación por componentes funcionales
- organización de la lógica de login, usuarios, publicaciones y dashboard
- centralización de la persistencia en `almacenaje.js`

---

## 3.2 Web Storage (`localStorage`)
Se ha consultado documentación sobre Web Storage para comprender el almacenamiento persistente de datos sencillos en el navegador.

**Aplicación en el proyecto**:
- gestión de usuarios
- mantenimiento del usuario activo
- almacenamiento de marcas internas de inicialización

---

## 3.3 IndexedDB
Se han revisado fuentes para entender la creación de bases de datos locales en navegador, los object stores, las transacciones y las operaciones CRUD asíncronas.

**Aplicación en el proyecto**:
- almacenamiento de ofertas y demandas
- almacenamiento de publicaciones seleccionadas en el dashboard
- persistencia real al recargar la página

---

## 3.4 Canvas
Se ha consultado documentación específica sobre la API `Canvas` para representar gráficamente los datos de publicaciones.

**Aplicación en el proyecto**:
- generación de un gráfico nativo
- representación visual comparativa entre ofertas y demandas
- mejora de la presentación de datos sin usar librerías externas

---

## 3.5 Drag & Drop
Se han consultado recursos sobre arrastrar y soltar elementos en aplicaciones web.

**Aplicación en el proyecto**:
- selección de publicaciones desde el dashboard
- interacción visual directa entre publicaciones disponibles y seleccionadas
- mejora de la experiencia de uso

---

## 4. Recursos de apoyo y aprendizaje

## 4.1 Microsoft Learn
Se han tenido en cuenta materiales de aprendizaje orientados al desarrollo frontend con JavaScript, especialmente en temas relacionados con:
- módulos
- asincronía
- promesas
- buenas prácticas de organización de código

**Utilidad en el proyecto**:
- mejor comprensión de la estructura modular
- apoyo conceptual para trabajar con funciones asíncronas
- refuerzo del enfoque formativo del producto

---

## 4.2 Recursos del aula y enunciado de la actividad
Además de la documentación técnica externa, también se han utilizado como referencia:
- el enunciado del producto
- la rúbrica de evaluación
- los vídeos orientativos proporcionados en el aula
- los recursos recomendados por la asignatura

**Utilidad en el proyecto**:
- adaptación del proyecto a los requisitos concretos de evaluación
- comprobación de que cada componente cumple su función esperada
- alineación entre implementación y entrega

---

## 5. Uso práctico de estas fuentes en el proyecto
La consulta de estas referencias ha permitido tomar decisiones concretas en el desarrollo del Producto 2, por ejemplo:

- estructurar el proyecto en módulos JavaScript
- aplicar persistencia local diferenciando `localStorage` e `IndexedDB`
- implementar un gráfico con `Canvas` de forma nativa
- utilizar la API Drag & Drop en el dashboard
- mantener una interfaz clara mediante Bootstrap
- reforzar la coherencia entre las distintas pantallas del sistema

---

## 6. Conclusión
La bibliografía y los recursos consultados han sido fundamentales para desarrollar correctamente el **Producto 2** de JobConnect.

Gracias a estas fuentes, ha sido posible implementar una aplicación frontend más completa que en la fase anterior, incorporando persistencia real en navegador, APIs de HTML5 y una organización modular del código, todo ello manteniendo una interfaz clara, usable y preparada para evolucionar en futuras fases del proyecto.