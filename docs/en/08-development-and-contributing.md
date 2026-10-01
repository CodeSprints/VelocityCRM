# Project development and code standards

## General rules

- Source code is written without comments — variable, function and component names must be clear
  enough that a comment is unnecessary. Logic is split into small, well-named composables and
  store methods.
- Every component uses `<script setup lang="ts">` and the Composition API.
- Data types are centralized in `src/types`. Avoid `any`.
- Styling is done exclusively through Tailwind CSS utility classes — no extra stylesheets beyond
  `src/assets/main.css`.
- User-facing text always goes through `vue-i18n` (`t('...')`) — it is never hard-coded in a
  template.

## Component structure

- `components/common` — reusable, domain-independent building blocks (buttons, modals, search
  fields).
- `components/layout` — the application shell (header, sidebar, mobile menu).
- `components/<domain>` — components specific to a given module (for example
  `components/contacts`).
- `views` — components matching router routes that assemble domain components together.

## Naming conventions

- Components: `PascalCase.vue`.
- Composables: `useName.ts`.
- Pinia stores: `useNameStore`.
- Translation keys: `section.subsection.key` in camelCase.

## Workflow for a change

1. Run `npm install` if dependencies changed.
2. Make the code change.
3. Run, in order: `npm run lint`, `npm run type-check`, `npm run test`.
4. If the change affects the UI, check it manually in both light and dark mode and on a narrow
   screen (for example using the browser's device toolbar).
5. Update the documentation in `docs/pl` and `docs/en` if the change affects how the application
   is used.

## Adding a new module (view)

1. Add a data type to `src/types/domain.ts` if the module introduces a new entity.
2. Add initial data and CRUD actions to `src/stores/crm.ts`.
3. Create components under `src/components/<module-name>`.
4. Create a view at `src/views/<Name>View.vue`.
5. Register the route in `src/router/index.ts`.
6. Add a navigation entry in `src/config/navigation.ts`.
7. Add translation keys to both locale files.
8. Add a unit test for the store and, optionally, a component test.

## Commit style

A concise, descriptive, imperative-mood commit message is recommended, for example "Add task
status filtering". Avoid commits that mix unrelated changes.
