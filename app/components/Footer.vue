<script setup lang="ts">
import {
  ArrowUp,
  Sparkles,
  Smartphone,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Send,
  ExternalLink
} from 'lucide-vue-next'

const { triggerDynamicIsland } = usePortfolioState()

const scrollToTop = () => {
  if (!process.client) return
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com',
    color: 'hover:text-[#1877F2]',
    borderColor: 'hover:border-[#1877F2]/60',
    glowColor: 'hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]',
    badge: 'Social'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: 'hover:text-[#0A66C2]',
    borderColor: 'hover:border-[#0A66C2]/60',
    glowColor: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]',
    badge: 'Network'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    color: 'hover:text-[#E4405F]',
    borderColor: 'hover:border-[#E4405F]/60',
    glowColor: 'hover:shadow-[0_0_20px_rgba(228,64,95,0.4)]',
    badge: 'Media'
  },
  {
    name: 'Telegram',
    icon: Send,
    url: 'https://t.me/+85599430869',
    color: 'hover:text-[#229ED9]',
    borderColor: 'hover:border-[#229ED9]/60',
    glowColor: 'hover:shadow-[0_0_20px_rgba(34,158,217,0.4)]',
    badge: 'Direct Chat'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com',
    color: 'hover:text-[#FF0000]',
    borderColor: 'hover:border-[#FF0000]/60',
    glowColor: 'hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]',
    badge: 'Video'
  },
  {
    name: 'Gmail',
    icon: Mail,
    url: 'mailto:sornsokuntha21@gmail.com',
    color: 'hover:text-[#EA4335]',
    borderColor: 'hover:border-[#EA4335]/60',
    glowColor: 'hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]',
    badge: 'Email'
  }
]

const handleSocialClick = (social: typeof socialLinks[0]) => {
  triggerDynamicIsland(
    social.name,
    social.name === 'Gmail'
      ? 'Opening mail composer for sornsokuntha21@gmail.com'
      : `Connecting to ${social.name}...`,
    'info'
  )
}
</script>

<template>
  <footer class="relative z-10 border-t border-white/10 py-16 mt-20 bg-black/50 backdrop-blur-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Top Card: Monogram, Identity & Back To Top -->
      <div class="rounded-3xl p-8 pro-card flex flex-col md:flex-row items-center justify-between gap-6">
        
        <!-- Brand & Title -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/50 shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-transform duration-300 hover:scale-105 flex-shrink-0">
            <img src="/images/sokuntha-profile.jpg" alt="Sorn Sokuntha" class="w-full h-full object-cover object-[50%_20%]" />
          </div>
          <div>
            <h4 class="text-lg font-black text-white tracking-wide flex items-center gap-2.5">
              <span>SORN SOKUNTHA</span>
              <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/35">
                iOS 26 Liquid Glass
              </span>
            </h4>
            <p class="text-xs text-neutral-400 mt-0.5">
              Computer Science Graduate (RUPP) • Mobile App Developer
            </p>
          </div>
        </div>

        <!-- Academic & Architecture summary -->
        <div class="text-center md:text-right space-y-1">
          <p class="text-xs text-neutral-300 flex items-center justify-center md:justify-end gap-1.5 font-medium">
            <span>Royal University of Phnom Penh (RUPP)</span>
            <span class="text-cyan-400">●</span>
            <span>2022 – 2026 Graduated</span>
          </p>
          <p class="text-[11px] text-neutral-400 font-mono">
            Phnom Penh, Cambodia • +855 99 43 08 69
          </p>
        </div>

        <!-- Back to Top Glass Button -->
        <button
          @click="scrollToTop"
          class="p-3.5 rounded-2xl pro-btn-secondary text-neutral-200 hover:text-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 shadow-lg group"
          title="Back to Top"
          aria-label="Back to top"
        >
          <ArrowUp class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>

      <!-- Social Channels Bar (Facebook, LinkedIn, Instagram, Telegram, YouTube, Gmail) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="section-tag text-cyan-400 flex items-center gap-2">
            <span>CHANNELS //</span>
            <span>CONNECT ACROSS PLATFORMS</span>
          </div>
          <span class="text-[11px] text-neutral-400 font-mono hidden sm:inline-block">6 Channels Available</span>
        </div>

        <!-- 6 Social Buttons Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            @click="handleSocialClick(social)"
            class="group pro-stat-box p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer glass-shine-wrapper border border-white/10"
            :class="[social.borderColor, social.glowColor]"
          >
            <!-- Icon with Glow -->
            <div
              class="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              :class="social.color"
            >
              <component :is="social.icon" class="w-5 h-5 transition-colors" />
            </div>

            <!-- Platform Name -->
            <div class="text-center">
              <span class="text-xs font-bold text-white tracking-wide block transition-colors" :class="social.color">
                {{ social.name }}
              </span>
              <span class="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                {{ social.badge }}
              </span>
            </div>
          </a>
        </div>
      </div>

      <!-- Bottom copyright note -->
      <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© 2026 Sorn Sokuntha. Computer Science Graduate & Mobile App Developer.</p>
        <p class="font-mono text-[11px] text-neutral-400">
          Built with Nuxt 4 + Vue 3 + Tailwind CSS
        </p>
      </div>

    </div>
  </footer>
</template>
