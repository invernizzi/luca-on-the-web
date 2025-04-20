<template>
  <div class="min-h-screen bg-surface text-text-primary">
    <!-- Background elements with lower z-index -->
    <LazyGameOfLife hydrate-on-idle />
    <!-- Foreground content with higher z-index -->
    <div class="relative z-20">
      <LazyNavbar hydrate-on-idle />
      <PageTransition>
        <SwipeHandler>
          <main class="relative">
            <slot />
          </main>
        </SwipeHandler>
      </PageTransition>
      <footer class="container mx-auto px-4 py-8 text-center text-text-secondary">
        <p>© {{ new Date().getFullYear() }} Luca Invernizzi</p>
      </footer>
    </div>
  </div>
</template>
