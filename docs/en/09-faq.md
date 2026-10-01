# Frequently asked questions

**Is this one application or three separate versions?**
It is one Vue + TypeScript application. The same code is packaged for the browser, for the
desktop application and for the mobile application using Tauri. There are no separate code
branches per platform.

**Can I use VelocityCRM for an industry other than sales?**
Yes. Choose a different industry profile in Settings — this changes terminology and pipeline
stages. See the [industry profiles chapter](./04-industries-and-configuration.md) for details on
adding your own profile.

**Where is the data stored?**
In the demo version, data is stored locally in the browser (`localStorage`). To connect a real
data source (an API, a database), replace the logic in `src/stores/crm.ts` with calls to an
external service.

**Does the application work offline?**
The frontend layer works offline because the data is local. In the desktop and mobile (Tauri)
versions, the application launches without an internet connection. The web version needs the
application files to be loaded once.

**Why doesn't the code contain comments?**
This is a deliberate design decision — the code is written so that names and structure speak for
themselves. Architectural rules and rationale live in this documentation, not in code comments.

**How do I change the brand color?**
The base color (`brand`) is defined in `tailwind.config.ts`. Each industry profile also has its
own accent color in `src/config/industries.ts`.

**How do I add a new interface language?**
Described step by step in the [translations chapter](./07-i18n.md).

**Does the application meet accessibility requirements?**
The application is designed to meet WCAG 2.1 AA. Details are in the
[accessibility chapter](./05-accessibility.md).

**How do I report a bug or suggest a change?**
The best way is through the repository's issue tracker, describing the steps to reproduce the
problem and the expected behaviour.
