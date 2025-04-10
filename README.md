# @hugo_cruz/nextjs-setup

A custom template for Next.js projects with a ready-to-use setup, including Tailwind CSS, Prettier, Husky, ESLint and more. Ideal for a quick start with a solid and organized setup.

## What's included?

- Next.js 15 with Turbopack support.
- Tailwind CSS v4 for fast styling.
- TypeScript for safer code.
- Prettier with plugins for sorting imports and Tailwind.
- ESLint 9 configured with Next.js.
- Commitizen for standardized commits with `cz-conventional-changelog`.
- Husky for automatic Git hooks.
- Basic structure: `src/app`, `src/lib`.

## Requirements

This project is designed to use **pnpm** as a package manager, taking advantage of its speed and efficiency. If you don't have `pnpm` installed, **npm** will be used as an alternative, but we recommend installing it globally with `npm install -g pnpm` to get the most out of it. Also, you need **Node.js 20 or higher** to make everything run smoothly.

## Installation

1. Install the package from npm:

   ```bash
   npm install @hugo_cruz/nextjs-setup
   ```

2. Execute the command to set up your project:
   ```bash
   npx setup-nextjs
   ```

## Author

- Hugo Cruz de la Torres [Linkedin](https://www.linkedin.com/in/hugo-cruz-7a0630197)

## Contributions

If you want to contribute, go ahead! Open an issue or a pull request and I'll be happy to review it.

- [Issues](https://github.com/hugocruzlfc/nextjs-setup/issues)
- [Pull requests](https://github.com/hugocruzlfc/nextjs-setup/pulls)

## Versioning

```bash
 npx changeset
 npm run local-release
```
