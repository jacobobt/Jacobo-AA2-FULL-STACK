# JobConnect · Producto 2

Versión evolucionada del Producto 1 para la asignatura FP.450.

## Qué incorpora esta versión

- Persistencia de usuarios en **WebStorage**.
- Persistencia de ofertas/demandas en **IndexedDB**.
- Gestión de **usuario activo** mediante `localStorage`.
- **Canvas** nativo para representar ofertas vs demandas.
- **Drag & Drop** nativo en el dashboard.
- Código modular preparado para sustituir más adelante la persistencia local por llamadas a un backend.

## Scripts principales

- `assets/js/almacenaje.js` → módulo central de persistencia.
- `assets/js/int_1_dashboard.js` → dashboard con drag & drop.
- `assets/js/int_2_login.js` → login y sesión activa.
- `assets/js/int_3_empleos.js` → CRUD de publicaciones + canvas.
- `assets/js/int_4_usuarios.js` → CRUD de usuarios.
- `assets/js/ui.js` → utilidades comunes de interfaz.

## Cómo probarlo

1. Abrir el proyecto con Live Server o Live Preview.
2. Entrar primero en `usuarios.html` si se quiere crear un usuario nuevo.
3. Ir a `login.html` para iniciar sesión.
4. Ir a `ofertas-demandas.html` para crear o borrar publicaciones.
5. Ir a `index.html` para arrastrar publicaciones al panel de selección.

## Usuarios iniciales

- `laura@jobconnect.com` / `1234`
- `carlos@techempresa.com` / `1234`
- `ana@jobconnect.com` / `1234`
