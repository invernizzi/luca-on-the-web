// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,

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
  nitro: {
    prerender: {
      routes: [
        "/",
        // images.
        "/_ipx/f_webp&q_80&s_2560x2560/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_768x768/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_1024x1024/images/face.jpg",
        "/_ipx/f_webp&q_80&s_320x320/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_1280x1280/images/face.jpg",
        "/_ipx/f_webp&q_80&s_2048x2048/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_640x640/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_320x320/images/face.jpg",
        "/_ipx/f_webp&q_80&s_768x768/images/face.jpg",
        "/_ipx/f_webp&q_80&s_640x640/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_2560x2560/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_1536x1536/images/face.jpg",
        "/_ipx/f_webp&q_80&s_1536x1536/images/face.jpg",
        "/_ipx/f_webp&q_80&s_3072x3072/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_2048x2048/images/face.jpg",
        "/_ipx/f_jpeg&q_80&s_3072x3072/images/face.jpg",
        "/_ipx/f_webp&q_80&s_1280x1280/images/face.jpg",
        "/_ipx/f_webp&q_80&s_1024x1024/images/face.jpg",
      ],
    },
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
      title: "Luca Invernizzi - Research Scientist",
      // Needed for accessibility.
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index,follow" },
        {
          name: "description",
          content:
            "Personal website of Luca Invernizzi, Research Scientist Manager at Google specializing in cybersecurity and machine learning.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "http://www.lucainvernizzi.net/" },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  vite: {
    build: {
      sourcemap: false, // Disable source map generation
      terserOptions: {
        format: {
          comments: false, // Strip comments from generated JavaScript
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  },
});
