<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold text-text-primary mb-12">Projects</h1>
    
    <!-- Active Projects Section -->
    <p class="text-text-secondary mb-4">
      These are some of the projects my team and I have been working on.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 [&>*]:h-full">
      <CardComponent v-for="project in activeProjects" :key="project.title"
                    :id="project.id"
                    class="transition-all duration-500 scroll-mt-20"
                    :class="{ 'border-l-4 border-l-[#FF9D02]': isHighlighted(project.id) }">
        <h2 class="text-2xl font-display font-semibold text-text-primary mb-4">{{ project.title }}</h2>
        <div class="flex flex-wrap gap-2 mb-4">
          <a v-for="url in project.urls" :key="url.name"
             :href="url.url"
             target="_blank"
             rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border hover:bg-surface-light/80 transition-colors"
             :class="{
               'border-blue-500/30': url.type === 'blog',
               'border-green-500/30': url.type === 'news',
               'border-gray-500/30': url.type === 'github',
               'border-purple-500/30': url.type === 'website'
             }">
            <svg v-if="url.type === 'blog'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <svg v-else-if="url.type === 'news'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <svg v-else-if="url.type === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <svg v-else-if="url.type === 'website'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            {{ url.name }}
          </a>
          <a v-for="pub in publicationsStore.recentPublications.filter(p => p.projectId === project.id)" 
             :key="pub.title"
             :href="'/publications#' + pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
             class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border border-orange-500/30 hover:bg-surface-light/80 transition-colors"
             @click="handlePublicationClick">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Paper
          </a>
        </div>
        <p class="text-text-secondary mb-4">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-if="project.award" 
                class="px-3 py-1 text-xs font-bold bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/30">
            🏆 {{ project.award }}
          </span>
          <span v-for="tag in project.tags" :key="tag" 
                class="px-2 py-0.5 text-[11px] bg-surface-light text-text-secondary rounded-full border border-surface-light/50">
            {{ tag }}
          </span>
        </div>
      </CardComponent>
    </div>

    <!-- Archived Projects Section -->
    <h2 class="text-3xl font-display font-bold text-text-primary mb-6">Archived Projects</h2>
    <p class="text-text-secondary mb-4">
      These are projects that have concluded or are no longer actively maintained.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 [&>*]:h-full">
      <CardComponent v-for="project in archivedProjects" :key="project.title"
                    :id="project.id"
                    class="transition-all duration-500 opacity-80 hover:opacity-100 scroll-mt-20"
                    :class="{ 'border-l-4 border-l-[#FF9D02]': isHighlighted(project.id) }">
        <h2 class="text-2xl font-display font-semibold text-text-primary mb-4">{{ project.title }}</h2>
        <div class="flex flex-wrap gap-2 mb-4">
          <a v-for="url in project.urls" :key="url.name"
             :href="url.url"
             target="_blank"
             rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border hover:bg-surface-light/80 transition-colors"
             :class="{
               'border-blue-500/30': url.type === 'blog',
               'border-green-500/30': url.type === 'news',
               'border-gray-500/30': url.type === 'github',
               'border-purple-500/30': url.type === 'website'
             }">
            <svg v-if="url.type === 'blog'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <svg v-else-if="url.type === 'news'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <svg v-else-if="url.type === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <svg v-else-if="url.type === 'website'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            {{ url.name }}
          </a>
          <a v-for="pub in publicationsStore.recentPublications.filter(p => p.projectId === project.id)" 
             :key="pub.title"
             :href="'/publications#' + pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
             class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border border-orange-500/30 hover:bg-surface-light/80 transition-colors"
             @click="handlePublicationClick">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Paper
          </a>
        </div>
        <p class="text-text-secondary mb-4">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-if="project.award" 
                class="px-3 py-1 text-xs font-bold bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/30">
            🏆 {{ project.award }}
          </span>
          <span v-for="tag in project.tags" :key="tag" 
                class="px-2 py-0.5 text-[11px] bg-surface-light text-text-secondary rounded-full border border-surface-light/50">
            {{ tag }}
          </span>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'
import { usePublicationsStore } from '~/stores/publications'
import CardComponent from '~/components/CardComponent.vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import type { ProjectId } from '~/stores/projects'

const projectsStore = useProjectsStore()
const publicationsStore = usePublicationsStore()
const router = useRouter()
const route = useRoute()
const highlightedProject = ref<ProjectId | null>(null)

// Computed properties to separate active and archived projects
const activeProjects = computed(() => {
  // Include all non-archived projects regardless of whether they have GitHub URLs
  return projectsStore.projects.filter(project => !project.archived)
})

const archivedProjects = computed(() => {
  return projectsStore.projects.filter(project => project.archived)
})

const isHighlighted = (id: ProjectId) => {
  return highlightedProject.value === id
}

const handlePublicationClick = (event: MouseEvent) => {
  const link = event.currentTarget as HTMLAnchorElement
  const hash = link.getAttribute('href')?.split('#')[1]
  
  if (hash) {
    event.preventDefault()
    router.push(link.getAttribute('href') || '')
    
    // Wait for the next tick to ensure the publications page is loaded
    setTimeout(() => {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
}

onMounted(() => {
  const hash = route.hash.slice(1) // Remove the # from the hash
  if (hash) {
    const project = projectsStore.getProjectById(hash as ProjectId)
    if (project) {
      const element = document.getElementById(hash)
      if (element) {
        highlightedProject.value = hash as ProjectId
        element.scrollIntoView({ behavior: 'smooth' })
        
        // Remove highlight after 5 seconds
        setTimeout(() => {
          highlightedProject.value = null
        }, 5000)
      }
    }
  }
})
</script> 