<template>
  <div class="min-h-screen bg-surface text-text-primary">
    <!-- Background elements with lower z-index -->
    <GameOfLife />
    <FlyingElementsContainer />
    
    <!-- Foreground content with higher z-index -->
    <div class="relative z-20">
      <Navbar />
      <main class="relative">
        <slot />
      </main>
      <footer class="container mx-auto px-4 py-8 text-center text-text-secondary">
        <p>© {{ new Date().getFullYear() }} Luca Invernizzi</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Using relative paths to avoid TypeScript issues with module resolution
import Navbar from '../components/Navbar.vue'
import FlyingElementsContainer from '../components/FlyingElementsContainer.vue'
import PageTransition from '../components/PageTransition.vue'
import GameOfLife from '../components/GameOfLife.vue'
</script>

<style>
/* Ensure content has proper z-index and positioning */
.relative {
  position: relative;
}
</style> 