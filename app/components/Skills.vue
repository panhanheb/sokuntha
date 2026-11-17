<script setup lang="ts">
import { Smartphone, Code, Globe, Wrench, Users } from 'lucide-vue-next'
import { skillGroups } from '~/data/portfolio'

const icons: Record<string, unknown> = {
  mobile: Smartphone,
  programming: Code,
  web: Globe,
  tools: Wrench,
  soft: Users
}
</script>

<template>
  <section id="skills" class="section border-t border-line bg-subtle/40">
    <div class="container-page">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">Skills</p>
        <h2 class="section-title">Technical toolkit</h2>
        <p class="section-lead">
          The languages, frameworks and tools I've used across coursework and personal projects, with mobile development as my main focus.
        </p>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(group, i) in skillGroups"
          :key="group.id"
          v-reveal="i * 60"
          class="card p-6 transition-colors hover:border-fg/20"
          :class="group.id === 'mobile' ? 'lg:col-span-1 ring-1 ring-accent/30' : ''"
        >
          <div class="flex items-center justify-between">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-subtle text-accent">
              <component :is="icons[group.id]" class="h-5 w-5" />
            </span>
            <span v-if="group.id === 'mobile'" class="font-mono text-[10px] uppercase tracking-wider text-accent">
              Primary focus
            </span>
          </div>
          <h3 class="mt-5 text-base font-semibold text-fg">{{ group.title }}</h3>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
