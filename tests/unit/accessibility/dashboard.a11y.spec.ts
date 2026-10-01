import { mount } from '@vue/test-utils';
import axe from 'axe-core';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import DashboardView from '@/views/DashboardView.vue';

describe('DashboardView accessibility', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    setActivePinia(createPinia());
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('has no critical or serious accessibility violations', async () => {
    mount(DashboardView, { attachTo: container });

    const results = await axe.run(container, {
      runOnly: ['wcag2a', 'wcag2aa'],
    });

    const seriousViolations = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );

    expect(seriousViolations).toEqual([]);
  });
});
