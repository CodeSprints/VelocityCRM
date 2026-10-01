import { onBeforeUnmount, onMounted, ref } from 'vue';

export const useMediaQuery = (query: string) => {
  const matches = ref(false);
  let mediaQueryList: MediaQueryList | null = null;

  const handleChange = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;
    mediaQueryList = window.matchMedia(query);
    matches.value = mediaQueryList.matches;
    mediaQueryList.addEventListener('change', handleChange);
  });

  onBeforeUnmount(() => {
    mediaQueryList?.removeEventListener('change', handleChange);
  });

  return matches;
};
