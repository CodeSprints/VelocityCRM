# Industry profiles and configuration

## How it works

VelocityCRM is not hard-coded for sales. Each industry profile in
`src/config/industries.ts` describes:

- singular and plural entity names (for example "contact" / "Contacts"),
- pipeline stage names (for example "Discovery" → "First contact" for real estate),
- status labels (`hot`, `warm`, `cold`) adapted to the context,
- the profile's accent color.

Users choose a profile under **Settings → Industry profile**. The change is instant and requires
no page reload — every label in the navigation, dashboard, tables and pipeline board updates
automatically.

## Profiles available by default

| Profile                   | Example use case                                 |
| --------------------------- | --------------------------------------------------- |
| Sales & B2B services        | Sales teams, agencies                               |
| Real estate                 | Real estate agencies                                |
| Healthcare                  | Clinics, medical practices                          |
| Education                   | Language schools, course platforms                  |
| Hospitality                 | Hotels, restaurants, event venues                    |
| Legal services              | Law firms                                            |

## Adding your own industry profile

1. Open `src/config/industries.ts`.
2. Copy an existing profile object and give it a unique `id`.
3. Fill in translations (`pl` and `en`) for every name.
4. Define five pipeline stages — the stage ids (`discovery`, `proposal`, `negotiation`,
   `closed-won`, `closed-lost`) must stay the same, only the labels change.
5. Save the file — the new profile appears automatically in the Settings list.

The profile structure is described by the `IndustryProfile` type in `src/types/industry.ts`.

## Extending with custom fields

The current version offers configurable terminology and pipeline stages. If an industry needs
additional fields on a contact or a pipeline record (for example a national ID number in
healthcare, or a parcel number in real estate), the recommended path is:

1. Add an optional field to the relevant type in `src/types/domain.ts`.
2. Add the field to the form in the matching `*FormModal.vue` component.
3. Conditionally display the field based on the active industry profile
   (`useIndustryStore().activeIndustryId`).

This keeps the application core shared while industry differences remain declarative and easy to
test.
