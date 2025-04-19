// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/ui', '@nuxt/test-utils/module',  '@pinia/nuxt'],
  image: {
    quality: 80, format: ['webp']

  },
  fonts: {
    families: [
      {
        name: 'General Sans',
        provider: 'google',
        weights: [400, 500, 600, 700]
      },
      {
        name: 'Manrope',
        provider: 'google',
        weights: [400, 500, 600, 700]
      }
    ]
  },
  css: ['~/assets/css/main.css', '~/assets/css/transitions.css'],
  app: {
    head: {
      title: 'Luca Invernizzi - Research Scientist',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index,follow' },
        { name: 'description', content: 'Personal website of Luca Invernizzi, Research Scientist Manager at Google specializing in cybersecurity and machine learning.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'http://www.lucainvernizzi.net/' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
})
