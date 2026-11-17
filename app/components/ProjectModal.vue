<script setup lang="ts">
import { X, Github, Mail } from 'lucide-vue-next'
import { profile } from '~/data/portfolio'

const { activeProject, closeProject } = usePortfolioState()

const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeProject()

watch(activeProject, (p) => {
  if (!import.meta.client) return
  document.body.style.overflow = p ? 'hidden' : ''
  if (p) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="activeProject"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        @click.self="closeProject"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="activeProject.title"
          class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-surface sm:rounded-3xl"
        >
          <div class="relative aspect-[16/8] border-b border-line bg-gradient-to-br from-subtle to-accent/10">
            <ProjectMockup :type="activeProject.mockup" />
            <button
              type="button"
              class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted hover:text-fg"
              aria-label="Close"
              @click="closeProject"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <div class="p-6 sm:p-8">
            <p class="font-mono text-[11px] uppercase tracking-wider text-faint">{{ activeProject.type }}</p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-fg">{{ activeProject.title }}</h2>
            <p class="mt-3 leading-relaxed text-muted">{{ activeProject.details }}</p>

            <div class="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-wider text-faint">Key features</h3>
                <ul class="mt-3 space-y-2 text-sm text-fg">
                  <li v-for="f in activeProject.features" :key="f" class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-accent" />
                    {{ f }}
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-wider text-faint">Technologies</h3>
                <ul class="mt-3 flex flex-wrap gap-1.5">
                  <li v-for="t in activeProject.technologies" :key="t" class="chip">{{ t }}</li>
                </ul>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <a
                :href="`mailto:${profile.email}?subject=${encodeURIComponent(activeProject.title)}`"
                class="btn-primary w-full py-3 sm:w-auto sm:py-2.5"
              >
                <Mail class="h-4 w-4" />
                Ask about this project
              </a>
              <span class="inline-flex items-center gap-2 text-sm text-faint">
                <Github class="h-4 w-4" />
                Repository link coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
