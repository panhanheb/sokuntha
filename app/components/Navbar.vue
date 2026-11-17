<script setup lang="ts">
import { Menu, X, Sun, Moon, FileText } from 'lucide-vue-next'
import { navLinks } from '~/data/portfolio'

const { isDark, toggleTheme, openCv, scrollTo } = usePortfolioState()

const active = ref('home')
const scrolled = ref(false)
const menuOpen = ref(false)

const go = (id: string) => {
  menuOpen.value = false
  scrollTo(id)
}

let observer: IntersectionObserver | null = null
const onScroll = () => (scrolled.value = window.scrollY > 8)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  for (const { id } of navLinks) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
    :class="scrolled || menuOpen ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent'"
  >
    <nav class="container-page flex h-16 items-center justify-between" aria-label="Primary">
      <a href="#home" class="text-sm font-semibold tracking-[0.14em] text-fg" @click.prevent="go('home')">
        SORN SOKUNTHA
      </a>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="relative rounded-full px-3 py-2 text-sm transition-colors"
            :class="active === link.id ? 'text-fg' : 'text-muted hover:text-fg'"
            :aria-current="active === link.id ? 'true' : undefined"
            @click.prevent="go(link.id)"
          >
            {{ link.label }}
            <span
              class="absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-opacity duration-300"
              :class="active === link.id ? 'opacity-100' : 'opacity-0'"
            />
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-fg"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>
        <button type="button" class="btn-primary ml-1 hidden px-4 py-2 sm:inline-flex" @click="openCv">
          <FileText class="h-4 w-4" />
          Resume
        </button>
        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-full text-fg hover:bg-subtle md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="menuOpen" id="mobile-menu" class="border-t border-line md:hidden">
        <ul class="container-page flex flex-col py-3">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="flex items-center justify-between rounded-xl px-3 py-3 text-base"
              :class="active === link.id ? 'bg-subtle text-fg' : 'text-muted'"
              @click.prevent="go(link.id)"
            >
              {{ link.label }}
              <span v-if="active === link.id" class="h-1.5 w-1.5 rounded-full bg-accent" />
            </a>
          </li>
          <li class="mt-2 px-3 pb-2">
            <button type="button" class="btn-primary w-full" @click="menuOpen = false; openCv()">
              <FileText class="h-4 w-4" />
              View Resume
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
