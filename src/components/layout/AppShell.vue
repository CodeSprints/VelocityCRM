<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import BottomNav from '@/components/layout/BottomNav.vue';
import MobileDrawer from '@/components/layout/MobileDrawer.vue';
import SkipLink from '@/components/layout/SkipLink.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <SkipLink />
    <AppHeader />
    <div class="mx-auto flex w-full max-w-[1600px]">
      <aside
        class="sticky top-[73px] hidden h-[calc(100vh-73px)] w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 lg:block"
      >
        <AppSidebar />
      </aside>
      <main
        id="main-content"
        tabindex="-1"
        class="w-full min-w-0 flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10"
      >
        <slot />
      </main>
    </div>
    <MobileDrawer />
    <BottomNav />
  </div>
</template>
