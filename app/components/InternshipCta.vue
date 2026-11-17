<script setup lang="ts">
import { ArrowRight, Download } from 'lucide-vue-next'

const { openCv, scrollTo } = usePortfolioState()
</script>

<template>
  <section class="section border-t border-line">
    <div class="container-page">
      <div
        v-reveal
        class="relative overflow-hidden rounded-3xl border border-line bg-fg px-6 py-16 text-center text-bg sm:px-16 sm:py-20"
      >
        <div
          class="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/40 blur-3xl"
          aria-hidden="true"
        />
        <div class="relative">
          <p class="font-mono text-xs uppercase tracking-[0.18em] opacity-60">Internship</p>
          <h2 class="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking for an Opportunity to Grow
          </h2>
          <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed opacity-70 sm:text-lg">
            I am currently seeking a Mobile App Development Internship where I can apply my programming knowledge,
            contribute to real-world projects, learn from experienced developers, and grow as a professional software
            developer.
          </p>
          <div class="mx-auto mt-9 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <button type="button" class="btn bg-bg py-3 text-fg hover:bg-bg/90 sm:py-2.5" @click="scrollTo('contact')">
              Contact Me
              <ArrowRight class="h-4 w-4" />
            </button>
            <button type="button" class="btn border border-bg/20 py-3 text-bg hover:border-bg/50 sm:py-2.5" @click="openCv">
              <Download class="h-4 w-4" />
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
