<script setup lang="ts">
import {
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
  Award,
  BookOpen
} from 'lucide-vue-next'

const educationTimeline = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Royal University of Phnom Penh (RUPP)',
    period: '2022 – 2026',
    status: 'Graduated',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/35',
    description: 'Comprehensive 4-year computer science curriculum emphasizing software engineering, object-oriented programming (C++, Java, C#), mobile and web systems architecture, database management, and hands-on capstone project development.',
    highlights: [
      'Graduated with strong foundations in OOP & System Design',
      'Developed real-world web and mobile software projects',
      'Under the academic mentorship of top faculty lecturers'
    ]
  },
  {
    degree: 'High School Diploma',
    institution: 'Toul Kbel High School',
    period: '2020 – 2022',
    status: 'Completed',
    badgeColor: 'bg-blue-500/15 text-cyan-300 border-blue-400/35',
    description: 'Completed secondary education with focused studies in mathematics, scientific methodology, and analytical thinking, establishing the groundwork for computer science and software development pursuits.',
    highlights: [
      'Advanced Mathematics & Science curriculum',
      'Fostered critical thinking and problem-solving aptitude'
    ]
  }
]
</script>

<template>
  <section id="education" class="py-24 relative">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-left max-w-3xl mb-14 space-y-3">
        <div class="section-tag text-emerald-400 flex items-center gap-2">
          <span>04 //</span>
          <span>EDUCATION & TIMELINE</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Academic Foundations & Journey
        </h2>
        <p class="text-neutral-400 text-base sm:text-lg leading-relaxed">
          Academic journey reflecting continuous discipline, computer science rigor, and engineering excellence.
        </p>
      </div>

      <!-- Modern Glowing Timeline -->
      <div class="relative pl-8 sm:pl-12 space-y-12 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-purple-500 before:to-blue-600 before:opacity-60">
        <div
          v-for="item in educationTimeline"
          :key="item.degree"
          class="relative group"
        >
          <!-- Glowing Timeline Node Pin -->
          <div
            class="absolute -left-8 sm:-left-12 top-2 w-6 h-6 rounded-full bg-[#030612] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#22d3ee] group-hover:scale-125 transition-transform duration-300"
          >
            <div class="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></div>
          </div>

          <!-- Glass Timeline Card -->
          <div class="pro-card p-7 sm:p-8 space-y-4 hover:border-cyan-400/40 transition-all">
            <!-- Header with Degree & Period -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div class="flex items-center gap-3 flex-wrap">
                  <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {{ item.degree }}
                  </h3>
                  <span
                    class="px-3 py-0.5 rounded-full text-[11px] font-semibold border"
                    :class="item.badgeColor"
                  >
                    {{ item.status }}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-sm text-cyan-300 font-medium mt-1">
                  <Building2 class="w-4 h-4" />
                  <span>{{ item.institution }}</span>
                </div>
              </div>

              <!-- Period Pill -->
              <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 self-start sm:self-center">
                <Calendar class="w-3.5 h-3.5 text-cyan-400" />
                <span>{{ item.period }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-neutral-400 leading-relaxed">
              {{ item.description }}
            </p>

            <!-- Highlights Checklist -->
            <div class="pt-3 border-t border-white/10 space-y-2">
              <div
                v-for="hl in item.highlights"
                :key="hl"
                class="flex items-start gap-2.5 text-xs text-neutral-300"
              >
                <CheckCircle2 class="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{{ hl }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
