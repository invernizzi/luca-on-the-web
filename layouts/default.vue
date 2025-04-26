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
} from "@unhead/schema-org/vue";

// --- Define Core Information Once ---
const personGivenName = "Luca";
const personFamilyName = "Invernizzi";
const personName = `${personGivenName} ${personFamilyName}`;
const personJobTitle = "Research Scientist Manager";
const employerName = "Google";
const employerUrl = "https://google.com";
const siteName = `${personName} (Research Scientist)`;
const siteDescription =
  "Personal website of Luca Invernizzi, Research Scientist Manager at Google specializing in cybersecurity and machine learning.";
const siteUrl = "https://lucainvernizzi.net";
const personDescription =
  "Cybersecurity and machine learning researcher with a focus on AI applications in security.";
const personEmail = "luca@lucainvernizzi.net";
const personImageRelativePath = "/images/social.jpg";
const personImageUrlAbsolute = `${siteUrl}${personImageRelativePath}`;
const twitterHandle = "invernizzi";
const personSocialProfiles = [
  `https://twitter.com/${twitterHandle}`,
  "https://github.com/invernizzi",
  "https://linkedin.com/in/lucainvernizzi",
  "https://scholar.google.com/citations?user=4CEVnEMAAAAJ",
];
const currentPageUrl = `${siteUrl}${useRoute().fullPath}`;

const getPageName = () => {
  const routeName = String(useRoute().name);
  return routeName === "index"
    ? null
    : routeName.charAt(0).toUpperCase() + routeName.slice(1);
};
const pageTitle = [siteName, getPageName()].filter((t) => !!t).join(": ");
const pageDescription = [siteDescription, getPageName()]
  .filter((t) => !!t)
  .join(". Page: ");

// --- Schema.org Structured Data ---
// These are defaults; specific pages might add or override (e.g., define Article)
useSchemaOrg([
  defineWebPage({
    "@id": currentPageUrl,
    name: pageTitle,
    description: pageDescription,
  }),
  defineWebSite({
    name: siteName,
    description: siteDescription,
    url: siteUrl,
  }),
  definePerson({
    name: personName,
    givenName: personGivenName,
    familyName: personFamilyName,
    image: personImageUrlAbsolute,
    description: personDescription,
    jobTitle: personJobTitle,
    email: personEmail,
    url: siteUrl,
    sameAs: personSocialProfiles,
    worksFor: {
      "@type": "Organization",
      name: employerName,
      url: employerUrl,
    },
  }),
]);

// --- SEO Meta Tags (including Open Graph & Twitter Cards) ---
useSeoMeta({
  title: pageTitle,
  description: pageDescription,

  // -- Open Graph (og:*) --
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: currentPageUrl,
  ogType: "website", // Default type, override with 'article' etc. on specific pages
  ogLocale: "en_US",
  ogSiteName: siteName,
  ogImage: personImageUrlAbsolute,

  // -- Twitter Card (twitter:*) --
  twitterCard: "summary_large_image",
  twitterSite: `@${twitterHandle}`,
  twitterCreator: `@${twitterHandle}`,
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: personImageUrlAbsolute,
});

// --- Set Canonical Link ---
useHead({
  htmlAttrs: { lang: "en-US" },
  link: [
    {
      rel: "canonical",
      href: currentPageUrl,
    },
  ],
});
</script>
