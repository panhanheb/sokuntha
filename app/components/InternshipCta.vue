<script setup lang="ts">
import {
  Rocket,
  Mail,
  Download,
  ArrowRight,
  CheckCircle2,
  Phone,
  Copy,
  Sparkles
} from 'lucide-vue-next'

const { openCv, triggerDynamicIsland } = usePortfolioState()

const scrollToContact = () => {
  if (!process.client) return
  const el = document.getElementById('contact')
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

const copyToClipboard = (text: string, label: string) => {
  if (!process.client) return
  navigator.clipboard.writeText(text).then(() => {
    triggerDynamicIsland(label, `Copied "${text}" to clipboard`, 'success')
  })
}
</script>

<template>
  <section class="py-20 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Keynote-Grade Frosted Glass Callout -->
      <div class="relative rounded-[36px] overflow-hidden p-8 sm:p-14 lg:p-16 pro-card border border-white/20 shadow-[0_25px_70px_-15px_rgba(0,113,227,0.4)]">
        
        <!-- Ambient Iridescent Glows -->
        <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-7">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full pro-pill text-xs font-semibold text-cyan-300">
            <Rocket class="w-4 h-4 text-cyan-400" />
            <span class="tracking-wide uppercase text-[11px]">CAREER OPPORTUNITY</span>
          </div>

          <!-- Section Title -->
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Looking for an Opportunity to Grow
          </h2>

          <!-- Exact Quote from readme.md -->
          <blockquote class="text-base sm:text-xl text-neutral-200 leading-relaxed font-normal max-w-2xl border-l-2 border-cyan-400/60 pl-4 py-1 text-left sm:text-center sm:border-l-0 sm:pl-0">
            "I am currently seeking a Mobile App Development Internship where I can apply my programming knowledge, contribute to real-world projects, learn from experienced developers, and grow as a professional software developer."
          </blockquote>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              @click="scrollToContact"
              class="pro-btn-primary flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider text-white shadow-xl group cursor-pointer"
            >
              <Mail class="w-4 h-4" />
              <span>CONTACT ME</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              @click="openCv"
              class="pro-btn-secondary flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider text-white shadow-md hover:border-cyan-400/50 cursor-pointer"
            >
              <Download class="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD CV</span>
            </button>
          </div>

          <!-- Direct Coordinates Pills -->
          <div class="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400">
            <button
              @click="copyToClipboard('+85599430869', 'Phone Number')"
              class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl pro-pill hover:border-cyan-400/40 hover:text-white transition-all cursor-pointer"
            >
              <Phone class="w-3.5 h-3.5 text-cyan-400" />
              <span class="font-mono">+855 99 43 08 69</span>
              <Copy class="w-3 h-3 ml-1 opacity-70" />
            </button>

            <button
              @click="copyToClipboard('sornsokuntha21@gmail.com', 'Email Address')"
              class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl pro-pill hover:border-purple-400/40 hover:text-white transition-all cursor-pointer"
            >
              <Mail class="w-3.5 h-3.5 text-purple-400" />
              <span class="font-mono">sornsokuntha21@gmail.com</span>
              <Copy class="w-3 h-3 ml-1 opacity-70" />
            </button>
          </div>

          <!-- Recruiter Guarantees -->
          <div class="pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span class="flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-400" />
              <span class="font-medium">Quick Learner & Adaptable</span>
            </span>
            <span class="flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-cyan-400" />
              <span class="font-medium">Full Internship Availability</span>
            </span>
            <span class="flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-purple-400" />
              <span class="font-medium">Dedicated Team Player</span>
            </span>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
