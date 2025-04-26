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
      <footer
        class="container mx-auto px-4 py-8 text-center text-text-secondary"
      >
        <p>© {{ new Date().getFullYear() }} Luca Invernizzi</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  definePerson,
  defineWebPage,
  defineWebSite,
  useSchemaOrg,
  defineBreadcrumb,
} from "@unhead/schema-org/vue";
import { useOpenGraphStore } from "~/stores/open_graph";

const ogStore = useOpenGraphStore();
const route = useRoute();

// --- Schema.org Structured Data ---
// Test with https://search.google.com/test/rich-results
// Test with https://validator.schema.org/
const schemaPerson = definePerson({
  name: ogStore.personName,
  givenName: ogStore.personGivenName,
  familyName: ogStore.personFamilyName,
  image: ogStore.personImageUrlAbsolute,
  description: ogStore.personDescription,
  jobTitle: ogStore.personJobTitle,
  email: ogStore.personEmail,
  url: ogStore.siteUrl,
  sameAs: ogStore.personSocialProfiles,
  worksFor: {
    "@type": "Organization",
    name: ogStore.employerName,
    url: ogStore.employerUrl,
  },
});
useSchemaOrg([
  defineWebPage({
    "@id": ogStore.currentPageUrl,
    name: ogStore.pageTitle,
    description: ogStore.pageDescription,
  }),
  defineWebSite({
    name: ogStore.siteName,
    description: ogStore.siteDescription,
    url: ogStore.siteUrl,
  }),
  schemaPerson,
  defineBreadcrumb({
    itemListElement: [
      { name: "Home", item: "/" },
      { name: "Projects", item: "/projects" },
      { name: "Publications", item: "/publications" },
      { name: "Service", item: "/committees" },
      { name: "CV", item: "/cv" },
    ],
  }),
  // Add ProfilePage schema only for the homepage
  ...(route.path === "/"
    ? [
        {
          "@type": "ProfilePage",
          "@id": ogStore.siteUrl,
          mainEntity: schemaPerson,
        },
      ]
    : []),
]);

// --- SEO Meta Tags (including Open Graph & Twitter Cards) ---
useSeoMeta({
  title: ogStore.pageTitle,
  description: ogStore.pageDescription,

  // -- Open Graph (og:*) --
  ogTitle: ogStore.pageTitle,
  ogDescription: ogStore.pageDescription,
  ogUrl: ogStore.currentPageUrl,
  ogType: "website", // Default type, override with 'article' etc. on specific pages
  ogLocale: "en_US",
  ogSiteName: ogStore.siteName,
  ogImage: ogStore.personImageUrlAbsolute,

  // -- Twitter Card (twitter:*) --
  twitterCard: "summary_large_image",
  twitterSite: `@${ogStore.twitterHandle}`,
  twitterCreator: `@${ogStore.twitterHandle}`,
  twitterTitle: ogStore.pageTitle,
  twitterDescription: ogStore.pageDescription,
  twitterImage: ogStore.personImageUrlAbsolute,
});

// --- Set Canonical Link ---
useHead({
  htmlAttrs: { lang: "en-US" },
  link: [
    {
      rel: "canonical",
      href: ogStore.currentPageUrl,
    },
  ],
});
</script>
