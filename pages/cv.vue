<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold text-text-primary mb-8">Curriculum Vitae
    <span >
      <button 
        @click="downloadResume"
        class="inline-flex cursor-pointer items-center  bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
       
      </button>
    </span>
    </h1>

    <!-- Timeline Container -->
    <div class="relative">
      <!-- Vertical line -->
      <div class="timeline-line"></div>
      
      <!-- Energy pulses -->
      <div class="pulse-container">
        <div class="energy-pulse pulse-1"></div>
        <div class="energy-pulse pulse-2"></div>
        <div class="energy-pulse pulse-3"></div>
      </div>

      <!-- Work Experience Section -->
      <CardComponent title="Professional Experience" class="mb-8 z-10 relative" :interactive="false">
        <div class="space-y-10">
          <div v-for="(item, index) in cvStore.professionalExperience" :key="index" class="relative timeline-item">
            <div class="timeline-dot"></div>
            <CardComponent class="timeline-card border border-surface-light/30 bg-surface rounded-lg">
              <h3 class="text-xl font-display font-semibold text-text-primary mb-2">{{ item.title }}</h3>
              <div class="flex-block items-center mb-2">
                <span class="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary">{{ item.period }}</span>
              </div>
              
              <!-- Links as Pills -->
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <a v-for="link in item.links" :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border hover:bg-surface-light/80 transition-colors"
                  :class="{
                    'border-blue-500/30': link.type === 'blog',
                    'border-green-500/30': link.type === 'news',
                    'border-gray-500/30': link.type === 'github',
                    'border-purple-500/30': link.type === 'website',
                    'border-orange-500/30': link.type === 'paper'
                  }">
                  <svg v-if="link.type === 'blog'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'news'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <svg v-else-if="link.type === 'website'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <svg v-else-if="link.type === 'paper'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ link.name }}
                </a>
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
      </CardComponent>

      <!-- Education Section -->
      <CardComponent title="Education" class="mb-8 z-10 relative" :interactive="false">
        <div class="space-y-10">
          <div v-for="(item, index) in cvStore.education" :key="index" class="relative timeline-item">
            <div class="timeline-dot"></div>
            <CardComponent class="timeline-card border border-surface-light/30 bg-surface rounded-lg">
              <h3 class="text-xl font-display font-semibold text-text-primary mb-2">{{ item.title }}</h3>
              <div class="flex-block items-center mb-2">
                <span class="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary">{{ item.period }}</span>
                <span v-if="item.gpa" class="mx-2 text-text-secondary">•</span>
                <span v-if="item.gpa" class="text-text-tertiary text-sm">GPA: {{ item.gpa }}</span>
              </div>
              
              <!-- Links as Pills -->
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <a v-for="link in item.links" :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border hover:bg-surface-light/80 transition-colors"
                  :class="{
                    'border-blue-500/30': link.type === 'blog',
                    'border-green-500/30': link.type === 'news',
                    'border-gray-500/30': link.type === 'github',
                    'border-purple-500/30': link.type === 'website',
                    'border-orange-500/30': link.type === 'paper'
                  }">
                  <svg v-if="link.type === 'blog'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'news'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <svg v-else-if="link.type === 'website'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <svg v-else-if="link.type === 'paper'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ link.name }}
                </a>
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
      </CardComponent>

      <!-- Open Source Section -->
      <CardComponent title="Open Source Contributions" class="mb-8 z-10 relative" :interactive="false">
        <div class="space-y-6">
          <div v-for="(item, index) in cvStore.openSourceContributions" :key="index" class="relative">
            <div class="border-b border-surface-light/30 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
              <h3 class="text-xl font-display font-semibold text-text-primary mb-2">{{ item.title }}</h3>
              <div class="flex-block items-center mb-2">
                <span class="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary">{{ item.period }}</span>
              </div>
              
              <!-- Links as Pills -->
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <a v-for="link in item.links" :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border hover:bg-surface-light/80 transition-colors"
                  :class="{
                    'border-blue-500/30': link.type === 'blog',
                    'border-green-500/30': link.type === 'news',
                    'border-gray-500/30': link.type === 'github',
                    'border-purple-500/30': link.type === 'website',
                    'border-orange-500/30': link.type === 'paper'
                  }">
                  <svg v-if="link.type === 'blog'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'news'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <svg v-else-if="link.type === 'website'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <svg v-else-if="link.type === 'paper'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ link.name }}
                </a>
              </div>
              
              <p v-if="item.description" class="text-text-secondary mb-4">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </CardComponent>

      <!-- Competitions Section -->
      <CardComponent title="Competitions" class="mb-8 z-10 relative" :interactive="false">
        <div class="space-y-10">
          <div v-for="(item, index) in cvStore.competitions" :key="index" class="relative timeline-item">
            <div class="timeline-dot"></div>
            <CardComponent class="timeline-card border border-surface-light/30 bg-surface rounded-lg">
              <h3 class="text-xl font-display font-semibold text-text-primary mb-2">{{ item.title }}</h3>
              <div class="flex items-center mb-2">
                <span class="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium px-2 py-0.5 rounded">{{ item.organization }}</span>
                <span class="mx-2 text-text-secondary">•</span>
                <span class="text-text-secondary">{{ item.period }}</span>
              </div>
              
              <!-- Links as Pills -->
              <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2 mb-4">
                <a v-for="link in item.links" :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-light text-text-secondary rounded-lg border hover:bg-surface-light/80 transition-colors"
                  :class="{
                    'border-blue-500/30': link.type === 'blog',
                    'border-green-500/30': link.type === 'news',
                    'border-gray-500/30': link.type === 'github',
                    'border-purple-500/30': link.type === 'website',
                    'border-orange-500/30': link.type === 'paper'
                  }">
                  <svg v-if="link.type === 'blog'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'news'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <svg v-else-if="link.type === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <svg v-else-if="link.type === 'website'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <svg v-else-if="link.type === 'paper'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ link.name }}
                </a>
              </div>
              
              <p v-if="item.description" class="text-text-secondary mb-4">
                {{ item.description }}
              </p>
            </CardComponent>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { useCVStore } from '@/stores/cv'

