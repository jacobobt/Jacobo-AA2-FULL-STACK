# Uso de IA y prompts empleados - Producto 2 (JobConnect)

## 1. Introducción
En este documento se recoge el uso de herramientas de Inteligencia Artificial durante el desarrollo del **Producto 2** del proyecto **JobConnect**.

El objetivo de este apartado es dejar constancia de cómo se ha utilizado la IA como herramienta de apoyo, indicando:
- para qué se ha usado
- qué tipo de prompts se han realizado
- qué resultados ha aportado
- qué revisión o adaptación humana se ha aplicado después

En todo momento, la IA se ha utilizado como apoyo al aprendizaje, a la organización y a la mejora del proyecto, pero no como sustitución del trabajo técnico realizado por el equipo.

---

## 2. Finalidad del uso de IA en este producto
En el Producto 2, la IA se ha utilizado principalmente para apoyar tareas como:

- comprensión del enunciado y de la rúbrica
- organización de la estructura del proyecto
- revisión y mejora de código JavaScript
- aclaración de dudas sobre `localStorage` e `IndexedDB`
- ayuda en la redacción de documentación técnica
- mejora de explicaciones funcionales y de usabilidad
- detección de posibles incoherencias entre lo implementado y lo pedido

Su uso ha sido especialmente útil en una fase donde el proyecto incorpora APIs de HTML5, persistencia local y una estructura modular más compleja que en el Producto 1.

---

## 3. Tipo de ayuda proporcionada por la IA

## 3.1 Apoyo en la comprensión técnica
Se han utilizado prompts para entender mejor conceptos como:

- diferencias entre `localStorage` e `IndexedDB`
- funcionamiento de promesas y funciones asíncronas
- estructura modular en JavaScript
- lógica de drag & drop
- uso nativo de `Canvas`
- organización de operaciones CRUD en un módulo común

La IA ha servido en este punto como herramienta de refuerzo conceptual.

---

## 3.2 Apoyo en revisión y mejora de código
También se ha utilizado para:

- detectar errores de lógica
- proponer mejoras de validación
- mejorar nombres de funciones o bloques de código
- revisar estructura general de archivos
- añadir comentarios explicativos más claros
- identificar partes que podían generar fallos funcionales o de persistencia

En estos casos, las respuestas obtenidas no se han aplicado automáticamente, sino que se han revisado antes de incorporarlas al proyecto.

---

## 3.3 Apoyo en documentación
La IA también se ha utilizado para redactar o rehacer documentos del proyecto, por ejemplo:

- arquitectura web y usabilidad
- arquetipos de usuarios
- definición de interfaces
- bibliografía
- relación entre lo implementado y la rúbrica
- explicación de módulos y componentes

En todos los casos, el contenido generado se ha revisado y adaptado para que refleje el funcionamiento real del proyecto.

---

## 4. Ejemplos de prompts utilizados
A continuación se incluyen ejemplos de prompts representativos usados durante el desarrollo del producto.

### Prompt 1 - Revisión de alineación con la rúbrica
Analiza este proyecto de Producto 2 de una webapp en Vanilla JS y dime qué puntos cumple, qué puntos están flojos y qué mejoras conviene hacer para ajustarlo mejor al enunciado y a la rúbrica.

**Objetivo**:
Comprobar si la implementación se ajustaba correctamente a los requisitos del producto.

**Resultado obtenido**:
Se detectaron mejoras relacionadas con documentación, validaciones, coherencia entre archivos y explicación de componentes.

**Aplicación real**:
Se usó como base para priorizar correcciones y mejoras del proyecto.

---

### Prompt 2 - Mejora de módulo de persistencia
Revisa este archivo JavaScript que gestiona localStorage e IndexedDB y propón mejoras de claridad, validación y comentarios sin cambiar la arquitectura general del proyecto.

**Objetivo**:
Mejorar la legibilidad del módulo `almacenaje.js` y entender mejor cada parte.

