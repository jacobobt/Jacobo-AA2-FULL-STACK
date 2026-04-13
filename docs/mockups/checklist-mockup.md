# Checklist de mockups e interfaces - Producto 2 (JobConnect)

## 1. Introducción
Este documento recoge la checklist de revisión de mockups e interfaces del **Producto 2** del proyecto **JobConnect**.

Su objetivo es validar que las pantallas principales del sistema mantengan una presentación visual coherente, una navegación clara, una organización funcional adecuada y una correcta alineación con los requisitos del enunciado y de la rúbrica.

En esta fase se revisa no solo el diseño general, sino también la presencia de los elementos propios del producto, como:

- persistencia local en navegador
- interacción dinámica
- uso de APIs HTML5
- navegación coherente entre pantallas
- claridad visual de formularios, tablas, paneles y zonas interactivas

La checklist sirve como guía de validación interna antes de la entrega final.

---

## 2. Pantallas revisadas
En el Producto 2 se revisan las siguientes interfaces principales:

- `index.html` → **Portada principal**
- `dashboard.html` → **Dashboard de empleo**
- `login.html` → **Inicio de sesión**
- `usuarios.html` → **Gestión de usuarios**
- `ofertas-demandas.html` → **Gestión de publicaciones**

---

## 3. Checklist general de coherencia visual

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe una barra de navegación común en todas las pantallas | Sí | Se mantiene una navbar homogénea con acceso a todas las secciones principales |
| La identidad visual es coherente entre páginas | Sí | Se mantiene una misma estética futurista, tecnológica y profesional |
| Se utiliza Bootstrap para estructurar la interfaz | Sí | Las pantallas están organizadas mediante contenedores, filas, columnas y componentes reutilizables |
| La aplicación presenta una jerarquía visual clara | Sí | Títulos, subtítulos, bloques y zonas funcionales están bien diferenciados |
| El diseño transmite uniformidad entre formularios, tablas y paneles | Sí | Se ha reforzado la consistencia visual entre todas las vistas |
| El contenido principal de cada pantalla se identifica con facilidad | Sí | Cada pantalla deja clara su función mediante títulos, textos introductorios y estructura visual |
| La aplicación mantiene una estructura responsive razonable | Sí | Bootstrap facilita la adaptación general a distintos tamaños de pantalla |
| El diseño ha evolucionado respecto al Producto 1 | Sí | Se aprecia una mejora clara en presentación, interacción y organización visual |

---

## 4. Checklist de la portada principal

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe una portada principal diferenciada del dashboard | Sí | `index.html` ya no actúa como dashboard, sino como página principal del producto |
| La portada presenta el proyecto de forma narrativa y profesional | Sí | Se explica el objetivo de JobConnect y sus principales funcionalidades |
| Existen llamadas a la acción claras | Sí | Se ofrecen accesos visibles al login, dashboard y módulos principales |
| La portada mantiene coherencia visual con el resto del sistema | Sí | Comparte la misma línea estética, tipografías, colores y efectos visuales |
| La portada aporta valor visual y contextual | Sí | Mejora la presentación general del producto y refuerza su imagen profesional |

---

## 5. Checklist de la interfaz de Login

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe formulario de inicio de sesión | Sí | La pantalla incluye campos de correo electrónico y contraseña |
| Los campos están etiquetados de forma clara | Sí | El usuario entiende sin dificultad qué debe introducir |
| Existe botón visible para iniciar sesión | Sí | El formulario permite enviar la información de forma directa |
| Se muestra el usuario activo o el estado sin sesión | Sí | Se informa del estado actual tanto en la navbar como en la propia pantalla |
| Se ofrecen mensajes de feedback al usuario | Sí | Se muestran mensajes de éxito, error o aviso según el caso |
| La pantalla se puede visitar aunque exista una sesión iniciada | Sí | Se eliminó la redirección automática al entrar en login con sesión activa |
| El acceso desde la portada enlaza con la pantalla real de login | Sí | El botón principal de acceso dirige correctamente a `login.html` |
| La pantalla mantiene coherencia visual con el resto del sistema | Sí | Comparte el mismo estilo general del proyecto |

