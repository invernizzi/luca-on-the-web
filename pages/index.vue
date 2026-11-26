<template>
  <div class="max-w-[980px] mx-auto px-5 sm:px-7 pt-12 sm:pt-14 pb-16">
    <!-- Hero -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-10">
      <div class="p-1 rounded-full border-2 border-primary bg-background shrink-0">
        <div class="w-28 h-28 rounded-full overflow-hidden">
          <LazyNuxtPicture
            hydrate-on-visible
            width="400"
            height="400"
            src="/images/face.webp"
            alt="Luca Invernizzi"
            format="webp"
            sizes="112px"
            densities="x1 x2"
            placeholder
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        <h1 class="text-[38px] sm:text-[48px] font-display font-semibold leading-[1.04] tracking-[-0.032em] text-text-primary">
          Luca Invernizzi
        </h1>
        <p class="mt-2.5 text-base font-medium text-text-body">
          Senior Staff Research Scientist Manager ·
          <span class="text-primary">Google Switzerland</span>
        </p>
      </div>
    </div>

    <!-- Bio -->
    <div class="max-w-[66ch] space-y-4 mb-11 text-[16.5px] sm:text-[17px] leading-[1.65] text-text-body">
      <p>
        I'm a Senior Staff Research Scientist Manager at Google's
        <NuxtLink
          to="https://research.google/teams/security-privacy-and-abuse/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >Security Research Group</NuxtLink>, focused on protecting people online through advances in cybersecurity, AI, and hardware security.
      </p>
      <p>
        My research has been featured by
        <NuxtLink
          to="https://www.bbc.com/news/technology-40737060"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >BBC</NuxtLink>,
        <NuxtLink
          to="https://www.forbes.com/sites/daveywinder/2024/02/15/new-google-security-includes-gmail-magic-protection--ai-cyber-defense-initiative/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >Forbes</NuxtLink>,
        <NuxtLink
          to="https://www.wired.com/story/gmail-catching-more-malicious-attachments-deep-learning/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >Wired</NuxtLink>,
        <NuxtLink
          to="https://www.cnet.com/tech/services-and-software/new-google-messages-safety-features-blur-nudity-warn-about-scams/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >CNET</NuxtLink>,
        <NuxtLink
          to="https://www.theverge.com/2017/2/23/14712118/google-sha1-collision-broken-web-encryption-shattered"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >The Verge</NuxtLink>, and tech news sites like
        <NuxtLink
          to="https://arstechnica.com/information-technology/2017/02/watershed-sha1-collision-just-broke-the-webkit-repository-others-may-follow/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >Ars Technica</NuxtLink>
        and
        <NuxtLink
          to="https://www.techrepublic.com/article/news-google-sec-gemini-v1/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >TechRepublic</NuxtLink>.
      </p>
      <p>
        I regularly speak at academic and industry conferences and serve on committees for venues such as USENIX Security. I hold a PhD in Computer Science from
        <NuxtLink
          to="https://www.ucsb.edu/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >UCSB</NuxtLink>, an EMBA from
        <NuxtLink
          to="https://quantic.edu/"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >Quantic School of Business</NuxtLink>, a Master in Robotics from the
        <NuxtLink
          to="https://www.unipi.it/index.php/english"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >University of Pisa</NuxtLink>, and an engineering degree from the
        <NuxtLink
          to="https://www.santannapisa.it/en"
          external
          class="text-primary font-medium border-b border-primary/35 hover:border-primary pb-[1px] transition-colors"
        >Sant'Anna School of Advanced Studies</NuxtLink>.
      </p>
    </div>

    <!-- Bottom Grid -->
    <div class="grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-6">
      <LazyFeaturedProjectsCard hydrate-on-visible />

      <LazyCardComponent title="Contacts" heading-tag="h2" :interactive="false">
        <ul class="space-y-1.5 mt-1">
          <li>
            <NuxtLink
              to="mailto:luca@lucainvernizzi.net"
              external
              class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-[9px] bg-surface-light border border-white/[0.08] hover:border-primary/45 text-text-primary transition-colors group"
            >
              <span class="inline-flex items-center gap-2.5 text-[14.5px] font-medium">
                <LazyUIcon hydrate-on-visible name="mdi:email-outline" class="w-4 h-4 text-primary shrink-0" />
                <span>Email</span>
              </span>
              <span class="font-mono text-xs text-text-secondary group-hover:text-primary transition-colors">luca@…</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://scholar.google.com/citations?hl=en&user=4CEVnEMAAAAJ"
              external
              class="flex items-center justify-between gap-3 px-3 py-2 rounded-[9px] border border-transparent hover:bg-surface-light/70 hover:border-white/[0.08] text-text-body hover:text-text-primary transition-colors group"
            >
              <span class="inline-flex items-center gap-2.5 text-[14.5px] font-medium">
                <LazyUIcon hydrate-on-visible name="mdi:school-outline" class="w-4 h-4 text-primary shrink-0" />
                <span>Google Scholar</span>
              </span>
              <span class="font-mono text-xs text-text-secondary tabular-nums group-hover:text-primary transition-colors">{{ academicPaperCount }} papers</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://research.google/people/104783/?&type=google"
              external
              class="flex items-center justify-between gap-3 px-3 py-2 rounded-[9px] border border-transparent hover:bg-surface-light/70 hover:border-white/[0.08] text-text-body hover:text-text-primary transition-colors group"
            >
              <span class="inline-flex items-center gap-2.5 text-[14.5px] font-medium">
                <LazyUIcon hydrate-on-visible name="mdi:google" class="w-4 h-4 text-primary shrink-0" />
                <span>Google Research</span>
              </span>
              <span class="font-mono text-xs text-text-secondary group-hover:text-primary transition-colors">Profile</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://github.com/invernizzi"
              external
              class="flex items-center justify-between gap-3 px-3 py-2 rounded-[9px] border border-transparent hover:bg-surface-light/70 hover:border-white/[0.08] text-text-body hover:text-text-primary transition-colors group"
            >
              <span class="inline-flex items-center gap-2.5 text-[14.5px] font-medium">
                <LazyUIcon hydrate-on-visible name="mdi:github" class="w-4 h-4 text-primary shrink-0" />
                <span>GitHub</span>
              </span>
              <span class="font-mono text-xs text-text-secondary group-hover:text-primary transition-colors">@invernizzi</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://www.linkedin.com/in/lucainvernizzi"
              external
              class="flex items-center justify-between gap-3 px-3 py-2 rounded-[9px] border border-transparent hover:bg-surface-light/70 hover:border-white/[0.08] text-text-body hover:text-text-primary transition-colors group"
            >
              <span class="inline-flex items-center gap-2.5 text-[14.5px] font-medium">
                <LazyUIcon hydrate-on-visible name="mdi:linkedin" class="w-4 h-4 text-primary shrink-0" />
                <span>LinkedIn</span>
              </span>
              <span class="font-mono text-xs text-text-secondary group-hover:text-primary transition-colors">/in/lucainvernizzi</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://twitter.com/invernizzi"
              external
              class="flex items-center justify-between gap-3 px-3 py-2 rounded-[9px] border border-transparent hover:bg-surface-light/70 hover:border-white/[0.08] text-text-body hover:text-text-primary transition-colors group"
            >
              <span class="inline-flex items-center gap-2.5 text-[14.5px] font-medium">
                <LazyUIcon hydrate-on-visible name="mdi:twitter" class="w-4 h-4 text-primary shrink-0" />
                <span>Twitter</span>
              </span>
              <span class="font-mono text-xs text-text-secondary group-hover:text-primary transition-colors">@invernizzi</span>
            </NuxtLink>
          </li>
        </ul>
      </LazyCardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
const publicationsStore = usePublicationsStore();

const academicPaperCount = computed(
  () => publicationsStore.recentPublications.filter((p) => !p.openSource).length,
);
</script>
