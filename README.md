# Portafolio — Flinn Nieto

Portafolio personal de **Flinn Nieto**, desarrollador Full Stack (React, Next.js, FastAPI, Node.js, Django, PostgreSQL e IA). Sitio estático en Next.js 16 con modo oscuro/claro, animaciones, paleta de comandos y una sección de GitHub con datos reales.

## Características

- **Secciones completas**: hero, sobre mí, skills, proyectos, experiencia, línea de tiempo, estadísticas, formación y contacto.
- **Proyectos con detalle**: cada proyecto tiene su página con descripción, problema que resuelve, arquitectura, características, stack, retos y aprendizajes.
- **Galería de capturas** navegable por proyecto.
- **GitHub en vivo**: repos, actividad de commits, lenguajes y estadísticas reales vía API de GitHub, con cache de 24 h y fallback offline.
- **Modo oscuro / claro** persistente.
- **Paleta de comandos** (`Ctrl K`) para navegar secciones, proyectos y enlaces.
- **Cursor personalizado**, scroll suave (Lenis), partículas, reveal animations y loader de entrada.
- **Currículum imprimible** en `/cv` y descarga del CV en PDF.
- **SEO**: metadatos, Open Graph, Twitter Cards, sitemap, robots.txt y manifest.
- 404 personalizada para URLs desconocidas.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion, Lenis
- **UI**: lucide-react, cmdk, next-themes, react-icons
- **Lenguaje**: TypeScript

## Estructura

```
src/
├── app/
│   ├── (site)/              # Rutas públicas (/, /cv, /projects/[slug])
│   ├── api/repos/           # Ruta API con datos de GitHub (cacheada)
│   ├── globals.css          # Tokens de diseño y utilidades
│   └── layout.tsx           # Layout raíz con metadatos y fuentes
├── components/
│   ├── features/            # Paleta de comandos, partículas, theme toggle…
│   ├── layout/              # Navbar, footer, loader, cursor, shell…
│   ├── sections/            # Secciones de la página de inicio
│   └── ui/                  # Botones, badges, galería, reveal…
├── hooks/                   # use-animation, use-media, use-scroll-spy
└── lib/
    ├── data/                # Contenido (perfil, proyectos, skills, experiencia…)
    ├── github.ts            # Fetch de la API de GitHub
    └── seo.ts               # Configuración del sitio
```

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando         | Descripción                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo                        |
| `npm run build` | Build de producción                           |
| `npm run start` | Sirve el build de producción                  |
| `npm run lint`  | ESLint                                        |

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta si hace falta:

```bash
cp .env.example .env.local
```

| Variable       | Obligatoria | Descripción                                                        |
| -------------- | ----------- | ------------------------------------------------------------------ |
| `GITHUB_USER`  | No          | Usuario de GitHub para la sección "GitHub" (por defecto `slade1930`) |

## Contenido

Todo el contenido editable vive en `src/lib/data/`:

- `profile.ts` — nombre, rol, descripciones, contacto y redes.
- `projects.ts` — proyectos, su detalle técnico y capturas.
- `skills.ts`, `experience.ts`, `education.ts`, `stats.ts` — el resto de secciones.

Las capturas de proyectos van en `public/projects/`.

## Despliegue

El proyecto es 100 % estático y está listo para Vercel:

```bash
vercel
```

También funciona con cualquier host que soporte Next.js (Node 20+).
