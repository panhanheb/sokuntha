<script setup lang="ts">
import {
  X,
  Smartphone,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  Calendar
} from 'lucide-vue-next'

const { activeProject, closeProject, triggerDynamicIsland } = usePortfolioState()

const handleGithubClick = () => {
  triggerDynamicIsland('Academic Repository', 'Source code available upon recruitment review', 'info')
}
</script>

<template>
  <div
    v-if="activeProject"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
  >
    <div
      @click="closeProject"
      class="absolute inset-0 bg-black/75 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
    ></div>

    <div
      class="relative w-full max-w-2xl rounded-[32px] ios-glass-nav border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col"
    >
      <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center border border-white/20">
            <Smartphone class="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 class="text-base font-bold text-white tracking-tight">
              {{ activeProject.title }}
            </h3>
            <p class="text-xs text-cyan-300 font-medium">
              {{ activeProject.subtitle }}
            </p>
          </div>
        </div>

        <button
          @click="closeProject"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          aria-label="Close project modal"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 sm:p-8 overflow-y-auto space-y-6">
        <div>
          <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Project Overview</h4>
          <p class="text-sm sm:text-base text-neutral-200 light:text-slate-700 leading-relaxed">
            {{ activeProject.description }}
          </p>
        </div>

        <div>
          <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Key Features & Modules</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="feat in activeProject.features"
              :key="feat"
              class="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10"
            >
              <CheckCircle2 class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span class="text-xs font-medium text-neutral-200">{{ feat }}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">Technologies Used</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in activeProject.technologies"
              :key="tech"
              class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-400/30"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-neutral-300">
          <ShieldCheck class="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Developed as part of software engineering coursework and practical system development.</span>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between flex-wrap gap-3">
        <button
          @click="handleGithubClick"
          class="ios-btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white"
        >
          <Github class="w-4 h-4" />
          <span>GitHub (University Project)</span>
        </button>

        <button
          @click="closeProject"
          class="ios-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"
        >
          Close Preview
        </button>
      </div>
    </div>
  </div>
</template>
