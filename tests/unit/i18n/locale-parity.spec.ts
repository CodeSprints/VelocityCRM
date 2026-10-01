import { describe, expect, it } from 'vitest';

import en from '@/locales/en.json';
import pl from '@/locales/pl.json';

type Messages = Record<string, unknown>;

const flattenKeys = (messages: Messages, prefix = ''): string[] =>
  Object.entries(messages).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value as Messages, fullKey);
    }
    return [fullKey];
  });

describe('locale message parity', () => {
  it('keeps the Polish and English translation files perfectly in sync', () => {
    const plKeys = flattenKeys(pl).sort();
    const enKeys = flattenKeys(en).sort();

    expect(plKeys).toEqual(enKeys);
  });
});
