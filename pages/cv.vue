<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold text-text-primary mb-8">Curriculum Vitae</h1>

    <div class="relative">
      <!-- Work Experience Section -->
      <LazyCardComponent title="Professional Experience" heading-tag="h2" class="mb-8 z-10 relative" :interactive="false">
        <div class="relative space-y-10">
          <div class="timeline-line" aria-hidden="true" />
          <div class="pulse-container" aria-hidden="true">
            <div class="energy-pulse pulse-1" />
            <div class="energy-pulse pulse-2" />
            <div class="energy-pulse pulse-3" />
          </div>

          <div v-for="(item, index) in cvStore.professionalExperience" :key="index" class="relative timeline-item">
            <div class="timeline-dot" aria-hidden="true" />
            <CardComponent
              class="timeline-card border border-surface-light/30 bg-surface rounded-lg"
              :title="item.title"
              title-size="small"
              heading-tag="h3"
            >
              <div class="flex flex-wrap items-center gap-y-1 mb-2 text-sm">
                <span class="bg-yellow-500/10 text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary tabular-nums">{{ item.period }}</span>
              </div>
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <LinkPill v-for="link in item.links" :key="`${link.name}-${link.url}`" :link="link" />
              </div>

              <p v-if="item.description" class="text-text-secondary mb-4">
                {{ item.description }}
              </p>
              <div v-if="item.highlights && item.highlights.length > 0" class="pl-4 border-l-2 border-primary/20">
                <ul class="list-disc list-outside pl-5 text-text-secondary text-sm space-y-2">
                  <li v-for="(highlight, hIndex) in item.highlights" :key="hIndex" class="pl-1">{{ highlight }}</li>
                </ul>
              </div>
            </CardComponent>
          </div>
        </div>
      </LazyCardComponent>

      <!-- Education Section -->
      <LazyCardComponent title="Education" heading-tag="h2" class="mb-8 z-10 relative" :interactive="false">
        <div class="relative space-y-10">
          <div class="timeline-line" aria-hidden="true" />
          <div class="pulse-container" aria-hidden="true">
            <div class="energy-pulse pulse-1" />
            <div class="energy-pulse pulse-2" />
            <div class="energy-pulse pulse-3" />
          </div>

          <div v-for="(item, index) in cvStore.education" :key="index" class="relative timeline-item">
            <div class="timeline-dot" aria-hidden="true" />
            <CardComponent
              class="timeline-card border border-surface-light/30 bg-surface rounded-lg"
              :title="item.title"
              title-size="small"
              heading-tag="h3"
            >
              <div class="flex flex-wrap items-center gap-y-1 mb-2 text-sm">
                <span class="bg-yellow-500/10 text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary tabular-nums">{{ item.period }}</span>
                <span v-if="item.gpa" class="mx-2 text-text-secondary">•</span>
                <span v-if="item.gpa" class="text-text-secondary text-sm tabular-nums">GPA: {{ item.gpa.trim() }}</span>
              </div>
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <LinkPill v-for="link in item.links" :key="`${link.name}-${link.url}`" :link="link" />
              </div>

              <p v-if="item.description" class="text-text-secondary mb-4">
                {{ item.description }}
              </p>
              <div v-if="item.highlights && item.highlights.length > 0" class="pl-4 border-l-2 border-primary/20">
                <ul class="list-disc list-outside pl-5 text-text-secondary text-sm space-y-2">
                  <li v-for="(highlight, hIndex) in item.highlights" :key="hIndex" class="pl-1">{{ highlight }}</li>
                </ul>
              </div>
            </CardComponent>
          </div>
        </div>
      </LazyCardComponent>

      <!-- Open Source Section -->
      <LazyCardComponent title="Open Source Contributions" heading-tag="h2" class="mb-8 z-10 relative" :interactive="false">
        <div class="space-y-6">
          <div v-for="(item, index) in cvStore.openSourceContributions" :key="index" class="relative">
            <div class="border-b border-surface-light/30 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
              <h3 class="text-xl font-display font-semibold text-text-primary mb-2">{{ item.title }}</h3>
              <div class="flex flex-wrap items-center gap-y-1 mb-2 text-sm">
                <span class="bg-yellow-500/10 text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary tabular-nums">{{ item.period }}</span>
              </div>
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <LinkPill v-for="link in item.links" :key="`${link.name}-${link.url}`" :link="link" />
              </div>

              <p v-if="item.description" class="text-text-secondary mb-4">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </LazyCardComponent>

      <!-- Competitions Section -->
      <LazyCardComponent title="Competitions" heading-tag="h2" class="mb-8 z-10 relative" :interactive="false">
        <div class="relative space-y-10">
          <div class="timeline-line" aria-hidden="true" />
          <div class="pulse-container" aria-hidden="true">
            <div class="energy-pulse pulse-1" />
            <div class="energy-pulse pulse-2" />
            <div class="energy-pulse pulse-3" />
          </div>

          <div v-for="(item, index) in cvStore.competitions" :key="index" class="relative timeline-item">
            <div class="timeline-dot" aria-hidden="true" />
            <CardComponent
              class="timeline-card border border-surface-light/30 bg-surface rounded-lg"
              :title="item.title"
              title-size="small"
              heading-tag="h3"
            >
              <div class="flex flex-wrap items-center gap-y-1 mb-2 text-sm">
                <span class="bg-yellow-500/10 text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary tabular-nums">{{ item.period }}</span>
              </div>
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <LinkPill v-for="link in item.links" :key="`${link.name}-${link.url}`" :link="link" />
              </div>

              <p v-if="item.description" class="text-text-secondary mb-4">
                {{ item.description }}
              </p>
            </CardComponent>
          </div>
        </div>
      </LazyCardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { useCVStore } from '@/stores/cv'

