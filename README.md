# @hugo_cruz/nextjs-setup

Un template personalizado para proyectos Next.js con una configuración lista para usar, incluyendo Tailwind CSS, Prettier, Husky, ESLint y más. Ideal para arrancar rápido con un setup sólido y organizado.

## Características

- **Next.js 15**: Configurado con soporte para Turbopack.
- **Tailwind CSS**: Estilos modernos y rápidos con PostCSS.
- **Prettier**: Formateo automático con plugins para Tailwind y organización de imports.
- **ESLint**: Linting integrado con la config de Next.js y Prettier.
- **Husky**: Hooks de Git para mantener el código limpio antes de cada commit.
- **TypeScript**: Soporte completo para un desarrollo más seguro.
- **Commitizen**: Commits estandarizados con `cz-conventional-changelog`.
- **Estructura base**: Incluye carpetas como `lib/`, y `public/` para empezar YA.

## Requisitos

Este proyecto usa **pnpm** como gestor de paquetes para una instalación más rápida y eficiente. Asegúrate de tenerlo instalado globalmente antes de empezar:

```bash
npm install -g pnpm
```

## Instalación

1. Instala el paquete desde npm:

   ```bash
   npm install @hugo_cruz/nextjs-setup
   ```

2. Ejecuta el comando para configurar tu proyecto:
   ```bash
   npx setup-nextjs
   ```

## Autor

- Hugo Cruz de la Torres [Linkedin](https://www.linkedin.com/in/hugo-cruz-7a0630197)

## Contribuciones

Si quieres contribuir, ¡adelante! Abre un issue o un pull request y estaré encantado de revisarlo.

## Versionado

```bash
 npx changeset
 npm run local-release
```
