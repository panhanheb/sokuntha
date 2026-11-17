<script setup lang="ts">
import { ArrowRight, Github, Check } from 'lucide-vue-next'
import { projects } from '~/data/portfolio'

const { openProject } = usePortfolioState()
</script>

<template>
  <section id="projects" class="section border-t border-line">
    <div class="container-page">
      <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-2xl">
          <p class="eyebrow">Projects</p>
          <h2 class="section-title">Selected work</h2>
          <p class="section-lead">
            Academic and personal projects covering mobile, web systems and responsive front-end development.
          </p>
        </div>
        <p class="font-mono text-xs text-faint">{{ String(projects.length).padStart(2, '0') }} projects</p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          v-reveal="i * 80"
          class="card group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40"
        >
          <!-- Preview -->
          <div
            class="relative aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-br from-subtle via-subtle to-accent/15"
          >
            <div class="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
              <ProjectMockup :type="project.mockup" />
            </div>
            <span
              class="absolute left-4 top-4 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[11px] font-medium text-fg backdrop-blur"
            >
              {{ project.type }}
            </span>
            <span class="absolute right-4 top-4 font-mono text-xs text-faint">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>

          <!-- Body -->
          <div class="flex flex-1 flex-col p-6">
            <h3 class="text-lg font-semibold tracking-tight text-fg">{{ project.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ project.summary }}</p>

            <ul class="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px] text-muted">
              <li v-for="f in project.features" :key="f" class="flex items-start gap-1.5">
                <Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{{ f }}</span>
              </li>
            </ul>

            <ul class="mt-5 flex flex-wrap gap-1.5 pb-6">
              <li
                v-for="t in project.technologies"
                :key="t"
                class="rounded-md bg-subtle px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {{ t }}
              </li>
            </ul>

            <!-- Footer -->
            <div class="mt-auto flex items-center justify-between border-t border-line pt-4">
              <button
                type="button"
                class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-fg transition-colors hover:text-accent"
                @click="openProject(project)"
              >
                View Project
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span
                class="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-faint"
                title="Repository link coming soon — source available on request"
              >
                <Github class="h-3.5 w-3.5" />
                Code on request
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
