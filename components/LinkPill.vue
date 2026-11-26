<template>
  <NuxtLink
    v-if="isInternal"
    :to="link.url"
    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs leading-[1.3] bg-surface-light text-text-secondary rounded-lg border border-white/[0.08] hover:bg-surface-hover hover:text-text-primary hover:border-white/[0.14] transition-colors duration-150"
  >
    <AppIcon :name="iconName" size="sm" class="text-text-muted" />
    <span>{{ link.name }}</span>
  </NuxtLink>
  <a
    v-else
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs leading-[1.3] bg-surface-light text-text-secondary rounded-lg border border-white/[0.08] hover:bg-surface-hover hover:text-text-primary hover:border-white/[0.14] transition-colors duration-150"
  >
    <AppIcon :name="iconName" size="sm" class="text-text-muted" />
    <span>{{ link.name }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LinkItem } from '~/stores/cv';
import AppIcon, { type IconName } from './AppIcon.vue';

const props = defineProps<{
  link: LinkItem;
}>();

const isInternal = computed(() => props.link.url.startsWith('/'));

const iconName = computed<IconName>(() => {
  switch (props.link.type) {
    case 'blog':
      return 'book-open';
    case 'news':
      return 'newspaper';
    case 'github':
      return 'github';
    case 'paper':
      return 'file-text';
    case 'website':
    default:
      return 'globe';
  }
});
</script>
