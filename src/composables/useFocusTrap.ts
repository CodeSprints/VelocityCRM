import { onBeforeUnmount, onMounted, type Ref } from 'vue';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useFocusTrap = (containerRef: Ref<HTMLElement | null>, onEscape?: () => void) => {
  let previouslyFocused: HTMLElement | null = null;

  const getFocusable = (): HTMLElement[] => {
    if (!containerRef.value) return [];
    return Array.from(containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && onEscape) {
      event.preventDefault();
      onEscape();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusable();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  onMounted(() => {
    previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = getFocusable();
    focusable[0]?.focus();
    document.addEventListener('keydown', handleKeydown);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
    previouslyFocused?.focus();
  });
};
