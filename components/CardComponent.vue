<template>
  <div class="group h-full">
    <div class="bg-surface/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10 h-full flex flex-col">
      <h2 v-if="title" class="text-2xl font-display font-semibold text-text-primary mb-6">{{ title }}</h2>
      <div class="flex-grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script> 