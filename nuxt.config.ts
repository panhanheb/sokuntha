// https://nuxt.com/docs/api/configuration/nuxt-config
const title = 'Sorn Sokuntha — Mobile App Developer'
const description =
  'Portfolio of Sorn Sokuntha, a Computer Science graduate from the Royal University of Phnom Penh seeking a Mobile App Development internship.'

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){document.documentElement.classList.add('dark')}})()`

export default defineNuxtConfig({
  compatibilityDate: '2026-09-24',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/../tailwind.config.ts'
  },

  app: {
    head: {
      title,
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: description },
        { name: 'author', content: 'Sorn Sokuntha' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: '/images/sokuntha-portrait.jpg' },
        { name: 'theme-color', content: '#fafaf9', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#09090b', media: '(prefers-color-scheme: dark)' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ],
      script: [{ innerHTML: themeScript, tagPosition: 'head' }]
    }
  },

  routeRules: {
    '/': { prerender: true }
  }
})
