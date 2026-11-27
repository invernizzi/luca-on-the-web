<template>
  <CardComponent title="Featured Projects" heading-tag="h2" :interactive="false">
    <template #header-right>
      <NuxtLink
        to="/projects"
        class="font-mono text-xs text-primary hover:underline underline-offset-4 transition-colors"
      >
        All {{ projects.length }} projects ↗
      </NuxtLink>
    </template>

    <div class="space-y-3 mt-1.5">
      <NuxtLink
        v-for="(project, index) in featuredProjects"
        :key="project.id"
        :to="{ path: '/projects', hash: `#${project.id}` }"
        class="flex items-start justify-between gap-4 px-[18px] py-4 rounded-[10px] border transition-colors group/project"
        :class="
          index === 0
            ? 'featured-top border-primary/[0.28] hover:border-primary/55'
            : 'bg-surface-light border-white/[0.07] hover:border-primary/40'
        "
      >
        <div>
          <div
            class="text-[18px] font-display font-semibold text-text-primary tracking-[-0.015em] mb-1 group-hover/project:text-primary transition-colors"
          >
            {{ project.title }}
          </div>
          <p class="text-sm text-text-body leading-[1.45]">
            {{ project.blurb }}
          </p>
          <div class="mt-2 font-mono text-[11.5px] text-primary tabular-nums">
            <template v-if="project.id === ProjectId.MAGIKA && magikaStats">
              ★ {{ magikaStats.starsFormatted }} GitHub stars · {{ project.tags.join(' · ') }}
            </template>
            <template v-else>
              {{ project.tags.join(' · ') }}
            </template>
          </div>
        </div>
        <span
          class="w-[30px] h-[30px] rounded-[8px] bg-primary/[0.12] border border-primary/[0.38] text-primary inline-flex items-center justify-center shrink-0 mt-0.5 text-sm group-hover/project:bg-primary group-hover/project:text-background transition-colors"
          aria-hidden="true"
        >
          ↗
        </span>
      </NuxtLink>
    </div>
  </CardComponent>
</template>

<script setup lang="ts">
import { ProjectId } from "~/stores/projects";

const { projects } = storeToRefs(useProjectsStore());
const { statsForRepo } = useGithubStats();
const magikaStats = computed(() => statsForRepo("google/magika"));

const featuredProjects = computed(() => {
  return projects.value.filter((p) => p.featured);
});
</script>

<style scoped>
.featured-top {
  background:
    linear-gradient(
      180deg,
      rgba(255, 157, 2, 0.06) 0%,
      rgba(255, 157, 2, 0) 100%
    ),
    var(--color-surface-light);
}
</style>
