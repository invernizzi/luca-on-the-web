<template>
  <div class="group h-full">
    <div 
      class="bg-surface/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10 h-full flex flex-col transition-all duration-300"
      :class="{ 
        'hover:shadow-xl hover:bg-surface/25 hover:border-primary/90 hover:translate-y-[-1px] hover:bg-surface-light/40 hover:shadow-glow': interactive 
      }"
    >
      <h2 
        v-if="title" 
        class="text-2xl font-display font-semibold text-text-primary mb-6 transition-colors"
        :class="{ 'group-hover:text-primary/90 interactive': interactive }"
      >{{ title }}</h2>
      <div class="flex-grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  interactive: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
.group:hover .hover\:shadow-glow {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 
              0 8px 10px -6px rgba(0, 0, 0, 0.1),
              0 0 15px 2px rgba(255, 255, 255, 0.05); /* White glow effect */
           
}

.group > div:hover>h2.interactive { 
  color: #FF9D02; /* Change to your desired color */
  transition: color 0.3s ease;

}  
</style> 