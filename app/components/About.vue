<script setup lang="ts">
import {
  GraduationCap,
  Smartphone,
  Globe2,
  Lightbulb,
  Sparkles,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-vue-next'

const highlights = [
  {
    icon: GraduationCap,
    title: 'Computer Science Graduate',
    desc: 'Graduated with a Bachelor of Computer Science from the Royal University of Phnom Penh (RUPP, 2022–2026), grounded in solid theoretical and practical software engineering fundamentals.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-cyan-400',
    tag: 'RUPP 2026'
  },
  {
    icon: Smartphone,
    title: 'Mobile Application Development',
    desc: 'Dedicated focus on crafting fluid, responsive mobile interfaces and architectures for Android and cross-platform ecosystems with user-first paradigms.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    tag: 'Core Specialization'
  },
  {
    icon: Globe2,
    title: 'Full Web Development Stack',
    desc: 'Hands-on experience developing clean web interfaces and reliable backend systems utilizing modern JavaScript, React JS, PHP, and Laravel.',
    gradient: 'from-cyan-500/20 to-emerald-500/20',
    iconColor: 'text-emerald-400',
    tag: 'Full-Stack Logic'
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving & OOP',
    desc: 'Strong grounding in object-oriented programming (OOP), data structures, and algorithmic logic across C, C++, C#, and Java.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    tag: 'Architecture'
  },
  {
    icon: Sparkles,
    title: 'User-Friendly Application Design',
    desc: 'Passionate about seamless user experiences, intuitive navigation hierarchies, accessibility, and modern glassmorphic interface aesthetics.',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    iconColor: 'text-indigo-400',
    tag: 'UI / UX Design'
  },
  {
    icon: TrendingUp,
    title: 'Continuous Learning & Growth',
    desc: 'Eager to absorb mentorship from senior engineers, tackle complex real-world engineering hurdles, and make impactful team contributions.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-teal-400',
    tag: 'Career Ambition'
  }
]
</script>

<template>
  <section id="about" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Tag & Title -->
      <div class="text-left max-w-3xl mb-14 space-y-3">
        <div class="section-tag text-cyan-400 flex items-center gap-2">
          <span>01 //</span>
          <span>ABOUT ME</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Blending Technical Precision with Mobile Innovation
        </h2>
        <p class="text-neutral-400 text-base sm:text-lg leading-relaxed">
          Driven by a curiosity for how software transforms daily life, I build dependable mobile and web applications with clean architecture and intuitive user interfaces.
        </p>
      </div>

      <!-- Bento Grid of 6 Key Competencies -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, idx) in highlights"
          :key="idx"
          class="pro-card card-3d preserve-3d p-7 sm:p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:rotate-x-2 hover:border-cyan-400/50 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,242,254,0.25)]"
        >
          <!-- Hover Ambient Glow -->
          <div
            class="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            :class="`bg-gradient-to-br ${item.gradient}`"
          ></div>

          <div>
            <!-- Header with Icon & Tag -->
            <div class="flex items-center justify-between mb-5">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.05] border border-white/12 backdrop-blur-md group-hover:scale-110 transition-transform shadow-md" style="transform: translateZ(35px);"
              >
                <component :is="item.icon" class="w-6 h-6" :class="item.iconColor" />
              </div>
              <span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">
                {{ item.tag }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors" style="transform: translateZ(25px);">
              {{ item.title }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-neutral-400 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

          <!-- Bottom accent bar -->
          <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span class="font-mono text-[11px] text-cyan-400/80">Software Engineering</span>
            <CheckCircle2 class="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      <!-- Quick Coordinates Info Card -->
      <div class="mt-10 p-6 sm:p-8 rounded-[24px] pro-card flex flex-wrap items-center justify-around gap-6 text-sm text-neutral-300">
        <div class="flex items-center gap-3.5">
          <div class="p-3 rounded-2xl bg-blue-500/20 text-cyan-400 border border-blue-500/30">
            <MapPin class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-neutral-400 font-medium">Resident Location</p>
            <p class="font-bold text-white">Phnom Penh, Cambodia</p>
          </div>
        </div>

        <div class="flex items-center gap-3.5">
          <div class="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <GraduationCap class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-neutral-400 font-medium">Academic Degree</p>
            <p class="font-bold text-white">B.S. in Computer Science (RUPP)</p>
          </div>
        </div>

        <div class="flex items-center gap-3.5">
          <div class="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Smartphone class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs text-neutral-400 font-medium">Primary Goal</p>
            <p class="font-bold text-white">Mobile App Dev Internship</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
