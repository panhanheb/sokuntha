import confetti from 'canvas-confetti'

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: 'Mobile' | 'Web' | 'System'
  description: string
  technologies: string[]
  features: string[]
  gradient: string
  accentColor: string
  iconName: string
  mockupType: 'phone' | 'browser' | 'system'
}

export const usePortfolioState = () => {
  const activeSection = useState<string>('activeSection', () => 'home')
  const isDarkMode = useState<boolean>('isDarkMode', () => true)
  const isCvModalOpen = useState<boolean>('isCvModalOpen', () => false)
  const activeProject = useState<ProjectItem | null>('activeProject', () => null)
  
  const islandNotification = useState<{
    show: boolean
    title: string
    subtitle?: string
    type?: 'success' | 'info' | 'haptic'
    icon?: string
  }>('islandNotification', () => ({
    show: false,
    title: '',
    subtitle: '',
    type: 'info'
  }))

  let timeoutId: NodeJS.Timeout | null = null

  const triggerDynamicIsland = (title: string, subtitle = '', type: 'success' | 'info' | 'haptic' = 'info') => {
    if (timeoutId) clearTimeout(timeoutId)
    islandNotification.value = { show: true, title, subtitle, type }
    if (process.client) {
      timeoutId = setTimeout(() => {
        islandNotification.value.show = false
      }, 4200)
    }
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (process.client) {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
    }
    triggerDynamicIsland(
      isDarkMode.value ? 'Dark Mode' : 'Light Mode',
      'System display appearance adjusted',
      'haptic'
    )
  }

  const fireConfetti = () => {
    if (!process.client) return
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#0071e3', '#4facfe', '#af52de', '#34c759', '#ffffff']
      })
    } catch {
      // ignore
    }
  }

  const openCv = () => {
    isCvModalOpen.value = true
    fireConfetti()
    triggerDynamicIsland('Curriculum Vitae', 'CV preview ready & downloadable', 'success')
  }

  const closeCv = () => {
    isCvModalOpen.value = false
  }

  const openProject = (project: ProjectItem) => {
    activeProject.value = project
    triggerDynamicIsland(project.title, 'Project architecture & specs', 'info')
  }

  const closeProject = () => {
    activeProject.value = null
  }

  return {
    activeSection,
    isDarkMode,
    toggleDarkMode,
    isCvModalOpen,
    openCv,
    closeCv,
    activeProject,
    openProject,
    closeProject,
    islandNotification,
    triggerDynamicIsland,
    fireConfetti
  }
}
