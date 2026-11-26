<template>
  <NuxtLink
    v-if="isInternal"
    :to="link.url"
    class="inline-flex items-center gap-1.5 px-[11px] py-[5px] text-[12.5px] font-medium rounded-[8px] border transition-colors"
    :class="variantClasses"
  >
    <svg
      v-if="showIcon && link.type === 'website'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5 opacity-80 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke-width="1.75" />
      <path stroke-linecap="round" stroke-width="1.75" d="M3 12h18" />
    </svg>
    <svg
      v-else-if="showIcon && link.type === 'github'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5 opacity-85 shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
    <span>{{ link.name }}</span>
  </NuxtLink>
  <a
    v-else
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1.5 px-[11px] py-[5px] text-[12.5px] font-medium rounded-[8px] border transition-colors"
    :class="variantClasses"
  >
    <svg
      v-if="showIcon && link.type === 'website'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5 opacity-80 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke-width="1.75" />
      <path stroke-linecap="round" stroke-width="1.75" d="M3 12h18" />
    </svg>
    <svg
      v-else-if="showIcon && link.type === 'github'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5 opacity-85 shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
    <span>{{ link.name }}</span>
    <span v-if="showExternalArrow" class="opacity-80" aria-hidden="true">↗</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LinkItem } from '~/stores/cv'

const props = withDefaults(
  defineProps<{
    link: LinkItem
    variant?: 'primary' | 'default'
    showIcon?: boolean
    showExternalArrow?: boolean
  }>(),
  {
    variant: 'default',
    showIcon: false,
    showExternalArrow: false,
  }
)

const isInternal = computed(() => props.link.url.startsWith('/'))

const variantClasses = computed(() =>
  props.variant === 'primary'
    ? 'bg-primary/[0.12] text-primary border-primary/[0.38] hover:bg-primary/[0.20] hover:border-primary/60'
    : 'bg-surface-light text-[#e4e4ea] border-white/[0.11] hover:border-white/25 hover:text-text-primary [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]'
)
</script>
