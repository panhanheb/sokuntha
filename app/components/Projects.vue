<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  FolderGit2,
  Github,
  CheckCircle2,
  Smartphone,
  Building,
  Sparkles,
  Layout,
  ArrowUpRight
} from 'lucide-vue-next'
import type { ProjectItem } from '~/composables/usePortfolioState'

const { openProject, triggerDynamicIsland } = usePortfolioState()

const selectedCategory = ref<'all' | 'Mobile' | 'System' | 'Web'>('all')

const projects: ProjectItem[] = [
  {
    id: 'hotel-booking',
    title: 'Hotel Booking System',
    subtitle: 'Enterprise Room Reservation & Inventory Platform',
    category: 'System',
    description: 'A comprehensive hotel reservation management system engineered for high-accuracy availability checking, streamlined booking workflows, role-based user management, and efficient data handling.',
    technologies: ['PHP', 'Laravel', 'OOP', 'HTML/CSS', 'JavaScript'],
    features: [
      'Room booking workflow',
      'Real-time availability checking',
      'User management & roles',
      'Efficient data handling & storage'
    ],
    gradient: 'from-blue-600/30 via-indigo-600/20 to-cyan-500/20',
    accentColor: '#0071e3',
    iconName: 'Building',
    mockupType: 'system'
  },
  {
    id: 'skincare-mobile',
    title: 'Skincare Mobile Application',
    subtitle: 'Intelligent Skin Analysis & Personalized Routine',
    category: 'Mobile',
    description: 'An intuitive mobile application designed to provide personalized skincare recommendations based on interactive user inputs, skin profiles, and structured data processing algorithms.',
    technologies: ['Android', 'Cross-platform Mobile', 'Java', 'OOP', 'UI/UX Design'],
    features: [
      'Skincare recommendations engine',
      'User-friendly mobile UI',
      'Dynamic user input processing',
      'Reliable data processing pipeline'
    ],
    gradient: 'from-purple-600/30 via-pink-600/20 to-blue-500/20',
    accentColor: '#af52de',
    iconName: 'Smartphone',
    mockupType: 'phone'
  },
  {
    id: 'idp-website',
    title: 'IDP Website Development',
    subtitle: 'Multi-Device Responsive Information Portal',
    category: 'Web',
    description: 'A fully responsive web platform developed with modern web standards, delivering smooth multi-screen adaptation across mobile smartphones, tablets, and wide desktop displays.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Cross-Browser UI'],
    features: [
      'Semantic HTML5 structure',
      'Modern responsive CSS styling',
      'Interactive JavaScript components',
      'Complete Mobile/Tablet/Desktop support'
    ],
    gradient: 'from-cyan-600/30 via-teal-600/20 to-emerald-500/20',
    accentColor: '#32ade6',
    iconName: 'Layout',
    mockupType: 'browser'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects
  return projects.filter(p => p.category === selectedCategory.value)
})

const handleGithubClick = (projectTitle: string) => {
  triggerDynamicIsland(
    `${projectTitle} Codebase`,
    'University coursework project. Repository access provided upon interview inquiry.',
    'info'
  )
}
</script>

