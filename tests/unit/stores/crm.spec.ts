import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { useCrmStore } from '@/stores/crm';

describe('useCrmStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('seeds the store with demo data', () => {
    const store = useCrmStore();
    expect(store.contacts.length).toBeGreaterThan(0);
    expect(store.organizations.length).toBeGreaterThan(0);
    expect(store.pipelineItems.length).toBeGreaterThan(0);
  });

  it('adds a new contact with a generated id', () => {
    const store = useCrmStore();
    const initialCount = store.contacts.length;

    store.addContact({
      name: 'Anna Nowak',
      email: 'anna@example.com',
      phone: '+48 600 000 000',
      organization: 'Example sp. z o.o.',
      role: 'Buyer',
      status: 'warm',
      avatar: '',
      lastContact: '2026-01-01',
      value: 1000,
      source: 'Referral',
    });

    expect(store.contacts).toHaveLength(initialCount + 1);
    expect(store.contacts.at(-1)?.name).toBe('Anna Nowak');
    expect(store.contacts.at(-1)?.id).toBeTruthy();
  });

  it('updates an existing contact', () => {
    const store = useCrmStore();
    const target = store.contacts[0];
    expect(target).toBeTruthy();

    store.updateContact(target!.id, { status: 'cold' });

    expect(store.contactById(target!.id)?.status).toBe('cold');
  });

  it('deletes a contact', () => {
    const store = useCrmStore();
    const target = store.contacts[0];
    expect(target).toBeTruthy();

    store.deleteContact(target!.id);

    expect(store.contactById(target!.id)).toBeUndefined();
  });

  it('computes open pipeline items excluding closed stages', () => {
    const store = useCrmStore();
    const hasClosed = store.openPipelineItems.some(
      (item) => item.stage === 'closed-won' || item.stage === 'closed-lost',
    );
    expect(hasClosed).toBe(false);
  });

  it('computes won value from closed-won pipeline items', () => {
    const store = useCrmStore();
    const expected = store.pipelineItems
      .filter((item) => item.stage === 'closed-won')
      .reduce((sum, item) => sum + item.value, 0);
    expect(store.wonValue).toBe(expected);
  });

  it('marks a notification as read', () => {
    const store = useCrmStore();
    const target = store.notifications.find((notification) => !notification.isRead);
    expect(target).toBeTruthy();

    store.markNotificationRead(target!.id);

    expect(store.notifications.find((notification) => notification.id === target!.id)?.isRead).toBe(true);
  });

  it('toggles a task status between pending and completed', () => {
    const store = useCrmStore();
    const task = store.tasks[0];
    expect(task).toBeTruthy();

    const nextStatus = task!.status === 'completed' ? 'pending' : 'completed';
    store.updateTask(task!.id, { status: nextStatus });

    expect(store.tasks.find((item) => item.id === task!.id)?.status).toBe(nextStatus);
  });
});
