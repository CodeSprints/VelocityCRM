import type { PipelineStageId } from './domain';

export interface PipelineStageLabel {
  id: PipelineStageId;
  label: Record<'pl' | 'en', string>;
}

export interface IndustryTerminology {
  contactSingular: Record<'pl' | 'en', string>;
  contactPlural: Record<'pl' | 'en', string>;
  organizationSingular: Record<'pl' | 'en', string>;
  organizationPlural: Record<'pl' | 'en', string>;
  pipelineSingular: Record<'pl' | 'en', string>;
  pipelinePlural: Record<'pl' | 'en', string>;
  dealValueLabel: Record<'pl' | 'en', string>;
}

export interface IndustryProfile {
  id: string;
  name: Record<'pl' | 'en', string>;
  description: Record<'pl' | 'en', string>;
  accentColor: string;
  terminology: IndustryTerminology;
  pipelineStages: PipelineStageLabel[];
  statusLabels: Record<'hot' | 'warm' | 'cold', Record<'pl' | 'en', string>>;
}
