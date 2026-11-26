<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(1.875rem,1.5rem+1.2vw,2.375rem)] font-display font-medium tracking-[-0.025em] leading-[1.08] text-text-primary mb-2"
    >
      Academic Service
    </h1>
    <p class="text-sm text-text-secondary mb-10">
      Technical program committees
    </p>

    <div class="border-t border-white/[0.08] divide-y divide-white/[0.06]">
      <section
        v-for="yearGroup in committeesStore.participationsByYear"
        :key="yearGroup.year"
        class="py-5 grid grid-cols-1 md:grid-cols-[88px_1fr] gap-2 md:gap-8"
      >
        <h2 class="font-mono text-sm font-normal text-text-muted tabular-nums md:pt-0.5">
          {{ yearGroup.year }}
        </h2>

        <ul class="space-y-2.5">
          <li
            v-for="participation in yearGroup.participations"
            :key="`${participation.conference}-${participation.year}`"
          >
            <a
              :href="participation.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group text-[15px] leading-[1.45] text-text-primary hover:text-primary transition-colors duration-150"
            >
              <span>{{ participation.conference }}</span>
              <AppIcon
                name="arrow-up-right"
                size="sm"
                class="inline-block align-[-0.12em] ml-1 text-text-muted group-hover:text-primary transition-colors duration-150"
              />
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommitteesStore } from '~/stores/committees';
import AppIcon from '~/components/AppIcon.vue';

const committeesStore = useCommitteesStore();
</script>
