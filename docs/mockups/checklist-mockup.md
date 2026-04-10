# Checklist de mockups e interfaces - Producto 2 (JobConnect)

## 1. Introducción
Este documento recoge una checklist de revisión de mockups e interfaces del **Producto 2** del proyecto **JobConnect**.

Su objetivo es comprobar que las pantallas principales del sistema mantienen coherencia visual, funcionalidad clara y alineación con los requisitos del producto. En esta fase, además del diseño visual, también se revisa la presencia de elementos relacionados con:
- persistencia en navegador
- interacción dinámica
- APIs de HTML5
- navegación coherente entre páginas

La checklist sirve como guía de validación interna antes de la entrega.

---

## 2. Pantallas revisadas
En el Producto 2 se revisan las siguientes interfaces principales:

- `index.html` → Dashboard
- `login.html` → Inicio de sesión
- `usuarios.html` → Gestión de usuarios
- `ofertas-demandas.html` → Gestión de publicaciones

---

## 3. Checklist general de coherencia visual

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe una barra de navegación común en todas las pantallas | Sí | La aplicación mantiene una navbar homogénea con acceso a todas las secciones |
| La identidad visual es coherente entre páginas | Sí | Se mantiene el mismo estilo general, estructura y lenguaje visual |
| Se utiliza Bootstrap para estructurar la interfaz | Sí | Las pantallas están organizadas con contenedores, filas, columnas y componentes reutilizables |
| La interfaz resulta clara y ordenada | Sí | Los bloques principales están bien separados visualmente |
| El contenido principal de cada pantalla se identifica con facilidad | Sí | Cada vista deja clara su función mediante títulos, formularios y tablas |
| La aplicación mantiene una estructura responsive razonable | Sí | Bootstrap facilita la adaptación básica a distintos tamaños de pantalla |

---

## 4. Checklist de la interfaz de Login

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe formulario de inicio de sesión | Sí | La pantalla incluye campos de email y contraseña |
| Los campos están etiquetados de forma clara | Sí | El usuario entiende qué dato debe introducir |
| Existe botón visible para iniciar sesión | Sí | El formulario permite enviar la información de manera directa |
| Se muestra el usuario activo o el estado sin sesión | Sí | Se informa del estado del usuario en navbar y en la propia interfaz |
| Se ofrecen mensajes de feedback al usuario | Sí | Se muestran mensajes de error o éxito según el resultado del login |
| La pantalla mantiene la coherencia visual con el resto del sistema | Sí | Usa la misma base visual que el resto de páginas |

---

## 5. Checklist de la interfaz de Usuarios

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe formulario para alta de usuario | Sí | La pantalla permite crear nuevos usuarios |
| Los campos principales están presentes | Sí | Nombre, apellidos, email, contraseña y rol |
| Existe zona de consulta de usuarios | Sí | Se muestra una tabla con los usuarios registrados |
| La tabla permite identificar los datos principales | Sí | Se visualizan datos necesarios para gestión y comprobación |
| Existe acción de borrado de usuarios | Sí | La interfaz contempla gestión básica completa |
| La actualización del listado resulta clara | Sí | El usuario ve los cambios reflejados tras las operaciones |
| La pantalla mantiene el usuario activo visible | Sí | La navegación conserva la referencia de sesión |

---

## 6. Checklist de la interfaz de Ofertas y Demandas

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe formulario de alta de publicación | Sí | Se permite registrar ofertas y demandas |
| Los campos de la publicación son suficientes | Sí | Tipo, título, categoría, autor, ubicación, fecha, descripción y email |
| Existe tabla de consulta de publicaciones | Sí | Se muestran los registros de forma organizada |
| Existe acción de borrado de publicaciones | Sí | Se permite eliminar registros desde la interfaz |
| Existe representación gráfica con Canvas | Sí | La pantalla incorpora un gráfico nativo para ofertas y demandas |
| La organización visual separa bien formulario, gráfico y tabla | Sí | La estructura facilita el uso y la lectura |
| La pantalla responde al objetivo funcional del componente | Sí | Permite alta, consulta, borrado y visualización gráfica |

---

## 7. Checklist de la interfaz de Dashboard

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe zona principal de visualización de publicaciones | Sí | El dashboard muestra tarjetas dinámicas con publicaciones |
| Existe zona de selección diferenciada | Sí | Hay un área específica para publicaciones seleccionadas |
| Se muestran métricas resumen del sistema | Sí | Se visualizan contadores generales del estado de la aplicación |
| Existen filtros visuales por tipo de publicación | Sí | El usuario puede filtrar por ofertas o demandas |
| Se aplica interacción drag & drop | Sí | Las tarjetas pueden arrastrarse y soltarse |
| La selección queda visualmente clara | Sí | El sistema diferencia publicaciones disponibles y seleccionadas |
| La interfaz mantiene coherencia con el resto de pantallas | Sí | Comparte navegación, estilo y estructura general |

---

## 8. Checklist funcional relacionada con Producto 2

| Requisito funcional a revisar | Estado | Observaciones |
|---|---|---|
| El usuario activo se mantiene entre páginas | Sí | Se utiliza `localStorage` para mantener el estado de sesión |
| Los usuarios persisten al recargar la aplicación | Sí | Los datos de usuarios se guardan en `localStorage` |
| Las publicaciones persisten al recargar | Sí | Se almacenan en `IndexedDB` |
| La selección del dashboard persiste | Sí | Se almacena en `IndexedDB` |
| El gráfico de publicaciones se genera con `Canvas` | Sí | Se cumple el requisito de representación nativa |
| La selección se realiza mediante Drag & Drop | Sí | Se cumple el requisito de interacción HTML5 |
| La lógica está organizada en módulos JavaScript | Sí | Cada pantalla tiene su módulo y existe un módulo común de almacenamiento |

---

## 9. Aspectos de usabilidad comprobados

| Aspecto de usabilidad | Estado | Observaciones |
|---|---|---|
| Navegación comprensible | Sí | El usuario identifica rápido las secciones principales |
| Formularios relativamente simples | Sí | No hay exceso de campos ni complejidad innecesaria |
| Feedback tras acciones | Sí | Se informa del resultado de operaciones importantes |
| Organización visual clara | Sí | Las páginas están divididas por bloques funcionales |
| Consistencia entre pantallas | Sí | Se mantiene el mismo estilo general |
| Interacción intuitiva | Sí | Especialmente en dashboard y formularios principales |

---

## 10. Puntos mejorables detectados
Aunque la base del producto es funcional y coherente, durante la revisión pueden señalarse algunos puntos mejorables:

- reforzar algunas validaciones de formularios
- mejorar todavía más la claridad de ciertos mensajes al usuario
- seguir homogeneizando documentación heredada de fases anteriores
- mantener los comentarios del código con un estilo uniforme
- afinar la correspondencia terminológica entre la rúbrica y el nombre de algunos componentes del proyecto

Estos puntos no impiden el funcionamiento del sistema, pero pueden contribuir a una entrega más sólida y mejor presentada.

---

## 11. Conclusión
La revisión de mockups e interfaces del **Producto 2** de JobConnect permite comprobar que la aplicación mantiene una estructura coherente, una navegación clara y una relación correcta entre diseño visual y funcionalidad.

Las pantallas principales cubren los requisitos esperados del producto y muestran una evolución clara respecto al Producto 1, especialmente por la incorporación de persistencia local, `Canvas`, `IndexedDB` y `Drag & Drop`.