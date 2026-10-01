# Installation and first run

## Requirements

- Node.js 20 or newer.
- npm 10 or newer (bundled with Node.js).
- To build the desktop and mobile versions: Rust (`rustup`) and the Tauri CLI — described in the
  [platforms chapter](./03-running-platforms.md).

## Installing dependencies

```bash
npm install
```

## Running the development server (browser)

```bash
npm run dev
```

The application starts at `http://localhost:1420`.

## Building the production version (web)

```bash
npm run build
npm run preview
```

The `build` command type-checks the project with `vue-tsc` and then builds static files into the
`dist` folder. The `dist` folder can be deployed to any static hosting provider.

## Key scripts

| Script                  | Description                                            |
| ------------------------ | --------------------------------------------------------- |
| `npm run dev`            | Development server with live reload                     |
| `npm run build`          | Type-check and build the production bundle               |
| `npm run preview`        | Preview the production build                              |
| `npm run lint`           | Run static code analysis (ESLint)                         |
| `npm run lint:fix`       | Automatically fix simple lint issues                       |
| `npm run format`         | Format the codebase (Prettier)                             |
| `npm run type-check`     | Check TypeScript types without building                    |
| `npm run test`           | Run unit tests (Vitest)                                     |
| `npm run test:watch`     | Run unit tests in watch mode                                |
| `npm run test:coverage`  | Run unit tests with a coverage report                       |
| `npm run test:e2e`       | Run end-to-end tests (Playwright)                           |
| `npm run desktop:dev`    | Run the desktop application in development mode             |
| `npm run desktop:build`  | Build the desktop application installer                     |
| `npm run android:dev`    | Run the application on an Android emulator/device           |
| `npm run ios:dev`        | Run the application on an iOS simulator/device               |

## Starter data

The application starts with sample data (contacts, organizations, tasks, messages). Data is saved
locally in the browser (`localStorage`), so changes made in the interface survive a page reload.
To reset the data, clear the page's local storage for that domain in your browser.
