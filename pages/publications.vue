<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(1.875rem,1.5rem+1.2vw,2.375rem)] font-display font-medium tracking-[-0.025em] leading-[1.08] text-text-primary mb-6"
    >
      Publications
    </h1>

    <div
      class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/[0.08]"
    >
      <div class="flex items-center gap-3">
        <label for="category-filter" class="text-sm text-text-secondary">
          Category
        </label>
        <select
          id="category-filter"
          v-model="selectedCategory"
          class="px-3 py-1.5 text-sm bg-surface border border-white/[0.12] rounded-lg text-text-primary [color-scheme:dark] focus:outline-none focus:border-primary/70 transition-colors duration-150"
        >
          <option value="">All</option>
          <option
            v-for="category in publicationsStore.allCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <span class="font-mono text-xs text-text-muted tabular-nums">
          {{ academicCount }}
        </span>
      </div>

      <NuxtLink
        to="https://scholar.google.com/citations?user=4CEVnEMAAAAJ"
        external
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors duration-150"
      >
        <span>Google Scholar</span>
        <AppIcon name="arrow-up-right" size="sm" class="text-text-muted" />
      </NuxtLink>
    </div>

    <div class="space-y-10">
      <section
        v-for="yearGroup in academicPublications"
        :key="yearGroup.year"
        class="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-2 md:gap-8"
      >
        <h2
          class="font-mono text-sm font-normal text-text-muted tabular-nums md:pt-1"
        >
          {{ yearGroup.year }}
        </h2>

        <div class="divide-y divide-white/[0.06]">
          <article
            v-for="pub in yearGroup.publications"
            :id="slugify(pub.title)"
            :key="pub.title"
            class="py-5 first:pt-0 last:pb-0 scroll-mt-20 rounded-lg transition-[background-color,box-shadow] duration-200"
            :class="
              isHighlighted(pub.title)
                ? 'px-4 -mx-4 bg-surface ring-1 ring-primary/70'
                : ''
            "
          >
            <h3
              class="text-[17px] font-display font-medium leading-[1.35] text-text-primary max-w-[64ch] mb-1.5"
            >
              <a
                v-if="pub.link"
                :href="pub.link"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors duration-150"
              >
                <span>{{ pub.title }}</span>
                <AppIcon
                  name="arrow-up-right"
                  size="sm"
                  class="inline-block align-[-0.12em] ml-1 text-text-muted"
                />
              </a>
              <span v-else>{{ pub.title }}</span>
            </h3>

            <p
              v-if="pub.authors && pub.authors.length > 0"
              class="text-sm leading-[1.5] text-text-secondary max-w-[68ch] mb-2"
            >
              <HighlightAuthor :authors="pub.authors" />
            </p>

            <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
              <span v-if="pub.venue" class="text-text-secondary">
                {{ pub.venue }}
              </span>

              <span
                v-if="pub.citations"
                class="font-mono tabular-nums whitespace-nowrap"
                :class="pub.citations > 200 ? 'text-primary' : 'text-text-muted'"
              >
                {{ formatCitations(pub.citations) }}
              </span>

              <span
                v-if="pub.award"
                class="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/25"
              >
                {{ pub.award }}
              </span>

              <TagPill v-for="category in pub.categories" :key="category">
                {{ category }}
              </TagPill>
            </div>
          </article>
        </div>
      </section>
    </div>

    <section
      v-if="openSourcePublications.length > 0"
      aria-labelledby="open-source-heading"
      class="mt-16 pt-10 border-t border-white/[0.08]"
    >
      <div class="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h2
          id="open-source-heading"
          class="text-xl font-display font-medium tracking-[-0.015em] text-text-primary"
        >
          Open source
        </h2>
        <NuxtLink
          to="https://github.com/invernizzi"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors duration-150"
        >
          <span>GitHub</span>
          <AppIcon name="arrow-up-right" size="sm" class="text-text-muted" />
        </NuxtLink>
      </div>

      <div class="space-y-8">
        <div
          v-for="yearGroup in openSourcePublications"
          :key="`oss-${yearGroup.year}`"
          class="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-2 md:gap-8"
        >
          <div class="font-mono text-sm text-text-muted tabular-nums md:pt-1">
            {{ yearGroup.year }}
          </div>

          <div class="divide-y divide-white/[0.06]">
            <article
              v-for="pub in yearGroup.publications"
              :id="slugify(pub.title)"
              :key="pub.title"
              class="py-5 first:pt-0 last:pb-0 scroll-mt-20"
            >
              <h3
                class="text-[17px] font-display font-medium leading-[1.35] text-text-primary mb-1.5"
              >
                <a
                  v-if="pub.link"
                  :href="pub.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-primary transition-colors duration-150"
                >
                  <span>{{ pub.title }}</span>
                  <AppIcon
                    name="arrow-up-right"
                    size="sm"
                    class="inline-block align-[-0.12em] ml-1 text-text-muted"
                  />
                </a>
                <span v-else>{{ pub.title }}</span>
              </h3>

              <p
                v-if="pub.description"
                class="text-sm leading-[1.55] text-text-secondary max-w-[64ch] mb-2.5"
              >
                {{ pub.description }}
              </p>

              <div class="flex flex-wrap items-center gap-1.5">
                <TagPill v-for="category in pub.categories" :key="category">
                  {{ category }}
                </TagPill>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePublicationsStore, type PublicationCategory } from '~/stores/publications';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NuxtLink } from '#components';
import AppIcon from '~/components/AppIcon.vue';

const publicationsStore = usePublicationsStore();
const route = useRoute();
const highlightedPublication = ref<string | null>(null);
const selectedCategory = ref<string>('');

const slugify = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const isHighlighted = (title: string) =>
  highlightedPublication.value === slugify(title);

const formatCitations = (count: number): string => {
  const formatted = count.toLocaleString('en-US');
  return `${formatted} ${count === 1 ? 'citation' : 'citations'}`;
};

const allFilteredPublications = computed(() => {
  let publications = [...publicationsStore.recentPublications];

  if (selectedCategory.value) {
    publications = publications.filter((pub) =>
      pub.categories.includes(selectedCategory.value as PublicationCategory),
    );
  }

  return publications;
});

const academicPublications = computed(() => {
  const academicPubs = allFilteredPublications.value.filter(
    (pub) => pub.openSource === false,
  );

  const grouped = academicPubs.reduce(
    (acc, pub) => {
      const year = pub.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    },
    {} as Record<number, typeof academicPubs>,
  );

  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, pubs]) => ({
      year: Number(year),
      publications: pubs,
    }));
});

const academicCount = computed(() => {
  const count = academicPublications.value.reduce(
    (sum, group) => sum + group.publications.length,
    0,
  );
  return `${count} ${count === 1 ? 'paper' : 'papers'}`;
});

const openSourcePublications = computed(() => {
  const openSourcePubs = allFilteredPublications.value.filter(
    (pub) => pub.openSource === true,
  );

  const grouped = openSourcePubs.reduce(
    (acc, pub) => {
      const year = pub.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    },
    {} as Record<number, typeof openSourcePubs>,
  );

  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, pubs]) => ({
      year: Number(year),
      publications: pubs,
    }));
});

onMounted(() => {
  const hash = route.hash.slice(1);
  if (hash) {
    const element = document.getElementById(hash);
    if (element) {
      highlightedPublication.value = hash;
      element.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        highlightedPublication.value = null;
      }, 4000);
    }
  }
});
</script>
