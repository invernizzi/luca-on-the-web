<template>
  <header
    class="sticky top-0 z-50 bg-gradient-to-b from-surface/95 via-surface/90 to-surface/85 backdrop-blur-md border-b border-white/10"
  >
    <div class="container mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <span></span>
        <div class="flex space-x-3 sm:space-x-6 relative nav-links-container">
          <NuxtLink
            to="/"
            class="nav-link px-2 py-1 text-text-secondary hover:text-primary transition-colors flex items-center hover:text-[#FF9D02]"
            :class="{ 'text-primary font-medium': $route.path === '/' }"
            aria-label="Home"
            title="Home"
          >
            <UIcon name="uil:home-alt" class="h-7 w-7" />
          </NuxtLink>
          <NuxtLink
            to="/projects"
            aria-label="Projects"
            class="nav-link px-2 py-1 text-text-secondary hover:text-primary transition-colors hover:text-[#FF9D02]"
            :class="{ 'text-primary font-medium': $route.path === '/projects' }"
          >
          <span class="text-sm sm:text-normal">Projects</span>
          </NuxtLink>
          <NuxtLink
            to="/publications"
            aria-label="Publications"
            class="nav-link px-2 py-1 text-text-secondary hover:text-primary transition-colors hover:text-[#FF9D02]"
            :class="{
              'text-primary font-medium': $route.path === '/publications',
            }"
          >
            <span class="text-sm sm:text-normal">Publications</span>
          </NuxtLink>
          <NuxtLink
            to="/committees"
            aria-label="Committees"
            class="nav-link px-2 py-1 text-text-secondary hover:text-primary transition-colors hover:text-[#FF9D02]"
            :class="{
              'text-primary font-medium': $route.path === '/committees',
            }"
          >
          <span class="text-sm sm:text-normal">Service</span>
          </NuxtLink>
          <NuxtLink
            to="/cv"
            aria-label="CV"
            class="nav-link px-2 py-1 text-text-secondary hover:text-primary transition-colors hover:text-[#FF9D02]"
            :class="{ 'text-primary font-medium': $route.path === '/cv' }"
          >
          <span class="text-sm sm:text-normal">C.V.</span>
          </NuxtLink>
        </div>
      </nav>
    </div>

    <!-- Sliding underline element -->
    <div
      ref="underlineEl"
      class="sliding-underline absolute h-1 bg-primary rounded-full transition-all duration-300 ease-out"
      :style="underlinePosition"
    ></div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";

const $route = useRoute();
const underlineEl = ref(null);
const underlinePosition = reactive({
  left: "0px",
  width: "0px",
  opacity: "0",
});

// Function to update the underline position
const updateUnderlinePosition = () => {
  const activeLink = document.querySelector(`.nav-link[href="${$route.path}"]`);

  if (activeLink) {
    const rect = activeLink.getBoundingClientRect();
    underlinePosition.left = `${rect.left}px`;
    underlinePosition.width = `${rect.width}px`;
    underlinePosition.opacity = "1";
  } else {
    underlinePosition.opacity = "0";
  }
};

// Watch for route changes to update the underline
watch(
  () => $route.path,
  async () => {
    await nextTick();
    updateUnderlinePosition();
  }
);

// Initialize and set up event listeners
onMounted(async () => {
  await nextTick();

  // Initial position update
  updateUnderlinePosition();

  // Add resize listener
  window.addEventListener("resize", updateUnderlinePosition);
});

// Clean up event listeners
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateUnderlinePosition);
});
</script>

<style scoped>
.nav-links-container {
  position: relative;
}

.nav-link {
  position: relative;
  white-space: nowrap;
}

.sliding-underline {
  position: absolute;
  height: 2px;
  background-color: #ff9d02; /* Using the primary orange color directly */
  bottom: 0;
  z-index: 60;
}
</style>
