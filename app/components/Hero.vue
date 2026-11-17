<script setup lang="ts">
import { ArrowRight, Download, MapPin, GraduationCap, Smartphone, Globe, Code } from 'lucide-vue-next'
import { profile, projects } from '~/data/portfolio'

const { openCv, scrollTo } = usePortfolioState()

const appRows = [
  { icon: Smartphone, label: 'Mobile', value: 'Android · Cross-platform' },
  { icon: Globe, label: 'Web', value: 'React · Laravel' },
  { icon: Code, label: 'Languages', value: 'Java · C# · C++' }
]
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

        <div class="mt-9 flex flex-wrap items-center gap-3">
          <button type="button" class="btn-primary" @click="scrollTo('projects')">
            View Projects
            <ArrowRight class="h-4 w-4" />
          </button>
          <button type="button" class="btn-secondary" @click="scrollTo('contact')">Contact Me</button>
          <button type="button" class="btn-ghost" @click="openCv">
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

      <!-- Phone mockup -->
      <div class="relative mx-auto w-full max-w-[300px]" aria-hidden="true">
        <div class="absolute -inset-6 rounded-[3rem] bg-gradient-to-b from-accent/15 to-transparent blur-2xl" />
        <div class="relative rounded-[2.75rem] border border-line bg-surface p-2.5 shadow-2xl shadow-black/10 dark:shadow-black/50">
          <div class="relative overflow-hidden rounded-[2.25rem] border border-line bg-bg">
            <!-- status bar -->
            <div class="flex items-center justify-between px-6 pb-2 pt-3 text-[10px] font-semibold text-fg">
              <span>9:41</span>
              <span class="h-5 w-20 rounded-full bg-fg" />
              <span class="flex gap-0.5">
                <span class="h-2 w-0.5 rounded bg-fg" /><span class="h-2 w-0.5 rounded bg-fg" /><span class="h-2 w-0.5 rounded bg-fg/40" />
              </span>
            </div>

            <div class="px-5 pb-6 pt-4">
              <div class="flex items-center gap-3">
                <img
                  :src="profile.photo"
                  alt=""
                  width="56"
                  height="56"
                  class="h-14 w-14 rounded-2xl object-cover"
                />
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-fg">{{ profile.name }}</p>
                  <p class="text-xs text-muted">Mobile App Developer</p>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-2 gap-2">
                <div class="rounded-2xl bg-subtle p-3">
                  <p class="text-lg font-semibold text-fg">{{ projects.length }}</p>
                  <p class="text-[11px] text-muted">Projects</p>
                </div>
                <div class="rounded-2xl bg-accent p-3 text-accent-fg">
                  <p class="text-lg font-semibold">2026</p>
                  <p class="text-[11px] opacity-80">Graduate</p>
                </div>
              </div>

              <p class="mb-2 mt-5 text-[11px] font-medium uppercase tracking-wider text-faint">Stack</p>
              <ul class="space-y-2">
                <li
                  v-for="row in appRows"
                  :key="row.label"
                  class="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3"
                >
                  <span class="grid h-8 w-8 place-items-center rounded-xl bg-subtle text-accent">
                    <component :is="row.icon" class="h-4 w-4" />
                  </span>
                  <span class="min-w-0">
                    <span class="block text-xs font-medium text-fg">{{ row.label }}</span>
                    <span class="block truncate text-[11px] text-muted">{{ row.value }}</span>
                  </span>
                </li>
              </ul>

              <div class="mt-5 rounded-full bg-fg py-2.5 text-center text-xs font-medium text-bg">Get in touch</div>
              <div class="mx-auto mt-4 h-1 w-24 rounded-full bg-fg/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
