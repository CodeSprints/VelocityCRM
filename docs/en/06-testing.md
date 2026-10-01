# Testing

## Types of tests

| Type                 | Tooling                 | Location      | Command                 |
| --------------------- | ------------------------ | --------------- | -------------------------- |
| Unit                  | Vitest + Vue Test Utils  | `tests/unit`    | `npm run test`            |
| Accessibility         | axe-core (inside Vitest) | `tests/unit/accessibility` | `npm run test` |
| Translation parity    | Vitest                   | `tests/unit/i18n` | `npm run test`          |
| End-to-end            | Playwright               | `e2e`           | `npm run test:e2e`        |

## Unit tests

```bash
npm run test            # single run
npm run test:watch      # watch mode during development
npm run test:coverage   # code coverage report
```

Unit test coverage includes:

- the `useCrmStore` store — create, update, delete operations and computed getters,
- the `useIndustryStore` store — switching industry profiles and terminology,
- formatting functions (`formatCurrency`, `formatDate`),
- components (`StatusBadge`, `ContactsView`) — rendering, searching, creating and deleting
  records through the UI,
- translation key parity between `pl.json` and `en.json`,
- the absence of serious accessibility violations on the dashboard (axe-core).

## End-to-end tests

```bash
npx playwright install        # one-time browser installation
npm run test:e2e
```

The e2e tests run the built application (`npm run preview`) and verify real user scenarios in
Chromium (both a desktop and a mobile "Pixel 7" profile):

- navigating between views,
- opening and closing the mobile menu,
- adding a new contact through the form,
- searching and filtering the contact list.

## Guidelines for new tests

- Every new business feature in a Pinia store should have a unit test covering both the happy
  path and an edge case.
- Every new view with a form should have a test covering the happy path (creating a record) and
  the accessibility of its key elements (labels, ARIA roles).
- New translation keys must be added to both `pl.json` and `en.json` at the same time — the
  translation parity test enforces this.

## Code quality

```bash
npm run lint        # static analysis (ESLint + accessibility rules)
npm run lint:fix    # automatic fixes
npm run type-check  # TypeScript type checking without building
npm run format      # Prettier formatting
```

Running `npm run lint`, `npm run type-check` and `npm run test` before submitting a pull request
is strongly recommended.
