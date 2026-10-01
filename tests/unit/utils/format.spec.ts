import { describe, expect, it } from 'vitest';

import { formatCurrency, formatDate } from '@/utils/format';

describe('formatCurrency', () => {
  it('formats a value using Polish currency formatting', () => {
    const result = formatCurrency(1000, 'pl');
    expect(result).toMatch(/zł/);
  });

  it('formats a value using US currency formatting', () => {
    const result = formatCurrency(1000, 'en');
    expect(result).toMatch(/\$/);
  });
});

describe('formatDate', () => {
  it('returns a readable date string for a valid ISO date', () => {
    const result = formatDate('2026-01-15', 'en');
    expect(result).toMatch(/2026/);
  });

  it('returns the raw input when the date is invalid', () => {
    const result = formatDate('not-a-date', 'en');
    expect(result).toBe('not-a-date');
  });
});
