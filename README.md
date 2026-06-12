# SiviCamp 2026

SiviCamp 2026 is a Vite + React landing page for the RAMMASTIC event.

## Requirements

- Node.js 18+ recommended
- npm

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

This starts the app on `http://localhost:3000/`.

## Production build

```bash
npm run build
```

Vite uses the production base path configured in `vite.config.js`, so the build is ready for deployment under `/sivicamp2026/`.

## Preview the production build

```bash
npm run preview
```

## Asset paths

Static assets that live in `public/` should be referenced with `import.meta.env.BASE_URL` in source files, or `%BASE_URL%` in `index.html`, so the app works correctly in a subdirectory deployment.

## Deployment notes

- Local development uses `/`
- Production builds use `/sivicamp2026/`
- If you deploy to a different subpath, update the `base` value in `vite.config.js`
