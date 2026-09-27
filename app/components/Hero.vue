<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Smartphone,
  ArrowUpRight,
  Download,
  Mail,
  Layers,
  Cpu,
  Database,
  MessageSquare,
  Copy,
  Terminal,
  Sparkles
} from 'lucide-vue-next'

const { openCv, triggerDynamicIsland } = usePortfolioState()

// Interactive 3D Parallax Tilt for Profile
const tiltX = ref(0)
const tiltY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!process.client) return
  const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect()
  if (!rect) return
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 26
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -26
  tiltX.value = y
  tiltY.value = x
}

const handleMouseLeave = () => {
  tiltX.value = 0
  tiltY.value = 0
}

// Live Metric Numbers Counter
const projectsCount = ref(0)
const yearCount = ref(2022)
const focusCount = ref(0)

onMounted(() => {
  // Projects: 0 -> 3
  let p = 0
  const pTimer = setInterval(() => {
    if (p < 3) {
      p++
      projectsCount.value = p
    } else {
      clearInterval(pTimer)
    }
  }, 140)

  // Year: 2022 -> 2026
  let y = 2022
  const yTimer = setInterval(() => {
    if (y < 2026) {
      y++
      yearCount.value = y
    } else {
      clearInterval(yTimer)
    }
  }, 75)

  // Focus: 0 -> 100
  let f = 0
  const fTimer = setInterval(() => {
    if (f < 100) {
      f += 4
      focusCount.value = Math.min(f, 100)
    } else {
      clearInterval(fTimer)
    }
  }, 22)
})

