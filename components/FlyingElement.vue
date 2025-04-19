<template>
  <div 
    :style="{
      '--x': `${x}%`,
      '--y': `${y}%`,
      '--rotation': `${rotation}deg`,
      '--scale': scale,
      '--opacity': opacity
    }"
    class="absolute top-0 left-0 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-30000 ease-linear"
    :class="elementClass"
  >
    <div class="w-full h-full bg-primary/10 rounded-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  elementClass?: string
}>()

const x = ref(0)
const y = ref(0)
const rotation = ref(0)
const scale = ref(1)
const opacity = ref(0)

onMounted(() => {
  // Random starting position
  x.value = Math.random() * 100
  y.value = Math.random() * 100
  
  // Random rotation
  rotation.value = Math.random() * 360
  
  // Random scale
  scale.value = 0.5 + Math.random() * 1.5
  
  // Fade in
  setTimeout(() => {
    opacity.value = 0.3
  }, 100)

  // Animate movement
  setTimeout(() => {
    x.value = Math.random() * 100
    y.value = Math.random() * 100
    rotation.value = Math.random() * 360
  }, 100)
})
</script>

<style scoped>
div {
  transform: translate(var(--x), var(--y)) rotate(var(--rotation)) scale(var(--scale));
  opacity: var(--opacity);
}
</style> 