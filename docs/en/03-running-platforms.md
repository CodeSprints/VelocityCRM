# Running on web, desktop and mobile

## Web

```bash
npm run dev       # development mode
npm run build     # production build into dist/
npm run preview   # preview the production build
```

The built output (`dist/`) can be deployed to any static hosting provider (Netlify, Vercel, a
plain nginx server, and so on).

## Desktop (Windows, macOS, Linux)

### Additional requirements

- Rust and `cargo` (install via [rustup.rs](https://rustup.rs)).
- The Tauri CLI (included as a dev dependency — `@tauri-apps/cli`).
- Tauri's system dependencies for your operating system — the full list is in the
  [official Tauri documentation](https://v2.tauri.app/start/prerequisites/).

### Development mode

```bash
npm run desktop:dev
```

This command starts the Vite server and opens a native window that loads the application from the
development server. Changes to Vue code hot-reload automatically.

### Building an installer

```bash
npm run desktop:build
```

The resulting installer (`.msi`/`.exe` on Windows, `.dmg`/`.app` on macOS, `.deb`/`.AppImage` on
Linux) is produced in `src-tauri/target/release/bundle`.

## Mobile (Android, iOS)

### Android

Android Studio with the Android SDK and NDK must be installed. The first run requires
initializing the mobile project:

```bash
npx tauri android init
npm run android:dev
```

### iOS

A macOS machine with Xcode installed is required. First run:

```bash
npx tauri ios init
npm run ios:dev
```

### Building production versions

```bash
npm run android:build
npm run ios:build
```

## Detecting the platform in code

The `useRuntimePlatform` composable (`src/composables/useRuntimePlatform.ts`) returns one of
`web`, `desktop` or `mobile`. The Settings view displays the current runtime environment using
this same composable — follow this pattern when adding further platform-specific behaviour.

## Application icons

Icon files for the desktop build and app stores live in `src-tauri/icons`. To regenerate the full
icon set from a new logo, run:

```bash
npx tauri icon path/to/logo.png
```
