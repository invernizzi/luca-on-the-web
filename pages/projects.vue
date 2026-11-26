<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(1.875rem,1.5rem+1.2vw,2.375rem)] font-display font-medium tracking-[-0.025em] leading-[1.08] text-text-primary mb-10"
    >
      Projects
    </h1>

    <section aria-labelledby="active-projects-heading" class="mb-14">
      <h2
        id="active-projects-heading"
        class="text-sm font-medium text-text-muted mb-5"
      >
        Current
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 [&>*]:h-full">
        <CardComponent
          v-for="project in activeProjects"
          :id="project.id"
          :key="project.id"
          heading-tag="h3"
          title-size="small"
          :title="project.title"
          :interactive="false"
          class="scroll-mt-20 rounded-xl transition-[box-shadow] duration-200"
          :class="{ 'ring-1 ring-primary/70': isHighlighted(project.id) }"
        >
          <div class="flex flex-col h-full">
            <div v-if="project.award" class="mb-3">
              <span
                class="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/25"
              >
                {{ project.award }}
              </span>
            </div>

            <p class="text-sm leading-[1.6] text-text-secondary mb-5">
              {{ project.description }}
            </p>

            <div v-if="primaryLinks(project).length > 0" class="flex flex-wrap gap-2 mb-3">
              <LinkPill
                v-for="url in primaryLinks(project)"
                :key="`${project.id}-${url.url}`"
                :link="url"
              />
              <a
                v-for="pub in projectPapers(project.id)"
                :key="`${project.id}-${pub.title}`"
                :href="`/publications#${slugify(pub.title)}`"
                :title="pub.title"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs leading-[1.3] bg-surface-light text-text-secondary rounded-lg border border-white/[0.08] hover:bg-surface-hover hover:text-text-primary hover:border-white/[0.14] transition-colors duration-150"
                @click="handlePublicationClick"
              >
                <AppIcon name="file-text" size="sm" class="text-text-muted" />
                <span>{{ paperLabel(pub, projectPapers(project.id).length) }}</span>
              </a>
            </div>

            <p
              v-if="pressLinks(project).length > 0"
              class="text-xs leading-[1.55] text-text-muted mb-4"
            >
              <span>Coverage: </span>
              <template v-for="(item, idx) in pressLinks(project)" :key="`${project.id}-press-${item.url}`">
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-text-secondary hover:text-primary transition-colors duration-150 underline decoration-white/15 underline-offset-2"
                >{{ item.name }}</a><span v-if="idx < pressLinks(project).length - 1">, </span>
              </template>
            </p>

            <div class="mt-auto pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              <TagPill v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </TagPill>
            </div>
          </div>
        </CardComponent>
      </div>
    </section>

    <section aria-labelledby="archived-projects-heading">
      <h2
        id="archived-projects-heading"
        class="text-sm font-medium text-text-muted mb-5"
      >
        Archive
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 [&>*]:h-full">
        <CardComponent
          v-for="project in archivedProjects"
          :id="project.id"
          :key="project.id"
          heading-tag="h3"
          title-size="small"
          :title="project.title"
          :interactive="false"
          class="scroll-mt-20 rounded-xl transition-[box-shadow] duration-200"
          :class="{ 'ring-1 ring-primary/70': isHighlighted(project.id) }"
        >
          <div class="flex flex-col h-full">
            <div v-if="project.award" class="mb-3">
              <span
                class="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/25"
              >
                {{ project.award }}
              </span>
            </div>

            <p class="text-sm leading-[1.6] text-text-secondary mb-5">
              {{ project.description }}
            </p>

            <div v-if="primaryLinks(project).length > 0 || projectPapers(project.id).length > 0" class="flex flex-wrap gap-2 mb-3">
              <LinkPill
                v-for="url in primaryLinks(project)"
                :key="`${project.id}-${url.url}`"
                :link="url"
              />
              <a
                v-for="pub in projectPapers(project.id)"
                :key="`${project.id}-${pub.title}`"
                :href="`/publications#${slugify(pub.title)}`"
                :title="pub.title"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs leading-[1.3] bg-surface-light text-text-secondary rounded-lg border border-white/[0.08] hover:bg-surface-hover hover:text-text-primary hover:border-white/[0.14] transition-colors duration-150"
                @click="handlePublicationClick"
              >
                <AppIcon name="file-text" size="sm" class="text-text-muted" />
                <span>{{ paperLabel(pub, projectPapers(project.id).length) }}</span>
              </a>
            </div>

            <p
              v-if="pressLinks(project).length > 0"
              class="text-xs leading-[1.55] text-text-muted mb-4"
            >
              <span>Coverage: </span>
              <template v-for="(item, idx) in pressLinks(project)" :key="`${project.id}-press-${item.url}`">
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-text-secondary hover:text-primary transition-colors duration-150 underline decoration-white/15 underline-offset-2"
                >{{ item.name }}</a><span v-if="idx < pressLinks(project).length - 1">, </span>
              </template>
            </p>

            <div class="mt-auto pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              <TagPill v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </TagPill>
            </div>
          </div>
        </CardComponent>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore, type Project, type ProjectId } from '~/stores/projects';
import { usePublicationsStore, type Publication } from '~/stores/publications';
import CardComponent from '~/components/CardComponent.vue';
import LinkPill from '~/components/LinkPill.vue';
import AppIcon from '~/components/AppIcon.vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';

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

const primaryLinks = (project: Project) =>
  (project.urls || []).filter((u) => u.type !== 'news');

const pressLinks = (project: Project) =>
  (project.urls || []).filter((u) => u.type === 'news');

const projectPapers = (projectId: ProjectId) =>
  publicationsStore.recentPublications.filter((p: Publication) => p.projectId === projectId);

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const paperLabel = (pub: Publication, count: number): string => {
  if (count <= 1) return `Paper (${pub.year})`;
  const short = pub.title.split(':')[0]?.trim() || pub.title;
  const compact = short.length > 22 ? `${short.slice(0, 20).trim()}…` : short;
  return `${compact} (${pub.year})`;
};

const handlePublicationClick = (event: MouseEvent) => {
  const link = event.currentTarget as HTMLAnchorElement;
  const href = link.getAttribute('href') || '';
  const hash = href.split('#')[1];

  if (hash) {
    event.preventDefault();
    router.push(href);

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
        element.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          highlightedProject.value = null;
        }, 4000);
      }
    }
  }
});
</script>
