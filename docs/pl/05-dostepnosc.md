# Dostępność (WCAG)

VelocityCRM jest projektowany zgodnie z wytycznymi WCAG 2.1 na poziomie AA. Poniżej opisane są
konkretne rozwiązania zastosowane w kodzie.

## Nawigacja klawiaturą

- Link pomijania nawigacji (`skip link`) pozwala przejść od razu do treści głównej.
- Wszystkie okna modalne (`BaseModal.vue`) mają pułapkę fokusu (`useFocusTrap`) — klawisz Tab nie
  wyprowadza fokusu poza okno, a Escape je zamyka.
- Tablica procesu sprzedaży (kanban) ma alternatywę klawiaturową dla przeciągania — przyciski
  „przenieś do poprzedniego/kolejnego etapu” działają bez myszy.
- Menu rozwijane (powiadomienia, konto użytkownika) zamykają się po kliknięciu poza obszarem
  menu i są oznaczone atrybutami `aria-haspopup` oraz `aria-expanded`.

## Semantyka i czytniki ekranu

- Nagłówki stron są oznaczone jako `<h1>`, sekcje mają własne nagłówki powiązane przez
  `aria-labelledby`.
- Tabela kontaktów używa elementów `<table>`, `<th scope="col">` i ukrytej etykiety (`<caption>`).
- Listy definicji (`<dl>`, `<dt>`, `<dd>`) są używane tylko tam, gdzie opisują faktyczne pary
  nazwa–wartość, a `<dt>`/`<dd>` są bezpośrednimi dziećmi `<dl>`.
- Wszystkie ikony dekoracyjne mają `aria-hidden="true"`, a przyciski z samą ikoną mają opisowy
  `aria-label`.
- Komunikaty statusu (np. status kontaktu) są czytelne tekstowo, nie tylko kolorem.

## Formularze

- Każde pole formularza ma powiązaną etykietę `<label for="...">`.
- Pola wymagane są oznaczone atrybutem `required`.
- Reguła lintera `vuejs-accessibility/label-has-for` pilnuje tej zasady automatycznie przy każdej
  zmianie kodu.

## Kontrast i tryb ciemny

- Paleta kolorów Tailwind została dobrana tak, aby zachować kontrast tekstu co najmniej 4,5:1 w
  obu motywach (jasnym i ciemnym).
- Stan fokusu (`:focus-visible`) jest zawsze widoczny jako wyraźna obwódka.

## Ruch i animacje

- Reguła `prefers-reduced-motion` w `src/assets/main.css` skraca lub wyłącza animacje dla osób,
  które włączyły tę preferencję systemową.

## Responsywność i powiększanie tekstu

- Układ jest w pełni płynny (RWD) — od wąskich ekranów telefonów po duże monitory.
- Jednostki tekstu bazują na `rem`, więc powiększenie czcionki w przeglądarce nie psuje układu.

## Weryfikacja automatyczna

- Test `tests/unit/accessibility/dashboard.a11y.spec.ts` uruchamia silnik `axe-core` na pulpicie
  aplikacji i sprawdza brak poważnych naruszeń WCAG 2.1 A/AA.
- Lint `eslint-plugin-vuejs-accessibility` sprawdza reguły dostępności w każdym pliku `.vue` przy
  każdym uruchomieniu `npm run lint`.

## Zgłaszanie problemów z dostępnością

Jeśli znajdziesz barierę dostępności, opisz: stronę, element, używaną technologię wspomagającą
(czytnik ekranu, klawiaturę, powiększenie) oraz oczekiwane zachowanie. Zgłoszenie takie traktujemy
priorytetowo.
