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
import { defineProps } from 'vue'

defineProps({
  authors: {
    type: Array as () => string[],
    required: false,
    default: () => []
  }
})

const isHighlightedAuthor = (author: string): boolean => {
  // Define the author name to highlight
  const highlightedName = 'Luca Invernizzi'
  return author.includes(highlightedName)
}
</script>
