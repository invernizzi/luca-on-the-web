<template>
  <div class="min-h-screen bg-surface text-text-primary flex flex-col">
    <!-- Background elements with lower z-index -->
    <div class="fixed inset-0 bg-gradient-to-b from-surface/80 to-surface z-0"></div>
    
    <!-- Error content with higher z-index -->
    <div class="container mx-auto px-4 py-16 flex-grow flex items-center justify-center z-10 relative">
      <CardComponent class="w-full max-w-2xl mx-auto" :interactive="true">
        <div class="text-center py-8">
          <!-- Cybersecurity-themed animation -->
          <div class="mb-8 flex justify-center">
            <div class="relative w-40 h-40">
              <!-- Main shield outline -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-36 h-36 rounded-lg border-4 border-primary/30 transform rotate-45"></div>
              </div>
              
              <!-- Binary code elements -->
              <div class="binary-code opacity-25">
                <div v-for="i in 8" :key="`bin-${i}`" 
                     class="absolute text-primary font-mono text-xs"
                     :style="{
                       left: `${Math.random() * 100}%`,
                       top: `${Math.random() * 100}%`,
                       opacity: Math.random() * 0.8 + 0.2,
                       animationDelay: `${Math.random() * 2}s`
                     }">
                  {{ Math.random() > 0.5 ? '1' : '0' }}
                </div>
              </div>
              
              <!-- Circular shield element -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-28 h-28 rounded-full border-2 border-primary/60 animate-pulse"></div>
              </div>
              
              <!-- Lock icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <UIcon name="i-heroicons-lock-closed" class="w-16 h-16 text-primary animate-pulse" />
              </div>
              
              <!-- Pulsing radar circles -->
              <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div class="radar-circle w-full h-full rounded-full border border-primary/20"></div>
                <div class="radar-circle w-3/4 h-3/4 rounded-full border border-primary/30 animation-delay-300"></div>
                <div class="radar-circle w-1/2 h-1/2 rounded-full border border-primary/40 animation-delay-600"></div>
              </div>
            </div>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-display font-bold mb-4">{{ error?.statusCode === 404 ? 'Access Denied' : '?' }}</h1>
          
          <p class="text-text-secondary text-lg mb-8">
            {{ error?.statusCode === 404 
              ? "The resource you're trying to access doesn't exist or requires authorization." 
              : "Something's not right." 
            }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="handleError" 
              class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors font-medium inline-flex items-center justify-center gap-2"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
              Return to Home
            </button>
            
            <button 
              v-if="error?.statusCode !== 404"
              @click="clearError" 
              class="px-6 py-3 border border-white/10 rounded-lg hover:bg-surface-light/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <UIcon name="i-heroicons-arrow-path" class="w-5 h-5" />
              Retry Connection
            </button>
          </div>
        </div>
      </CardComponent>
    </div>
    
    <!-- Matrix-like digital rain effect in background -->
    <div class="fixed inset-0 pointer-events-none z-5 overflow-hidden opacity-20">
      <div v-for="i in 20" :key="`rain-${i}`" 
           class="absolute w-0.5 h-16 bg-primary/40"
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             height: `${Math.random() * 100 + 50}px`,
             animationDuration: `${Math.random() * 5 + 2}s`,
             animationDelay: `${Math.random() * 3}s`
           }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from '~/components/CardComponent.vue'

// Access the error from the app instance
const props = defineProps({
  error: Object
})

// Handles clearing the error or navigating home
const handleError = () => {
  // Navigate to the home page
  navigateTo('/')
}

// Try again by clearing the error and refreshing
const clearError = () => {
  // Clear the error by refreshing the page
  window.location.reload()
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes binary-flash {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes digital-rain {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(calc(100vh + 100px));
    opacity: 0;
  }
}

@keyframes radar-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.binary-code > div {
  animation: binary-flash 2s infinite;
}

.radar-circle {
  position: absolute;
  animation: radar-pulse 3s infinite;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

[class^="rain-"] {
  animation: digital-rain linear infinite;
}
</style> 