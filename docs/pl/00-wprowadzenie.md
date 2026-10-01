# Wprowadzenie

## Czym jest VelocityCRM

VelocityCRM to uniwersalna aplikacja do zarządzania relacjami i procesami biznesowymi. Jeden kod
obsługuje trzy środowiska: przeglądarkę internetową, aplikację desktopową (Windows, macOS, Linux)
oraz aplikację mobilną (Android, iOS). Aplikacja nie jest przypisana do jednej branży — profil
branżowy zmienia nazewnictwo, etapy procesu sprzedaży i etykiety na ekranie, bez zmiany kodu.

## Dla kogo jest ta aplikacja

Domyślnie VelocityCRM wygląda jak klasyczny CRM sprzedażowy, ale dzięki profilom branżowym można
ją dopasować do innych zastosowań, na przykład:

- biura nieruchomości (klienci, nieruchomości, transakcje),
- placówek ochrony zdrowia (pacjenci, placówki, ścieżki leczenia),
- firm edukacyjnych (słuchacze, szkoły, procesy rekrutacji),
- obiektów hotelarskich i gastronomicznych (goście, obiekty, rezerwacje),
- kancelarii prawnych (klienci, podmioty, sprawy).

Profil branżowy wybiera się w **Ustawieniach** — zmienia on tylko etykiety i nazwy etapów, dane
pozostają takie same.

## Główne funkcje

- Pulpit z kluczowymi wskaźnikami, lejkiem procesu i listą zadań.
- Lista kontaktów z wyszukiwaniem, filtrowaniem, dodawaniem, edycją i usuwaniem.
- Organizacje powiązane z kontaktami.
- Tablica procesu (kanban) z etapami zależnymi od wybranej branży.
- Zadania z priorytetami i statusami.
- Oś czasu aktywności.
- Skrzynka wiadomości.
- Raporty z podstawowymi wskaźnikami (konwersja, średnia wartość, wskaźnik wygranych).
- Dokumenty.
- Ustawienia: branża, motyw jasny/ciemny/systemowy, język interfejsu, powiadomienia.
- Profil użytkownika.

## Stos technologiczny

| Warstwa          | Technologia                               |
| ---------------- | ------------------------------------------ |
| Interfejs         | Vue 3 (Composition API, `<script setup>`) |
| Język             | TypeScript                                 |
| Stylowanie        | Tailwind CSS                               |
| Stan aplikacji    | Pinia (z zapisem w `localStorage`)         |
| Routing           | Vue Router                                 |
| Tłumaczenia       | vue-i18n (polski i angielski)              |
| Budowanie         | Vite                                       |
| Desktop i mobile  | Tauri 2                                    |
| Testy jednostkowe | Vitest, Vue Test Utils, axe-core           |
| Testy end-to-end  | Playwright                                 |

## Spis treści dokumentacji

1. [Wprowadzenie](./00-wprowadzenie.md)
2. [Instalacja i pierwsze uruchomienie](./01-instalacja.md)
3. [Architektura aplikacji](./02-architektura.md)
4. [Uruchamianie na web, desktop i mobile](./03-uruchamianie-platformy.md)
5. [Profile branżowe i konfiguracja](./04-branze-i-konfiguracja.md)
6. [Dostępność (WCAG)](./05-dostepnosc.md)
7. [Testy](./06-testy.md)
8. [Tłumaczenia i lokalizacja](./07-i18n.md)
9. [Rozwój projektu i standardy kodu](./08-rozwoj-i-wklad.md)
10. [Najczęstsze pytania (FAQ)](./09-faq.md)
