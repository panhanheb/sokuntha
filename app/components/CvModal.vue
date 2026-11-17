<script setup lang="ts">
import { X, Printer } from 'lucide-vue-next'
import { profile, skillGroups, projects, education, reference } from '~/data/portfolio'

const { isCvModalOpen, closeCv } = usePortfolioState()

const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCv()

watch(isCvModalOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

const print = () => window.print()
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
        v-if="isCvModalOpen"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6"
        @click.self="closeCv"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          class="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface sm:rounded-3xl"
        >
          <div class="flex items-center justify-between border-b border-line px-5 py-3">
            <p class="text-sm font-medium text-fg">Resume</p>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-primary px-4 py-2" @click="print">
                <Printer class="h-4 w-4" />
                Save as PDF
              </button>
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-subtle hover:text-fg"
                aria-label="Close"
                @click="closeCv"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Printable document -->
          <div class="overflow-y-auto bg-subtle/60 p-3 sm:p-6">
            <article
              id="cv-document"
              class="mx-auto max-w-[720px] rounded-xl bg-white p-8 text-[13px] leading-relaxed text-zinc-700 shadow-sm sm:p-12"
            >
              <header class="flex items-start justify-between gap-6 border-b border-zinc-200 pb-6">
                <div>
                  <h1 class="text-2xl font-semibold tracking-tight text-zinc-900">{{ profile.name }}</h1>
                  <p class="mt-1 font-medium text-blue-700">{{ profile.role }}</p>
                  <p class="mt-3 text-xs text-zinc-500">
                    {{ profile.phone }} · {{ profile.email }}<br />{{ profile.location }}
                  </p>
                </div>
                <img :src="profile.photo" alt="" class="h-20 w-20 shrink-0 rounded-lg object-cover object-top" />
              </header>

              <section class="mt-6">
                <h2 class="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900">Profile</h2>
                <p class="mt-2">{{ profile.summary }}</p>
              </section>

              <section class="mt-6">
                <h2 class="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900">Education</h2>
                <div v-for="e in education" :key="e.degree" class="mt-2 flex justify-between gap-4">
                  <p><span class="font-medium text-zinc-900">{{ e.degree }}</span> — {{ e.school }}</p>
                  <p class="shrink-0 text-zinc-500">{{ e.period }}</p>
                </div>
              </section>

              <section class="mt-6">
                <h2 class="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900">Skills</h2>
                <dl class="mt-2 space-y-1">
                  <div v-for="g in skillGroups" :key="g.id" class="grid grid-cols-[140px_1fr] gap-2">
                    <dt class="font-medium text-zinc-900">{{ g.title }}</dt>
                    <dd>{{ g.items.join(', ') }}</dd>
                  </div>
                </dl>
              </section>

              <section class="mt-6">
                <h2 class="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900">Projects</h2>
                <div v-for="p in projects" :key="p.id" class="mt-2">
                  <p class="font-medium text-zinc-900">
                    {{ p.title }} <span class="font-normal text-zinc-500">· {{ p.technologies.join(', ') }}</span>
                  </p>
                  <p>{{ p.features.join(' · ') }}</p>
                </div>
              </section>

              <section class="mt-6">
                <h2 class="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900">Reference</h2>
                <p class="mt-2">
                  <span class="font-medium text-zinc-900">{{ reference.name }}</span>, {{ reference.title }},
                  {{ reference.org }} · {{ reference.phone }} · {{ reference.email }}
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
