<template>
  <header
    class="sticky top-0 z-50 bg-gradient-to-b from-surface/95 via-surface/90 to-surface/85 backdrop-blur-md border-b border-white/10"
  >
    <div class="container mx-auto px-4 py-4">
      <nav aria-label="Primary" class="flex items-center justify-between">
        <span />
        <div class="flex space-x-3 sm:space-x-6 relative nav-links-container">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :aria-label="item.label"
            :title="item.label"
            :aria-current="isActive(item.path) ? 'page' : undefined"
            class="nav-link px-2 py-1 transition-colors"
            :class="[
              isActive(item.path)
                ? 'text-primary'
                : 'text-text-secondary hover:text-primary',
              { 'flex items-center': item.icon },
            ]"
          >
            <UIcon v-if="item.icon" :name="item.icon" class="h-7 w-7" />
            <span v-else class="text-sm sm:text-base">{{ item.label }}</span>
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
    icon: "uil:home-alt",
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
    label: "C.V.",
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
