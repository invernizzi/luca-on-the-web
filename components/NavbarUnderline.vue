<template>
  <div
    ref="underlineEl"
    aria-hidden="true"
    class="sliding-underline absolute bg-primary pointer-events-none"
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

const route = useRoute();
const underlineEl = ref<HTMLElement | null>(null);
const underlinePosition = reactive({
  left: "0px",
  width: "0px",
  opacity: "0",
});

const normalizePath = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

const updateUnderlinePosition = () => {
  if (!underlineEl.value) return;

  const current = normalizePath(route.path);
  const links = document.querySelectorAll<HTMLAnchorElement>(".nav-link");
  const activeLink = Array.from(links).find((link) => {
    const href = link.getAttribute("href") || "";
    return normalizePath(href) === current;
  });

  if (activeLink) {
    const parent = underlineEl.value.offsetParent as HTMLElement | null;
    const parentLeft = parent ? parent.getBoundingClientRect().left : 0;
    const rect = activeLink.getBoundingClientRect();
    underlinePosition.left = `${rect.left - parentLeft}px`;
    underlinePosition.width = `${rect.width}px`;
    underlinePosition.opacity = "1";
  } else {
    underlinePosition.opacity = "0";
  }
};

watch(
  () => route.path,
  async () => {
    await nextTick();
    updateUnderlinePosition();
  },
);

onMounted(async () => {
  await nextTick();
  updateUnderlinePosition();

  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(() => {
      updateUnderlinePosition();
    });
  }

  window.addEventListener("resize", updateUnderlinePosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateUnderlinePosition);
});
</script>

<style scoped>
.sliding-underline {
  position: absolute;
  height: 2px;
  background-color: var(--ui-primary);
  bottom: -1px;
  z-index: 60;
  transition:
    left 260ms ease-out,
    width 260ms ease-out,
    opacity 180ms ease-out;
}
</style>
