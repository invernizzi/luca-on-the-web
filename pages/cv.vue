<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(1.875rem,1.5rem+1.2vw,2.375rem)] font-display font-medium tracking-[-0.025em] leading-[1.08] text-text-primary mb-12"
    >
      Curriculum Vitae
    </h1>

    <section
      v-for="(section, sIndex) in sections"
      :key="section.id"
      :aria-labelledby="`cv-${section.id}`"
      class="border-t border-white/[0.08] pt-8"
      :class="sIndex > 0 ? 'mt-12' : ''"
    >
      <h2
        :id="`cv-${section.id}`"
        class="text-xl font-display font-medium tracking-[-0.015em] text-text-primary mb-8"
      >
        {{ section.title }}
      </h2>

      <div class="divide-y divide-white/[0.06]">
        <article
          v-for="(item, index) in section.items"
          :key="`${section.id}-${index}`"
          class="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[164px_1fr] gap-2 md:gap-8"
        >
          <div class="font-mono text-xs sm:text-[13px] text-text-muted tabular-nums md:pt-1">
            {{ item.period }}
          </div>

          <div class="max-w-[62ch]">
            <h3 class="text-[17px] font-display font-medium leading-[1.3] text-text-primary">
              {{ item.title }}
            </h3>

            <div class="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm">
              <span class="text-text-secondary font-medium">
                {{ item.organization }}
              </span>
              <template v-if="item.gpa">
                <span class="text-text-muted" aria-hidden="true">·</span>
                <span class="font-mono text-xs text-text-muted tabular-nums">
                  GPA {{ item.gpa.trim() }}
                </span>
              </template>
            </div>

            <p
              v-if="item.description"
              class="mt-3 text-sm leading-[1.6] text-text-secondary"
            >
              {{ item.description }}
            </p>

            <ul
              v-if="item.highlights && item.highlights.length > 0"
              class="mt-3 list-disc list-outside pl-5 space-y-1.5 text-sm leading-[1.55] text-text-secondary"
            >
              <li v-for="(highlight, hIndex) in item.highlights" :key="hIndex">
                {{ highlight }}
              </li>
            </ul>

            <div
              v-if="item.links && item.links.length > 0"
              class="mt-4 flex flex-wrap gap-2"
            >
              <LinkPill
                v-for="link in item.links"
                :key="`${item.title}-${link.url}`"
                :link="link"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCVStore } from '@/stores/cv';
import LinkPill from '@/components/LinkPill.vue';

const cvStore = useCVStore();

const sections = computed(() => [
  {
    id: 'experience',
    title: 'Professional experience',
    items: cvStore.professionalExperience,
  },
  {
    id: 'education',
    title: 'Education',
    items: cvStore.education,
  },
  {
    id: 'open-source',
    title: 'Open source contributions',
    items: cvStore.openSourceContributions,
  },
  {
    id: 'competitions',
    title: 'Competitions',
    items: cvStore.competitions,
  },
]);
</script>