const scrollToSection = (id: string) => {
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

const copyContact = (text: string, label: string) => {
  if (!process.client) return
  navigator.clipboard.writeText(text).then(() => {
    triggerDynamicIsland(label, `Copied "${text}" to clipboard`, 'success')
  })
}
</script>

<template>
  <section
    id="home"
    class="relative min-h-[90vh] pt-32 pb-16 flex items-center justify-center overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Floating Cyber Sparkle Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-[20%] left-[12%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f2fe] animate-drift" style="animation-delay: 0s; animation-duration: 9s;"></div>
      <div class="absolute top-[60%] left-[28%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_14px_#a855f7] animate-drift" style="animation-delay: 2s; animation-duration: 11s;"></div>
      <div class="absolute top-[35%] right-[22%] w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_12px_#ec4899] animate-drift" style="animation-delay: 4s; animation-duration: 8s;"></div>
      <div class="absolute top-[75%] right-[12%] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34c759] animate-drift" style="animation-delay: 1.5s; animation-duration: 10s;"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Left Hero Content (matching user reference screenshot) -->
        <div class="lg:col-span-6 flex flex-col items-start space-y-6 text-left z-10">
          
          <!-- Top Tag / Edition Badges -->
          <div class="flex items-center gap-2.5 flex-wrap">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/35 text-xs font-semibold text-emerald-300 shadow-[0_0_20px_rgba(52,199,89,0.2)]">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span class="tracking-wide uppercase text-[11px]">AVAILABLE FOR INTERNSHIP</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-neutral-300">
              v4.0 | Mobile Edition
            </div>
          </div>

          <!-- Massive Title: SORN Sokuntha with Breathing Neon Glow -->
          <div class="space-y-3">
            <h1 class="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tight leading-[1.05]">
              <span class="text-white drop-shadow-md mr-3">SORN</span>
              <span class="neon-gradient-text inline-block">Sokuntha</span>
            </h1>

            <!-- Subtitle Badge with bold tracking -->
            <div class="text-[10px] sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-neutral-300 uppercase flex items-center gap-2 flex-wrap">
              <span class="text-cyan-400 animate-pulse">●</span>
              <span>COMPUTER SCIENCE GRADUATE</span>
              <span class="text-neutral-500">/</span>
              <span>MOBILE APP DEVELOPER</span>
            </div>
          </div>

          <!-- Description paragraph (exact text from readme.md) -->
          <p class="text-base sm:text-lg text-neutral-300/90 leading-relaxed max-w-xl font-normal">
            A passionate and motivated Computer Science graduate with a strong interest in Mobile Application Development. Experienced in developing mobile and web applications and eager to gain real-world experience through a Mobile App Development Internship.
          </p>

          <!-- 3 Stat Metrics Cards with Dynamic Counting & Specular Shine -->
          <div class="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg pt-1">
            <div class="pro-stat-box p-2.5 sm:p-4 flex flex-col justify-center glass-shine-wrapper group cursor-default">
              <span class="text-xl sm:text-3xl font-black text-cyan-300 tracking-tight transition-transform duration-300 group-hover:scale-105">
                0{{ projectsCount }}+
              </span>
              <span class="text-[9px] sm:text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">PROJECTS</span>
            </div>

            <div class="pro-stat-box p-2.5 sm:p-4 flex flex-col justify-center glass-shine-wrapper group cursor-default">
              <span class="text-xl sm:text-3xl font-black text-purple-300 tracking-tight transition-transform duration-300 group-hover:scale-105">
                {{ yearCount }}
              </span>
              <span class="text-[9px] sm:text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">RUPP GRADUATE</span>
            </div>

            <div class="pro-stat-box p-2.5 sm:p-4 flex flex-col justify-center glass-shine-wrapper group cursor-default">
              <span class="text-xl sm:text-3xl font-black text-emerald-300 tracking-tight transition-transform duration-300 group-hover:scale-105">
                {{ focusCount }}%
              </span>
              <span class="text-[9px] sm:text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">INTERNSHIP FOCUS</span>
            </div>
          </div>

          <!-- Action Buttons (matching screenshot) -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
            <!-- View Projects Button -->
            <button
              @click="scrollToSection('projects')"
              class="pro-btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider text-white shadow-xl cursor-pointer group glass-shine-wrapper"
            >
              <span>VIEW PROJECTS</span>
              <ArrowUpRight class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <!-- Let's Talk Button -->
            <button
              @click="scrollToSection('contact')"
              class="pro-btn-secondary flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider text-white shadow-md cursor-pointer hover:border-cyan-400/50 glass-shine-wrapper group"
            >
              <span>LET'S TALK</span>
              <MessageSquare class="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </button>

            <!-- Download CV Button -->
            <button
              @click="openCv"
              class="pro-btn-secondary flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white shadow-md cursor-pointer border-dashed glass-shine-wrapper group"
            >
              <Download class="w-4 h-4 text-purple-400 group-hover:translate-y-0.5 transition-transform" />
              <span>DOWNLOAD CV</span>
            </button>
          </div>

          <!-- Quick Coordinates Pills -->
          <div class="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
            <button
              @click="copyContact('+85599430869', 'Phone Number')"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl pro-pill hover:border-cyan-400/50 hover:text-white transition-all cursor-pointer hover:scale-102"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-mono">+855 99 43 08 69</span>
              <Copy class="w-3 h-3 ml-1 opacity-70" />
            </button>

            <button
              @click="copyContact('sornsokuntha21@gmail.com', 'Email Address')"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl pro-pill hover:border-purple-400/50 hover:text-white transition-all cursor-pointer hover:scale-102"
            >
              <Mail class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
              <span class="font-mono">sornsokuntha21@gmail.com</span>
              <Copy class="w-3 h-3 ml-1 opacity-70" />
            </button>
          </div>

        </div>

        <!-- Right Side: Animated Concentric Orbital Rings & Profile Avatar with True 3D Depth Layers -->
        <div
          class="lg:col-span-6 relative flex items-center justify-center select-none py-8 preserve-3d"
          style="perspective: 1200px;"
        >
          <div
            class="relative w-[290px] xs:w-[330px] sm:w-[440px] lg:w-[520px] aspect-square flex items-center justify-center transition-transform duration-150 ease-out preserve-3d"
            :style="{
              transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
            }"
          >
            
            <!-- Outermost Orbital Ring with Pulse & Rotation -->
            <div class="absolute inset-0 rounded-full border border-purple-500/35 animate-orbit" style="transform: translateZ(10px);"></div>
            
            <!-- Live High-Tech Radar Scanner Beam (Conic Sweep across rings) -->
            <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-45" style="transform: translateZ(20px);">
              <div
                class="w-full h-full rounded-full animate-radar origin-center"
                style="background: conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 242, 254, 0.45) 360deg);"
              ></div>
            </div>

            <!-- Sonar Expansion Wave Pulse -->
            <div class="absolute inset-4 rounded-full border border-cyan-400/35 animate-sonar pointer-events-none" style="transform: translateZ(25px);"></div>

            <!-- Mid Ring with Counter-Rotation -->
            <div class="absolute inset-6 rounded-full border border-cyan-400/35 animate-orbit" style="animation-direction: reverse; animation-duration: 25s; transform: translateZ(35px);"></div>

            <!-- Inner Glow Ring with Deep Ambient Violet Halo -->
            <div class="absolute inset-12 rounded-full border-2 border-indigo-500/40 shadow-[0_0_60px_rgba(88,86,214,0.4)]" style="transform: translateZ(45px);"></div>

            <!-- Central Profile Avatar Canvas with Flowing Liquid Conic Border Pop-Out -->
            <div
              class="relative w-[220px] xs:w-[250px] sm:w-[340px] lg:w-[420px] aspect-square rounded-full p-[3px] overflow-hidden flex items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_80px_rgba(0,242,254,0.5)] group/avatar cursor-pointer transition-transform duration-300 preserve-3d"
              style="transform: translateZ(65px);"
            >
              <!-- Active Flowing Rainbow Conic Gradient Spinner -->
              <div class="absolute inset-[-100%] animate-spin-conic bg-[conic-gradient(from_0deg,#00f2fe,#4facfe,#a855f7,#ec4899,#00f2fe)] opacity-95"></div>

              <!-- Inner Frosted Glass Profile Core with Photograph -->
              <div class="relative w-full h-full rounded-full overflow-hidden bg-slate-950 border border-white/60 flex items-center justify-center backdrop-blur-2xl transition-all duration-500 group-hover/avatar:scale-[0.98]">
                <!-- Profile Image -->
                <img
                  src="/images/sokuntha-profile.jpg"
                  alt="Sorn Sokuntha - Mobile App Developer"
                  class="absolute inset-0 w-full h-full object-cover object-[52%_25%] transition-transform duration-700 ease-out group-hover/avatar:scale-110"
                />

                <!-- Ambient Vignette & Bottom Information Card -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-[#030612]/95 via-[#030612]/40 to-transparent pointer-events-none flex flex-col justify-end p-3 sm:p-7 text-center z-10"
                  style="transform: translateZ(25px);"
                >
                  <h3 class="text-base sm:text-2xl font-black text-white tracking-wide drop-shadow-md group-hover/avatar:text-cyan-300 transition-colors">
                    Sorn Sokuntha
                  </h3>
                  <p class="text-[10px] sm:text-sm text-cyan-300 font-mono mt-0.5 sm:mt-1 font-bold drop-shadow">
                    Mobile App Developer
                  </p>
                  
                  <div class="mt-2 mx-auto px-3 py-0.5 rounded-full pro-pill text-[10px] text-neutral-200 font-mono flex items-center gap-1.5 border border-white/30 backdrop-blur-xl shadow-lg">
                    <span class="relative flex h-1.5 w-1.5">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                    </span>
                    <span>RUPP Graduate • 2026</span>
                  </div>
                </div>

                <!-- Specular Reflection Glare -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-transparent pointer-events-none z-10"></div>
              </div>
            </div>

            <!-- Satellite Badge 1 (Top-Left): Android Native SDK (High-Altitude 3D Float) -->
            <div
              class="absolute -top-3 left-0 sm:-left-5 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#080d1e]/95 border border-cyan-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,242,254,0.45)] backdrop-blur-xl animate-float-1 hover:scale-115 transition-all cursor-pointer"
              style="transform: translateZ(105px);"
            >
              <div class="p-1 rounded-full bg-emerald-500/25 text-emerald-300">
                <Smartphone class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span class="text-[10px] sm:text-xs font-bold text-white tracking-tight">Android Native SDK</span>
            </div>

            <!-- Satellite Badge 2 (Top-Right): Cross-platform Mobile -->
            <div
              class="absolute top-3 -right-2 sm:top-10 sm:-right-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#080d1e]/95 border border-purple-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-xl animate-float-2 hover:scale-115 transition-all cursor-pointer"
              style="transform: translateZ(115px);"
            >
              <div class="p-1 rounded-full bg-purple-500/25 text-purple-300">
                <Layers class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span class="text-[10px] sm:text-xs font-bold text-white tracking-tight">Cross-platform</span>
            </div>

            <!-- Satellite Badge 3 (Bottom-Left): Java & OOP -->
            <div
              class="absolute bottom-3 -left-2 sm:bottom-10 sm:-left-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#080d1e]/95 border border-blue-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.45)] backdrop-blur-xl animate-float-3 hover:scale-115 transition-all cursor-pointer"
              style="transform: translateZ(110px);"
            >
              <div class="p-1 rounded-full bg-blue-500/25 text-cyan-300">
                <Cpu class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span class="text-[10px] sm:text-xs font-bold text-white tracking-tight">Java & OOP</span>
            </div>

            <!-- Satellite Badge 4 (Bottom-Right): Web & Laravel -->
            <div
              class="absolute -bottom-3 right-0 sm:-right-5 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#080d1e]/95 border border-pink-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(236,72,153,0.45)] backdrop-blur-xl animate-float-4 hover:scale-115 transition-all cursor-pointer"
              style="transform: translateZ(120px);"
            >
              <div class="p-1 rounded-full bg-pink-500/25 text-pink-300">
                <Database class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span class="text-[10px] sm:text-xs font-bold text-white tracking-tight">Laravel & PHP</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes spin-conic {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-conic {
  animation: spin-conic 8s linear infinite !important;
}

@keyframes radar-scan {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-radar {
  animation: radar-scan 4.5s linear infinite !important;
}

@keyframes sonar-wave {
  0% { transform: scale(0.9); opacity: 0.85; }
  100% { transform: scale(1.6); opacity: 0; }
}

.animate-sonar {
  animation: sonar-wave 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite !important;
}

@keyframes float-sat-1 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-12px) translateX(5px); }
}

