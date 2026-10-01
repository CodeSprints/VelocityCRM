# Uruchamianie na web, desktop i mobile

## Web

```bash
npm run dev       # tryb deweloperski
npm run build     # wersja produkcyjna do katalogu dist/
npm run preview   # podgląd wersji produkcyjnej
```

Zbudowaną wersję (`dist/`) można wdrożyć na dowolnym hostingu stron statycznych (np. Netlify,
Vercel, własny serwer nginx).

## Desktop (Windows, macOS, Linux)

### Wymagania dodatkowe

- Rust i `cargo` (instalacja przez [rustup.rs](https://rustup.rs)).
- Tauri CLI (dołączone jako zależność deweloperska — `@tauri-apps/cli`).
- Zależności systemowe Tauri dla danego systemu operacyjnego — pełna lista znajduje się w
  [oficjalnej dokumentacji Tauri](https://v2.tauri.app/start/prerequisites/).

### Tryb deweloperski

```bash
npm run desktop:dev
```

Polecenie uruchamia serwer Vite oraz otwiera okno natywne, które ładuje aplikację z serwera
deweloperskiego. Zmiany w kodzie Vue odświeżają się automatycznie.

### Budowa instalatora

```bash
npm run desktop:build
```

Wynikowy instalator (`.msi`/`.exe` na Windows, `.dmg`/`.app` na macOS, `.deb`/`.AppImage` na
Linux) znajdzie się w `src-tauri/target/release/bundle`.

## Mobile (Android, iOS)

### Android

Wymagany jest zainstalowany Android Studio wraz z Android SDK oraz NDK. Pierwsze uruchomienie
wymaga inicjalizacji projektu mobilnego:

```bash
npx tauri android init
npm run android:dev
```

### iOS

Wymagany jest macOS z zainstalowanym Xcode. Pierwsze uruchomienie:

```bash
npx tauri ios init
npm run ios:dev
```

### Budowa wersji produkcyjnej

```bash
npm run android:build
npm run ios:build
```

## Wykrywanie platformy w kodzie

Funkcja kompozycyjna `useRuntimePlatform` (`src/composables/useRuntimePlatform.ts`) zwraca jedną
z wartości: `web`, `desktop` lub `mobile`. Widok Ustawień pokazuje aktualne środowisko
uruchomieniowe, korzystając z tej samej funkcji — to wzorzec do naśladowania przy dodawaniu
kolejnych zachowań zależnych od platformy.

## Ikony aplikacji

Pliki ikon dla desktopu i sklepów aplikacji znajdują się w `src-tauri/icons`. Aby wygenerować
pełny komplet ikon na podstawie nowego logo, użyj:

```bash
npx tauri icon ścieżka/do/logo.png
```
