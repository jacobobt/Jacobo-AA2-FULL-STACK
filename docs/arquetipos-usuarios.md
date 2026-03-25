# Arquetipos de usuarios - Producto 2

## 1. Introducción

En el proyecto JobConnect se han definido varios arquetipos de usuario con el objetivo de comprender mejor qué tipo de personas podrían utilizar la aplicación y qué necesidades principales tendrían dentro del sistema.

Aunque se trata de un proyecto académico, la definición de arquetipos ayuda a justificar decisiones de diseño, estructura de navegación, organización de la información y prioridades funcionales. En el Producto 2, estos arquetipos siguen siendo válidos, pero ahora se benefician además de nuevas mejoras como la persistencia de datos, el dashboard interactivo y la visualización gráfica de la información.

---

## 2. Arquetipo 1: estudiante o candidato junior

### Nombre representativo
Laura Gómez

### Perfil general
Laura tiene 22 años y está terminando un ciclo formativo relacionado con desarrollo web. Busca prácticas o una primera oportunidad laboral y necesita una herramienta sencilla donde pueda consultar ofertas, demandas y oportunidades de colaboración.

### Objetivos principales
- encontrar ofertas relacionadas con su perfil
- consultar oportunidades de prácticas
- visualizar de forma rápida la información más importante
- moverse con facilidad por la aplicación

### Necesidades
- una navegación clara
- formularios sencillos
- una interfaz limpia y poco recargada
- persistencia de la información al recargar la página

### Cómo le ayuda el Producto 2
- puede consultar publicaciones guardadas de forma persistente
- puede ver el dashboard con datos resumidos
- puede seleccionar publicaciones de interés mediante drag and drop
- puede interpretar mejor la información gracias al gráfico de ofertas y demandas

---

## 3. Arquetipo 2: pequeña empresa o reclutador

### Nombre representativo
Carlos Martínez

### Perfil general
Carlos tiene 38 años y trabaja en una pequeña empresa tecnológica. Necesita publicar ofertas laborales y consultar candidatos o demandas relacionadas con su sector.

### Objetivos principales
- crear ofertas de trabajo
- mantener visibles las publicaciones de la empresa
- revisar información de forma ordenada
- gestionar contenidos de manera rápida

### Necesidades
- alta sencilla de publicaciones
- tabla clara para consultar resultados
- persistencia de publicaciones
- control básico de la información mostrada

### Cómo le ayuda el Producto 2
- puede registrar ofertas y demandas con todos los campos necesarios
- las publicaciones se guardan en IndexedDB y no se pierden al recargar
- dispone de un gráfico con Canvas para visualizar el volumen de publicaciones
- puede revisar las publicaciones en una tabla organizada y mejor maquetada

---

## 4. Arquetipo 3: usuario administrador o gestor interno

### Nombre representativo
Ana Ruiz

### Perfil general
Ana tiene 30 años y actúa como gestora del sistema. Su papel está más relacionado con la revisión general de la aplicación, la gestión de usuarios y la organización del contenido.

### Objetivos principales
- dar de alta y eliminar usuarios
- supervisar el número de publicaciones
- consultar el resumen general del sistema
- gestionar la sesión de trabajo sin perder datos

### Necesidades
- una tabla de usuarios clara
- validación de formularios
- control del usuario activo
- visión global de la plataforma

### Cómo le ayuda el Producto 2
- puede gestionar usuarios desde una pantalla específica
- la sesión queda guardada en localStorage
- puede ver el dashboard con número de ofertas, demandas y usuarios
- dispone de una experiencia de uso más estable gracias a la persistencia

---

## 5. Relación entre los arquetipos y el diseño de la aplicación

Los arquetipos definidos ayudan a justificar varias decisiones del Producto 2:

- la existencia de una barra de navegación simple y constante
- la división clara entre dashboard, login, usuarios y publicaciones
- la necesidad de persistencia en navegador
- la incorporación de feedback visual al usuario
- la mejora del dashboard como panel resumido e interactivo
- la importancia de que las tablas y formularios sean fáciles de entender

---

## 6. Conclusión

Los arquetipos de usuarios del proyecto JobConnect permiten contextualizar la aplicación y entender por qué se han tomado determinadas decisiones de diseño e interacción. En el Producto 2, estos perfiles siguen siendo coherentes, pero la aplicación se adapta mejor a sus necesidades gracias a la incorporación de persistencia, representación gráfica y selección dinámica de publicaciones.