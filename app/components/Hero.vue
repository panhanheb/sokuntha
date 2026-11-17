<script setup lang="ts">
import { ArrowRight, Download, MapPin, GraduationCap } from 'lucide-vue-next'
import { profile } from '~/data/portfolio'

const { openCv, scrollTo } = usePortfolioState()
</script>

<template>
  <section id="home" class="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
    <div class="bg-dots pointer-events-none absolute inset-0 -z-0" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-accent/10 blur-3xl"
      aria-hidden="true"
    />

    <div class="container-page relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
      <!-- Intro -->
      <div>
        <p class="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to Mobile App Development internships
        </p>

        <h1 class="mt-6 text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
          Hi, I'm {{ profile.name }}.
        </h1>
        <p class="mt-4 text-xl font-medium tracking-tight text-muted sm:text-2xl">
          {{ profile.headline }}
        </p>
        <p class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {{ profile.summary }}
        </p>

        <div class="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <button type="button" class="btn-primary col-span-2 py-3 sm:py-2.5" @click="scrollTo('projects')">
            View Projects
            <ArrowRight class="h-4 w-4" />
          </button>
          <button type="button" class="btn-secondary py-3 sm:py-2.5" @click="scrollTo('contact')">Contact Me</button>
          <button
            type="button"
            class="btn-secondary py-3 sm:border-transparent sm:bg-transparent sm:px-3 sm:py-2.5 sm:text-muted sm:hover:text-fg"
            @click="openCv"
          >
            <Download class="h-4 w-4" />
            Download CV
          </button>
        </div>

        <dl class="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <div class="flex items-center gap-2">
            <MapPin class="h-4 w-4 text-faint" />
            <dt class="sr-only">Location</dt>
            <dd>{{ profile.locationShort }}</dd>
          </div>
          <div class="flex items-center gap-2">
            <GraduationCap class="h-4 w-4 text-faint" />
            <dt class="sr-only">Education</dt>
            <dd>B.Sc. Computer Science, RUPP · 2026</dd>
          </div>
        </dl>
      </div>

      <!-- Profile portrait -->
      <figure class="relative mx-auto w-full max-w-[360px] lg:max-w-[400px]">
        <div
          class="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent blur-2xl"
          aria-hidden="true"
        />
        <div
          class="relative overflow-hidden rounded-[2rem] border border-line bg-subtle shadow-2xl shadow-black/10 dark:shadow-black/50"
        >
          <img
            :src="profile.photo"
            :alt="`Portrait of ${profile.name}`"
            width="900"
            height="900"
            fetchpriority="high"
            class="aspect-[4/5] w-full object-cover object-top"
          />
          <figcaption
            class="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-white backdrop-blur-md"
          >
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold">{{ profile.name }}</span>
              <span class="block text-xs text-white/70">Web Developer</span>
            </span>
            <span class="flex shrink-0 items-center gap-1 text-xs text-white/70">
              <MapPin class="h-3.5 w-3.5" />
              Phnom Penh
            </span>
          </figcaption>
        </div>
      </figure>
    </div>
  </section>
</template>