const cvStore = useCVStore()
</script>

<style scoped>
/* Timeline Vertical Line (inside each section so it renders visibly in front of the outer card) */
.timeline-line {
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: rgba(255, 157, 2, 0.4);
  transform: translateX(-50%);
  z-index: 0;
}

/* Pulse container */
.pulse-container {
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 10px;
  z-index: 1;
  transform: translateX(-50%);
  overflow: hidden;
  pointer-events: none;
}

/* Energy pulses */
.energy-pulse {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 157, 2, 0.9);
  border-radius: 50%;
  left: 0;
  filter: blur(2px);
  box-shadow: 0 0 6px 2px rgba(255, 157, 2, 0.7);
}

.pulse-1 {
  animation: pulse-move 8s ease-in-out infinite;
}

.pulse-2 {
  animation: pulse-move 10s ease-in-out 2s infinite;
}

.pulse-3 {
  animation: pulse-move 12s ease-in-out 4s infinite;
}

@keyframes pulse-move {
  0% {
    top: -20px;
    opacity: 0;
    transform: scale(0.8);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    top: 100%;
    opacity: 0;
    transform: scale(0.8);
  }
}

/* Timeline Dots */
.timeline-dot {
  position: absolute;
  left: 0.75rem;
  width: 16px;
  height: 16px;
  background-color: var(--ui-primary);
  border-radius: 50%;
  transform: translateX(-50%);
  top: 1.5rem;
  z-index: 2;
  box-shadow: 0 0 0 4px var(--color-surface), 0 0 0 5px rgba(255, 157, 2, 0.3);
}

/* Timeline Card */
.timeline-card {
  margin-left: 1.75rem;
  position: relative;
  z-index: 2;
  text-align: left;
}

/* Media Queries for Larger Screens */
@media (min-width: 768px) {
  .timeline-line {
    left: 50%;
  }

  .pulse-container {
    left: 50%;
  }

  .timeline-dot {
    left: 50%;
  }

  .timeline-card {
    width: calc(50% - 2.5rem);
    margin-left: 0;
  }

  /* Even items (right side) */
  .timeline-item:nth-child(even) .timeline-card {
    margin-left: auto;
  }

  /* Odd items (left side) */
  .timeline-item:nth-child(odd) .timeline-card {
    margin-right: auto;
  }

  .timeline-item:nth-child(odd) {
    text-align: left;
  }

  .timeline-dot::before {
    content: ' ';
    position: absolute;
    width: calc(2.5rem + 2px);
    height: 2px;
    background-color: rgba(255, 157, 2, 0.4);
    top: calc(50% - 1px);
    left: 50%;
    z-index: -1;
  }

  .timeline-item:nth-child(odd) .timeline-dot::before {
    left: auto;
    right: 50%;
  }

  .pl-4.border-l-2 {
    padding-left: 1rem !important;
    border-left: 2px solid rgba(255, 157, 2, 0.2) !important;
    border-right: none !important;
    text-align: left !important;
  }

  .list-outside {
    list-style-position: outside !important;
    padding-left: 1.25rem !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .energy-pulse {
    display: none;
  }
}
</style>
