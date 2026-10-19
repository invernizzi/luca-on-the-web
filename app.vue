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
  color: var(--color-text-primary); box-sizing: border-box;
  scroll-margin-top: 100px;
}

::selection {
  background-color: var(--ui-primary);
  color: var(--color-text-primary);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--ui-primary);
  border-radius: 4px;
}
</style>
