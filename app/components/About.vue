<script setup lang="ts">
import { Check, MapPin } from 'lucide-vue-next'
import { aboutParagraphs, focusAreas, profile } from '~/data/portfolio'
</script>

<template>
  <section id="about" class="section border-t border-line">
    <div class="container-page">
      <div class="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <!-- Portrait -->
        <figure v-reveal class="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div class="absolute -inset-3 -z-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent" aria-hidden="true" />
          <div class="relative overflow-hidden rounded-3xl border border-line bg-subtle">
            <img
              :src="profile.photo"
              :alt="`Portrait of ${profile.name}`"
              width="900"
              height="900"
              loading="lazy"
              class="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
            />
            <figcaption
              class="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-white backdrop-blur-md"
            >
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold">{{ profile.name }}</span>
                <span class="block text-xs text-white/70">CS Graduate · RUPP 2026</span>
              </span>
              <span class="flex shrink-0 items-center gap-1 text-xs text-white/70">
                <MapPin class="h-3.5 w-3.5" />
                Phnom Penh
              </span>
            </figcaption>
          </div>
        </figure>

        <!-- Story -->
        <div v-reveal="80">
          <p class="eyebrow">About</p>
          <h2 class="section-title">Building apps that are simple to use and reliable underneath.</h2>
          <div class="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p v-for="(p, i) in aboutParagraphs" :key="i">{{ p }}</p>
          </div>
        </div>
      </div>

      <ul class="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
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
