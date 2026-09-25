<template>
  <span>
    <template v-for="(author, index) in authors" :key="author">
      <span v-if="isHighlightedAuthor(author)" class="font-bold text-primary">{{ author }}</span>
      <span v-else>{{ author }}</span>
      <span v-if="index < authors.length - 1">, </span>
    </template>
  </span>
</template>

<script setup lang="ts">
defineProps({
  authors: {
    type: Array as () => string[],
    required: false,
    default: () => []
  }
})

const isHighlightedAuthor = (author: string): boolean => {
  const normalized = author.trim().toLowerCase()
  return normalized === 'luca invernizzi' || normalized === 'l invernizzi' || normalized === 'l. invernizzi' || normalized.includes('invernizzi')
}
</script>
