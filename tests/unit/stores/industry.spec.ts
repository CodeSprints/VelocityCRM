import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { defaultIndustryId, industryProfiles } from '@/config/industries';
import { useIndustryStore } from '@/stores/industry';

describe('useIndustryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('defaults to the sales industry profile', () => {
    const store = useIndustryStore();
    expect(store.activeIndustryId).toBe(defaultIndustryId);
    expect(store.profile.id).toBe(defaultIndustryId);
  });

  it('exposes every configured industry profile', () => {
    const store = useIndustryStore();
    expect(store.profiles).toHaveLength(industryProfiles.length);
  });

  it('switches terminology when the industry profile changes', () => {
    const store = useIndustryStore();
    const before = store.profile.terminology.contactPlural.en;

    store.setIndustry('real-estate');

    expect(store.activeIndustryId).toBe('real-estate');
    expect(store.profile.terminology.contactPlural.en).not.toBe(before);
    expect(store.profile.terminology.contactPlural.en).toBe('Clients');
  });

  it('falls back to the default profile for an unknown industry id', () => {
    const store = useIndustryStore();
    store.setIndustry('unknown-industry');
    expect(store.profile.id).toBe(defaultIndustryId);
  });
});
