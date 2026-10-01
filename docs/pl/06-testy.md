# Testy

## Rodzaje testów

| Rodzaj             | Narzędzie              | Lokalizacja  | Polecenie              |
| ------------------- | ----------------------- | ------------- | ------------------------ |
| Jednostkowe         | Vitest + Vue Test Utils | `tests/unit`  | `npm run test`          |
| Dostępności         | axe-core (w Vitest)     | `tests/unit/accessibility` | `npm run test` |
| Zgodności tłumaczeń | Vitest                  | `tests/unit/i18n` | `npm run test`      |
| End-to-end          | Playwright              | `e2e`         | `npm run test:e2e`      |

## Testy jednostkowe

```bash
npm run test            # jednorazowe uruchomienie
npm run test:watch      # tryb obserwacji podczas pracy
npm run test:coverage   # raport pokrycia kodu
```

Zakres testów jednostkowych obejmuje:

- magazyn `useCrmStore` — operacje dodawania, edycji, usuwania oraz gettery wyliczane,
- magazyn `useIndustryStore` — przełączanie profili branżowych i terminologii,
- funkcje formatujące (`formatCurrency`, `formatDate`),
- komponenty (`StatusBadge`, `ContactsView`) — renderowanie, wyszukiwanie, dodawanie i usuwanie
  rekordów przez interfejs,
- zgodność kluczy tłumaczeń pomiędzy `pl.json` i `en.json`,
- brak poważnych naruszeń dostępności na pulpicie (axe-core).

## Testy end-to-end

```bash
npx playwright install        # jednorazowa instalacja przeglądarek
npm run test:e2e
```

Testy e2e uruchamiają zbudowaną aplikację (`npm run preview`) i sprawdzają rzeczywiste scenariusze
użytkownika w przeglądarce Chromium (wersja desktopowa i mobilna — profil „Pixel 7”):

- nawigację między widokami,
- otwieranie i zamykanie menu mobilnego,
- dodawanie nowego kontaktu przez formularz,
- wyszukiwanie i filtrowanie listy kontaktów.

## Zasady pisania nowych testów

- Każda nowa funkcja biznesowa w magazynie Pinia powinna mieć test jednostkowy pokrywający
  przypadek podstawowy oraz brzegowy.
- Każdy nowy widok z formularzem powinien mieć test sprawdzający happy path (dodanie rekordu) oraz
  dostępność kluczowych elementów (etykiety, role ARIA).
- Nowe klucze tłumaczeń muszą być dodane jednocześnie do `pl.json` i `en.json` — pilnuje tego test
  zgodności tłumaczeń.

## Jakość kodu

```bash
npm run lint        # analiza statyczna (ESLint + reguły dostępności)
npm run lint:fix    # automatyczna naprawa
npm run type-check  # sprawdzenie typów TypeScript bez budowania
npm run format      # formatowanie kodu Prettier
```

Zalecane jest uruchomienie `npm run lint`, `npm run type-check` oraz `npm run test` przed każdym
zgłoszeniem zmian (pull requestem).
