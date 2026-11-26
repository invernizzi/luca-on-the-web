<template>
  <div :class="[{ 'h-full': fullHeight }, { 'group/card': interactive }]">
    <div
      class="bg-surface/95 card-rim rounded-[14px] border border-white/[0.09] flex flex-col transition-colors duration-200"
      :class="[
        fullHeight ? 'h-full' : '',
        compact ? 'px-5 py-5 sm:px-6' : 'p-6 sm:p-[26px]',
        accent ? 'card-accent' : '',
        interactive ? 'hover:border-primary/45' : '',
      ]"
    >
      <div
        v-if="title || $slots['header-right']"
        class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2"
        :class="compact ? 'mb-2' : 'mb-3.5'"
      >
        <component
          :is="headingTag"
          v-if="title"
          class="font-display font-semibold text-text-primary transition-colors"
          :class="[
            titleSize === 'normal'
              ? 'text-[22px] leading-[1.2] tracking-[-0.02em]'
              : 'text-[18px] leading-[1.32] tracking-[-0.015em]',
          ]"
        >
          <template v-if="to">
            <NuxtLink
              :to="to"
              external
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              <span>{{ title }}</span>
              <span
                class="inline-block text-primary text-sm ml-1.5 font-normal align-[0.04em]"
                aria-hidden="true"
              >↗</span>
            </NuxtLink>
          </template>
          <template v-else>
            <span :class="{ 'group-hover/card:text-primary transition-colors': interactive }">
              {{ title }}
            </span>
          </template>
        </component>

        <slot name="header-right" />
      </div>

      <div class="flex-grow flex flex-col">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  interactive: {
    type: Boolean,
    default: true
  },
  accent: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  },
  fullHeight: {
    type: Boolean,
    default: true
  },
  titleSize: {
    type: String,
    default: 'normal',
    validator: (value: string) => ['normal', 'small'].includes(value)
  },
  headingTag: {
    type: String as PropType<'h2' | 'h3'>,
    default: 'h3',
    validator: (value: string) => ['h2', 'h3'].includes(value)
  },
  to: {
    type: String,
    default: ''
  }
})
</script>
