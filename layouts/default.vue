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


<script setup lang="ts">
import {useSchemaOrg, definePerson } from '@unhead/schema-org/vue';


useHead({
  htmlAttrs: { lang: 'en-US' },
  link: [{
    rel: 'canonical',
    href: `https://lucainvernizzi.net${useRoute().path}`,
  }]
})

useHead({
  templateParams: {
    schemaOrg: {
      host: 'https://lucainvernizzi.net',
    }
  }
})

useSchemaOrg([
  definePerson({
      // Basic Information
      name: 'Luca Invernizzi',
      givenName: 'Luca',
      familyName: 'Invernizzi',

      image: '/images/face.jpg',
      description: 'Cybersecurity and machine learning researcher with a focus on AI applications in security.',
      jobTitle: 'Research Scientist Manager',

      // Contact & Social
      email: 'luca@lucainvernizzi.net',
      url: 'https://lucainvernizzi.net',
      sameAs: [
        'https://twitter.com/invernizzi',
        'https://github.com/invernizzi',
        'https://linkedin.com/in/lucainvernizzi',
        'https://scholar.google.com/citations?user=4CEVnEMAAAAJ'
      ],
      // Professional information.
      worksFor: {
        '@type': 'Organization',
        'name': 'Google',
        'url': 'https://google.com'
      },
    })
])

</script>
