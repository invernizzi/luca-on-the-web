<template>
  <div class="max-w-[980px] mx-auto px-5 sm:px-7 pt-12 sm:pt-14 pb-16">
    <!-- Page Header -->
    <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
      <h1 class="text-[38px] sm:text-[48px] font-display font-semibold leading-[1.04] tracking-[-0.032em] text-text-primary">
        Publications
      </h1>

      <NuxtLink
        to="https://scholar.google.com/citations?user=4CEVnEMAAAAJ"
        external
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-medium bg-primary/[0.12] text-primary border border-primary/[0.38] hover:bg-primary/[0.20] hover:border-primary/60 transition-colors"
      >
        <span>Google Scholar</span>
        <span aria-hidden="true">↗</span>
      </NuxtLink>
    </div>

    <!-- Filter Toolbar -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-[12px] bg-surface/95 card-rim border border-white/[0.09] mb-9"
    >
      <div
        role="group"
        aria-label="Filter publications by category"
        class="flex flex-wrap items-center gap-1.5"
      >
        <button
          type="button"
          :aria-pressed="selectedCategory === ''"
          class="px-3 py-[5px] rounded-[8px] text-[13px] transition-colors cursor-pointer"
          :class="
            selectedCategory === ''
              ? 'bg-primary text-[#111113] font-semibold'
              : 'text-text-secondary font-medium hover:text-text-primary hover:bg-white/[0.04]'
          "
          @click="selectedCategory = ''"
        >
          All ({{ totalPublicationCount }})
        </button>

        <button
          v-for="category in publicationsStore.allCategories"
          :key="category"
          type="button"
          :aria-pressed="selectedCategory === category"
          class="px-3 py-[5px] rounded-[8px] text-[13px] transition-colors cursor-pointer"
          :class="
            selectedCategory === category
              ? 'bg-primary text-[#111113] font-semibold'
              : 'text-text-secondary font-medium hover:text-text-primary hover:bg-white/[0.04]'
          "
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <span class="font-mono text-xs text-text-secondary tabular-nums">
        {{
          selectedCategory
            ? `Showing ${allFilteredPublications.length} of ${totalPublicationCount}`
            : 'Sorted newest first'
        }}
      </span>
    </div>

    <!-- Academic Publications grouped by year -->
    <div class="space-y-9">
      <section
        v-for="yearGroup in academicPublications"
        :key="yearGroup.year"
        class="grid grid-cols-1 md:grid-cols-[82px_1fr] gap-3 md:gap-6"
      >
        <h2 class="font-mono text-xl font-medium text-primary tabular-nums md:pt-5">
          {{ yearGroup.year }}
        </h2>

        <div class="grid grid-cols-1 gap-3.5">
          <CardComponent
            v-for="pub in yearGroup.publications"
            :id="pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
            :key="pub.title"
            class="scroll-mt-24"
            :title="pub.title"
            title-size="small"
            heading-tag="h3"
            :to="pub.link"
            :compact="true"
            :full-height="false"
            :interactive="Boolean(pub.link)"
            :accent="Boolean(pub.award) || isHighlighted(pub.title)"
          >
            <p class="text-sm text-text-body leading-[1.5] mb-3">
              <HighlightAuthor :authors="pub.authors || []" />
            </p>

            <div class="flex flex-wrap items-center gap-2.5 text-[13px]">
              <span
                v-if="pub.award"
                class="inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-xs font-semibold tracking-[-0.005em]"
                :class="
                  pub.award.toLowerCase().includes('award')
                    ? 'bg-primary text-[#111113]'
                    : 'bg-primary/[0.12] text-primary border border-primary/[0.38]'
                "
              >
                {{ pub.award }}
              </span>

              <span v-if="pub.venue" class="text-[#e4e4ea] font-medium">
                {{ pub.venue }}
              </span>

              <span
                v-if="pub.citations"
                class="font-mono text-xs px-2 py-0.5 rounded-[6px] whitespace-nowrap tabular-nums border"
                :class="
                  pub.citations > 200
                    ? 'text-primary bg-primary/[0.12] border-primary/[0.38] font-medium'
                    : 'text-text-body bg-surface-light border-white/[0.08]'
                "
              >
                {{ pub.citations.toLocaleString('en-US') }}
                {{ pub.citations === 1 ? 'citation' : 'citations' }}
              </span>

              <TagPill v-for="category in pub.categories" :key="category">
                {{ category }}
              </TagPill>

              <a
                v-if="pub.pdf"
                :href="pub.pdf"
                :download="pdfFilename(pub.pdf)"
                :aria-label="`Download PDF: ${pub.title}`"
                class="sm:ml-auto inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-[7px] font-mono text-xs font-medium bg-surface-light text-[#e4e4ea] border border-white/[0.12] hover:border-primary/60 hover:text-primary transition-colors [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)] shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3.5 h-3.5 opacity-80 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
                </svg>
                <span>PDF</span>
              </a>
            </div>
          </CardComponent>
        </div>
      </section>
    </div>

    <!-- Open Source Section -->
    <div v-if="openSourcePublications.length > 0" class="mt-16">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div class="flex items-center gap-3.5 flex-1 min-w-[200px]">
          <h2 class="text-[22px] font-display font-semibold tracking-[-0.02em] text-text-primary shrink-0">
            Open Source
          </h2>
          <div class="h-px flex-1 bg-white/[0.09]" aria-hidden="true" />
        </div>

        <NuxtLink
          to="https://github.com/invernizzi"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium bg-primary/[0.12] text-primary border border-primary/[0.38] hover:bg-primary/[0.20] hover:border-primary/60 transition-colors shrink-0"
        >
          <span>GitHub Profile</span>
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>

      <p class="text-text-secondary text-[15px] mb-8">
        Selected open-source packages and libraries I contributed to.
      </p>

      <div class="space-y-9">
        <div
          v-for="yearGroup in openSourcePublications"
          :key="yearGroup.year"
          class="grid grid-cols-1 md:grid-cols-[82px_1fr] gap-3 md:gap-6"
        >
          <div class="font-mono text-xl font-medium text-primary tabular-nums md:pt-5">
            {{ yearGroup.year }}
          </div>

          <div class="grid grid-cols-1 gap-3.5">
            <CardComponent
              v-for="pub in yearGroup.publications"
              :id="pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
              :key="pub.title"
              class="scroll-mt-24"
              :title="pub.title"
              title-size="small"
              heading-tag="h3"
              :to="pub.link"
              :compact="true"
              :full-height="false"
              :interactive="Boolean(pub.link)"
              :accent="isHighlighted(pub.title)"
            >
              <p v-if="pub.authors && pub.authors.length > 0" class="text-sm text-text-body mb-2">
                <HighlightAuthor :authors="pub.authors" />
              </p>
              <p v-if="pub.description" class="text-sm text-text-body leading-[1.55] mb-3">
                {{ pub.description }}
              </p>
              <div class="flex flex-wrap items-center gap-2.5 text-[13px]">
                <span v-if="pub.venue" class="font-mono text-xs text-text-secondary">
                  {{ pub.venue }}
                </span>
                <span
                  v-if="statsForRepo(pub.link)"
                  :title="`${statsForRepo(pub.link)?.starsFormatted} GitHub stars · ${statsForRepo(pub.link)?.forksFormatted} forks`"
                  class="font-mono text-xs px-2 py-0.5 rounded-[6px] whitespace-nowrap tabular-nums border text-primary bg-primary/[0.12] border-primary/[0.38] font-medium"
                >
                  ★ {{ statsForRepo(pub.link)?.starsFormatted }} stars
                </span>
                <span
                  v-if="pub.citations"
                  class="font-mono text-xs px-2 py-0.5 rounded-[6px] whitespace-nowrap tabular-nums border"
                  :class="
                    pub.citations > 200
                      ? 'text-primary bg-primary/[0.12] border-primary/[0.38] font-medium'
                      : 'text-text-body bg-surface-light border-white/[0.08]'
                  "
                >
                  {{ pub.citations.toLocaleString('en-US') }}
                  {{ pub.citations === 1 ? 'citation' : 'citations' }}
                </span>
                <TagPill v-for="category in pub.categories" :key="category">
                  {{ category }}
                </TagPill>
              </div>
            </CardComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePublicationsStore } from '~/stores/publications'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PublicationCategory } from '~/stores/publications'
