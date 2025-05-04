<template>
  <div class="group h-full">
    <div 
      class="bg-surface/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10 h-full flex flex-col transition-all duration-300"
      :class="{ 
        'hover:shadow-xl hover:bg-surface/25 hover:border-primary/90 hover:translate-y-[-1px] hover:bg-surface-light/40 hover:shadow-glow': interactive 
      }"
    >
      <!-- Dynamic title component -->
      <component 
        :is="titleSize" 
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
            class="hover:text-primary transition-colors  gap-1"
          
          >
            {{ title }}
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 opacity-70 size-3" />
          </NuxtLink>
        </template>
        
        <!-- Regular title without link -->
        <template v-else>
          <span :class="{ 'group-hover:text-primary/90 interactive': interactive }">
            {{ title }}
          </span>
        </template>
      </component>
      
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

<style scoped >
.group:hover .hover\:shadow-glow {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 
              0 8px 10px -6px rgba(0, 0, 0, 0.1),
              0 0 15px 2px rgba(255, 255, 255, 0.05); /* White glow effect */
            
}

.group > div:hover >.text-xl.interactive, .group > div:hover > .text-2xl.interactive { 
  color: #FF9D02; /* Change to your desired color */
  transition: color 0.3s ease;
}  
</style> 