<template>
  <div>
    <div class="container overflow-x-hidden mx-auto px-4 py-12">
      <h1 class="text-4xl font-display font-bold text-text-primary mb-12">Publications</h1>
      
      <div class="space-y-12">
        <CardComponent title="" :interactive="false">
          <div class="mb-6  items-center">
            For a complete list of my publications, please visit my  
            <NuxtLink to="https://scholar.google.com/citations?user=4CEVnEMAAAAJ" 
                   external
                   target="_blank"
                   class=" text-[#FF9D02] items-center px-1 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <Icon name="mdi:school" class="h-5 w-5 mr-2" />
              Google Scholar 
            </NuxtLink> profile.
          </div>

          <div class="mb-6">
            <div class="flex items-center gap-4">
              <label for="category-filter" class="text-sm text-text-secondary">Filter by category:</label>
              <select id="category-filter" 
                      v-model="selectedCategory"
                      class="px-3 py-1.5 text-sm bg-surface border border-surface-light rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">All </option>
                <option v-for="category in publicationsStore.allCategories" 
                        :key="category"
                        :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>

          <div class="space-y-12">
            <div v-for="yearGroup in academicPublications" :key="yearGroup.year" class="space-y-4">
              <h2 class="text-2xl font-bold text-text-primary">{{ yearGroup.year }}</h2>
              <div class="grid grid-cols-1 gap-6">
                <CardComponent v-for="pub in yearGroup.publications" :key="pub.title" 
                    :id="pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
                    class="scroll-mt-20 transition-all duration-500"
                    :class="{ 'border-l-4 border-l-[#FF9D02]': isHighlighted(pub.title) }"
                    :interactive="false">
                  <div class="flex justify-between items-start gap-2 mb-2">
                    <NuxtLink :to="pub.link" external class="group flex-grow">
                      <h3 class="font-display font-medium text-text-primary text-lg group-hover:text-primary transition-colors">{{ pub.title }}</h3>
                    </NuxtLink>
                    <NuxtLink :to="pub.link" external
                       class="flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open
                    </NuxtLink>
                  </div>
                  <p class="text-sm mb-1" v-html="highlightAuthor(pub.authors)"></p>
                  <div class="flex items-center mb-3">
                    <p class="text-sm text-primary">{{ pub.venue }}, {{ pub.year }}</p>
                    <span v-if="pub.citations" 
                          class="ml-2 text-xs px-1.5 py-0.5 rounded-md"
                          :class="pub.citations > 200 ? 
                                 'text-yellow-400 font-medium bg-yellow-500/10 border border-yellow-500/20' : 
                                 'text-text-secondary/70 bg-surface-light/50'">
                      {{ pub.citations }} {{ pub.citations === 1 ? 'citation' : 'citations' }}
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span v-if="pub.award" 
                          class="px-3 py-1 text-xs font-bold bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/30">
                      🏆 {{ pub.award }}
                    </span>
                    <span v-for="category in pub.categories" :key="category"
                          class="px-3 py-1 text-xs font-medium bg-surface-light text-text-secondary rounded-full border border-surface-light/50 hover:bg-surface-light/80 transition-colors">
                      {{ category }}
                    </span>
                  </div>
                </CardComponent>
              </div>
            </div>
          </div>

          
        </CardComponent>
        
        <!-- Open Source Section -->
        <div v-if="openSourcePublications.length > 0" class="mt-12">
          <h1 class="text-4xl font-display font-bold text-text-primary mb-4">Open Source</h1>
          <CardComponent>
            <div class="mb-6  items-center">
            These are some of the projects I contributed to. For a better overview of my open source projects, please visit my  
            <NuxtLink to="https://github.com/invernizzi" 
                   external
                   target="_blank"
                   class="text-[#FF9D02] items-center px-2 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <Icon name="mdi:github" class="h-5 w-5 mr-2" />
              GitHub Profile
            </NuxtLink>
            </div>
            
            <div class="space-y-12">
              <div v-for="yearGroup in openSourcePublications" :key="yearGroup.year" class="space-y-4">
                <h2 class="text-2xl font-bold text-text-primary">{{ yearGroup.year }}</h2>
                <div class="space-y-6">
                  <div v-for="pub in yearGroup.publications" :key="pub.title" 
                      :id="pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
                      class="scroll-mt-20 transition-all duration-500 bg-surface p-4 rounded-lg border border-surface-light/30 shadow-sm"
                      :class="{ 'border-l-4 border-l-[#FF9D02]': isHighlighted(pub.title) }">
                    <div class="flex justify-between items-start gap-2 mb-2">
                      <NuxtLink :to="pub.link" external class="group flex-grow">
                        <h3 class="font-display font-medium text-text-primary text-lg group-hover:text-primary transition-colors">{{ pub.title }}</h3>
                      </NuxtLink>
                      <NuxtLink :to="pub.link" external
                         class="flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open
                      </NuxtLink>
                    </div>
                    <p class="text-sm mb-1" v-html="highlightAuthor(pub.authors)"></p>
                    <div class="flex items-center mb-3">
                      <p class="text-sm text-primary">{{ pub.venue }}, {{ pub.year }}</p>
                      <span v-if="pub.citations" 
                            class="ml-2 text-xs px-1.5 py-0.5 rounded-md"
                            :class="pub.citations > 200 ? 
                                   'text-yellow-400 font-medium bg-yellow-500/10 border border-yellow-500/20' : 
                                   'text-text-secondary/70 bg-surface-light/50'">
                        {{ pub.citations }} {{ pub.citations === 1 ? 'citation' : 'citations' }}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span v-if="pub.award" 
                            class="px-3 py-1 text-xs font-bold bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/30">
                        🏆 {{ pub.award }}
                      </span>
                      <span v-for="category in pub.categories" :key="category"
                            class="px-3 py-1 text-xs font-medium bg-surface-light text-text-secondary rounded-full border border-surface-light/50 hover:bg-surface-light/80 transition-colors">
                        {{ category }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardComponent>
        </div>

        <CardComponent title="Research Areas">
          <p class="text-text-secondary mb-4">
            AI-generated summary of my research areas for a quick overview:
          </p>
          <ul class="space-y-6">
            <li v-for="area in publicationsStore.researchAreas" :key="area.title" class="text-text-secondary">
              <h3 class="font-display font-medium text-text-primary text-lg mb-2">{{ area.title }}</h3>
              <p>{{ area.description }}</p>
            </li>
          </ul>
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePublicationsStore } from '~/stores/publications'
import CardComponent from '~/components/CardComponent.vue'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PublicationCategory } from '~/stores/publications'
import { Icon } from '#components'
import { NuxtLink } from '#components'