import { NuxtLink } from '#components'

const publicationsStore = usePublicationsStore()
const { statsForRepo } = useGithubStats()
const route = useRoute()
const highlightedPublication = ref<string | null>(null)
const selectedCategory = ref<string>('')

const totalPublicationCount = computed(
  () => publicationsStore.recentPublications.length,
)

const isHighlighted = (title: string) => {
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return highlightedPublication.value === normalizedTitle
}

const pdfFilename = (pdfPath: string): string =>
  pdfPath.split('/').pop() || 'paper.pdf'

const allFilteredPublications = computed(() => {
  let publications = [...publicationsStore.recentPublications]

  if (selectedCategory.value) {
    publications = publications.filter((pub) =>
      pub.categories.includes(selectedCategory.value as PublicationCategory),
    )
  }

  return publications
})

const academicPublications = computed(() => {
  const academicPubs = allFilteredPublications.value.filter(
    (pub) => pub.openSource === false,
  )

  const grouped = academicPubs.reduce((acc, pub) => {
    const year = pub.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(pub)
    return acc
  }, {} as Record<number, typeof academicPubs>)

  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, pubs]) => ({
      year: Number(year),
      publications: pubs,
    }))
})

const openSourcePublications = computed(() => {
  const openSourcePubs = allFilteredPublications.value.filter(
    (pub) => pub.openSource === true,
  )

  const grouped = openSourcePubs.reduce((acc, pub) => {
    const year = pub.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(pub)
    return acc
  }, {} as Record<number, typeof openSourcePubs>)

  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, pubs]) => ({
      year: Number(year),
      publications: pubs,
    }))
})

onMounted(() => {
  const hash = route.hash.slice(1)
  if (hash) {
    const element = document.getElementById(hash)
    if (element) {
      highlightedPublication.value = hash
      element.scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        highlightedPublication.value = null
      }, 5000)
    }
  }
})
</script>
