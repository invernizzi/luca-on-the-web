<template>
  <div class="min-h-screen bg-surface text-text-primary flex flex-col">
    <!-- Background elements with lower z-index -->
    <div class="fixed inset-0 bg-gradient-to-b from-surface/80 to-surface z-0" />

    <!-- Error content with higher z-index -->
    <div class="container mx-auto px-4 py-16 flex-grow flex items-center justify-center z-10 relative">
      <CardComponent class="w-full max-w-2xl mx-auto" :interactive="true">
        <div class="text-center py-8">
          <!-- Cybersecurity-themed animation -->
          <div class="mb-8 flex justify-center" aria-hidden="true">
            <div class="relative w-40 h-40">
              <!-- Main shield outline -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-36 h-36 rounded-lg border-4 border-primary/30 transform rotate-45" />
              </div>

              <!-- Deterministic binary code elements (avoids SSR hydration mismatch) -->
              <div class="binary-code opacity-25">
                <div
                  v-for="(item, i) in binaryDigits"
                  :key="`bin-${i}`"
                  class="absolute text-primary font-mono text-xs"
                  :style="{
                    left: `${item.left}%`,
                    top: `${item.top}%`,
                    opacity: item.opacity,
                    animationDelay: `${item.delay}s`
                  }"
                >
                  {{ item.bit }}
                </div>
              </div>

              <!-- Circular shield element -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-28 h-28 rounded-full border-2 border-primary/60 animate-pulse" />
              </div>

              <!-- Lock icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <UIcon name="i-heroicons-lock-closed" class="w-16 h-16 text-primary animate-pulse" />
              </div>

              <!-- Pulsing radar circles -->
              <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div class="radar-circle w-full h-full rounded-full border border-primary/20" />
                <div class="radar-circle w-3/4 h-3/4 rounded-full border border-primary/30 animation-delay-300" />
                <div class="radar-circle w-1/2 h-1/2 rounded-full border border-primary/40 animation-delay-600" />
              </div>
            </div>
          </div>

          <h1 class="text-3xl md:text-4xl font-display font-bold mb-4">
            {{ error?.statusCode === 404 ? 'Access Denied' : '?' }}
          </h1>

          <p class="text-text-secondary text-lg mb-8">
            {{
              error?.statusCode === 404
                ? "The resource you're trying to access doesn't exist or requires authorization."
                : "Something's not right."
            }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              class="px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
              @click="handleError"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
              Return to Home
            </button>

            <button
              v-if="error?.statusCode !== 404"
              type="button"
              class="px-6 py-3 border border-white/10 rounded-lg hover:bg-surface-light/20 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              @click="clearError"
            >
              <UIcon name="i-heroicons-arrow-path" class="w-5 h-5" />
              Retry Connection
            </button>
          </div>
        </div>
      </CardComponent>
    </div>

    <!-- Matrix-like digital rain effect in background (deterministic for SSR hydration) -->
    <div class="fixed inset-0 pointer-events-none z-5 overflow-hidden opacity-20" aria-hidden="true">
      <div
        v-for="(drop, i) in rainDrops"
        :key="`rain-${i}`"
        class="rain-drop absolute w-0.5 bg-primary/40"
        :style="{
          left: `${drop.left}%`,
          top: `${drop.top}%`,
          height: `${drop.height}px`,
          animationDuration: `${drop.duration}s`,
          animationDelay: `${drop.delay}s`
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from '~/components/CardComponent.vue'

defineProps({
  error: {
    type: Object,
    required: true
  }
})

const binaryDigits = [
  { left: 12, top: 18, opacity: 0.7, delay: 0.1, bit: '1' },
  { left: 78, top: 14, opacity: 0.5, delay: 0.8, bit: '0' },
  { left: 86, top: 52, opacity: 0.8, delay: 1.4, bit: '1' },
  { left: 22, top: 76, opacity: 0.6, delay: 0.5, bit: '0' },
  { left: 64, top: 84, opacity: 0.9, delay: 1.1, bit: '1' },
  { left: 8, top: 48, opacity: 0.4, delay: 1.7, bit: '0' },
  { left: 48, top: 10, opacity: 0.7, delay: 0.3, bit: '1' },
  { left: 52, top: 88, opacity: 0.5, delay: 1.9, bit: '0' },
]

const rainDrops = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 5 + 3) % 97,
  top: (i * 17) % 80,
  height: 60 + ((i * 29) % 90),
  duration: 3 + (i % 4),
  delay: Number(((i * 0.45) % 3).toFixed(2)),
}))

const handleError = () => {
  navigateTo('/')
}

const clearError = () => {
  window.location.reload()
}
</script>

<style scoped>
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

.rain-drop {
  animation: digital-rain linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .binary-code > div,
  .radar-circle,
  .rain-drop {
    animation: none;
  }
}
</style>
