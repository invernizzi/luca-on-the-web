<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold text-text-primary mb-12">Academic Service</h1>
    
    <div class="space-y-12">
      <CardComponent title="" :interactive="false">
        <p class="text-text-secondary mb-4">I have been a member of the technical program committee of the following conferences:</p>
        <div class="space-y-8">
          <div v-for="yearGroup in committeesStore.participationsByYear" :key="yearGroup.year" class="space-y-4">
            <h2 class="text-2xl font-bold text-text-primary">{{ yearGroup.year }}</h2>
            <div class="grid grid-cols-1 gap-4">
              <div v-for="participation in yearGroup.participations" :key="`${participation.conference}-${participation.year}`" 
                   class="p-4 bg-surface border border-surface-light rounded-lg transition-all duration-300 hover:shadow-lg">
                <h3 class="font-display font-medium text-text-primary text-lg mb-2">{{ participation.conference }}</h3>
                <a :href="participation.url" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Conference Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommitteesStore } from '~/stores/committees'
import CardComponent from '~/components/CardComponent.vue'

const committeesStore = useCommitteesStore()
</script> 