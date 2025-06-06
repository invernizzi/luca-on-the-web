<template>
  <div>
    <transition
      :name="transitionName"
      mode="out-in"
      @before-leave="beforeLeave"
      @enter="enter"
    >
      <slot />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  forceDirection: {
    type: String,
    default: null, // 'left', 'right', or null for auto
  }
})

const route = useRoute()
const router = useRouter()
const transitionName = ref('page-slide-right')
const lastPath = ref('')
const navLinks = ref<{path: string, position: number}[]>([])

// Provide the transition name for other components to consume
provide('transitionName', transitionName)

// Function to determine transition direction based on navbar position
const determineTransitionDirection = (from: string, to: string) => {
  if (props.forceDirection) {
    return props.forceDirection === 'left' ? 'page-slide-left' : 'page-slide-right'
  }
  
  // Find positions of from and to paths in the navbar
  const fromLink = navLinks.value.find(link => link.path === from)
  const toLink = navLinks.value.find(link => link.path === to)
  
  if (!fromLink || !toLink) return 'page-slide-right' // Default
  
  // If the target page is to the right of the current page in the navbar
  return toLink.position > fromLink.position ? 'page-slide-right' : 'page-slide-left'
}

// Cache the positions of navbar links
const cacheNavbarPositions = () => {
  const navbar = document.querySelector('.nav-links-container')
  if (!navbar) return
  
  const links = navbar.querySelectorAll('.nav-link')
  navLinks.value = []
  
  links.forEach((link, index) => {
    const href = link.getAttribute('href')
    if (href) {
      navLinks.value.push({
        path: href,
        position: index
      })
    }
  })
}

// Public method to manually trigger a transition with a specific direction
const triggerDirectionalTransition = (direction: 'left' | 'right', path: string) => {
  transitionName.value = direction === 'left' ? 'page-slide-left' : 'page-slide-right'
  router.push(path)
}

// Expose method to components
provide('triggerDirectionalTransition', triggerDirectionalTransition)

// Transition hooks
const beforeLeave = (_el: Element) => {
  const newPath = route.path
  transitionName.value = determineTransitionDirection(lastPath.value, newPath)
  lastPath.value = newPath
}

const enter = (_el: Element, done: () => void) => {
  // Optional: add custom enter logic
  done()
}


// Initialize
onMounted(() => {
  lastPath.value = route.path
  cacheNavbarPositions()
  window.addEventListener('resize', cacheNavbarPositions)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', cacheNavbarPositions)
})
</script>

<style scoped>
/* Right to left transition */
.page-slide-right-enter-active,
.page-slide-right-leave-active,
.page-slide-left-enter-active,
.page-slide-left-leave-active {
  transition: all 0.3s ease-out;
  position: relative;
  z-index: 10;
}

/* 'right' direction - sliding toward the right side of screen */
.page-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px); /* Coming from left */
}

.page-slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px); /* Exiting to right */
}

/* 'left' direction - sliding toward the left side of screen */
.page-slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px); /* Coming from right */
}

.page-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px); /* Exiting to left */
}
</style> 