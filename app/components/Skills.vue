<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Code,
  Globe,
  Smartphone,
  Wrench,
  Users,
  Terminal,
  Cpu,
  Layers,
  Check,
  ShieldCheck,
  GitBranch
} from 'lucide-vue-next'

const activeSkillFilter = ref<'all' | 'mobile' | 'programming' | 'web' | 'tools'>('all')

const skillCategories = [
  {
    id: 'mobile',
    name: 'Mobile Development',
    subtitle: 'Core Focus & Native Platforms',
    icon: Smartphone,
    iconColor: 'text-cyan-400',
    skills: [
      { name: 'Android', note: 'Native & Modern SDK' },
      { name: 'Cross-platform Mobile Development', note: 'Multi-OS Architecture' }
    ]
  },
  {
    id: 'programming',
    name: 'Programming & Foundations',
    subtitle: 'Core Languages & Paradigms',
    icon: Terminal,
    iconColor: 'text-purple-400',
    skills: [
      { name: 'C / C++', note: 'Foundations & Memory' },
      { name: 'C#', note: 'Application Logic' },
      { name: 'Java', note: 'Android & Enterprise' },
      { name: 'OOP', note: 'Design Patterns & Principles' }
    ]
  },
  {
    id: 'web',
    name: 'Web Development Stack',
    subtitle: 'Frontend & Backend Systems',
    icon: Globe,
    iconColor: 'text-emerald-400',
    skills: [
      { name: 'HTML', note: 'Semantic Structure' },
      { name: 'CSS', note: 'Responsive Styling' },
      { name: 'JavaScript', note: 'ES6+ & Asynchronous' },
      { name: 'React JS', note: 'Component Architecture' },
      { name: 'PHP', note: 'Server-Side Processing' },
      { name: 'Laravel', note: 'MVC Framework & APIs' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Soft Skills',
    subtitle: 'Workflow, Productivity & Collaboration',
    icon: Wrench,
    iconColor: 'text-amber-400',
    skills: [
      { name: 'Git', note: 'Version Control & Branching' },
      { name: 'Microsoft Office', note: 'Documentation & Reporting' },
      { name: 'Public Relations', note: 'Stakeholder Engagement' },
      { name: 'Teamwork', note: 'Agile Collaboration' },
      { name: 'Time Management', note: 'Task Prioritization' },
      { name: 'Effective Communication', note: 'Clear Articulation' },
      { name: 'Critical Thinking', note: 'Analytical Problem Solving' }
    ]
  }
]

const filteredCategories = computed(() => {
  if (activeSkillFilter.value === 'all') return skillCategories
  return skillCategories.filter(c => c.id === activeSkillFilter.value)
})
</script>

<template>
  <section id="skills" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-left max-w-3xl mb-12 space-y-3">
        <div class="section-tag text-purple-400 flex items-center gap-2">
          <span>02 //</span>
          <span>TECHNICAL SKILLS</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Specialized Competencies & Tools
        </h2>
        <p class="text-neutral-400 text-base sm:text-lg leading-relaxed">
          Comprehensive foundation built across mobile platforms, programming fundamentals, web technologies, engineering workflows, and team collaboration.
        </p>

        <!-- Segmented Filter Pills -->
        <div class="pt-4 flex items-center flex-wrap gap-2">
          <div class="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl w-full sm:w-auto">
            <button
              @click="activeSkillFilter = 'all'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[activeSkillFilter === 'all' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              All Skills
            </button>
            <button
              @click="activeSkillFilter = 'mobile'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[activeSkillFilter === 'mobile' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              Mobile Dev
            </button>
            <button
              @click="activeSkillFilter = 'programming'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[activeSkillFilter === 'programming' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              Programming & OOP
            </button>
            <button
              @click="activeSkillFilter = 'web'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[activeSkillFilter === 'web' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              Web Dev
            </button>
            <button
              @click="activeSkillFilter = 'tools'"
              class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              :class="[activeSkillFilter === 'tools' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white']"
            >
              Tools & Soft Skills
            </button>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="cat in filteredCategories"
          :key="cat.name"
          class="pro-card card-3d preserve-3d p-7 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:rotate-x-2 hover:border-purple-400/50 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(168,85,247,0.25)]"
        >
          <div>
            <!-- Category Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/12 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform shadow-md" style="transform: translateZ(35px);">
                  <component :is="cat.icon" class="w-6 h-6" :class="cat.iconColor" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {{ cat.name }}
                  </h3>
                  <p class="text-xs text-neutral-400">
                    {{ cat.subtitle }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills Pills -->
            <div class="flex flex-wrap gap-2.5">
              <div
                v-for="skill in cat.skills"
                :key="skill.name"
                class="px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-all duration-200 cursor-default flex items-center gap-2.5 group/skill hover:scale-105"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"></div>
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-white tracking-tight">
                    {{ skill.name }}
                  </span>
                  <span class="text-[10px] text-neutral-400">
                    {{ skill.note }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Card Status -->
          <div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>{{ cat.skills.length }} Verified Skills</span>
            <div class="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck class="w-4 h-4" />
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
