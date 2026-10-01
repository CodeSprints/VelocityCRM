import { computed } from 'vue';

export type RuntimePlatform = 'web' | 'desktop' | 'mobile';

declare global {
  interface Window {
    __TAURI_INTERNALS__?: unknown;
  }
}

const isTauriRuntime = (): boolean => typeof window !== 'undefined' && Boolean(window.__TAURI_INTERNALS__);

const isCoarsePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export const useRuntimePlatform = () => {
  const platform = computed<RuntimePlatform>(() => {
    if (!isTauriRuntime()) return 'web';
    return isCoarsePointer() ? 'mobile' : 'desktop';
  });

  const isTauri = computed(() => isTauriRuntime());

  return { platform, isTauri };
};
