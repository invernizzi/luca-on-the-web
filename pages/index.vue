<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <header class="flex items-center gap-5 sm:gap-6 mb-10">
      <div
        class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-white/[0.14] shrink-0"
      >
        <LazyNuxtPicture
          hydrate-on-visible
          width="400"
          height="400"
          src="/images/face.webp"
          alt="Luca Invernizzi"
          format="webp"
          sizes="96px"
          densities="x1 x2"
          placeholder
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1
          class="text-[clamp(1.875rem,1.5rem+1.2vw,2.375rem)] font-display font-medium tracking-[-0.025em] leading-[1.08] text-text-primary mb-2"
        >
          Luca Invernizzi
        </h1>
        <p class="text-[15px] leading-[1.4] text-text-secondary">
          Senior Staff Research Scientist Manager
          <span class="text-text-muted mx-1.5" aria-hidden="true">·</span>
          Google Switzerland
        </p>
      </div>
    </header>

    <section aria-label="Biography" class="max-w-[63ch] space-y-4 mb-12 text-base leading-[1.62] text-text-secondary">
      <p>
        I lead research in Google’s
        <NuxtLink
          to="https://research.google/teams/security-privacy-and-abuse/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >Security Research Group</NuxtLink
        >, working to protect people online through advances in cybersecurity, AI, and hardware security.
      </p>
      <p>
        My research has been featured by
        <NuxtLink
          to="https://www.bbc.com/news/technology-40737060"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >BBC</NuxtLink
        >,
        <NuxtLink
          to="https://www.forbes.com/sites/daveywinder/2024/02/15/new-google-security-includes-gmail-magic-protection--ai-cyber-defense-initiative/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >Forbes</NuxtLink
        >,
        <NuxtLink
          to="https://www.wired.com/story/gmail-catching-more-malicious-attachments-deep-learning/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >Wired</NuxtLink
        >,
        <NuxtLink
          to="https://www.cnet.com/tech/services-and-software/new-google-messages-safety-features-blur-nudity-warn-about-scams/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >CNET</NuxtLink
        >,
        <NuxtLink
          to="https://www.theverge.com/2017/2/23/14712118/google-sha1-collision-broken-web-encryption-shattered"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >The Verge</NuxtLink
        >,
        <NuxtLink
          to="https://arstechnica.com/information-technology/2017/02/watershed-sha1-collision-just-broke-the-webkit-repository-others-may-follow/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >Ars Technica</NuxtLink
        >, and
        <NuxtLink
          to="https://www.techrepublic.com/article/news-google-sec-gemini-v1/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >TechRepublic</NuxtLink
        >.
      </p>
      <p>
        I regularly speak at academic and industry conferences and serve on program committees including USENIX Security. I hold a PhD in Computer Science from
        <NuxtLink
          to="https://www.ucsb.edu/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >UCSB</NuxtLink
        >, an EMBA from
        <NuxtLink
          to="https://quantic.edu/"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >Quantic School of Business</NuxtLink
        >, a Master in Robotics from the
        <NuxtLink
          to="https://www.unipi.it/index.php/english"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >University of Pisa</NuxtLink
        >, and an engineering degree from the
        <NuxtLink
          to="https://www.santannapisa.it/en"
          external
          class="text-text-primary underline decoration-white/25 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors duration-150"
          >Sant’Anna School of Advanced Studies</NuxtLink
        >.
      </p>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-5">
      <LazyFeaturedProjectsCard hydrate-on-visible />

      <LazyCardComponent title="Contacts" heading-tag="h2" :interactive="false">
        <ul class="space-y-2.5 text-sm text-text-secondary">
          <li v-for="contact in contacts" :key="contact.label">
            <NuxtLink
              :to="contact.to"
              external
              class="inline-flex items-center gap-2.5 hover:text-text-primary transition-colors duration-150 group"
            >
              <AppIcon
                :name="contact.icon"
                class="text-text-muted group-hover:text-primary transition-colors duration-150"
              />
              <span>{{ contact.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </LazyCardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconName } from '~/components/AppIcon.vue';

const contacts: Array<{ label: string; to: string; icon: IconName }> = [
  {
    label: 'Email',
    to: 'mailto:luca@lucainvernizzi.net',
    icon: 'mail',
  },
  {
    label: 'Google Scholar',
    to: 'https://scholar.google.com/citations?hl=en&user=4CEVnEMAAAAJ',
    icon: 'scholar',
  },
  {
    label: 'Google Research',
    to: 'https://research.google/people/104783/?&type=google',
    icon: 'google',
  },
  {
    label: 'GitHub',
    to: 'https://github.com/invernizzi',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    to: 'https://www.linkedin.com/in/lucainvernizzi',
    icon: 'linkedin',
  },
  {
    label: 'Twitter',
    to: 'https://twitter.com/invernizzi',
    icon: 'twitter',
  },
];
</script>
