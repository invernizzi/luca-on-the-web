<template>
  <div class="min-h-screen bg-background">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>
:root {
  --color-background: #151515;
  --color-surface: #1e1e1e;
  --color-surface-light: #2a2a2a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-primary: #ff9d02;
  --color-accent: #ff9d02;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: var(--color-text-primary); box-sizing: border-box;
  scroll-margin-top: 100px;
}

::selection {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
</style>
