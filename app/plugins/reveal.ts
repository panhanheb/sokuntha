// v-reveal: fade/slide content in as it scrolls into view.
// Content is visible without JS; elements already on screen at mount are never hidden.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (!('IntersectionObserver' in window)) return
      if (el.getBoundingClientRect().top < window.innerHeight) return

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      el.classList.add('reveal')

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      )
      io.observe(el)
    }
  })
})
