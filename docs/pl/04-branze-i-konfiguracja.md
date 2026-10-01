# Profile branżowe i konfiguracja

## Jak to działa

VelocityCRM nie jest zaszyty na sztywno pod sprzedaż. Każdy profil branżowy w pliku
`src/config/industries.ts` opisuje:

- nazwy encji w liczbie pojedynczej i mnogiej (np. „kontakt” / „Kontakty”),
- nazwy etapów procesu (np. „Rozpoznanie” → „Pierwszy kontakt” dla nieruchomości),
- etykiety statusów (`hot`, `warm`, `cold`) dopasowane do kontekstu,
- kolor akcentujący profilu.

Użytkownik wybiera profil w **Ustawieniach → Profil branżowy**. Zmiana jest natychmiastowa i nie
wymaga przeładowania strony — wszystkie etykiety w menu, na pulpicie, w tabelach i na tablicy
procesu aktualizują się automatycznie.

## Domyślnie dostępne profile

| Profil                  | Przykładowe zastosowanie                         |
| ------------------------ | ------------------------------------------------- |
| Sprzedaż i usługi B2B    | Zespoły handlowe, agencje                          |
| Nieruchomości            | Biura nieruchomości                                |
| Ochrona zdrowia          | Przychodnie, gabinety                              |
| Edukacja                 | Szkoły językowe, platformy kursowe                 |
| Hotelarstwo i gastronomia| Hotele, restauracje, sale eventowe                 |
| Usługi prawne            | Kancelarie prawne                                  |

## Dodawanie własnego profilu branżowego

1. Otwórz `src/config/industries.ts`.
2. Skopiuj istniejący obiekt profilu i nadaj mu unikalny `id`.
3. Uzupełnij tłumaczenia (`pl` i `en`) dla każdej nazwy.
4. Zdefiniuj pięć etapów procesu — identyfikatory etapów (`discovery`, `proposal`, `negotiation`,
   `closed-won`, `closed-lost`) muszą pozostać takie same, zmieniają się tylko etykiety.
5. Zapisz plik — nowy profil pojawi się automatycznie na liście w Ustawieniach.

Struktura profilu jest opisana typem `IndustryProfile` w `src/types/industry.ts`.

## Rozszerzanie o pola niestandardowe

Obecna wersja oferuje konfigurowalną terminologię i etapy procesu. Jeśli branża wymaga
dodatkowych pól na kontakcie lub rekordzie procesu (np. numer PESEL w ochronie zdrowia, numer
działki w nieruchomościach), zalecany kierunek rozbudowy to:

1. Dodanie pola opcjonalnego do odpowiedniego typu w `src/types/domain.ts`.
2. Dodanie pola do formularza w odpowiednim komponencie `*FormModal.vue`.
3. Warunkowe pokazywanie pola na podstawie aktywnego profilu branżowego
   (`useIndustryStore().activeIndustryId`).

Dzięki temu rdzeń aplikacji pozostaje wspólny, a różnice branżowe są deklaratywne i łatwe do
przetestowania.
