<template>
  <header class="sticky top-0 z-50 bg-background border-b border-white/[0.09]">
    <div class="max-w-[980px] mx-auto px-5 sm:px-7 h-[60px] flex items-center justify-between gap-4">
      <NuxtLink
        to="/"
        aria-label="Luca Invernizzi — Home"
        class="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.015em] text-text-primary hover:text-primary transition-colors shrink-0"
      >
        <svg
          class="w-[18px] h-[18px] text-primary shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="9" y="2" width="5" height="5" rx="1" />
          <rect x="16" y="9" width="5" height="5" rx="1" />
          <rect x="2" y="16" width="5" height="5" rx="1" />
          <rect x="9" y="16" width="5" height="5" rx="1" />
          <rect x="16" y="16" width="5" height="5" rx="1" />
        </svg>
        <span class="hidden sm:inline">Luca Invernizzi</span>
      </NuxtLink>

      <nav aria-label="Primary" class="h-full">
        <div class="flex items-center gap-3.5 sm:gap-7 h-full relative nav-links-container">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :aria-current="isActive(item.path) ? 'page' : undefined"
            class="nav-link h-full inline-flex items-center text-[13px] sm:text-sm font-medium transition-colors"
            :class="
              isActive(item.path)
                ? 'text-primary'
                : 'text-text-secondary hover:text-text-primary'
            "
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </div>

    <NavbarUnderline />
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import NavbarUnderline from "./NavbarUnderline.vue";

const navItems = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/projects",
    label: "Projects",
  },
  {
    path: "/publications",
    label: "Publications",
  },
  {
    path: "/committees",
    label: "Service",
  },
  {
    path: "/cv",
    label: "CV",
  },
];

const route = useRoute();

const normalizePath = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

const isActive = (path: string): boolean =>
  normalizePath(route.path) === normalizePath(path);
</script>

<style scoped>
.nav-links-container {
  position: relative;
}

.nav-link {
  position: relative;
  white-space: nowrap;
}
</style>