---

## 6. Checklist de la interfaz de Usuarios

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe formulario para alta de usuario | Sí | La pantalla permite crear nuevos usuarios |
| Los campos principales están presentes | Sí | Nombre, apellidos, email, contraseña y rol |
| Existe zona de consulta de usuarios | Sí | Se muestra una tabla con los usuarios registrados |
| La tabla permite identificar con claridad los datos principales | Sí | Se visualizan ID, nombre, email, contraseña oculta, rol y acción |
| El rol se visualiza correctamente | Sí | El rol aparece mediante badges diferenciados y legibles |
| Existe acción de borrado de usuarios | Sí | La acción se realiza desde la tabla mediante un botón compacto con icono |
| La acción de borrado mantiene buena visibilidad | Sí | El icono rojo en forma de X mejora la integración visual y evita recortes |
| El espacio de la pantalla está mejor aprovechado | Sí | Se ha ampliado el ancho útil de la página y redistribuido el layout |
| La actualización del listado resulta clara | Sí | El usuario ve reflejados los cambios tras alta o borrado |
| La pantalla mantiene el usuario activo visible | Sí | La navegación conserva la referencia de sesión |

---

## 7. Checklist de la interfaz de Ofertas y Demandas

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe formulario de alta de publicación | Sí | Se permite registrar ofertas y demandas |
| Los campos de la publicación son suficientes | Sí | Tipo, título, categoría, autor, ubicación, fecha, descripción y email |
| Existe tabla de consulta de publicaciones | Sí | Los registros se muestran de forma organizada |
| Existe acción de borrado de publicaciones | Sí | Se permite eliminar registros desde la interfaz |
| El botón de borrado es visible y coherente con el diseño | Sí | El botón presenta mayor contraste y mejor presencia visual |
| Existe representación gráfica con Canvas | Sí | La pantalla incorpora un gráfico nativo para ofertas y demandas |
| El bloque gráfico aprovecha mejor el espacio disponible | Sí | Se ha reorganizado la zona superior del gráfico y su estructura general |
| Las barras del gráfico están mejor distribuidas | Sí | Ahora se muestran centradas, equilibradas y visualmente compensadas |
| La organización visual separa bien formulario, gráfico y tabla | Sí | La estructura facilita el uso y la lectura |
| La pantalla responde al objetivo funcional del componente | Sí | Permite alta, consulta, borrado y visualización gráfica |

---

## 8. Checklist de la interfaz de Dashboard

| Elemento a comprobar | Estado | Observaciones |
|---|---|---|
| Existe zona principal de visualización de publicaciones | Sí | El dashboard muestra tarjetas dinámicas con publicaciones |
| Existe zona de selección diferenciada | Sí | Hay un área específica para publicaciones seleccionadas |
| Se muestran métricas resumen del sistema | Sí | Se visualizan contadores generales del estado de la aplicación |
| Existen filtros visuales por tipo de publicación | Sí | El usuario puede filtrar por ofertas o demandas |
| Se aplica interacción drag & drop | Sí | Las tarjetas pueden arrastrarse y soltarse |
| Se mantiene la interacción por doble clic | Sí | Las tarjetas se pueden mover entre zonas también mediante doble clic |
| Existe acción visual de devolución desde la selección | Sí | Las tarjetas seleccionadas incluyen un botón con cierre para devolverlas |
| La selección queda visualmente clara | Sí | El sistema diferencia publicaciones disponibles y seleccionadas |
| La interfaz mantiene coherencia con el resto de pantallas | Sí | Comparte navegación, estilo y estructura general |

---

## 9. Checklist funcional relacionada con Producto 2