@keyframes float-sat-2 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-14px) translateX(-6px); }
}

@keyframes float-sat-3 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(12px) translateX(6px); }
}

@keyframes float-sat-4 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(12px) translateX(-7px); }
}

.animate-float-1 {
  animation: float-sat-1 4.5s ease-in-out infinite !important;
}

.animate-float-2 {
  animation: float-sat-2 5.5s ease-in-out infinite !important;
}

.animate-float-3 {
  animation: float-sat-3 5s ease-in-out infinite !important;
}

.animate-float-4 {
  animation: float-sat-4 6s ease-in-out infinite !important;
}

@keyframes orbit-pulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
  50% { transform: scale(1.03) rotate(180deg); opacity: 0.9; }
}

.animate-orbit {
  animation: orbit-pulse 16s linear infinite !important;
}

@keyframes glow-pulse-hero {
  0%, 100% {
    filter: drop-shadow(0 0 25px rgba(79, 172, 254, 0.55)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.35));
  }
  50% {
    filter: drop-shadow(0 0 45px rgba(0, 242, 254, 0.85)) drop-shadow(0 0 90px rgba(236, 72, 153, 0.55));
  }
}

.neon-gradient-text {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 35%, #a855f7 70%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow-pulse-hero 4s ease-in-out infinite !important;
}

@keyframes particle-drift {
  0% { transform: translateY(0px) translateX(0px); opacity: 0; }
  25% { opacity: 0.8; }
  75% { opacity: 0.8; }
  100% { transform: translateY(-120px) translateX(25px); opacity: 0; }
}

.animate-drift {
  animation: particle-drift 7s linear infinite !important;
}
</style>
