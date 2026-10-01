# Rozwój projektu i standardy kodu

## Zasady ogólne

- Kod źródłowy jest pisany bez komentarzy — nazwy zmiennych, funkcji i komponentów muszą być na
  tyle czytelne, aby komentarz nie był potrzebny. Logikę dzielimy na małe, dobrze nazwane funkcje
  kompozycyjne i metody magazynu stanu.
- Każdy komponent używa `<script setup lang="ts">` oraz Composition API.
- Typy danych są scentralizowane w `src/types`. Unikamy `any`.
- Stylowanie wyłącznie przez klasy narzędziowe Tailwind CSS — bez dodatkowych arkuszy stylów poza
  `src/assets/main.css`.
- Teksty widoczne dla użytkownika zawsze przechodzą przez `vue-i18n` (`t('...')`) — nigdy nie są
  zapisywane na sztywno w szablonie.

## Struktura komponentów

- `components/common` — elementy wielokrotnego użytku niezależne od domeny (przyciski, modale,
  pola wyszukiwania).
- `components/layout` — powłoka aplikacji (nagłówek, pasek boczny, menu mobilne).
- `components/<domena>` — komponenty specyficzne dla danego modułu (np. `components/contacts`).
- `views` — komponenty odpowiadające trasom routingu, które łączą ze sobą komponenty domenowe.

## Konwencje nazewnictwa

- Komponenty: `PascalCase.vue`.
- Funkcje kompozycyjne: `useNazwa.ts`.
- Magazyny Pinia: `useNazwaStore`.
- Klucze tłumaczeń: `sekcja.podsekcja.klucz` w notacji camelCase.

## Proces pracy nad zmianą

1. Uruchom `npm install`, jeśli zależności się zmieniły.
2. Wprowadź zmianę w kodzie.
3. Uruchom kolejno: `npm run lint`, `npm run type-check`, `npm run test`.
4. Jeśli zmiana dotyczy interfejsu, sprawdź ją ręcznie w trybie jasnym i ciemnym oraz na wąskim
   ekranie (np. w narzędziach deweloperskich przeglądarki).
5. Zaktualizuj dokumentację w `docs/pl` i `docs/en`, jeśli zmiana wpływa na sposób korzystania z
   aplikacji.

## Dodawanie nowego modułu (widoku)

1. Dodaj typ danych w `src/types/domain.ts`, jeśli moduł wprowadza nową encję.
2. Dodaj dane początkowe i akcje CRUD w `src/stores/crm.ts`.
3. Utwórz komponenty w `src/components/<nazwa-modulu>`.
4. Utwórz widok w `src/views/<Nazwa>View.vue`.
5. Zarejestruj trasę w `src/router/index.ts`.
6. Dodaj pozycję menu w `src/config/navigation.ts`.
7. Dodaj klucze tłumaczeń do obu plików lokalizacji.
8. Dodaj test jednostkowy magazynu i (opcjonalnie) test komponentu.

## Styl commitów

Zalecany jest zwięzły, opisowy commit w trybie rozkazującym, np. `Dodaj filtrowanie zadań po
statusie`. Unikaj commitów mieszających niepowiązane zmiany.