const cvStore = useCVStore()

const downloadResume = () => {
  // Instead of linking directly to a file that might not exist yet,
  // we'll show a message that the resume is available on request
  alert('Full resume is available upon request. Please contact me via email at luca@lucainvernizzi.net')
}
</script>

<style scoped>
/* Timeline Vertical Line */
.timeline-line {
  position: absolute;
  left: 1rem;
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
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 0;
  transform: translateX(-50%);
  overflow: hidden;
}

/* Energy pulses */
.energy-pulse {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 157, 2, 0.9);
  border-radius: 50%;
  left: -4px;
  filter: blur(2px);
  box-shadow: 0 0 6px 2px rgba(255, 157, 2, 0.7);
  z-index: 1;
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
  left: 1rem;
  width: 16px;
  height: 16px;
  background-color: #FF9D02;
  border-radius: 50%;
  transform: translateX(-50%);
  top: 1.5rem;
  z-index: 2;
  box-shadow: 0 0 0 4px var(--color-surface), 0 0 0 5px rgba(255, 157, 2, 0.3);
  position: relative;
  z-index: 0;



}

/* Timeline Card */
.timeline-card {
  margin-left: 2rem;
  position: relative;
  z-index: 1;
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
    width: 45%;
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

  /* Remove right-alignment for left items */
  .timeline-item:nth-child(odd) {
    text-align: left;
  }

  .timeline-dot::before {
    content: ' ';
    position: absolute;
    width: 40px;
    top: calc( 50% - 1px);
    height: 2px;
    background-color: rgba(255, 157, 2, 0.4);
    z-index: -1;
  }
  .timeline-item:nth-child(odd) .timeline-dot::before {
   transform: translateX(-30px);  
  }
  
  
  /* Make border-left consistent on both sides */
  .pl-4.border-l-2 {
    padding-left: 1rem !important;
    border-left: 2px solid rgba(255, 157, 2, 0.2) !important;
    border-right: none !important;
    text-align: left !important;
  }
  
  /* Fix list alignment for proper text wrapping */
  .list-outside {
    list-style-position: outside !important;
    padding-left: 1.25rem !important;
  }
}
</style> 