# Accessibility (WCAG)

VelocityCRM is designed to meet WCAG 2.1 level AA guidelines. Below are the concrete techniques
used in the codebase.

## Keyboard navigation

- A skip link lets users jump straight to the main content.
- Every modal dialog (`BaseModal.vue`) has a focus trap (`useFocusTrap`) — Tab cannot move focus
  outside the dialog, and Escape closes it.
- The pipeline kanban board has a keyboard alternative to drag and drop — "move to previous/next
  stage" buttons work without a mouse.
- Dropdown menus (notifications, account) close when clicking outside and are marked with
  `aria-haspopup` and `aria-expanded`.

## Semantics and screen readers

- Page headings are marked as `<h1>`, and sections have their own headings connected through
  `aria-labelledby`.
- The contacts table uses `<table>`, `<th scope="col">` and a visually hidden `<caption>`.
- Definition lists (`<dl>`, `<dt>`, `<dd>`) are only used where they describe genuine name-value
  pairs, with `<dt>`/`<dd>` as direct children of `<dl>`.
- Decorative icons all carry `aria-hidden="true"`, and icon-only buttons have a descriptive
  `aria-label`.
- Status indicators (such as a contact's status) are also conveyed through text, not color alone.

## Forms

- Every form field has an associated `<label for="...">`.
- Required fields carry the `required` attribute.
- The `vuejs-accessibility/label-has-for` lint rule enforces this automatically on every change.

## Contrast and dark mode

- The Tailwind color palette was chosen to keep text contrast at least 4.5:1 in both themes
  (light and dark).
- The focus state (`:focus-visible`) is always visible as a clear outline.

## Motion and animation

- The `prefers-reduced-motion` rule in `src/assets/main.css` shortens or disables animations for
  users who enabled that system preference.

## Responsiveness and text scaling

- The layout is fully fluid (RWD) — from narrow phone screens to large monitors.
- Text sizing is based on `rem` units, so increasing the browser's font size does not break the
  layout.

## Automated verification

- The test `tests/unit/accessibility/dashboard.a11y.spec.ts` runs the `axe-core` engine against
  the application dashboard and checks for the absence of serious WCAG 2.1 A/AA violations.
- The `eslint-plugin-vuejs-accessibility` lint plugin checks accessibility rules on every `.vue`
  file whenever `npm run lint` runs.

## Reporting accessibility issues

If you find an accessibility barrier, describe: the page, the element, the assistive technology
used (screen reader, keyboard, zoom level) and the expected behaviour. Such reports are treated as
a priority.
