<template>
  <header class="sticky top-0 z-50 bg-background/95 border-b border-white/[0.08]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 h-14">
      <nav
        aria-label="Primary"
        class="h-full flex items-center justify-between gap-4 nav-links-container"
      >
        <NuxtLink
          to="/"
          class="nav-link h-full inline-flex items-center font-display text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-150"
          :class="isActive('/') ? 'text-text-primary' : 'text-text-primary/90 hover:text-primary'"
          :aria-current="isActive('/') ? 'page' : undefined"
        >
          Luca Invernizzi
        </NuxtLink>

        <div class="h-full flex items-center gap-3 sm:gap-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link h-full inline-flex items-center text-[13px] sm:text-sm font-normal whitespace-nowrap transition-colors duration-150"
            :class="
              isActive(item.path)
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            "
            :aria-current="isActive(item.path) ? 'page' : undefined"
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
import { useRoute } from 'vue-router';
import NavbarUnderline from './NavbarUnderline.vue';

const navItems = [
  { path: '/projects', label: 'Projects' },
  { path: '/publications', label: 'Publications' },
  { path: '/committees', label: 'Service' },
  { path: '/cv', label: 'CV' },
];

const route = useRoute();

const normalizePath = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, '') : path;

const isActive = (path: string): boolean =>
  normalizePath(route.path) === normalizePath(path);
</script>
