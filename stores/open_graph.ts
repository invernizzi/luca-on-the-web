import { defineStore } from "pinia";

export const useOpenGraphStore = defineStore("open_graph", () => {
  // --- State ---
  const personGivenName = ref("Luca");
  const personFamilyName = ref("Invernizzi");
  const personName = computed(() => `${personGivenName.value} ${personFamilyName.value}`);
  const personJobTitle = ref("Research Scientist Manager");
  const employerName = ref("Google");
  const employerUrl = ref("https://google.com");

  const siteName = computed(() => `${personName.value} (Research Scientist)`);
  const siteDescription = ref(
    "Personal website of Luca Invernizzi, Research Scientist Manager at Google specializing in cybersecurity and machine learning."
  );
  const siteUrl = ref("https://lucainvernizzi.net");
  const personDescription = ref(
    "Cybersecurity and machine learning researcher with a focus on AI applications in security."
  );

  const personEmail = ref("luca@lucainvernizzi.net");
  const personImageRelativePath = ref("/images/social.webp");
  const twitterHandle = ref("invernizzi");
  const personSocialProfiles = ref([
    "https://twitter.com/invernizzi",
    "https://github.com/invernizzi",
    "https://github.com/invernizzi-at-google",
    "https://linkedin.com/in/lucainvernizzi",
    "https://scholar.google.com/citations?user=4CEVnEMAAAAJ",
  ]);

  // --- Getters (Computed Properties) ---
  const personImageUrlAbsolute = computed(() => {
    return `${siteUrl.value}${personImageRelativePath.value}`;
  });

  const getPageName = computed(() => {
    const route = useRoute();
    const routeName = String(route.name);
    return routeName === "index"
      ? null
      : routeName.charAt(0).toUpperCase() + routeName.slice(1);
  });

  const pageTitle = computed(() => {
    return [siteName.value, getPageName.value].filter((t) => !!t).join(": ");
  });

  const pageDescription = computed(() => {
    return [siteDescription.value, getPageName.value]
      .filter((t) => !!t)
      .join(". Page: ");
  });

  const currentPageUrl = computed(() => {
    const route = useRoute();
    return `${siteUrl.value}${route.fullPath}`;
  });
  
  return {
    // State
    personGivenName,
    personFamilyName,
    personName,
    personJobTitle,
    employerName,
    employerUrl,
    siteName,
    siteDescription,
    siteUrl,
    personDescription,
    personEmail,
    personImageRelativePath,
    twitterHandle,
    personSocialProfiles,

    // Getters
    personImageUrlAbsolute,
    getPageName,
    pageTitle,
    pageDescription,
    currentPageUrl,
  };
});