<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
import { navLinks, profile } from '~/data/portfolio'

const { scrollTo } = usePortfolioState()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-semibold tracking-[0.14em] text-fg">SORN SOKUNTHA</p>
        <p class="mt-1 text-sm text-muted">{{ profile.role }}</p>
      </div>

      <nav aria-label="Footer">
        <ul class="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <li v-for="l in navLinks" :key="l.id">
            <a :href="`#${l.id}`" class="hover:text-fg" @click.prevent="scrollTo(l.id)">{{ l.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-page flex items-center justify-between border-t border-line py-6 text-xs text-faint">
      <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>
      <button type="button" class="inline-flex items-center gap-1 hover:text-fg" @click="scrollTo('home')">
        Back to top
        <ArrowUp class="h-3.5 w-3.5" />
      </button>
    </div>
  </footer>
</template>
