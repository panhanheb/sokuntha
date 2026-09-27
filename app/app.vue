<script setup lang="ts">
// Nuxt 4 + Vue 3 Developer Portfolio for Sorn Sokuntha
// Complete iOS 26 Liquid Frosted Glass System
</script>

<template>
  <div class="relative min-h-screen selection:bg-cyan-400/30 selection:text-cyan-200 bg-[#030612] text-white">
    <!-- Whole-screen Atmospheric Ambient Glow & Perspective Grid -->
    <BackgroundOrbs />

    <!-- iOS 26 Dynamic Island Floating Top Notification Pill -->
    <DynamicIslandNotification />

    <!-- Header Navigation -->
    <Navbar />

    <!-- Main Content Flow -->
    <main class="relative z-10 space-y-12">
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Projects />
      <Education />
      <InternshipCta />
      <Contact />
    </main>

    <!-- Frosted Glass Footer -->
    <Footer />

    <!-- Interactive Glass Modals -->
    <CvModal />
    <ProjectModal />
  </div>
</template>