**Resultado obtenido**:
Se obtuvieron propuestas para comentar mejor funciones, unificar criterios y detectar posibles comportamientos no deseados.

**Aplicación real**:
Se revisaron y adaptaron manualmente algunas mejoras antes de aplicarlas al código.

---

### Prompt 3 - Corrección de comportamiento funcional
He borrado todas las publicaciones de IndexedDB y al refrescar vuelven a aparecer las iniciales. Indícame cómo corregirlo y pásame el archivo completo actualizado.

**Objetivo**:
Resolver un problema real de persistencia relacionado con la carga inicial de datos.

**Resultado obtenido**:
Se propuso una solución basada en una marca de inicialización en `localStorage` para evitar reinsertar publicaciones semilla una vez inicializadas.

**Aplicación real**:
La solución fue revisada, probada y aplicada al proyecto mediante commit independiente.

---

### Prompt 4 - Redacción técnica de documentación
Redáctame el archivo completo de arquitectura web y usabilidad adaptado a Producto 2, indicando claramente el uso de Bootstrap, JavaScript modular, localStorage, IndexedDB, Canvas y Drag & Drop.

**Objetivo**:
Actualizar la documentación heredada del Producto 1 y alinearla con la versión real del proyecto.

**Resultado obtenido**:
Se generó una base documental adaptada a la nueva fase del producto.

**Aplicación real**:
El texto se revisó y se integró en los archivos finales del proyecto tras comprobar que representaba correctamente la implementación.

---

### Prompt 5 - Mejora de mensajes de commit
Propón mensajes de commit claros, cortos y profesionales para cambios relacionados con documentación, validaciones y persistencia en una rama de mejora de un proyecto académico.

**Objetivo**:
Mantener un historial de commits claro y comprensible para todos los miembros del grupo.

**Resultado obtenido**:
Se obtuvieron mensajes más limpios y específicos.

**Aplicación real**:
Se usaron commits mejor redactados y más fáciles de entender por parte del equipo.

---

## 5. Criterio seguido al usar la IA
Durante el uso de la IA se ha seguido un criterio de trabajo basado en:

- no copiar sin revisar
- comprobar que la respuesta se ajusta al proyecto real
- adaptar el contenido al nivel y estilo del trabajo académico
- validar el funcionamiento del código antes de subirlo
- mantener siempre el control humano sobre la decisión final

Esto ha sido importante porque no todas las respuestas eran directamente aplicables sin ajustes.

---

## 6. Ventajas obtenidas
El uso de la IA ha aportado ventajas como:

- mayor rapidez para detectar puntos mejorables
- ayuda para comprender errores concretos
- apoyo en la organización de tareas
- mejora de la calidad de la documentación
- mejor claridad en comentarios y explicaciones del código
- ayuda para preparar commits más entendibles

---

## 7. Limitaciones y revisión humana
Aun siendo útil, la IA también ha presentado limitaciones, por ejemplo:

- algunas propuestas necesitaban revisión para ajustarse al contexto real del proyecto
- ciertos textos debían adaptarse para no sonar artificiales
- en ocasiones era necesario corregir o matizar la respuesta tras probar el código
- no siempre distinguía bien entre elementos heredados de Producto 1 y cambios reales de Producto 2

Por este motivo, todas las aportaciones se han filtrado y corregido manualmente antes de incorporarlas.

---

## 8. Conclusión
La Inteligencia Artificial se ha utilizado en el **Producto 2** de JobConnect como una herramienta de apoyo para mejorar el análisis, la documentación y la claridad del código, así como para detectar posibles errores o incoherencias.

Su uso ha sido útil para avanzar con más orden y eficiencia, pero siempre acompañado de revisión, validación y adaptación humana. De esta forma, la IA ha funcionado como soporte al aprendizaje y al desarrollo del proyecto, no como sustitución del trabajo realizado por el equipo.