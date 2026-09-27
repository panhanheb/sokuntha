<script setup lang="ts">
import {
  Smartphone,
  Layers,
  Code2,
  Terminal,
  Globe,
  Database,
  Cpu,
  GitBranch,
  FileCode,
  Sparkles
} from 'lucide-vue-next'

const techItems = [
  { name: 'ANDROID', icon: Smartphone, color: 'text-emerald-400' },
  { name: 'CROSS-PLATFORM', icon: Layers, color: 'text-cyan-400' },
  { name: 'JAVA', icon: Terminal, color: 'text-amber-400' },
  { name: 'C / C++', icon: Code2, color: 'text-blue-400' },
  { name: 'C#', icon: Code2, color: 'text-purple-400' },
  { name: 'OOP', icon: Cpu, color: 'text-pink-400' },
  { name: 'LARAVEL', icon: Database, color: 'text-rose-400' },
  { name: 'PHP', icon: FileCode, color: 'text-indigo-400' },
  { name: 'REACT JS', icon: Globe, color: 'text-cyan-400' },
  { name: 'JAVASCRIPT', icon: Code2, color: 'text-yellow-400' },
  { name: 'VUE.JS', icon: Layers, color: 'text-emerald-400' },
  { name: 'NUXT 4', icon: Sparkles, color: 'text-teal-400' },
  { name: 'TAILWIND CSS', icon: Globe, color: 'text-sky-400' },
  { name: 'GIT', icon: GitBranch, color: 'text-orange-400' }
]
</script>

<template>
  <div class="relative w-full overflow-hidden py-4 border-y border-white/10 bg-black/40 backdrop-blur-xl">
    <!-- Gradient Fade Masks -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#040711] to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#040711] to-transparent z-10 pointer-events-none"></div>

    <!-- Scrolling Track -->
    <div class="animate-marquee flex items-center gap-10">
      <!-- First set -->
      <div
        v-for="(item, idx) in techItems"
        :key="`t1-${idx}`"
        class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider text-neutral-300 hover:text-white select-none whitespace-nowrap transition-colors"
      >
        <component :is="item.icon" class="w-4 h-4" :class="item.color" />
        <span>{{ item.name }}</span>
      </div>

      <!-- Duplicate set for seamless infinite loop -->
      <div
        v-for="(item, idx) in techItems"
        :key="`t2-${idx}`"
        class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider text-neutral-300 hover:text-white select-none whitespace-nowrap transition-colors"
      >
        <component :is="item.icon" class="w-4 h-4" :class="item.color" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
