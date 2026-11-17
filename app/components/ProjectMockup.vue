<script setup lang="ts">
import type { Project } from '~/data/portfolio'

defineProps<{ type: Project['mockup'] }>()
</script>

<template>
  <div class="relative flex h-full w-full items-end justify-center overflow-hidden" aria-hidden="true">
    <!-- Phone -->
    <div
      v-if="type === 'phone'"
      class="mt-7 w-[40%] self-start rounded-t-[1.6rem] border border-b-0 border-line bg-surface p-1.5 pb-0 shadow-xl shadow-black/10"
    >
      <div class="rounded-t-[1.25rem] bg-bg p-3 pb-6">
        <div class="mx-auto h-1.5 w-10 rounded-full bg-fg/80" />
        <div class="mt-4 h-2 w-16 rounded bg-fg/70" />
        <div class="mt-1.5 h-1.5 w-24 rounded bg-fg/20" />
        <div class="mt-4 rounded-xl bg-accent/90 p-2.5">
          <div class="h-1.5 w-12 rounded bg-accent-fg/80" />
          <div class="mt-1.5 h-1.5 w-20 rounded bg-accent-fg/50" />
        </div>
        <div v-for="n in 3" :key="n" class="mt-2 flex items-center gap-2 rounded-xl bg-subtle p-2">
          <div class="h-5 w-5 rounded-lg bg-fg/15" />
          <div class="flex-1 space-y-1">
            <div class="h-1.5 w-3/4 rounded bg-fg/40" />
            <div class="h-1.5 w-1/2 rounded bg-fg/15" />
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div
      v-else-if="type === 'dashboard'"
      class="w-[82%] translate-y-6 overflow-hidden rounded-t-xl border border-b-0 border-line bg-surface shadow-xl shadow-black/10"
    >
      <div class="flex">
        <div class="w-1/4 space-y-2 border-r border-line bg-subtle p-3">
          <div class="h-2 w-10 rounded bg-fg/60" />
          <div v-for="n in 4" :key="n" class="h-1.5 rounded" :class="n === 1 ? 'bg-accent' : 'bg-fg/15'" />
        </div>
        <div class="flex-1 p-3">
          <div class="grid grid-cols-3 gap-2">
            <div v-for="n in 3" :key="n" class="rounded-lg border border-line p-2">
              <div class="h-1.5 w-8 rounded bg-fg/20" />
              <div class="mt-1.5 h-2.5 w-6 rounded" :class="n === 2 ? 'bg-accent' : 'bg-fg/60'" />
            </div>
          </div>
          <div class="mt-3 space-y-1.5">
            <div v-for="n in 4" :key="n" class="flex items-center gap-2">
              <div class="h-1.5 flex-1 rounded bg-fg/15" />
              <div class="h-3 w-8 rounded-full" :class="n % 2 ? 'bg-emerald-500/30' : 'bg-accent/25'" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Browser + small screens -->
    <div v-else class="relative w-[78%] translate-y-6">
      <div class="overflow-hidden rounded-t-xl border border-b-0 border-line bg-surface shadow-xl shadow-black/10">
        <div class="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span class="h-2 w-2 rounded-full bg-fg/20" /><span class="h-2 w-2 rounded-full bg-fg/20" /><span class="h-2 w-2 rounded-full bg-fg/20" />
          <span class="ml-2 h-3 flex-1 rounded-full bg-subtle" />
        </div>
        <div class="p-4">
          <div class="h-2.5 w-1/2 rounded bg-fg/70" />
          <div class="mt-2 h-1.5 w-3/4 rounded bg-fg/20" />
          <div class="mt-4 grid grid-cols-3 gap-2">
            <div v-for="n in 3" :key="n" class="h-10 rounded-lg" :class="n === 1 ? 'bg-accent/80' : 'bg-subtle'" />
          </div>
        </div>
      </div>
      <div class="absolute -right-3 bottom-0 w-[24%] rounded-t-lg border border-b-0 border-line bg-surface p-1 pb-0 shadow-lg">
        <div class="space-y-1 rounded-t-md bg-bg p-1.5 pb-4">
          <div class="h-1.5 w-3/4 rounded bg-fg/60" />
          <div class="h-5 rounded bg-accent/70" />
          <div class="h-3 rounded bg-subtle" />
        </div>
      </div>
    </div>
  </div>
</template>
