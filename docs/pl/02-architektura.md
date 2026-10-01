# Architektura aplikacji

## Zasada jednego kodu

VelocityCRM to jedna aplikacja frontendowa napisana w Vue 3 i TypeScript. Ten sam kod źródłowy
jest pakowany na trzy sposoby:

- jako statyczna strona internetowa (Vite),
- jako aplikacja desktopowa przez powłokę Tauri (Windows, macOS, Linux),
- jako aplikacja mobilna przez Tauri Mobile (Android, iOS).

Logika biznesowa, widoki i style są wspólne. Różnice między platformami ograniczają się do
drobnych dostosowań interfejsu (np. dolny pasek nawigacji na małych ekranach) i są wykrywane w
czasie działania, a nie przez osobne gałęzie kodu.

## Struktura katalogów

```
src/
  assets/        style globalne (Tailwind, reguły dostępności)
  components/    komponenty wielokrotnego użytku, pogrupowane wg funkcji
  composables/   funkcje kompozycyjne (np. pułapka fokusu, media query)
  config/        konfiguracja nawigacji i profili branżowych
  i18n/          inicjalizacja tłumaczeń
  locales/       pliki tłumaczeń PL/EN
  router/        definicje tras
  stores/        magazyny stanu Pinia
  types/         typy TypeScript współdzielone w aplikacji
  utils/         funkcje pomocnicze (formatowanie dat, walut, identyfikatorów)
  views/         widoki odpowiadające poszczególnym trasom
src-tauri/       natywna powłoka Tauri (Rust) dla desktopu i mobile
tests/           testy jednostkowe (Vitest)
e2e/             testy end-to-end (Playwright)
docs/            dokumentacja (ten katalog)
```

## Warstwa stanu (Pinia)

Aplikacja korzysta z trzech magazynów:

- `useCrmStore` — dane biznesowe: kontakty, organizacje, etapy procesu, zadania, aktywności,
  powiadomienia, wiadomości, dokumenty i profil użytkownika. Udostępnia akcje CRUD oraz gettery
  (np. liczbę nieprzeczytanych powiadomień).
- `useIndustryStore` — aktualnie wybrany profil branżowy oraz lista dostępnych profili.
- `useUiStore` — stan interfejsu: motyw kolorystyczny, stan paska bocznego i menu mobilnego.

Wybrane fragmenty stanu (motyw, branża, dane biznesowe) są automatycznie zapisywane w
`localStorage` dzięki wtyczce `pinia-plugin-persistedstate`.

## Warstwa tłumaczeń

`vue-i18n` obsługuje dwa języki interfejsu: polski i angielski. Pliki `src/locales/pl.json` oraz
`src/locales/en.json` muszą zawierać dokładnie te same klucze — pilnuje tego test
`tests/unit/i18n/locale-parity.spec.ts`.

Profile branżowe (plik `src/config/industries.ts`) przechowują własne tłumaczenia nazw encji
(np. „kontakt” → „pacjent”) niezależnie od głównego słownika interfejsu. Dzięki temu zmiana
branży i zmiana języka interfejsu działają niezależnie od siebie.

## Warstwa routingu

`vue-router` definiuje jedenaście tras odpowiadających głównym widokom aplikacji (pulpit,
kontakty, organizacje, proces sprzedaży, zadania, aktywności, skrzynka, raporty, dokumenty,
ustawienia, profil) oraz trasę 404. Każdy widok jest ładowany leniwie (`import()`), co skraca
czas pierwszego załadowania aplikacji.

## Warstwa dostępu natywnego (Tauri)

Katalog `src-tauri` zawiera minimalną powłokę Rust, która:

- otwiera okno aplikacji desktopowej i ładuje zbudowaną aplikację webową,
- udostępnia punkt wejścia dla Androida i iOS (`tauri::mobile_entry_point`),
- deklaruje uprawnienia aplikacji w katalogu `capabilities`.

Komponent `useRuntimePlatform` w warstwie frontendowej wykrywa, czy aplikacja działa w
przeglądarce, na desktopie czy na urządzeniu mobilnym, i pozwala dostosować interfejs bez
duplikowania kodu.
