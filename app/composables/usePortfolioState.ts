import type { Project } from '~/data/portfolio'

export const usePortfolioState = () => {
  const isCvModalOpen = useState<boolean>('isCvModalOpen', () => false)
  const activeProject = useState<Project | null>('activeProject', () => null)
  const isDark = useState<boolean>('isDark', () => true)

  const syncTheme = () => {
    if (import.meta.client) isDark.value = document.documentElement.classList.contains('dark')
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    } catch {
      // storage unavailable — theme still applies for this visit
    }
  }

  const scrollTo = (id: string) => {
    if (!import.meta.client) return
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  return {
    isCvModalOpen,
    openCv: () => (isCvModalOpen.value = true),
    closeCv: () => (isCvModalOpen.value = false),
    activeProject,
    openProject: (p: Project) => (activeProject.value = p),
    closeProject: () => (activeProject.value = null),
    isDark,
    syncTheme,
    toggleTheme,
    scrollTo
  }
}
