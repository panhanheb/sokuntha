<script setup lang="ts">
import { Bell, CheckCircle2, Sparkles, Smartphone } from 'lucide-vue-next'

const { islandNotification } = usePortfolioState()
</script>

<template>
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ease-out">
    <div
      v-if="islandNotification.show"
      class="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/90 text-white backdrop-blur-2xl border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,122,255,0.4)] animate-in fade-in slide-in-from-top-3 duration-300"
    >
      <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner">
        <Sparkles v-if="islandNotification.type === 'haptic'" class="w-4 h-4 text-white animate-spin" style="animation-duration: 4s;" />
        <CheckCircle2 v-else-if="islandNotification.type === 'success'" class="w-4 h-4 text-emerald-300" />
        <Smartphone v-else class="w-4 h-4 text-cyan-200" />
        <span class="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
      </div>
      <div class="flex flex-col pr-1">
        <span class="text-xs font-semibold tracking-wide text-white/95 leading-tight">
          {{ islandNotification.title }}
        </span>
        <span v-if="islandNotification.subtitle" class="text-[11px] text-white/70 leading-tight">
          {{ islandNotification.subtitle }}
        </span>
      </div>
      <button
        @click="islandNotification.show = false"
        class="ml-1 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <span class="text-xs font-bold leading-none">&times;</span>
      </button>
    </div>
  </div>
</template>
