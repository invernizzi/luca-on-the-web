<template>
  <div class="max-w-[980px] mx-auto px-5 sm:px-7 pt-12 sm:pt-14 pb-16">
    <!-- Page Header -->
    <div class="flex flex-wrap items-end justify-between gap-4 pb-5 mb-7 border-b border-white/[0.09]">
      <h1 class="text-[38px] sm:text-[48px] font-display font-semibold leading-[1.04] tracking-[-0.032em] text-text-primary">
        Projects
      </h1>
      <span class="font-mono text-[13px] text-primary tabular-nums">
        {{ activeProjects.length }} active · {{ archivedProjects.length }} archived
      </span>
    </div>

    <!-- Active Projects Section -->
    <h2 class="sr-only">Active Projects</h2>
    <p class="text-text-body text-[15px] mb-7">
      These are some of the projects my team and I have been working on.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[22px] mb-16 [&>*]:h-full">
      <CardComponent
        v-for="project in activeProjects"
        :id="project.id"
        :key="project.id"
        class="scroll-mt-24"
        :title="project.title"
        heading-tag="h3"
        :accent="isHighlighted(project.id)"
      >
        <template v-if="project.award" #header-right>
          <span
            class="inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-xs font-semibold bg-primary text-[#111113] tracking-[-0.005em] shrink-0"
          >
            {{ project.award }}
          </span>
        </template>

        <p class="text-[14.5px] text-text-body leading-[1.6] mb-[18px]">
          {{ project.description }}
        </p>

        <div
          v-if="projectActionLinks(project).length > 0 || projectPapers(project.id).length > 0"
          class="flex flex-wrap gap-2 mb-3.5"
        >
          <LinkPill
            v-for="item in projectActionLinks(project)"
            :key="`${item.link.name}-${item.link.url}`"
            :link="item.link"
            :variant="item.primary ? 'primary' : 'default'"
            :show-icon="item.primary"
            :show-external-arrow="item.primary"
          />
          <a
            v-for="pub in projectPapers(project.id)"
            :key="pub.title"
            :href="
              '/publications#' +
              pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            "
            :title="pub.title"
            class="inline-flex items-center gap-1.5 px-[11px] py-[5px] text-[12.5px] font-medium rounded-[8px] bg-surface-light text-[#e4e4ea] border border-white/[0.11] hover:border-white/25 hover:text-text-primary transition-colors [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]"
            @click="handlePublicationClick"
          >
            {{ paperLabel(pub) }}
          </a>
        </div>

        <p
          v-if="projectPressLinks(project).length > 0"
          class="text-[12.5px] text-text-secondary mb-[18px] leading-relaxed"
        >
          Press:
          <template v-for="(press, pIdx) in projectPressLinks(project)" :key="press.url">
            <a
              :href="press.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#d4d4dc] hover:text-primary border-b border-white/[0.18] hover:border-primary/60 transition-colors"
            >{{ press.name }}</a><span v-if="pIdx < projectPressLinks(project).length - 1">, </span>
          </template>
        </p>

        <div class="mt-auto pt-3.5 border-t border-white/[0.06] flex flex-wrap gap-1.5">
          <TagPill v-for="tag in project.tags" :key="tag">
            {{ tag }}
          </TagPill>
        </div>
      </CardComponent>
    </div>

    <!-- Archived Projects Section -->
    <div class="flex items-center gap-3.5 mb-3">
      <h2 class="text-[22px] font-display font-semibold tracking-[-0.02em] text-text-primary shrink-0">
        Archived Projects
      </h2>
      <div class="h-px flex-1 bg-white/[0.09]" aria-hidden="true" />
      <span class="font-mono text-xs text-text-secondary tabular-nums shrink-0">
        {{ archivedProjects.length }} archived
      </span>
    </div>
    <p class="text-text-secondary text-[15px] mb-7">Older fun projects.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-[22px] [&>*]:h-full">
      <CardComponent
        v-for="project in archivedProjects"
        :id="project.id"
        :key="project.id"
        class="scroll-mt-24"
        :title="project.title"
        heading-tag="h3"
        :accent="isHighlighted(project.id)"
      >
        <template v-if="project.award" #header-right>
          <span
            class="inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-xs font-semibold bg-primary text-[#111113] tracking-[-0.005em] shrink-0"
          >
            {{ project.award }}
          </span>
        </template>

        <p class="text-[14.5px] text-text-body leading-[1.6] mb-[18px]">
          {{ project.description }}
        </p>

        <div
          v-if="projectActionLinks(project).length > 0 || projectPapers(project.id).length > 0"
          class="flex flex-wrap gap-2 mb-3.5"
        >
          <LinkPill
            v-for="item in projectActionLinks(project)"
            :key="`${item.link.name}-${item.link.url}`"
            :link="item.link"
            :variant="item.primary ? 'primary' : 'default'"
            :show-icon="item.primary"
            :show-external-arrow="item.primary"
          />
          <a
            v-for="pub in projectPapers(project.id)"
            :key="pub.title"
            :href="
              '/publications#' +
              pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            "
            :title="pub.title"
            class="inline-flex items-center gap-1.5 px-[11px] py-[5px] text-[12.5px] font-medium rounded-[8px] bg-surface-light text-[#e4e4ea] border border-white/[0.11] hover:border-white/25 hover:text-text-primary transition-colors [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]"
            @click="handlePublicationClick"
          >
            {{ paperLabel(pub) }}
          </a>
        </div>

        <p
          v-if="projectPressLinks(project).length > 0"
          class="text-[12.5px] text-text-secondary mb-[18px] leading-relaxed"
        >
          Press:
          <template v-for="(press, pIdx) in projectPressLinks(project)" :key="press.url">
            <a
              :href="press.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#d4d4dc] hover:text-primary border-b border-white/[0.18] hover:border-primary/60 transition-colors"
            >{{ press.name }}</a><span v-if="pIdx < projectPressLinks(project).length - 1">, </span>
          </template>
        </p>

        <div class="mt-auto pt-3.5 border-t border-white/[0.06] flex flex-wrap gap-1.5">
          <TagPill v-for="tag in project.tags" :key="tag">
            {{ tag }}
          </TagPill>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from "~/stores/projects";
