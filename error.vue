<template>
  <div class="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center px-5 py-16">
    <div class="w-full max-w-xl">
      <CardComponent :interactive="false" :accent="true" :full-height="false">
        <div class="py-4 text-center">
          <div class="mb-6 flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-[12px] bg-primary/[0.12] border border-primary/[0.38] text-primary flex items-center justify-center">
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="16" y="9" width="5" height="5" rx="1" />
                <rect x="2" y="16" width="5" height="5" rx="1" />
                <rect x="9" y="16" width="5" height="5" rx="1" />
                <rect x="16" y="16" width="5" height="5" rx="1" />
              </svg>
            </div>

            <span class="font-mono text-xs font-medium text-primary bg-primary/[0.12] border border-primary/[0.38] px-2.5 py-0.5 rounded-[6px] tabular-nums">
              {{ error?.statusCode || 500 }} · {{ error?.statusCode === 404 ? 'NOT FOUND' : 'ERROR' }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-display font-semibold tracking-[-0.025em] text-text-primary mb-3">
            {{ error?.statusCode === 404 ? 'Access Denied' : 'Something went wrong' }}
          </h1>

          <p class="text-text-body text-[15.5px] leading-relaxed max-w-md mx-auto mb-8">
            {{
              error?.statusCode === 404
                ? "The page you're looking for doesn't exist or has moved."
                : "An unexpected error occurred while loading this page."
            }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              class="px-5 py-2.5 bg-primary text-background rounded-[8px] hover:bg-primary/90 transition-colors font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              @click="handleError"
            >
              <span aria-hidden="true">←</span>
              Return to Home
            </button>

            <button
              v-if="error?.statusCode !== 404"
              type="button"
              class="px-5 py-2.5 bg-surface-light text-[#e4e4ea] border border-white/[0.12] rounded-[8px] hover:border-white/25 hover:text-text-primary transition-colors font-medium text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              @click="clearError"
            >
              Retry
            </button>
          </div>
        </div>
      </CardComponent>
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

const handleError = () => {
  navigateTo('/')
}

const clearError = () => {
  window.location.reload()
}
</script>
