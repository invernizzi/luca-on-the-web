<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <FlyingElement 
      v-for="(element, index) in elements" 
      :key="index"
      :element-class="element.class"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FlyingElement from './FlyingElement.vue'

const elements = ref<{ class: string }[]>([])
let timer: NodeJS.Timeout

const addElement = () => {
  elements.value.push({
    class: `element-${elements.value.length}`
  })
  
  // Remove oldest element if we have too many
  if (elements.value.length > 10) {
    elements.value.shift()
  }
}

onMounted(() => {
  // Add initial element
  addElement()
  
  // Add new element every 30 seconds
  timer = setInterval(addElement, 30000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.fixed {
  z-index: -2;
}
</style> 