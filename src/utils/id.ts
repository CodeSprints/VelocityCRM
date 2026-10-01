export const createId = (prefix: string): string => {
  const randomSegment = Math.random().toString(36).slice(2, 9);
  return `${prefix}-${Date.now().toString(36)}-${randomSegment}`;
};
