# Portafolio de Robinson Montero

Portafolio profesional hecho con Angular 21 (componentes standalone, signals, Reactive Forms, SCSS). El contenido se administra desde archivos JSON locales; no hay backend.

## Instalación y ejecución

```bash
npm install
npm start          # http://localhost:4200
```

## Compilar

```bash
npm run build      # salida en dist/portfolio/browser
```

Requiere Node.js 20.19+, 22.12+ o 24+.

## Agregar o editar un proyecto

Edita [public/data/projects.json](public/data/projects.json). Cada objeto genera automáticamente su tarjeta, su entrada en `/proyectos` y su página `/proyectos/<slug>`.

| Campo | Notas |
| --- | --- |
| `id`, `slug` | Únicos. El `slug` forma la URL. |
| `featured` | `true` lo muestra en el inicio. |
| `displayOrder` | Orden ascendente. |
| `status` | `completed`, `in-progress` o `to-define`. |
| `gallery` | Lista de `{ "src", "alt" }`. Si está vacía, la sección se oculta. |
| `outcomes` | Resultados verificables. Si está vacío, la sección se oculta. |
| `demoUrl`, `repositoryUrl` | Opcionales. Solo se muestran si son URL http(s) válidas. |

Los textos que dicen «Pendiente de definir» (rol, funcionalidades) son contenido editable: reemplázalos por información real.

## Reemplazar imágenes

Las imágenes viven en `public/images/` y se referencian con rutas relativas (por ejemplo `images/projects/mi-proyecto.png`).

- Portadas: `public/images/projects/` (proporción recomendada 8:5, 1200×750).
- Imagen del hero: `public/images/hero/`; cambia `hero.image` en [public/data/portfolio.json](public/data/portfolio.json).
- Los `.svg` actuales son placeholders locales y deben sustituirse por capturas reales.

## Contacto y enlaces

En `contact` de [public/data/portfolio.json](public/data/portfolio.json):

- `email`: dirección válida.
- `linkedin`: URL `https://www.linkedin.com/in/...`.
- `github`: URL `https://github.com/...`.
- `whatsapp`: número con código de país (por ejemplo `18095551234`).

Solo se muestran los canales válidos. Si no hay ninguno, la sección muestra un aviso de configuración pendiente y no aparecen botones.

Los textos del hero, los servicios y la marca se editan en el mismo archivo.

## Colores y tipografías

Todos los tokens están en [src/styles/_tokens.scss](src/styles/_tokens.scss): colores (claro y oscuro), fuentes, tamaños, espaciados, radios y sombras. Las fuentes (Playfair Display e Inter) se cargan desde Google Fonts en [src/index.html](src/index.html).

El tema se guarda en `localStorage` (`rm-theme`); sin valor guardado se usa la preferencia del sistema.

## Arquitectura

```
src/app/
  core/       Infraestructura global: layout (header, footer), tema, SEO, configuración y página 404
  shared/     UI reutilizable (button, section-heading, technology-badge, empty-state, loading-state, icon) y utilidades
  features/
    home/     Página de inicio: hero, servicios y contacto
    projects/ Modelo, servicio (data-access), componentes y páginas de proyectos
```

- `home` consume el componente público `FeaturedProjectsComponent` de `projects`; `projects` no depende de `home`.
- `ProjectsService` carga `projects.json` una sola vez (caché con `shareReplay`) y ofrece `getAll()`, `getFeatured()` y `getBySlug()`.
- `PortfolioConfigService` hace lo mismo con `portfolio.json`.
- Las páginas se cargan de forma diferida desde [src/app/app.routes.ts](src/app/app.routes.ts).