<template>
  <section id="projects" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-left max-w-3xl mb-12 space-y-3">
        <div class="section-tag text-cyan-400 flex items-center gap-2">
          <span>03 //</span>
          <span>FEATURED PROJECTS</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Software & Mobile Applications
        </h2>
        <p class="text-neutral-400 text-base sm:text-lg leading-relaxed">
          Showcasing real-world applications engineered with a strong emphasis on clean code, seamless user experience, and practical business logic.
        </p>

        <!-- Category Filter Control -->
        <div class="pt-4 flex items-center">
          <div class="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl w-full sm:w-auto">
            <button
              @click="selectedCategory = 'all'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[selectedCategory === 'all' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              All (3)
            </button>
            <button
              @click="selectedCategory = 'Mobile'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[selectedCategory === 'Mobile' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              Mobile App
            </button>
            <button
              @click="selectedCategory = 'System'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[selectedCategory === 'System' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              Hotel System
            </button>
            <button
              @click="selectedCategory = 'Web'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[selectedCategory === 'Web' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              IDP Website
            </button>
          </div>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="pro-card card-3d preserve-3d flex flex-col justify-between overflow-hidden group hover:border-cyan-400/50 relative transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(0,113,227,0.3)]"
        >
          <!-- Top Mockup Visual Banner -->
          <div class="relative h-56 w-full overflow-hidden bg-gradient-to-br from-black/85 via-slate-950 to-slate-900 border-b border-white/10 flex items-center justify-center p-6">
            <!-- Ambient Card Backlight -->
            <div
              class="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
              :class="`bg-gradient-to-br ${project.gradient}`"
            ></div>

            <!-- Mobile Mockup for Skincare App -->
            <div
              v-if="project.mockupType === 'phone'"
              class="relative z-10 w-32 h-44 rounded-3xl bg-slate-950/95 border-2 border-white/40 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(175,82,222,0.35)] p-2.5 flex flex-col justify-between transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(175,82,222,0.6)]" style="transform: perspective(800px) rotateY(-14deg) rotateX(10deg) translateZ(35px);"
            >
              <div class="w-12 h-2.5 bg-black rounded-full mx-auto border border-white/10 flex items-center justify-center">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              </div>
              <div class="space-y-1.5 px-1 py-1">
                <div class="h-10 rounded-xl bg-gradient-to-tr from-purple-600/40 to-pink-500/30 border border-purple-400/40 flex items-center justify-center">
                  <Sparkles class="w-5 h-5 text-purple-300" />
                </div>
                <div class="h-2 w-4/5 bg-white/40 rounded"></div>
                <div class="h-2 w-3/5 bg-white/25 rounded"></div>
              </div>
              <div class="w-10 h-1 bg-white/40 rounded-full mx-auto"></div>
            </div>

            <!-- Browser Mockup for IDP & Hotel -->
            <div
              v-else
              class="relative z-10 w-64 sm:w-72 h-42 rounded-2xl bg-slate-950/95 border border-white/40 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(0,113,227,0.35)] p-3 flex flex-col justify-between transition-all duration-500 group-hover:scale-108 group-hover:rotate-0 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(0,113,227,0.6)]" style="transform: perspective(800px) rotateX(12deg) rotateY(-8deg) translateZ(30px);"
            >
              <div class="flex items-center gap-1.5 pb-2 border-b border-white/15">
                <div class="w-2.5 h-2.5 rounded-full bg-red-400/90"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/90"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-400/90"></div>
                <div class="ml-2 flex-1 h-3.5 rounded-md bg-white/10 border border-white/15 flex items-center px-2">
                  <span class="text-[8px] text-white/70 font-mono tracking-tight">https://{{ project.id }}.internal</span>
                </div>
              </div>
              <div class="flex-1 py-2 flex items-center justify-center">
                <div class="text-center space-y-1.5">
                  <div class="inline-flex p-2.5 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    <component :is="project.mockupType === 'system' ? Building : Layout" class="w-5 h-5" />
                  </div>
                  <p class="text-[11px] font-bold text-white tracking-wide">{{ project.title }}</p>
                  <p class="text-[9px] text-neutral-400">High-Concurrency Architecture</p>
                </div>
              </div>
            </div>

            <!-- Top Category Tag -->
            <div class="absolute top-3.5 left-3.5 z-20">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                {{ project.category }}
              </span>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-7 flex-1 flex flex-col justify-between space-y-5">
            <div>
              <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                {{ project.title }}
              </h3>
              <p class="text-xs text-cyan-400/90 font-medium mt-1">
                {{ project.subtitle }}
              </p>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                {{ project.description }}
              </p>

              <!-- Features checklist -->
              <div class="mt-4 space-y-2">
                <div
                  v-for="feat in project.features"
                  :key="feat"
                  class="flex items-center gap-2 text-xs text-neutral-300"
                >
                  <CheckCircle2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{{ feat }}</span>
                </div>
              </div>
            </div>

            <!-- Technologies and Action Buttons -->
            <div class="space-y-4 pt-4 border-t border-white/10">
              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.05] border border-white/10 text-neutral-300"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Buttons: View Project & GitHub Placeholder -->
              <div class="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  @click="openProject(project)"
                  class="pro-btn-primary flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md group/btn cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight class="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  @click="handleGithubClick(project.title)"
                  class="pro-btn-secondary flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  title="Coursework Repository"
                >
                  <Github class="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