| Requisito funcional a revisar | Estado | Observaciones |
|---|---|---|
| El usuario activo se mantiene entre páginas | Sí | Se utiliza `localStorage` para conservar la sesión |
| Los usuarios persisten al recargar la aplicación | Sí | Los datos de usuarios se guardan en `localStorage` |
| Las publicaciones persisten al recargar | Sí | Se almacenan en `IndexedDB` |
| La selección del dashboard persiste | Sí | Se almacena en `IndexedDB` |
| El gráfico de publicaciones se genera con `Canvas` | Sí | Se cumple el requisito de representación nativa |
| La selección se realiza mediante Drag & Drop | Sí | Se cumple el requisito de interacción HTML5 |
| Existen interacciones adicionales de apoyo a la usabilidad | Sí | Se ha añadido doble clic y botón de devolución en el dashboard |
| La lógica está organizada en módulos JavaScript | Sí | Cada pantalla tiene su módulo y existe un módulo común de almacenamiento |

---

## 10. Checklist de usabilidad y experiencia de usuario

| Aspecto de usabilidad | Estado | Observaciones |
|---|---|---|
| Navegación comprensible | Sí | El usuario identifica rápidamente las secciones principales |
| Formularios claros y ordenados | Sí | Los bloques de entrada están bien estructurados y son fáciles de seguir |
| Feedback tras acciones | Sí | Se informa del resultado de operaciones importantes |
| Organización visual clara | Sí | Las páginas están divididas por bloques funcionales bien diferenciados |
| Consistencia entre pantallas | Sí | Se mantiene el mismo lenguaje visual y estructural |
| Interacción intuitiva | Sí | Especialmente en dashboard, login y formularios principales |
| Legibilidad de tablas y acciones | Sí | Se ha mejorado el contraste y la claridad de roles y botones |
| Aprovechamiento del espacio | Sí | Se ha mejorado especialmente en la pantalla de usuarios y en la zona gráfica |

---

## 11. Evidencias visuales recomendadas para los mockups
Para documentar correctamente la revisión visual del producto, se recomienda disponer como mínimo de las siguientes capturas:

- mockup de la **portada principal**
- mockup del **dashboard**
- mockup del **login**
- mockup de **usuarios**
- mockup de **ofertas y demandas**
- detalle del **gráfico Canvas**
- detalle del **dashboard con selección de publicaciones**
- detalle de la **tabla de usuarios**
- detalle de la **tabla de publicaciones**

Estas evidencias ayudan a justificar la coherencia visual, la organización funcional y la evolución del producto.

---

## 12. Puntos mejorables detectados
Aunque la base del producto es sólida y visualmente más avanzada, todavía pueden señalarse algunos aspectos mejorables para futuras iteraciones:

- seguir afinando el comportamiento responsive en algunos bloques muy anchos
- continuar puliendo el equilibrio entre impacto visual y sobriedad profesional
- reforzar algunos textos de ayuda o mensajes de confirmación
- revisar periódicamente la documentación para que refleje todos los cambios funcionales y visuales realizados
- mantener la máxima coherencia entre mockups, documentación técnica y versión final del proyecto

Estos aspectos no impiden el funcionamiento del sistema, pero pueden contribuir a una entrega todavía más completa y mejor presentada.

---

## 13. Conclusión
La revisión de mockups e interfaces del **Producto 2** de **JobConnect** permite comprobar que la aplicación mantiene una estructura coherente, una navegación clara y una relación correcta entre diseño visual y funcionalidad.

Las pantallas principales cubren los requisitos esperados del producto y muestran una evolución clara respecto al Producto 1, especialmente por la incorporación de persistencia local, `Canvas`, `IndexedDB`, `Drag & Drop` y una mejora general de la experiencia visual y de uso.

En conjunto, la aplicación presenta una versión más sólida, más profesional y mejor resuelta a nivel visual, sin dejar de responder a los requisitos funcionales exigidos en el proyecto.