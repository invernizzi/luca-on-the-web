<template>
  <div
    ref="swipeEl"
    class="touch-pan-y overflow-x-hidden w-full"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { useRouter } from 'vue-router'

// Props
const props = defineProps({
  threshold: {
    type: Number,
    default: 50 // Minimum distance to trigger a swipe
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Setup vars
const router = useRouter()
const swipeEl = ref<HTMLElement | null>(null)
const touchStartX = ref(0)
const touchStartY = ref(0)
const swipingInProgress = ref(false)

// Map of navigation paths from navbar
const navPaths = ref<string[]>([])

// Get the transition handler from PageTransition
const triggerDirectionalTransition = inject('triggerDirectionalTransition') as ((direction: 'left' | 'right', path: string) => void) | undefined

// Cache the ordered navbar paths
const cacheNavbarPaths = () => {
  const navbar = document.querySelector('.nav-links-container')
  if (!navbar) return
  
  const links = navbar.querySelectorAll('.nav-link')
  navPaths.value = []
  
  links.forEach(link => {
    const href = link.getAttribute('href')
    if (href) {
      navPaths.value.push(href)
    }
  })
}

// Get next page based on direction
const getAdjacentPath = (direction: 'next' | 'prev') => {
  const currentPath = router.currentRoute.value.path
  const currentIndex = navPaths.value.findIndex(path => path === currentPath)
  
  if (currentIndex === -1) return null

  if (direction === 'next' && currentIndex < navPaths.value.length - 1) {
    return navPaths.value[currentIndex + 1]
  } else if (direction === 'prev' && currentIndex > 0) {
    return navPaths.value[currentIndex - 1]
  }
  
  return null
}

// Navigate to the next or previous page
const navigateTo = (direction: 'next' | 'prev', swipeDirection: 'left' | 'right') => {
  const targetPath = getAdjacentPath(direction)
  if (!targetPath) return

  if (triggerDirectionalTransition) {
    // Use the swipe direction directly for the transition
    triggerDirectionalTransition(swipeDirection, targetPath)
  } else {
    // Fallback to standard navigation
    router.push(targetPath)
  }
}

// Touch event handlers
const handleTouchStart = (e: TouchEvent) => {
  if (props.disabled) return
  if (!e.touches || e.touches.length === 0) return
  touchStartX.value = e.touches[0]?.clientX || 0
  touchStartY.value = e.touches[0]?.clientY || 0
  swipingInProgress.value = true
}

const handleTouchMove = (_e: TouchEvent) => {
  if (!swipingInProgress.value || props.disabled) return
  
  // Optional: add visual feedback during swipe
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!swipingInProgress.value || props.disabled) return
    if (!e.changedTouches || e.changedTouches.length === 0) return
  const touchEndX = e.changedTouches[0]?.clientX || 0
  const touchEndY = e.changedTouches[0]?.clientY  || 0
  
  // Calculate distances
  const deltaX = touchEndX - touchStartX.value
  const deltaY = touchEndY - touchStartY.value
  
  // Ensure horizontal swipe (not vertical)
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > props.threshold) {
    if (deltaX > 0) {
      // Swipe right - go to previous page with right transition
      navigateTo('prev', 'right')
    } else {
      // Swipe left - go to next page with left transition
      navigateTo('next', 'left')
    }
  }
  
  swipingInProgress.value = false
}

// Lifecycle hooks
onMounted(() => {
  cacheNavbarPaths()
  window.addEventListener('resize', cacheNavbarPaths)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', cacheNavbarPaths)
})
</script>

