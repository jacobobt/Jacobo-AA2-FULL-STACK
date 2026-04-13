# Arquetipos de usuarios - Producto 2 (JobConnect)

## 1. Introducción
Este documento define los principales arquetipos de usuario del **Producto 2** del proyecto **JobConnect**, una aplicación web orientada a la gestión de ofertas y demandas de empleo.

El objetivo de estos arquetipos es representar perfiles de uso realistas para justificar decisiones de diseño, usabilidad y funcionalidad. En esta fase del proyecto, además de la interfaz, también se ha tenido en cuenta la interacción con persistencia en navegador y el uso de APIs de HTML5.

Los arquetipos ayudan a entender:
- quién utilizará la aplicación
- qué espera conseguir cada usuario
- qué dificultades puede encontrar
- qué elementos de la interfaz le resultan más importantes

---

## 2. Arquetipo 1 - Estudiante o candidato en búsqueda de oportunidades

### Perfil general
- **Nombre ficticio**: Laura Martínez
- **Edad**: 22 años
- **Situación**: Estudiante de DAW que busca prácticas o una primera oportunidad laboral
- **Objetivo principal**: Consultar ofertas y publicar una demanda de empleo
- **Nivel digital**: Medio

### Necesidades
- Acceder rápidamente a las ofertas disponibles
- Ver información clara y resumida de cada publicación
- Poder registrarse o iniciar sesión sin dificultad
- Publicar una demanda con sus datos de contacto
- Visualizar sus opciones de manera simple y ordenada

### Motivaciones
- Encontrar una primera experiencia profesional
- Mejorar su currículum
- Tener más visibilidad dentro del entorno laboral
- Participar en una plataforma sencilla y funcional

### Frustraciones
- Formularios poco claros o demasiado largos
- Errores sin explicación
- Interfaz sobrecargada
- Navegación poco intuitiva
- No saber si una acción se ha realizado correctamente

### Cómo influye en el diseño del Producto 2
Este arquetipo justifica:
- formularios claros y accesibles en login y publicaciones
- mensajes de error y éxito visibles
- estructura visual simple y ordenada
- dashboard con visualización rápida de publicaciones
- interacción dinámica para seleccionar publicaciones mediante drag & drop

---

## 3. Arquetipo 2 - Empresa o empleador que publica ofertas

### Perfil general
- **Nombre ficticio**: Carlos Ruiz
- **Edad**: 38 años
- **Situación**: Responsable de una pequeña empresa tecnológica
- **Objetivo principal**: Publicar ofertas de empleo y consultar demandas existentes
- **Nivel digital**: Medio-alto

### Necesidades
- Crear publicaciones de oferta de forma rápida
- Ver y revisar publicaciones ya registradas
- Identificar fácilmente el tipo de publicación
- Consultar datos de contacto de candidatos
- Disponer de una interfaz profesional, clara y ordenada

### Motivaciones
- Cubrir vacantes con rapidez
- Encontrar perfiles técnicos adecuados
- Gestionar publicaciones sin complicaciones
- Tener un sistema visualmente serio y funcional

### Frustraciones
- Falta de organización en la información
- Interfaces poco profesionales
- No poder diferenciar bien ofertas y demandas
- Pérdida de datos al recargar
- Procesos lentos o poco intuitivos

### Cómo influye en el diseño del Producto 2
Este arquetipo justifica:
- pantalla específica para alta, consulta y borrado de ofertas y demandas
- persistencia en `IndexedDB` para mantener publicaciones
- tabla organizada con datos relevantes
- uso de `Canvas` para representar visualmente la relación entre ofertas y demandas
- diferenciación visual por tipo de publicación

---

## 4. Arquetipo 3 - Usuario gestor o administrador del prototipo

### Perfil general
- **Nombre ficticio**: Ana López
- **Edad**: 30 años
- **Situación**: Persona encargada de revisar usuarios y comprobar el funcionamiento general de la aplicación
- **Objetivo principal**: Gestionar usuarios, validar el flujo de uso y supervisar el sistema
- **Nivel digital**: Alto

### Necesidades
- Consultar el listado completo de usuarios
- Dar de alta usuarios de prueba
- Eliminar usuarios incorrectos o duplicados
- Ver el usuario activo en navegación
- Tener una visión general del sistema desde el dashboard

### Motivaciones
- Mantener orden en la aplicación
- Verificar que el prototipo funciona correctamente
- Simular un escenario de gestión real
- Comprobar la coherencia entre componentes

### Frustraciones
- Datos mal organizados
- Errores sin contexto
- Interfaces inconsistentes
- Falta de feedback tras acciones importantes
- Dificultad para entender qué usuario está activo

### Cómo influye en el diseño del Producto 2
Este arquetipo justifica:
- módulo de usuarios con operaciones CRUD en `localStorage`
- visualización del usuario activo en todas las pantallas
- validaciones de datos en alta de usuarios
- actualización dinámica de la tabla de usuarios
- dashboard con métricas resumen para comprender el estado general del sistema

---

## 5. Relación entre arquetipos y componentes de la aplicación

### Login
Da respuesta principalmente a:
- estudiante o candidato
- empresa o empleador
- usuario gestor

Se ha diseñado para ofrecer:
- acceso sencillo
- validación clara
- persistencia del usuario activo
- feedback inmediato en caso de error o éxito

### Usuarios
Da respuesta sobre todo a:
- usuario gestor o administrador del prototipo

Se ha diseñado para permitir:
- alta de usuarios
- consulta de usuarios existentes
- borrado de registros
- mantenimiento de usuarios en `localStorage`

### Ofertas y demandas
Da respuesta sobre todo a:
- estudiante o candidato
- empresa o empleador

Se ha diseñado para facilitar:
- creación de publicaciones
- consulta de registros
- borrado de publicaciones
- almacenamiento persistente en `IndexedDB`
- visualización gráfica mediante `Canvas`

### Dashboard
Da respuesta especialmente a:
- estudiante o candidato
- usuario gestor

Se ha diseñado para permitir:
- visualizar publicaciones disponibles
- seleccionar publicaciones con drag & drop
- guardar selección persistente en `IndexedDB`
- consultar métricas generales del sistema

---

## 6. Impacto de los arquetipos en el diseño del Producto 2
Los arquetipos han influido directamente en varias decisiones del proyecto:

- **navegación simple y consistente** mediante una barra común en todas las páginas
- **formularios claros** para minimizar errores de entrada
- **persistencia local** para mantener la información al recargar
- **feedback visual inmediato** tras las acciones del usuario
- **componentes separados por tarea** para mejorar la comprensión del sistema
- **interacción más rica** gracias al uso de APIs HTML5 como Canvas y Drag & Drop
- **estructura modular del código** para facilitar mantenimiento y evolución futura

---

## 7. Conclusión
Los arquetipos definidos permiten justificar la estructura funcional y visual del **Producto 2** de JobConnect desde una perspectiva de uso real.

Gracias a ellos, la aplicación no solo responde a requisitos técnicos, sino también a necesidades concretas de interacción, claridad y organización. Esto hace que el prototipo sea más coherente, más útil y mejor preparado para seguir evolucionando en las siguientes fases del proyecto.