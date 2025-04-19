<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div class="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-surface">
            <NuxtPicture src="/images/face.jpg" alt="Luca Invernizzi" class="w-full h-full object-cover"/>
          </div>
        </div>
        <div>
          <h1 class="text-4xl font-display font-bold text-text-primary mb-4">Luca Invernizzi</h1>
          <p class="text-text-secondary text-lg"> Research Scientist at Google</p>
        </div>
      </div>

      <div class="prose prose-invert max-w-none mb-16">
        <p class="text-text-secondary text-lg">
          I am a Research Scientist Manager in the
          
          <NuxtLink to="https://research.google/teams/security-privacy-and-abuse/" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">Security Research Group</NuxtLink> at Google, where I focus on designing better ways to protect people online, advancing   cybersecurity through AI,  and better hardware attacks and defenses.
        </p>
        <p class="text-text-secondary text-lg mt-2">
          My research has been featured by 
          <NuxtLink to="https://www.bbc.com/news/technology-40737060" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">CNN</NuxtLink>, 
          <NuxtLink to="https://www.forbes.com/sites/daveywinder/2024/02/15/new-google-security-includes-gmail-magic-protection--ai-cyber-defense-initiative/" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">Forbes</NuxtLink>, 
          <NuxtLink to="https://www.wired.com/story/gmail-catching-more-malicious-attachments-deep-learning/" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">Wired</NuxtLink>, 
           <NuxtLink
          to="https://www.cnet.com/tech/services-and-software/new-google-messages-safety-features-blur-nudity-warn-about-scams/"  external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors"> CNET</NuxtLink>, 
          

          <NuxtLink to="https://www.theverge.com/2017/2/23/14712118/google-sha1-collision-broken-web-encryption-shattered" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">The Verge</NuxtLink>,
          and tech news sites like 
          <NuxtLink to="https://arstechnica.com/information-technology/2017/02/watershed-sha1-collision-just-broke-the-webkit-repository-others-may-follow/" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">Ars Technica</NuxtLink> and 
          <NuxtLink to="https://www.techrepublic.com/article/news-google-sec-gemini-v1/" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">TechRepublic</NuxtLink>.
        </p>
        <p class="text-text-secondary text-lg mt-2">
          I regularly give talks at  academic and industry conferences and participate in committees like Usenix Security.
          I hold a PhD in Computer Science from <NuxtLink to="https://www.ucsb.edu/"  external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">UCSB</NuxtLink>,  an EMBA from <NuxtLink to="https://quantic.edu/" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">Quantic School of Business</NuxtLink>,  a Master in Robotics from the <NuxtLink to="https://www.unipi.it/index.php/english" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">University of Pisa</NuxtLink>, and an engineering degree from the <NuxtLink to="https://www.santannapisa.it/en" external class="text-[#FF9D02] hover:text-[#FF9D02]/80 transition-colors">Sant'Anna School of Advanced Studies</NuxtLink>.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CardComponent title="Featured Projects">
          <div class="space-y-8">
            <div v-for="project in featuredProjects" :key="project.title">
              <NuxtLink :to="{ path: '/projects', hash: `#${project.id}`, query: { scrollBehavior: 'smooth' } }"
                       class="flex items-center justify-between mb-2 group">
                <h3 class="text-xl font-display font-semibold text-text-primary group-hover:text-primary transition-colors">{{ project.title }}</h3>
                <div class="p-1 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </NuxtLink>
              <p class="text-text-secondary/70 pl-0.5">{{ project.blurb }}</p>
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Contacts">
          <ul class="space-y-2 text-text-secondary">
            <li>
              <NuxtLink to="http://www.linkedin.com/in/lucainvernizzi" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:linkedin" class="w-4 h-4" />
                LinkedIn
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="mailto:luca@lucainvernizzi.net" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:email" class="w-4 h-4" />
                Email
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://scholar.google.com/citations?hl=en&user=4CEVnEMAAAAJ" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:school" class="w-4 h-4" />
                Google Scholar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://twitter.com/invernizzi" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:twitter" class="w-4 h-4" />
                Twitter
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://github.com/invernizzi" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:github" class="w-4 h-4" />
                GitHub
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://stackoverflow.com/users/633403/luca-invernizzi" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:stack-overflow" class="w-4 h-4" />
                Stack Overflow
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://research.google/people/104783/?&type=google" external class="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Icon icon="mdi:google" class="w-4 h-4" />
                Google Research 
              </NuxtLink>
            </li>
          </ul>
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'
import CardComponent from '~/components/CardComponent.vue'
import { Icon } from '@iconify/vue'
import type { Project } from '~/stores/projects'
import { computed } from 'vue'

const projectsStore = useProjectsStore()

const featuredProjects = computed(() => {
  return projectsStore.projects.filter(p => p.featured)
})
</script> 