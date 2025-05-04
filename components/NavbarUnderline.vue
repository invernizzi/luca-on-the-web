<template>
  <div
    ref="underlineEl"
    class="sliding-underline absolute h-1 bg-primary rounded-full transition-all duration-300 ease-out"
    :style="underlinePosition"
  />
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { useRoute } from "vue-router";

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
.sliding-underline {
  position: absolute;
  height: 2px;
  background-color: #ff9d02; /* Using the primary orange color directly */
  bottom: 0;
  z-index: 60;
}
</style> 