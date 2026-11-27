<template>
  <div class="max-w-[980px] mx-auto px-5 sm:px-7 pt-12 sm:pt-14 pb-16">
    <!-- Page Header -->
    <div class="flex flex-wrap items-end justify-between gap-4 pb-5 mb-10 border-b border-white/[0.09]">
      <h1 class="text-[38px] sm:text-[48px] font-display font-semibold leading-[1.04] tracking-[-0.032em] text-text-primary">
        Curriculum Vitae
      </h1>
      <span class="font-mono text-[13px] text-primary">
        Zurich, Switzerland
      </span>
    </div>

    <!-- Professional Experience -->
    <section class="mb-14">
      <div class="flex items-center gap-3.5 mb-6">
        <h2 class="text-[20px] font-display font-semibold text-text-primary shrink-0">
          Professional Experience
        </h2>
        <div class="h-px flex-1 bg-white/[0.09]" aria-hidden="true" />
      </div>

      <div class="cv-timeline">
        <article
          v-for="(item, index) in cvStore.professionalExperience"
          :key="`exp-${index}`"
          class="cv-item bg-surface/95 card-rim rounded-[14px] border border-white/[0.09] p-6 sm:p-[26px]"
          :class="{ 'card-accent': index === 0 }"
        >
          <span
            class="cv-dot"
            :class="{ 'cv-dot-muted': index > 0 }"
            aria-hidden="true"
          />

          <div class="flex flex-wrap items-baseline justify-between gap-2.5 mb-1.5">
            <h3 class="text-[19px] font-display font-semibold text-text-primary tracking-[-0.015em]">
              {{ item.title }}
            </h3>
            <span class="font-mono text-[12.5px] font-medium text-primary bg-primary/[0.12] border border-primary/[0.38] px-[9px] py-[2px] rounded-[6px] tabular-nums shrink-0">
              {{ item.period }}
            </span>
          </div>

          <div class="text-[14.5px] font-semibold text-text-body mb-3">
            {{ item.organization }}
          </div>

          <p
            v-if="item.description"
            class="text-[14.5px] text-text-body leading-[1.6] max-w-[68ch]"
            :class="item.highlights?.length || item.links?.length ? 'mb-3.5' : ''"
          >
            {{ item.description }}
          </p>

          <ul
            v-if="item.highlights && item.highlights.length > 0"
            class="list-disc pl-5 text-text-body text-sm leading-[1.55] space-y-1.5"
            :class="item.links?.length ? 'mb-4' : ''"
          >
            <li v-for="(highlight, hIndex) in item.highlights" :key="hIndex">
              {{ highlight }}
            </li>
          </ul>

          <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2">
            <LinkPill
              v-for="link in item.links"
              :key="`${link.name}-${link.url}`"
              :link="link"
              :variant="index === 0 && link.url.startsWith('/projects') ? 'primary' : 'default'"
              :show-external-arrow="!link.url.startsWith('/')"
            />
          </div>
        </article>
      </div>
    </section>

    <!-- Education -->
    <section class="mb-14">
      <div class="flex items-center gap-3.5 mb-6">
        <h2 class="text-[20px] font-display font-semibold text-text-primary shrink-0">
          Education
        </h2>
        <div class="h-px flex-1 bg-white/[0.09]" aria-hidden="true" />
      </div>

      <div class="cv-timeline">
        <article
          v-for="(item, index) in cvStore.education"
          :key="`edu-${index}`"
          class="cv-item bg-surface/95 card-rim rounded-[14px] border border-white/[0.09] p-6 sm:p-[26px]"
        >
          <span class="cv-dot cv-dot-muted" aria-hidden="true" />

          <div class="flex flex-wrap items-baseline justify-between gap-2.5 mb-1.5">
            <h3 class="text-[19px] font-display font-semibold text-text-primary tracking-[-0.015em]">
              {{ item.title }}
            </h3>
            <span class="font-mono text-[12.5px] font-medium text-primary bg-primary/[0.12] border border-primary/[0.38] px-[9px] py-[2px] rounded-[6px] tabular-nums shrink-0">
              {{ item.period }}
            </span>
          </div>

          <div class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[14.5px] font-semibold text-text-body mb-2.5">
            <span>{{ item.organization }}</span>
            <span v-if="item.gpa" class="font-mono text-xs font-normal text-text-secondary tabular-nums">
              · GPA {{ item.gpa.trim() }}
            </span>
          </div>

          <p
            v-if="item.description"
            class="text-[14.5px] text-text-body leading-[1.6] max-w-[68ch]"
            :class="item.highlights?.length || item.links?.length ? 'mb-3.5' : ''"
          >
            {{ item.description }}
          </p>

          <ul
            v-if="item.highlights && item.highlights.length > 0"
            class="list-disc pl-5 text-text-body text-sm leading-[1.55] space-y-1.5"
            :class="item.links?.length ? 'mb-4' : ''"
          >
            <li v-for="(highlight, hIndex) in item.highlights" :key="hIndex">
              {{ highlight }}
            </li>
          </ul>

          <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2">
            <LinkPill
              v-for="link in item.links"
              :key="`${link.name}-${link.url}`"
              :link="link"
              :show-external-arrow="!link.url.startsWith('/')"
            />
          </div>
        </article>
      </div>
    </section>

    <!-- Open Source Contributions -->
    <section class="mb-14">
      <div class="flex items-center gap-3.5 mb-6">
        <h2 class="text-[20px] font-display font-semibold text-text-primary shrink-0">
          Open Source Contributions
        </h2>
        <div class="h-px flex-1 bg-white/[0.09]" aria-hidden="true" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <article
          v-for="(item, index) in cvStore.openSourceContributions"
          :key="`oss-${index}`"
          class="bg-surface/95 card-rim rounded-[14px] border border-white/[0.09] p-6 sm:p-[26px] flex flex-col"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-2.5 mb-1.5">
            <h3 class="text-[18px] font-display font-semibold text-text-primary tracking-[-0.015em]">
              {{ item.title }}
            </h3>
            <span class="font-mono text-[12px] font-medium text-primary bg-primary/[0.12] border border-primary/[0.38] px-2 py-[2px] rounded-[6px] tabular-nums shrink-0">
              {{ item.period }}
            </span>
          </div>

          <div class="text-sm font-semibold text-text-body mb-3">
            {{ item.organization }}
          </div>

          <p
            v-if="item.description"
            class="text-[14.5px] text-text-body leading-[1.6]"
            :class="item.links?.length ? 'mb-4' : ''"
          >
            {{ item.description }}
          </p>

          <div v-if="item.links && item.links.length > 0" class="mt-auto flex flex-wrap items-center gap-2">
            <LinkPill
              v-for="link in item.links"
              :key="`${link.name}-${link.url}`"
              :link="link"
              :show-external-arrow="!link.url.startsWith('/')"
            />
            <span
              v-if="itemGithubStats(item)"
              :title="`${itemGithubStats(item)?.starsFormatted} GitHub stars · ${itemGithubStats(item)?.forksFormatted} forks`"
              class="font-mono text-xs px-2 py-[3px] rounded-[6px] whitespace-nowrap tabular-nums border text-primary bg-primary/[0.12] border-primary/[0.38] font-medium"
            >
              ★ {{ itemGithubStats(item)?.starsFormatted }} stars
            </span>
          </div>
        </article>
      </div>
    </section>

    <!-- Competitions -->
    <section>
      <div class="flex items-center gap-3.5 mb-6">
        <h2 class="text-[20px] font-display font-semibold text-text-primary shrink-0">
          Competitions
        </h2>
        <div class="h-px flex-1 bg-white/[0.09]" aria-hidden="true" />
      </div>

      <div class="cv-timeline">
        <article
          v-for="(item, index) in cvStore.competitions"
          :key="`comp-${index}`"
          class="cv-item bg-surface/95 card-rim rounded-[14px] border border-white/[0.09] p-6 sm:p-[26px]"
        >
          <span class="cv-dot cv-dot-muted" aria-hidden="true" />

          <div class="flex flex-wrap items-baseline justify-between gap-2.5 mb-1.5">
            <h3 class="text-[19px] font-display font-semibold text-text-primary tracking-[-0.015em]">
              {{ item.title }}
            </h3>
            <span class="font-mono text-[12.5px] font-medium text-primary bg-primary/[0.12] border border-primary/[0.38] px-[9px] py-[2px] rounded-[6px] tabular-nums shrink-0">
              {{ item.period }}
            </span>
          </div>

          <div class="text-[14.5px] font-semibold text-text-body mb-3">
            {{ item.organization }}
          </div>

          <p
            v-if="item.description"
            class="text-[14.5px] text-text-body leading-[1.6] max-w-[68ch]"
            :class="item.links?.length ? 'mb-4' : ''"
          >
            {{ item.description }}
          </p>

          <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2">
            <LinkPill
              v-for="link in item.links"
              :key="`${link.name}-${link.url}`"
              :link="link"
              :show-external-arrow="!link.url.startsWith('/')"
            />
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCVStore, type TimelineItem } from '@/stores/cv'

const cvStore = useCVStore()
const { statsForRepo } = useGithubStats()

const itemGithubStats = (item: TimelineItem) => {
  const gh = item.links?.find((l) => l.type === 'github')
  return gh ? statsForRepo(gh.url) : null
}
</script>

<style scoped>
.cv-timeline {
  position: relative;
  padding-left: 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cv-timeline::before {
  content: '';
  position: absolute;
  left: 9px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(180deg, var(--ui-primary) 0%, rgba(255, 157, 2, 0.25) 100%);
}

.cv-item {
  position: relative;
}

.cv-dot {
  position: absolute;
  left: -32px;
  top: 28px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: var(--ui-primary);
  border: 3px solid var(--color-background);
  box-shadow: 0 0 0 1px rgba(255, 157, 2, 0.5);
}

.cv-dot-muted {
  background: var(--color-surface-elevated);
  border-color: var(--color-background);
  box-shadow: 0 0 0 2px var(--ui-primary);
}
</style>
