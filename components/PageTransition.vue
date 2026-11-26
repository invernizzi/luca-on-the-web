<template>
  <div>
    <transition
      :name="transitionName"
      mode="out-in"
      @before-leave="beforeLeave"
      @enter="enter"
    >
      <slot />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  forceDirection: {
    type: String,
    default: null,
  },
});

const route = useRoute();
const router = useRouter();
const transitionName = ref('page-slide-right');
const lastPath = ref('');
const navLinks = ref<{ path: string; position: number }[]>([]);

provide('transitionName', transitionName);

const normalizePath = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, '') : path;

const determineTransitionDirection = (from: string, to: string) => {
  if (props.forceDirection) {
    return props.forceDirection === 'left' ? 'page-slide-left' : 'page-slide-right';
  }

  const fromNorm = normalizePath(from);
  const toNorm = normalizePath(to);
  const fromLink = navLinks.value.find((link) => link.path === fromNorm);
  const toLink = navLinks.value.find((link) => link.path === toNorm);

  if (!fromLink || !toLink) return 'page-slide-right';

  return toLink.position > fromLink.position ? 'page-slide-right' : 'page-slide-left';
};

const cacheNavbarPositions = () => {
  const navbar = document.querySelector('.nav-links-container');
  if (!navbar) return;

  const links = navbar.querySelectorAll('.nav-link');
  navLinks.value = [];

  links.forEach((link, index) => {
    const href = link.getAttribute('href');
    if (href) {
      navLinks.value.push({
        path: normalizePath(href),
        position: index,
      });
    }
  });
};

const triggerDirectionalTransition = (direction: 'left' | 'right', path: string) => {
  transitionName.value = direction === 'left' ? 'page-slide-left' : 'page-slide-right';
  router.push(path);
};

provide('triggerDirectionalTransition', triggerDirectionalTransition);

const beforeLeave = (_el: Element) => {
  const newPath = route.path;
  transitionName.value = determineTransitionDirection(lastPath.value, newPath);
  lastPath.value = newPath;
};

const enter = (_el: Element, done: () => void) => {
  done();
};

onMounted(() => {
  lastPath.value = route.path;
  cacheNavbarPositions();
  window.addEventListener('resize', cacheNavbarPositions);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', cacheNavbarPositions);
});
</script>

<style scoped>
.page-slide-right-enter-active,
.page-slide-right-leave-active,
.page-slide-left-enter-active,
.page-slide-left-leave-active {
  transition:
    opacity 160ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  z-index: 10;
}

.page-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}

.page-slide-right-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

.page-slide-left-enter-from {
  opacity: 0;
  transform: translateX(8px);
}

.page-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
