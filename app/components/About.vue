<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { aboutParagraphs, focusAreas } from '~/data/portfolio'
</script>

<template>
  <section id="about" class="section border-t border-line">
    <div class="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div v-reveal>
        <p class="eyebrow">About</p>
        <h2 class="section-title">Building apps that are simple to use and reliable underneath.</h2>
        <div class="mt-6 space-y-4 text-base leading-relaxed text-muted">
          <p v-for="(p, i) in aboutParagraphs" :key="i">{{ p }}</p>
        </div>
      </div>

      <ul class="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        <li v-for="(item, i) in focusAreas" :key="item.title" v-reveal="i * 60" class="bg-surface p-6">
          <span class="grid h-7 w-7 place-items-center rounded-full bg-accent/10 text-accent">
            <Check class="h-4 w-4" />
          </span>
          <h3 class="mt-4 text-sm font-semibold text-fg">{{ item.title }}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
