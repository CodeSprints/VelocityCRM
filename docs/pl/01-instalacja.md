# Instalacja i pierwsze uruchomienie

## Wymagania

- Node.js w wersji 20 lub nowszej.
- npm w wersji 10 lub nowszej (dołączony do Node.js).
- Do budowania wersji desktopowej i mobilnej: Rust (`rustup`) oraz Tauri CLI — opisane w
  [rozdziale o platformach](./03-uruchamianie-platformy.md).

## Instalacja zależności

```bash
npm install
```

## Uruchomienie trybu deweloperskiego (przeglądarka)

```bash
npm run dev
```

Aplikacja uruchomi się pod adresem `http://localhost:1420`.

## Budowanie wersji produkcyjnej (web)

```bash
npm run build
npm run preview
```

Polecenie `build` sprawdza typy TypeScript (`vue-tsc`), a następnie buduje statyczne pliki do
katalogu `dist`. Katalog `dist` można wdrożyć na dowolnym serwerze stron statycznych.

## Najważniejsze skrypty

| Skrypt                 | Opis                                                        |
| ----------------------- | ------------------------------------------------------------ |
| `npm run dev`           | Serwer deweloperski z podglądem na żywo                     |
| `npm run build`         | Sprawdzenie typów i budowa wersji produkcyjnej               |
| `npm run preview`       | Podgląd zbudowanej wersji produkcyjnej                       |
| `npm run lint`          | Sprawdzenie jakości kodu (ESLint)                            |
| `npm run lint:fix`      | Automatyczna naprawa prostych błędów lintera                 |
| `npm run format`        | Formatowanie kodu (Prettier)                                 |
| `npm run type-check`    | Sprawdzenie typów bez budowania                               |
| `npm run test`          | Uruchomienie testów jednostkowych (Vitest)                   |
| `npm run test:watch`    | Testy jednostkowe w trybie obserwacji                        |
| `npm run test:coverage` | Testy jednostkowe z raportem pokrycia                        |
| `npm run test:e2e`      | Testy end-to-end (Playwright)                                |
| `npm run desktop:dev`   | Uruchomienie aplikacji desktopowej w trybie deweloperskim     |
| `npm run desktop:build` | Budowa instalatora aplikacji desktopowej                      |
| `npm run android:dev`   | Uruchomienie aplikacji na emulatorze/urządzeniu z Androidem   |
| `npm run ios:dev`       | Uruchomienie aplikacji na symulatorze/urządzeniu z iOS        |

## Dane startowe

Aplikacja startuje z przykładowymi danymi (kontakty, organizacje, zadania, wiadomości). Dane są
zapisywane lokalnie w przeglądarce (`localStorage`), więc zmiany wprowadzone w interfejsie
przetrwają odświeżenie strony. Aby zresetować dane, wyczyść pamięć lokalną strony w przeglądarce
(`localStorage` dla danej domeny).
