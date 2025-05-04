<template>
  <CardComponent title="Featured Projects">
    <div class="space-y-8">
      <div v-for="project in featuredProjects" :key="project.title" class="hover:text-[#FF9D02]">
        <NuxtLink
:to="{ path: '/projects', hash: `#${project.id}`}"
          class="flex items-center justify-between mb-2 group transition-colors">
          <div
            class="text-xl font-display font-semibold text-text-primary  group-hover:text-primary transition-colors">
            {{ project.title }}</div>
          <div class="p-1 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
            <LazyUIcon name="mdi:arrow-right" class="h-4 w-4 " />
          </div>
        </NuxtLink>
        <p class="text-text-secondary/70 pl-0.5">{{ project.blurb }}</p>
      </div>
    </div>
  </CardComponent>
</template>

<script setup lang="ts">
const {projects}  = storeToRefs(useProjectsStore());

const featuredProjects = computed(() => {
return projects.value.filter(p => p.featured);
});
</script>