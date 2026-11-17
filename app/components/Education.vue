<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next'
import { education } from '~/data/portfolio'
</script>

<template>
  <section id="education" class="section border-t border-line bg-subtle/40">
    <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div v-reveal>
        <p class="eyebrow">Education</p>
        <h2 class="section-title">Academic background</h2>
        <p class="section-lead">Foundations in computer science, software development and problem solving.</p>
      </div>

      <ol class="relative space-y-6 border-l border-line pl-8">
        <li v-for="(item, i) in education" :key="item.degree" v-reveal="i * 80" class="relative">
          <span
            class="absolute -left-[45px] top-5 grid h-7 w-7 place-items-center rounded-full border border-line bg-surface"
            :class="i === 0 ? 'text-accent' : 'text-faint'"
          >
            <GraduationCap class="h-3.5 w-3.5" />
          </span>
          <div class="card p-6">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <p class="font-mono text-xs text-muted">{{ item.period }}</p>
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="i === 0 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-subtle text-muted'"
              >
                {{ item.status }}
              </span>
            </div>
            <h3 class="mt-3 text-lg font-semibold text-fg">{{ item.degree }}</h3>
            <p class="mt-1 text-sm text-muted">{{ item.school }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