import type { OnlineItem, Project, ProjectId } from "~/stores/projects";
import { usePublicationsStore } from "~/stores/publications";
import type { Publication } from "~/stores/publications";
import CardComponent from "~/components/CardComponent.vue";
import LinkPill from "~/components/LinkPill.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";

const projectsStore = useProjectsStore();
const publicationsStore = usePublicationsStore();
const router = useRouter();
const route = useRoute();
const highlightedProject = ref<ProjectId | null>(null);

const activeProjects = computed(() =>
  projectsStore.projects.filter((project) => !project.archived),
);

const archivedProjects = computed(() =>
  projectsStore.projects.filter((project) => project.archived),
);

const isHighlighted = (id: ProjectId) => highlightedProject.value === id;

/**
 * Separates press coverage (`type === 'news'`) from primary/secondary project links
 * and promotes a single canonical CTA (`website`, else `github`, else first `blog`).
 */
const projectActionLinks = (
  project: Project,
): Array<{ link: OnlineItem; primary: boolean }> => {
  const nonNews = (project.urls ?? []).filter((u) => u.type !== "news");
  if (nonNews.length === 0) return [];

  const primaryIndex = (() => {
    const webIdx = nonNews.findIndex((u) => u.type === "website");
    if (webIdx !== -1) return webIdx;
    const ghIdx = nonNews.findIndex((u) => u.type === "github");
    if (ghIdx !== -1) return ghIdx;
    return 0;
  })();

  const primary = nonNews[primaryIndex];
  const rest = nonNews.filter((_, idx) => idx !== primaryIndex);

  return [
    ...(primary ? [{ link: primary, primary: true }] : []),
    ...rest.map((link) => ({ link, primary: false })),
  ];
};

const projectPressLinks = (project: Project): OnlineItem[] =>
  (project.urls ?? []).filter((u) => u.type === "news");

const projectPapers = (projectId: ProjectId) =>
  publicationsStore.recentPublications.filter(
    (p: Publication) => p.projectId === projectId,
  );

const shortVenueName = (venue?: string): string => {
  if (!venue) return "Paper";
  const paren = venue.match(/\(([^)]+)\)/);
  if (paren?.[1]) return `${paren[1]} Paper`;
  if (/usenix security/i.test(venue)) return "USENIX Security Paper";
  if (/computer and communications security/i.test(venue)) return "ACM CCS Paper";
  if (/acns/i.test(venue)) return "ACNS Paper";
  if (/arxiv/i.test(venue)) return "arXiv Paper";
  if (/github/i.test(venue)) return "Publication";
  return "Paper";
};

const paperLabel = (pub: Publication): string => {
  // Prefer a short, exact system name before ":" (e.g. "Magika", "TypeSeg", "TRIAGE-CPG", "Sedpack")
  const colonIdx = pub.title.indexOf(":");
  if (colonIdx > 0) {
    const prefix = pub.title.slice(0, colonIdx).trim();
    if (prefix.length <= 16 && !prefix.includes(",")) {
      return `${prefix} (${pub.year})`;
    }
  }
  return `${shortVenueName(pub.venue)} (${pub.year})`;
};

const handlePublicationClick = (event: MouseEvent) => {
  const link = event.currentTarget as HTMLAnchorElement;
  const hash = link.getAttribute("href")?.split("#")[1];

  if (hash) {
    event.preventDefault();
    router.push(link.getAttribute("href") || "");

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
};

onMounted(() => {
  const hash = route.hash.slice(1);
  if (hash) {
    const project = projectsStore.getProjectById(hash as ProjectId);
    if (project) {
      const element = document.getElementById(hash);
      if (element) {
        highlightedProject.value = hash as ProjectId;
        element.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          highlightedProject.value = null;
        }, 5000);
      }
    }
  }
});
</script>
