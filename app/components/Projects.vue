<script setup lang="ts">
import { ArrowUpRight, Github } from 'lucide-vue-next'
import { projects } from '~/data/portfolio'

const { openProject } = usePortfolioState()
</script>

<template>
  <section id="projects" class="section border-t border-line">
    <div class="container-page">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">Projects</p>
        <h2 class="section-title">Selected work</h2>
        <p class="section-lead">
          Academic and personal projects covering mobile, web systems and responsive front-end development.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          v-reveal="i * 80"
          class="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-fg/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40"
        >
          <button
            type="button"
            class="relative block aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-br from-subtle to-accent/10"
            :aria-label="`View details for ${project.title}`"
            @click="openProject(project)"
          >
            <div class="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              <ProjectMockup :type="project.mockup" />
            </div>
          </button>

          <div class="flex flex-1 flex-col p-6">
            <p class="font-mono text-[11px] uppercase tracking-wider text-faint">{{ project.type }}</p>
            <h3 class="mt-2 text-lg font-semibold text-fg">{{ project.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ project.summary }}</p>

            <ul class="mt-4 space-y-1.5 text-sm text-muted">
              <li v-for="f in project.features" :key="f" class="flex items-center gap-2">
                <span class="h-1 w-1 rounded-full bg-accent" />
                {{ f }}
              </li>
            </ul>

            <ul class="mt-5 flex flex-wrap gap-1.5">
              <li v-for="t in project.technologies" :key="t" class="chip">{{ t }}</li>
            </ul>

            <div class="mt-auto flex items-center gap-2 pt-6">
              <button type="button" class="btn-secondary px-4 py-2" @click="openProject(project)">
                View Project
                <ArrowUpRight class="h-4 w-4" />
              </button>
              <span
                class="btn-ghost cursor-default py-2 text-faint hover:text-faint"
                title="Repository link coming soon — source available on request"
              >
                <Github class="h-4 w-4" />
                Code on request
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
