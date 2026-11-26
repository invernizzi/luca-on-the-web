<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    :class="sizeClass"
  >
    <template v-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </template>
    <template v-else-if="name === 'scholar'">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </template>
    <template v-else-if="name === 'google'">
      <path d="M20.5 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h4.8a4.1 4.1 0 0 1-1.8 2.7v2.3h2.9c1.7-1.6 2.6-3.9 2.6-6.7z" />
      <path d="M12 21a8.6 8.6 0 0 0 5.9-2.1l-2.9-2.3a5.4 5.4 0 0 1-8.1-2.8H4v2.3A9 9 0 0 0 12 21z" />
      <path d="M6.9 13.8a5.4 5.4 0 0 1 0-3.6V7.9H4a9 9 0 0 0 0 8.2l2.9-2.3z" />
      <path d="M12 6.6a4.9 4.9 0 0 1 3.4 1.3l2.6-2.6A8.6 8.6 0 0 0 12 3a9 9 0 0 0-8 4.9l2.9 2.3A5.4 5.4 0 0 1 12 6.6z" />
    </template>
    <template v-else-if="name === 'github'">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </template>
    <template v-else-if="name === 'linkedin'">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </template>
    <template v-else-if="name === 'twitter'">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </template>
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 3.5 9 14 14 0 0 1-3.5 9 14 14 0 0 1-3.5-9A14 14 0 0 1 12 3z" />
    </template>
    <template v-else-if="name === 'book-open'">
      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3H12v17H4.5A2.5 2.5 0 0 0 2 22V5.5z" />
      <path d="M22 5.5A2.5 2.5 0 0 0 19.5 3H12v17h7.5a2.5 2.5 0 0 1 2.5 2V5.5z" />
    </template>
    <template v-else-if="name === 'newspaper'">
      <path d="M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2z" />
      <path d="M6 10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2" />
      <path d="M10 9h8" />
      <path d="M10 13h8" />
      <path d="M10 17h5" />
    </template>
    <template v-else-if="name === 'file-text'">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </template>
    <template v-else-if="name === 'arrow-up-right'">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type IconName =
  | 'mail'
  | 'scholar'
  | 'google'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'globe'
  | 'book-open'
  | 'newspaper'
  | 'file-text'
  | 'arrow-up-right';

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: 'sm' | 'md';
  }>(),
  {
    size: 'md',
  },
);

const sizeClass = computed(() =>
  props.size === 'sm' ? 'w-3.5 h-3.5 shrink-0' : 'w-4 h-4 shrink-0',
);
</script>
