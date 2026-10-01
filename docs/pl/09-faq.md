# Najczęstsze pytania (FAQ)

**Czy to jest jedna aplikacja, czy trzy osobne wersje?**
To jedna aplikacja Vue + TypeScript. Ten sam kod jest pakowany do przeglądarki, do aplikacji
desktopowej i do aplikacji mobilnej za pomocą Tauri. Nie ma osobnych gałęzi kodu dla każdej
platformy.

**Czy mogę używać VelocityCRM w innej branży niż sprzedaż?**
Tak. W Ustawieniach wybierz inny profil branżowy — zmieni to nazewnictwo i etapy procesu. Opis
dodawania własnego profilu znajduje się w
[rozdziale o profilach branżowych](./04-branze-i-konfiguracja.md).

**Gdzie są przechowywane dane?**
W wersji demonstracyjnej dane są przechowywane lokalnie w przeglądarce (`localStorage`). Do
podłączenia prawdziwego źródła danych (API, baza danych) należy zastąpić logikę w
`src/stores/crm.ts` wywołaniami do zewnętrznego serwisu.

**Czy aplikacja działa offline?**
Warstwa frontendowa działa offline, ponieważ dane są lokalne. W wersji desktopowej i mobilnej
(Tauri) aplikacja uruchamia się bez połączenia z internetem. Wersja webowa wymaga jednorazowego
załadowania plików aplikacji.

**Dlaczego w kodzie nie ma komentarzy?**
To świadoma decyzja projektowa — kod jest pisany tak, aby nazwy i struktura mówiły same za
siebie. Zasady i uzasadnienia architektoniczne znajdują się właśnie w tej dokumentacji, a nie w
komentarzach w kodzie.

**Jak zmienić kolor marki?**
Kolor podstawowy (`brand`) jest zdefiniowany w `tailwind.config.ts`. Każdy profil branżowy ma
dodatkowo własny kolor akcentujący w `src/config/industries.ts`.

**Jak dodać nowy język interfejsu?**
Opisane krok po kroku w [rozdziale o tłumaczeniach](./07-i18n.md).

**Czy aplikacja spełnia wymagania dostępności?**
Aplikacja jest projektowana zgodnie z WCAG 2.1 AA. Szczegóły w
[rozdziale o dostępności](./05-dostepnosc.md).

**Jak zgłosić błąd lub propozycję zmiany?**
Najlepiej przez system zgłoszeń repozytorium (issue) z opisem kroków do odtworzenia problemu oraz
oczekiwanym zachowaniem.
