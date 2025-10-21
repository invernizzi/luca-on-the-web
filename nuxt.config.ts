// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-24",
  devtools: { enabled: true },
  ssr: true,

  routeRules: {
    "/meet": {
      redirect: { to: "https://calendar.app.google/Bdwk9knaB9bQ1Cge9", statusCode: 301 },
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils/module",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-link-checker",
    "nitro-cloudflare-dev",
  ],
  // For the sitemap module.
  site: {
    url: "https://lucainvernizzi.net",
    name: "Luca Invernizzi",
  },
  // Image configuration.
  image: {
    quality: 80,
    format: ["webp"],
  },
  icon: {
    clientBundle: {
      // scan all components in the project and include icons (dynamic names will not be detected)
      scan: true,
      // include all custom collections in the client bundle
      includeCustomCollections: true,
      // guard for uncompressed bundle size, will fail the build if exceeds
      sizeLimitKb: 256,
    },
  },
  ui: {
    colorMode: false,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/cv",
        "/projects",
        "/publications",
        "/committees",
      ],
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  linkChecker: {
    failOnError: true,
  },
  typescript: {
    typeCheck: true,
  },
  fonts: {
    families: [
      {
        name: "General Sans",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
      {
        name: "Manrope",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
    ],
  },
  css: ["~/assets/css/main.css", "~/assets/css/transitions.css"],
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index,follow" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  sourcemap: {
    server: false, // Disable source maps for server-side code
    client: false, // Disable source maps for client-side code
  },
  vite: {
    build: {
      sourcemap: false, // Disable source map generation
      minify: "terser", // Use Terser for minification
      terserOptions: {
        format: {
          comments: false, // Strip comments from generated JavaScript
        },
        compress: {
          drop_console: true, // Remove console statements
          drop_debugger: true, // Remove debugger statements
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")?.[1]?.split("/")[0];
            }
          },
        },
      },
     },
  },
});
