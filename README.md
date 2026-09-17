# VEP Asesoría Integral — sitio web

Sitio web institucional de **VEP Asesoría Integral** (Vergara, Estevez, Pellegrini), estudio contable, impositivo y jurídico con sede en San Lorenzo, Santa Fe.

Sitio estático (HTML, CSS y JavaScript sin frameworks ni build step), pensado para atraer consultas por WhatsApp y mostrar los servicios, el equipo, los vencimientos fiscales y el coworking del estudio.

## Estructura

```
index.html          Página principal (todas las secciones)
css/styles.css       Estilos (tokens de marca, layout, responsive, dark mode)
js/main.js           Menú móvil, año dinámico y animaciones al hacer scroll
assets/img/          Fotos optimizadas del estudio y logo en SVG
material-original/   Material fuente (fotos originales y brief) — no se publica
```

## Desarrollo local

No requiere instalación de dependencias. Para verlo local con rutas relativas funcionando:

```bash
node .devserver.js
```

Y abrir `http://localhost:4173`.

## Despliegue

Sitio 100% estático: se puede desplegar tal cual en Vercel, Netlify o GitHub Pages sin configuración adicional (no hay build step).

## Contenido a actualizar

- Reemplazar el mapa embebido en `#contacto` si cambia la dirección.
- Sumar fotos del equipo cuando estén disponibles (hoy se usan iniciales).
- Revisar las fechas de vencimientos impositivos ante cambios normativos.
