import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useIndustryStore } from '@/stores/industry';
import type { PipelineStageId } from '@/types/domain';

export const useIndustryLabels = () => {
  const industryStore = useIndustryStore();
  const { locale } = useI18n();

  const currentLocale = computed(() => (locale.value === 'en' ? 'en' : 'pl'));

  const contactSingular = computed(
    () => industryStore.profile.terminology.contactSingular[currentLocale.value],
  );
  const contactPlural = computed(() => industryStore.profile.terminology.contactPlural[currentLocale.value]);
  const organizationSingular = computed(
    () => industryStore.profile.terminology.organizationSingular[currentLocale.value],
  );
  const organizationPlural = computed(
    () => industryStore.profile.terminology.organizationPlural[currentLocale.value],
  );
  const pipelineSingular = computed(
    () => industryStore.profile.terminology.pipelineSingular[currentLocale.value],
  );
  const pipelinePlural = computed(
    () => industryStore.profile.terminology.pipelinePlural[currentLocale.value],
  );
  const dealValueLabel = computed(
    () => industryStore.profile.terminology.dealValueLabel[currentLocale.value],
  );

  const pipelineStageLabel = (stageId: PipelineStageId): string => {
    const stage = industryStore.profile.pipelineStages.find((item) => item.id === stageId);
    return stage ? stage.label[currentLocale.value] : stageId;
  };

  const statusLabel = (status: 'hot' | 'warm' | 'cold'): string =>
    industryStore.profile.statusLabels[status][currentLocale.value];

  return {
    contactSingular,
    contactPlural,
    organizationSingular,
    organizationPlural,
    pipelineSingular,
    pipelinePlural,
    dealValueLabel,
    pipelineStageLabel,
    statusLabel,
  };
};
