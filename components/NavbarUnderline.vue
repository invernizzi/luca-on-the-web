<template>
  <div
    ref="underlineEl"
    aria-hidden="true"
    class="sliding-underline pointer-events-none"
    :style="underlineStyle"
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
} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const underlineEl = ref<HTMLElement | null>(null);
const underlineStyle = reactive({
  transform: 'translateX(0px)',
  width: '0px',
  opacity: '0',
});

const normalizePath = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, '') : path;

const updateUnderlinePosition = () => {
  if (!underlineEl.value) return;

  const current = normalizePath(route.path);
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav-links-container .nav-link');
  const activeLink = Array.from(links).find((link) => {
    const href = link.getAttribute('href') || '';
    return normalizePath(href) === current;
  });

  if (activeLink) {
    const parent = underlineEl.value.offsetParent as HTMLElement | null;
    const parentLeft = parent ? parent.getBoundingClientRect().left : 0;
    const rect = activeLink.getBoundingClientRect();
    underlineStyle.transform = `translateX(${rect.left - parentLeft}px)`;
    underlineStyle.width = `${rect.width}px`;
    underlineStyle.opacity = '1';
  } else {
    underlineStyle.opacity = '0';
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

  if (typeof document !== 'undefined' && 'fonts' in document) {
    document.fonts.ready.then(() => {
      updateUnderlinePosition();
    });
  }

  window.addEventListener('resize', updateUnderlinePosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateUnderlinePosition);
});
</script>

<style scoped>
.sliding-underline {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  background-color: var(--ui-primary);
  z-index: 60;
  transition:
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1),
    width 180ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 150ms cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
