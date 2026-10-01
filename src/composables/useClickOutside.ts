import { onBeforeUnmount, onMounted, type Ref } from 'vue';

export const useClickOutside = (targetRef: Ref<HTMLElement | null>, handler: () => void) => {
  const listener = (event: MouseEvent) => {
    const target = event.target as Node;
    if (targetRef.value && !targetRef.value.contains(target)) {
      handler();
    }
  };

  onMounted(() => {
    document.addEventListener('click', listener, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', listener, true);
  });
};
