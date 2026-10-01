import { defineStore } from 'pinia';

import { defaultIndustryId, getIndustryProfile, industryProfiles } from '@/config/industries';

interface IndustryState {
  activeIndustryId: string;
}

export const useIndustryStore = defineStore('industry', {
  state: (): IndustryState => ({
    activeIndustryId: defaultIndustryId,
  }),
  getters: {
    profile: (state) => getIndustryProfile(state.activeIndustryId),
    profiles: () => industryProfiles,
  },
  actions: {
    setIndustry(id: string) {
      this.activeIndustryId = id;
    },
  },
  persist: {
    key: 'velocitycrm-industry',
  },
});
