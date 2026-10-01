import type { IndustryProfile } from '@/types/industry';

export const industryProfiles: IndustryProfile[] = [
  {
    id: 'sales',
    name: { pl: 'Sprzedaż i usługi B2B', en: 'Sales & B2B services' },
    description: {
      pl: 'Klasyczny lejek sprzedażowy dla zespołów handlowych i agencji.',
      en: 'A classic sales pipeline for sales teams and agencies.',
    },
    accentColor: '#2563eb',
    terminology: {
      contactSingular: { pl: 'kontakt', en: 'contact' },
      contactPlural: { pl: 'Kontakty', en: 'Contacts' },
      organizationSingular: { pl: 'firma', en: 'company' },
      organizationPlural: { pl: 'Firmy', en: 'Companies' },
      pipelineSingular: { pl: 'szansa sprzedaży', en: 'deal' },
      pipelinePlural: { pl: 'Szanse sprzedaży', en: 'Deals' },
      dealValueLabel: { pl: 'Wartość kontraktu', en: 'Deal value' },
    },
    pipelineStages: [
      { id: 'discovery', label: { pl: 'Rozpoznanie', en: 'Discovery' } },
      { id: 'proposal', label: { pl: 'Oferta', en: 'Proposal' } },
      { id: 'negotiation', label: { pl: 'Negocjacje', en: 'Negotiation' } },
      { id: 'closed-won', label: { pl: 'Wygrane', en: 'Closed won' } },
      { id: 'closed-lost', label: { pl: 'Przegrane', en: 'Closed lost' } },
    ],
    statusLabels: {
      hot: { pl: 'Gorący', en: 'Hot' },
      warm: { pl: 'Ciepły', en: 'Warm' },
      cold: { pl: 'Zimny', en: 'Cold' },
    },
  },
  {
    id: 'real-estate',
    name: { pl: 'Nieruchomości', en: 'Real estate' },
    description: {
      pl: 'Obsługa klientów, ofert i transakcji dla biur nieruchomości.',
      en: 'Client, listing and transaction management for real estate agencies.',
    },
    accentColor: '#0d9488',
    terminology: {
      contactSingular: { pl: 'klient', en: 'client' },
      contactPlural: { pl: 'Klienci', en: 'Clients' },
      organizationSingular: { pl: 'nieruchomość', en: 'property' },
      organizationPlural: { pl: 'Nieruchomości', en: 'Properties' },
      pipelineSingular: { pl: 'transakcja', en: 'transaction' },
      pipelinePlural: { pl: 'Transakcje', en: 'Transactions' },
      dealValueLabel: { pl: 'Wartość transakcji', en: 'Transaction value' },
    },
    pipelineStages: [
      { id: 'discovery', label: { pl: 'Pierwszy kontakt', en: 'First contact' } },
      { id: 'proposal', label: { pl: 'Prezentacja oferty', en: 'Listing presented' } },
      { id: 'negotiation', label: { pl: 'Negocjacje ceny', en: 'Price negotiation' } },
      { id: 'closed-won', label: { pl: 'Transakcja zamknięta', en: 'Deal closed' } },
      { id: 'closed-lost', label: { pl: 'Rezygnacja', en: 'Withdrawn' } },
    ],
    statusLabels: {
      hot: { pl: 'Gotowy do zakupu', en: 'Ready to buy' },
      warm: { pl: 'Rozważa ofertę', en: 'Considering' },
      cold: { pl: 'Na wczesnym etapie', en: 'Early stage' },
    },
  },
  {
    id: 'healthcare',
    name: { pl: 'Ochrona zdrowia', en: 'Healthcare' },
    description: {
      pl: 'Koordynacja pacjentów, placówek i planu wizyt w przychodniach.',
      en: 'Patient, facility and visit-plan coordination for clinics.',
    },
    accentColor: '#059669',
    terminology: {
      contactSingular: { pl: 'pacjent', en: 'patient' },
      contactPlural: { pl: 'Pacjenci', en: 'Patients' },
      organizationSingular: { pl: 'placówka', en: 'facility' },
      organizationPlural: { pl: 'Placówki', en: 'Facilities' },
      pipelineSingular: { pl: 'ścieżka leczenia', en: 'care pathway' },
      pipelinePlural: { pl: 'Ścieżki leczenia', en: 'Care pathways' },
      dealValueLabel: { pl: 'Szacowany koszt terapii', en: 'Estimated treatment cost' },
    },
    pipelineStages: [
      { id: 'discovery', label: { pl: 'Zgłoszenie', en: 'Intake' } },
      { id: 'proposal', label: { pl: 'Plan leczenia', en: 'Treatment plan' } },
      { id: 'negotiation', label: { pl: 'Zgoda i refundacja', en: 'Consent & funding' } },
      { id: 'closed-won', label: { pl: 'Leczenie zakończone', en: 'Treatment completed' } },
      { id: 'closed-lost', label: { pl: 'Rezygnacja pacjenta', en: 'Patient withdrew' } },
    ],
    statusLabels: {
      hot: { pl: 'Pilny przypadek', en: 'Urgent case' },
      warm: { pl: 'W trakcie diagnostyki', en: 'In diagnosis' },
      cold: { pl: 'Kontrola rutynowa', en: 'Routine check-up' },
    },
  },
  {
    id: 'education',
    name: { pl: 'Edukacja', en: 'Education' },
    description: {
      pl: 'Rekrutacja słuchaczy i zarządzanie współpracą ze szkołami.',
      en: 'Learner recruitment and school partnership management.',
    },
    accentColor: '#7c3aed',
    terminology: {
      contactSingular: { pl: 'słuchacz', en: 'learner' },
      contactPlural: { pl: 'Słuchacze', en: 'Learners' },
      organizationSingular: { pl: 'placówka edukacyjna', en: 'school' },
      organizationPlural: { pl: 'Placówki edukacyjne', en: 'Schools' },
      pipelineSingular: { pl: 'proces rekrutacji', en: 'enrollment' },
      pipelinePlural: { pl: 'Procesy rekrutacji', en: 'Enrollments' },
      dealValueLabel: { pl: 'Wartość czesnego', en: 'Tuition value' },
    },
    pipelineStages: [
      { id: 'discovery', label: { pl: 'Zapytanie', en: 'Inquiry' } },
      { id: 'proposal', label: { pl: 'Oferta kursu', en: 'Course offer' } },
      { id: 'negotiation', label: { pl: 'Formalności', en: 'Paperwork' } },
      { id: 'closed-won', label: { pl: 'Zapisany', en: 'Enrolled' } },
      { id: 'closed-lost', label: { pl: 'Rezygnacja', en: 'Dropped out' } },
    ],
    statusLabels: {
      hot: { pl: 'Gotowy do zapisu', en: 'Ready to enroll' },
      warm: { pl: 'Zainteresowany', en: 'Interested' },
      cold: { pl: 'Wstępne zapytanie', en: 'Early inquiry' },
    },
  },
  {
    id: 'hospitality',
    name: { pl: 'Hotelarstwo i gastronomia', en: 'Hospitality' },
    description: {
      pl: 'Obsługa gości, rezerwacji grupowych i partnerów obiektu.',
      en: 'Guest relations, group bookings and venue partner management.',
    },
    accentColor: '#ea580c',
    terminology: {
      contactSingular: { pl: 'gość', en: 'guest' },
      contactPlural: { pl: 'Goście', en: 'Guests' },
      organizationSingular: { pl: 'obiekt', en: 'venue' },
      organizationPlural: { pl: 'Obiekty', en: 'Venues' },
      pipelineSingular: { pl: 'rezerwacja', en: 'booking' },
      pipelinePlural: { pl: 'Rezerwacje', en: 'Bookings' },
      dealValueLabel: { pl: 'Wartość rezerwacji', en: 'Booking value' },
    },
    pipelineStages: [
      { id: 'discovery', label: { pl: 'Zapytanie ofertowe', en: 'Inquiry' } },
      { id: 'proposal', label: { pl: 'Propozycja oferty', en: 'Offer sent' } },
      { id: 'negotiation', label: { pl: 'Ustalanie szczegółów', en: 'Finalizing details' } },
      { id: 'closed-won', label: { pl: 'Potwierdzona', en: 'Confirmed' } },
      { id: 'closed-lost', label: { pl: 'Anulowana', en: 'Cancelled' } },
    ],
    statusLabels: {
      hot: { pl: 'Pilna rezerwacja', en: 'Urgent booking' },
      warm: { pl: 'W trakcie ustaleń', en: 'In discussion' },
      cold: { pl: 'Wstępne zapytanie', en: 'Early inquiry' },
    },
  },
  {
    id: 'legal',
    name: { pl: 'Usługi prawne', en: 'Legal services' },
    description: {
      pl: 'Prowadzenie klientów i spraw w kancelariach prawnych.',
      en: 'Client and case management for law firms.',
    },
    accentColor: '#475569',
    terminology: {
      contactSingular: { pl: 'klient', en: 'client' },
      contactPlural: { pl: 'Klienci', en: 'Clients' },
      organizationSingular: { pl: 'kancelaria', en: 'firm' },
      organizationPlural: { pl: 'Kancelarie i podmioty', en: 'Firms & entities' },
      pipelineSingular: { pl: 'sprawa', en: 'case' },
      pipelinePlural: { pl: 'Sprawy', en: 'Cases' },
      dealValueLabel: { pl: 'Wartość sprawy', en: 'Case value' },
    },
    pipelineStages: [
      { id: 'discovery', label: { pl: 'Konsultacja wstępna', en: 'Initial consultation' } },
      { id: 'proposal', label: { pl: 'Oferta i umowa', en: 'Engagement letter' } },
      { id: 'negotiation', label: { pl: 'Prowadzenie sprawy', en: 'Case in progress' } },
      { id: 'closed-won', label: { pl: 'Sprawa wygrana', en: 'Case won' } },
      { id: 'closed-lost', label: { pl: 'Sprawa zamknięta', en: 'Case closed' } },
    ],
    statusLabels: {
      hot: { pl: 'Pilna sprawa', en: 'Urgent case' },
      warm: { pl: 'W toku', en: 'Ongoing' },
      cold: { pl: 'Oczekująca', en: 'Pending' },
    },
  },
];

export const defaultIndustryId = 'sales';

export const getIndustryProfile = (id: string): IndustryProfile =>
  industryProfiles.find((profile) => profile.id === id) ?? (industryProfiles[0] as IndustryProfile);
