<template>
  <div class="max-w-[980px] mx-auto px-5 sm:px-7 pt-12 sm:pt-14 pb-16">
    <!-- Page Header -->
    <div class="flex flex-wrap items-end justify-between gap-4 pb-5 mb-7 border-b border-white/[0.09]">
      <h1 class="text-[38px] sm:text-[48px] font-display font-semibold leading-[1.04] tracking-[-0.032em] text-text-primary">
        Academic Service
      </h1>
      <span class="font-mono text-[13px] text-primary tabular-nums">
        {{ committeesStore.participations.length }} committees · {{ committeesStore.uniqueConferences.length }} venues
      </span>
    </div>

    <p class="text-text-body text-[15.5px] mb-9">
      I have been a member of the technical program committee of the following conferences:
    </p>

    <div class="space-y-8">
      <section
        v-for="yearGroup in committeesStore.participationsByYear"
        :key="yearGroup.year"
        class="grid grid-cols-1 md:grid-cols-[82px_1fr] gap-3 md:gap-6"
      >
        <h2 class="font-mono text-xl font-medium text-primary tabular-nums md:pt-4">
          {{ yearGroup.year }}
        </h2>

        <div class="space-y-3">
          <a
            v-for="participation in yearGroup.participations"
            :key="`${participation.conference}-${participation.year}`"
            :href="participation.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between gap-4 px-5 py-4 rounded-[12px] bg-surface/95 card-rim border border-white/[0.09] hover:border-primary/45 transition-colors group"
          >
            <div>
              <h3 class="font-display font-semibold text-[16.5px] leading-[1.32] tracking-[-0.015em] text-text-primary group-hover:text-primary transition-colors">
                {{ participation.conference }}
              </h3>
              <p class="mt-1 font-mono text-xs text-text-secondary">
                Program Committee
              </p>
            </div>

            <span
              class="w-[30px] h-[30px] rounded-[8px] bg-primary/[0.12] border border-primary/[0.38] text-primary inline-flex items-center justify-center shrink-0 text-sm group-hover:bg-primary group-hover:text-background transition-colors"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommitteesStore } from '~/stores/committees'

const committeesStore = useCommitteesStore()
</script>
