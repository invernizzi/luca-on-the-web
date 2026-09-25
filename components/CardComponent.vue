<template>
  <div class="h-full" :class="{ 'group/card': interactive }">
    <div 
      class="bg-surface/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10 h-full flex flex-col transition-all duration-300"
      :class="{ 
        'hover:shadow-xl hover:border-primary/90 hover:translate-y-[-1px] hover:bg-surface-light/40 hover:shadow-glow': interactive 
      }"
    >
      <!-- Dynamic title component -->
      <h3 
        v-if="title"
        class="font-display font-semibold text-text-primary mb-2 transition-colors"
        :class="{ 
          'text-2xl': titleSize === 'normal',
          'text-xl': titleSize === 'small',
          'interactive': interactive
        }"
      >
        <!-- Conditionally wrap title in link -->
        <template v-if="to">
          <NuxtLink 
            :to="to" 
            external 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            {{ title }}
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 opacity-70" />
          </NuxtLink>
        </template>
        
        <!-- Regular title without link -->
        <template v-else>
          <span :class="{ 'group-hover/card:text-primary/90 interactive': interactive }">
            {{ title }}
          </span>
        </template>
      </h3>
      
      <div class="flex-grow">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  interactive: {
    type: Boolean,
    default: true
  },
  titleSize: {
    type: String,
    default: 'normal',
    validator: (value: string) => ['normal', 'small'].includes(value)
  },
  to: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.group\/card:hover .hover\:shadow-glow {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 
              0 8px 10px -6px rgba(0, 0, 0, 0.1),
              0 0 15px 2px rgba(255, 255, 255, 0.05); /* White glow effect */
}
</style> 