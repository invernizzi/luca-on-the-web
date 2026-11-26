<template>
  <CardComponent title="Featured projects" heading-tag="h2" :interactive="false">
    <div class="divide-y divide-white/[0.06]">
      <div
        v-for="project in featuredProjects"
        :key="project.id"
        class="py-4 first:pt-0 last:pb-0"
      >
        <NuxtLink
          :to="{ path: '/projects', hash: `#${project.id}` }"
          class="group/project block"
        >
          <h3
            class="text-[17px] font-display font-medium leading-[1.3] text-text-primary group-hover/project:text-primary transition-colors duration-150 mb-1"
          >
            {{ project.title }}
          </h3>
          <p class="text-sm leading-[1.5] text-text-secondary">
            {{ project.blurb }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </CardComponent>
</template>

<script setup lang="ts">
const { projects } = storeToRefs(useProjectsStore());

const featuredProjects = computed(() =>
  projects.value.filter((p) => p.featured),
);
</script>
