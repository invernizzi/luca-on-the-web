<template>
  <div class="min-h-screen bg-background text-text-primary flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-md bg-surface border border-white/[0.08] rounded-xl p-8">
      <!-- Static Conway's Game of Life glider mark echoing the site's ambient signature -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        width="28"
        height="28"
        aria-hidden="true"
        class="mb-6 text-primary"
      >
        <rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor" />
        <rect x="18" y="10" width="6" height="6" rx="1" fill="currentColor" />
        <rect x="2" y="18" width="6" height="6" rx="1" fill="currentColor" />
        <rect x="10" y="18" width="6" height="6" rx="1" fill="currentColor" />
        <rect x="18" y="18" width="6" height="6" rx="1" fill="currentColor" />
      </svg>

      <p class="font-mono text-xs text-text-muted tabular-nums mb-2">
        {{ statusCode }}
      </p>

      <h1 class="font-display text-2xl font-medium tracking-[-0.02em] text-text-primary mb-3">
        {{ isNotFound ? 'Page not found' : 'Something went wrong' }}
      </h1>

      <p class="text-sm leading-[1.6] text-text-secondary mb-6">
        {{
          isNotFound
            ? 'This address does not match any page on the site.'
            : 'An unexpected error interrupted this page. Try reloading or return to the homepage.'
        }}
      </p>

      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors duration-150 cursor-pointer"
          @click="handleError"
        >
          Back to home
        </button>

        <button
          v-if="!isNotFound"
          type="button"
          class="px-4 py-2 text-sm font-medium bg-surface-light text-text-primary border border-white/[0.12] rounded-lg hover:bg-surface-hover transition-colors duration-150 cursor-pointer"
          @click="clearError"
        >
          Reload page
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  error: {
    statusCode?: number;
    message?: string;
  };
}>();

const statusCode = computed(() => props.error?.statusCode || 500);
const isNotFound = computed(() => statusCode.value === 404);

const handleError = () => {
  navigateTo('/');
};

const clearError = () => {
  window.location.reload();
};
</script>