const publicationsStore = usePublicationsStore()
const route = useRoute()
const highlightedPublication = ref<string | null>(null)
const selectedCategory = ref<string>('')

const isHighlighted = (title: string) => {
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return highlightedPublication.value === normalizedTitle
}

// Get all publications that match the category filter
const allFilteredPublications = computed(() => {
  let publications = [...publicationsStore.recentPublications]
  
  if (selectedCategory.value) {
    publications = publications.filter(pub => 
      pub.categories.includes(selectedCategory.value as PublicationCategory)
    )
  }
  
  return publications
})

// Academic publications (not GitHub)
const academicPublications = computed(() => {
  // Filter out GitHub publications
  const academicPubs = allFilteredPublications.value.filter(pub => 
    pub.venue && !/github/i.test(pub.venue)
  )
  
  // Group publications by year
  const grouped = academicPubs.reduce((acc, pub) => {
    const year = pub.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(pub)
    return acc
  }, {} as Record<number, typeof academicPubs>)

  // Convert to array of year groups sorted by year descending
  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, pubs]) => ({
      year: Number(year),
      publications: pubs
    }))
})

// Open source publications (GitHub)
const openSourcePublications = computed(() => {
  // Only include GitHub publications
  const openSourcePubs = allFilteredPublications.value.filter(pub => 
    pub.venue && /github/i.test(pub.venue)
  )
  
  // Group by year
  const grouped = openSourcePubs.reduce((acc, pub) => {
    const year = pub.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(pub)
    return acc
  }, {} as Record<number, typeof openSourcePubs>)

  // Convert to array of year groups sorted by year descending
  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, pubs]) => ({
      year: Number(year),
      publications: pubs
    }))
})

const highlightAuthor = (authors: string[] | undefined) => {
  if (!authors || authors.length === 0) return ''
  
  // Join the author array with commas for display
  return authors.map(author => {
    // Bold your name wherever it appears
    if (author.includes('Luca Invernizzi')) {
      return `<span class="font-bold text-primary">${author}</span>`
    }
    return author
  }).join(', ')
}

onMounted(() => {
  const hash = route.hash.slice(1) // Remove the # from the hash
  if (hash) {
    const element = document.getElementById(hash)
    if (element) {
      highlightedPublication.value = hash
      element.scrollIntoView({ behavior: 'smooth' })
      
      // Remove highlight after 5 seconds
      setTimeout(() => {
        highlightedPublication.value = null
      }, 5000)
    }
  }
})
</script> 