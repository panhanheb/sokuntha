<script setup lang="ts">
const { syncTheme } = usePortfolioState()
onMounted(syncTheme)
</script>

<template>
  <div class="min-h-screen bg-bg text-fg">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
    >
      Skip to content
    </a>

    <Navbar />

    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <InternshipCta />
      <Contact />
    </main>

    <Footer />

    <CvModal />
    <ProjectModal />
  </div>
</template>
