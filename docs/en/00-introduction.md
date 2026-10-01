# Introduction

## What VelocityCRM is

VelocityCRM is a universal application for managing business relationships and processes. One
codebase powers three environments: a web browser, a desktop application (Windows, macOS, Linux)
and a mobile application (Android, iOS). The application is not tied to one industry — an
industry profile changes terminology, pipeline stages and on-screen labels without touching the
code.

## Who it is for

By default VelocityCRM looks like a classic sales CRM, but industry profiles let you adapt it to
other use cases, for example:

- real estate agencies (clients, properties, transactions),
- healthcare facilities (patients, facilities, care pathways),
- education providers (learners, schools, enrollments),
- hospitality venues (guests, venues, bookings),
- law firms (clients, entities, cases).

The industry profile is chosen in **Settings** — it only changes labels and stage names, the
underlying data stays the same.

## Main features

- Dashboard with key metrics, a pipeline overview and an upcoming task list.
- Contact list with search, filtering, creation, editing and deletion.
- Organizations linked to contacts.
- A kanban pipeline board with stages that depend on the selected industry.
- Tasks with priorities and statuses.
- An activity timeline.
- An inbox for messages.
- Reports with basic metrics (conversion, average value, win rate).
- Documents.
- Settings: industry, light/dark/system theme, interface language, notifications.
- User profile.

## Technology stack

| Layer              | Technology                                 |
| ------------------- | -------------------------------------------- |
| UI                  | Vue 3 (Composition API, `<script setup>`)   |
| Language            | TypeScript                                   |
| Styling             | Tailwind CSS                                 |
| Application state   | Pinia (persisted to `localStorage`)          |
| Routing             | Vue Router                                   |
| Translations        | vue-i18n (Polish and English)                |
| Build tool          | Vite                                         |
| Desktop and mobile  | Tauri 2                                      |
| Unit testing        | Vitest, Vue Test Utils, axe-core             |
| End-to-end testing  | Playwright                                   |

## Documentation contents

1. [Introduction](./00-introduction.md)
2. [Installation and first run](./01-installation.md)
3. [Application architecture](./02-architecture.md)
4. [Running on web, desktop and mobile](./03-running-platforms.md)
5. [Industry profiles and configuration](./04-industries-and-configuration.md)
6. [Accessibility (WCAG)](./05-accessibility.md)
7. [Testing](./06-testing.md)
8. [Translations and localization](./07-i18n.md)
9. [Project development and code standards](./08-development-and-contributing.md)
10. [Frequently asked questions](./09-faq.md)
