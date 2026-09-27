<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Download
} from 'lucide-vue-next'

const { activeSection, isDarkMode, toggleDarkMode, openCv } = usePortfolioState()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONTACT' }
]

const handleScroll = () => {
  if (!process.client) return
  isScrolled.value = window.scrollY > 20

  const sections = ['home', ...navItems.map(item => item.id)].map(id => document.getElementById(id))
  const scrollPosition = window.scrollY + 180

  for (let i = sections.length - 1; i >= 0; i--) {
    const el = sections[i]
    if (el && el.offsetTop <= scrollPosition) {
      activeSection.value = sections[i]?.id || 'home'
      break
    }
  }
}

const scrollToSection = (id: string) => {
  isMobileMenuOpen.value = false
  if (!process.client) return
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="[isScrolled ? 'bg-[#030612]/85 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-5']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      
      <!-- Brand Logo (matching screenshot style) -->
      <a
        href="#home"
        @click.prevent="scrollToSection('home')"
        class="group flex items-center gap-3 focus:outline-none"
      >
        <div class="w-9 h-9 rounded-xl overflow-hidden border border-white/40 shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
          <img src="/images/sokuntha-profile.jpg" alt="Sorn Sokuntha" class="w-full h-full object-cover object-[50%_20%]" />
        </div>
        <div class="flex items-baseline gap-1.5">
          <span class="text-base font-black tracking-tight text-white">SORN</span>
          <span class="text-base font-black tracking-tight neon-gradient-text">Sokuntha</span>
        </div>
      </a>

      <!-- Center Pill Navigation -->
      <nav class="hidden md:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-inner space-x-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="scrollToSection(item.id)"
          class="px-3.5 py-1 text-[11px] font-bold tracking-wider rounded-full transition-all cursor-pointer select-none"
          :class="[
            activeSection === item.id
              ? 'text-white bg-white/15 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          ]"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Right Action Controls -->
      <div class="hidden lg:flex items-center gap-3">
        <!-- Status Sync Pill -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>AVAILABLE FOR HIRE</span>
        </div>

        <!-- Sun/Moon Toggle Button -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
          :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          :aria-label="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <Sun v-if="isDarkMode" class="w-4 h-4 text-amber-300" />
          <Moon v-else class="w-4 h-4 text-indigo-400" />
        </button>

        <!-- HIRE ME -> Button -->
        <button
          @click="scrollToSection('contact')"
          class="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-xs font-bold text-white tracking-wider uppercase transition-all shadow-md cursor-pointer hover:border-cyan-400/50"
        >
          <span>HIRE ME</span>
          <ArrowRight class="w-3.5 h-3.5 text-cyan-300" />
        </button>
      </div>

      <!-- Mobile Hamburger Controls -->
      <div class="flex items-center gap-2 md:hidden">
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300"
          :aria-label="isDarkMode ? 'Switch to Light' : 'Switch to Dark'"
        >
          <Sun v-if="isDarkMode" class="w-4 h-4 text-amber-300" />
          <Moon v-else class="w-4 h-4 text-indigo-400" />
        </button>

        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300"
          :aria-label="isMobileMenuOpen ? 'Close Menu' : 'Open Menu'"
        >
          <X v-if="isMobileMenuOpen" class="w-5 h-5 text-white" />
          <Menu v-else class="w-5 h-5 text-white" />
        </button>
      </div>

    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden mt-3 max-w-sm mx-auto p-4 rounded-3xl bg-[#080d1e]/95 border border-white/15 backdrop-blur-2xl shadow-2xl"
    >
      <div class="flex flex-col space-y-1.5">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="scrollToSection(item.id)"
          class="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all"
          :class="[
            activeSection === item.id
              ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
              : 'text-neutral-300 hover:bg-white/10'
          ]"
        >
          <span>{{ item.label }}</span>
          <span v-if="activeSection === item.id" class="w-2 h-2 rounded-full bg-cyan-400"></span>
        </button>

        <div class="pt-3 border-t border-white/10 flex gap-2">
          <button
            @click="openCv(); isMobileMenuOpen = false"
            class="flex-1 pro-btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"
          >
            <Download class="w-4 h-4" />
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
