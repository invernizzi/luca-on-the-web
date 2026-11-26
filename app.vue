<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Design tokens live in assets/css/main.css (@theme). */
html {
  scroll-behavior: smooth;
}

body {
  /* The page background must stay on <body>: the Game of Life canvas is a
     negative z-index fixed layer, so any background on a wrapper <div> would
     paint over it. */
  background-color: var(--color-background);
  color: var(--color-text-primary);
  box-sizing: border-box;
  scroll-margin-top: 88px;
}

::selection {
  background-color: var(--ui-primary);
  color: var(--color-background);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background: var(--color-surface-hover);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}
</style>
