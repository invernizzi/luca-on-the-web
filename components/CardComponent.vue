<template>
  <div class="h-full" :class="{ 'group/card': interactive }">
    <div
      class="bg-surface rounded-xl p-6 border border-white/[0.08] h-full flex flex-col"
      :class="
        interactive
          ? 'transition-[background-color,border-color] duration-150 hover:border-white/[0.16] hover:bg-surface-light/60'
          : ''
      "
    >
      <component
        :is="headingTag"
        v-if="title"
        class="font-display font-medium text-text-primary mb-3 leading-[1.28]"
        :class="
          titleSize === 'small'
            ? 'text-[17px] tracking-[-0.01em]'
            : 'text-xl tracking-[-0.015em]'
        "
      >
        <template v-if="to">
          <NuxtLink
            :to="to"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors duration-150"
          >
            <span>{{ title }}</span>
            <AppIcon
              name="arrow-up-right"
              size="sm"
              class="inline-block align-[-0.12em] ml-1 text-text-muted"
            />
          </NuxtLink>
        </template>
        <template v-else>
          {{ title }}
        </template>
      </component>

      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import AppIcon from './AppIcon.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  interactive: {
    type: Boolean,
    default: false,
  },
  titleSize: {
    type: String as PropType<'normal' | 'small'>,
    default: 'normal',
    validator: (value: string) => ['normal', 'small'].includes(value),
  },
  headingTag: {
    type: String as PropType<'h2' | 'h3'>,
    default: 'h2',
    validator: (value: string) => ['h2', 'h3'].includes(value),
  },
  to: {
    type: String,
    default: '',
  },
});
</script>
