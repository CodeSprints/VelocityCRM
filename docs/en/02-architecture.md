# Application architecture

## One codebase principle

VelocityCRM is a single frontend application written in Vue 3 and TypeScript. The same source
code is packaged three ways:

- as a static website (Vite),
- as a desktop application through the Tauri shell (Windows, macOS, Linux),
- as a mobile application through Tauri Mobile (Android, iOS).

Business logic, views and styles are shared. Differences between platforms are limited to small
UI adjustments (for example a bottom navigation bar on small screens) and are detected at
runtime rather than through separate code branches.

## Directory structure

```
src/
  assets/        global styles (Tailwind, accessibility rules)
  components/    reusable components, grouped by feature
  composables/   composition functions (focus trap, media query, etc.)
  config/        navigation and industry profile configuration
  i18n/          translation setup
  locales/       PL/EN translation files
  router/        route definitions
  stores/        Pinia state stores
  types/         shared TypeScript types
  utils/         helper functions (date, currency, id formatting)
  views/         components matching individual routes
src-tauri/       native Tauri shell (Rust) for desktop and mobile
tests/           unit tests (Vitest)
e2e/             end-to-end tests (Playwright)
docs/            documentation (this folder)
```

## State layer (Pinia)

The application uses three stores:

- `useCrmStore` — business data: contacts, organizations, pipeline items, tasks, activities,
  notifications, messages, documents and the current user profile. It exposes CRUD actions and
  getters (for example the count of unread notifications).
- `useIndustryStore` — the currently selected industry profile and the list of available
  profiles.
- `useUiStore` — interface state: color theme, sidebar state and mobile menu state.

Selected parts of the state (theme, industry, business data) are automatically persisted to
`localStorage` through the `pinia-plugin-persistedstate` plugin.

## Translation layer

`vue-i18n` supports two interface languages: Polish and English. The files
`src/locales/pl.json` and `src/locales/en.json` must contain exactly the same keys — this is
enforced by the test `tests/unit/i18n/locale-parity.spec.ts`.

Industry profiles (`src/config/industries.ts`) store their own translations for entity names
(for example "contact" → "patient") independently of the main interface dictionary. This way
switching the industry and switching the interface language work independently from each other.

## Routing layer

`vue-router` defines eleven routes matching the application's main views (dashboard, contacts,
organizations, pipeline, tasks, activities, inbox, reports, documents, settings, profile) plus a
404 route. Every view is lazy-loaded (`import()`), which shortens the initial load time.

## Native access layer (Tauri)

The `src-tauri` directory contains a minimal Rust shell that:

- opens the desktop application window and loads the built web application,
- provides the entry point for Android and iOS (`tauri::mobile_entry_point`),
- declares the application's permissions in the `capabilities` directory.

The `useRuntimePlatform` composable in the frontend layer detects whether the application is
running in a browser, on desktop or on a mobile device, allowing the interface to adapt without
duplicating code.
