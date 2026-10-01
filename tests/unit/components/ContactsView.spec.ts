import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import ContactsView from '@/views/ContactsView.vue';
import { useCrmStore } from '@/stores/crm';

describe('ContactsView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the seeded contacts in the table', () => {
    const wrapper = mount(ContactsView);

    const store = useCrmStore();
    expect(wrapper.text()).toContain(store.contacts[0]?.name);
  });

  it('filters contacts by the search field', async () => {
    const wrapper = mount(ContactsView);
    const store = useCrmStore();
    const targetName = store.contacts[1]?.name ?? '';

    const searchInput = wrapper.find('input[type="search"]');
    await searchInput.setValue(targetName);

    expect(wrapper.text()).toContain(targetName);
    expect(wrapper.text()).not.toContain(store.contacts[0]?.name ?? '__missing__');
  });

  it('opens the creation modal when clicking the add button', async () => {
    const wrapper = mount(ContactsView);

    const addButton = wrapper.findAll('button').find((button) => button.text().includes('Dodaj'));
    expect(addButton).toBeTruthy();
    await addButton?.trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });

  it('removes a contact after confirming deletion', async () => {
    const wrapper = mount(ContactsView);
    const store = useCrmStore();
    const initialCount = store.contacts.length;

    const deleteButtons = wrapper.findAll('button[aria-label^="Usuń"]');
    expect(deleteButtons.length).toBeGreaterThan(0);
    await deleteButtons[0]?.trigger('click');

    const confirmButton = wrapper
      .findAll('button')
      .find((button) => button.text().toLowerCase().includes('potwierdź'));
    await confirmButton?.trigger('click');

    expect(store.contacts).toHaveLength(initialCount - 1);
  });
});
