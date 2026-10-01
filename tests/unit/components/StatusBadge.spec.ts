import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import StatusBadge from '@/components/common/StatusBadge.vue';

describe('StatusBadge', () => {
  it('renders the provided label text', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'hot', label: 'Gorący' },
    });

    expect(wrapper.text()).toContain('Gorący');
  });

  it.each([
    ['hot', 'bg-red-100'],
    ['warm', 'bg-amber-100'],
    ['cold', 'bg-blue-100'],
  ] as const)('applies the correct colour scheme for status %s', (status, expectedClass) => {
    const wrapper = mount(StatusBadge, {
      props: { status, label: status },
    });

    expect(wrapper.classes()).toContain(expectedClass);
  });
});
