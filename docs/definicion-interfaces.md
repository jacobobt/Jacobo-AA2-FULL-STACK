# Definición de interfaces - Producto 1 (JobConnect)

## 1. Introducción
Este documento define las interfaces desarrolladas en el **Producto 1** del proyecto **JobConnect**, una plataforma colaborativa de ofertas y demandas de empleo.

El objetivo de estas interfaces es representar un prototipo funcional de frontend que permita:
- visualizar información
- interactuar con formularios
- gestionar datos en memoria
- simular un flujo básico de uso de la aplicación

---

## 2. Resumen de interfaces incluidas
En el Producto 1 se desarrollan las siguientes interfaces:

1. **Dashboard principal**
2. **Login de usuario**
3. **Gestión de ofertas y demandas**
4. **Gestión de usuarios**

Todas las interfaces se han implementado con:
- HTML5
- CSS3
- Bootstrap 5
- JavaScript modular

---

## 3. Interfaz 1 - Dashboard principal (`index.html`)

## 3.1 Objetivo
Mostrar una visión general del sistema mediante un dashboard con:
- número de ofertas
- número de demandas
- número de usuarios
- listado resumido de publicaciones en formato tarjeta

---

## 3.2 Elementos de la interfaz
- **Navbar superior**
  - nombre del proyecto
  - enlaces de navegación
  - usuario logueado (si existe sesión)
  - botón “Cerrar sesión”
- **Tarjetas resumen**
  - total de ofertas
  - total de demandas
  - total de usuarios
- **Listado de publicaciones**
  - tarjetas con información resumida
  - diferenciación visual por tipo (oferta/demanda)

---

## 3.3 Comportamiento dinámico (JavaScript)
- Carga de datos desde `datos.js`
- Cálculo y renderizado de totales
- Renderizado dinámico de tarjetas de publicaciones
- Lectura de sesión desde `localStorage`
- Actualización de la navbar con el correo del usuario

---

## 3.4 Validaciones o controles
- Si no hay publicaciones, se muestra un mensaje informativo en lugar de tarjetas

---

## 4. Interfaz 2 - Login (`login.html`)

## 4.1 Objetivo
Permitir el acceso al prototipo mediante un formulario de login con:
- correo electrónico
- contraseña

El login es una simulación en frontend, validando contra datos en memoria.

---

## 4.2 Elementos de la interfaz
- **Navbar superior**
  - navegación común
  - estado de sesión
  - botón “Cerrar sesión”
- **Formulario de login**
  - campo email
  - campo contraseña
  - botón de acceso
- **Zona de mensajes**
  - feedback visual (éxito / error)

---

## 4.3 Comportamiento dinámico (JavaScript)
- Captura del evento `submit`
- Validación de campos obligatorios
- Comprobación de credenciales contra el array `usuarios`
- Mensajes con Bootstrap (`alert`)
- Guardado del usuario autenticado en `localStorage`
- Actualización del correo en la navbar

---

## 4.4 Validaciones o controles
- No permite campos vacíos
- Muestra error si el usuario o contraseña no coinciden
- Muestra éxito si el login es correcto

---

## 5. Interfaz 3 - Gestión de ofertas y demandas (`ofertas-demandas.html`)

## 5.1 Objetivo
Permitir la gestión de publicaciones de empleo (ofertas y demandas), incluyendo:
- alta de publicación
- visualización en tabla
- eliminación de publicaciones

---

## 5.2 Elementos de la interfaz
- **Navbar superior**
  - navegación común
  - usuario logueado
  - botón “Cerrar sesión”
- **Formulario de publicación**
  - tipo (oferta/demanda)
  - título
  - categoría
  - autor / empresa
  - ubicación
  - descripción
  - email de contacto
  - botón de guardar
- **Tabla de publicaciones**
  - ID
  - tipo
  - título
  - categoría
  - ubicación
  - email de contacto
  - acciones (eliminar)
- **Zona de mensajes**
  - éxito / error

---

## 5.3 Comportamiento dinámico (JavaScript)
- Captura del formulario con `submit`
- Validación de datos
- Creación de objeto publicación
- Inserción en array `publicaciones`
- Renderizado dinámico de la tabla
- Eliminación por ID con botones y eventos `click`
- Diferenciación visual del tipo mediante badges Bootstrap

---

## 5.4 Validaciones o controles
- Todos los campos son obligatorios
- La descripción debe tener un mínimo de caracteres
- Si no hay publicaciones, se muestra un mensaje en la tabla

---

## 6. Interfaz 4 - Gestión de usuarios (`usuarios.html`)

## 6.1 Objetivo
Permitir la gestión de usuarios del prototipo, incluyendo:
- alta de usuarios
- visualización en tabla
- eliminación de usuarios

---

## 6.2 Elementos de la interfaz
- **Navbar superior**
  - navegación común
  - usuario logueado
  - botón “Cerrar sesión”
- **Formulario de usuarios**
  - nombre
  - apellidos
  - email
  - contraseña
  - rol
  - botón de guardar
- **Tabla de usuarios**
  - ID
  - nombre completo
  - email
  - rol
  - acciones (eliminar)
- **Zona de mensajes**
  - éxito / error

---

## 6.3 Comportamiento dinámico (JavaScript)
- Captura del evento `submit`
- Validación de datos del formulario
- Comprobación de email duplicado
- Inserción del nuevo usuario en el array `usuarios`
- Renderizado dinámico de la tabla
- Eliminación por ID con botón por fila
- Actualización de mensajes y tabla tras cada operación

---

## 6.4 Validaciones o controles
- Todos los campos obligatorios
- Contraseña con longitud mínima
- No permite emails repetidos
- Mensajes visuales de error y confirmación

---

## 7. Elementos comunes de interfaz (UX)
Todas las pantallas comparten una experiencia visual coherente:

- Navbar común
- Estilos consistentes con Bootstrap y CSS propio
- Feedback visual con alerts
- Gestión común de sesión (`ui.js`)
- Botón de cerrar sesión
- Diseño responsive

Esto mejora la usabilidad y facilita la navegación entre secciones.

---

## 8. Limitaciones del Producto 1
Estas interfaces forman parte de un prototipo frontend y, por tanto:

- No existe persistencia real de datos
- No hay backend ni API
- No hay base de datos
- No hay control de permisos reales por usuario
- Los cambios se pierden al recargar la página

Estas limitaciones están previstas en el enunciado del Producto 1.

---

## 9. Conclusión
Las interfaces definidas en este documento cumplen con los requisitos del Producto 1 y permiten simular el comportamiento básico de una plataforma de ofertas y demandas de empleo.

El sistema está preparado para evolucionar en productos posteriores, donde se incorporará persistencia, backend y funcionalidades avanzadas.