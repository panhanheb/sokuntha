// Single source of truth for all portfolio content.
// Only facts provided by Sorn Sokuntha — no invented employers, links, awards or metrics.

export const profile = {
  name: 'Sorn Sokuntha',
  role: 'Computer Science Graduate · Mobile App Developer',
  headline: 'Computer Science Graduate & Aspiring Mobile App Developer',
  summary:
    'A passionate and motivated Computer Science graduate with a strong interest in Mobile Application Development. Experienced in developing mobile and web applications and eager to gain real-world experience through a Mobile App Development Internship.',
  phone: '+855 99 43 08 69',
  phoneHref: 'tel:+85599430869',
  email: 'sornsokuntha21@gmail.com',
  location: 'Sangkat Touk Thla, Khan Sen Sok, Phnom Penh, Cambodia',
  locationShort: 'Phnom Penh, Cambodia',
  photo: '/images/sokuntha-portrait.jpg'
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
]

export const aboutParagraphs = [
  'I recently graduated with a Bachelor of Computer Science from the Royal University of Phnom Penh. My studies gave me a solid foundation in programming, object-oriented design and building complete applications — from the interface a user touches to the data behind it.',
  'My main interest is mobile application development. I enjoy turning a real need into an app that feels simple and dependable, and I have built both mobile and web projects along the way. I am now looking for an internship where I can contribute to a real team, learn from experienced developers and keep growing.'
]

export const focusAreas = [
  { title: 'Computer Science graduate', desc: 'Bachelor of Computer Science, Royal University of Phnom Penh (2022 – 2026).' },
  { title: 'Mobile app development', desc: 'Android and cross-platform apps with a focus on clear, usable interfaces.' },
  { title: 'Web development', desc: 'Responsive front-ends and server-side work with PHP and Laravel.' },
  { title: 'Problem solving', desc: 'Breaking problems down with OOP and structured, readable code.' },
  { title: 'User-friendly design', desc: 'Building screens that are easy to understand on any device.' },
  { title: 'Learning & growth', desc: 'Eager to learn from senior developers and real-world projects.' }
]

export type SkillGroup = { id: string; title: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { id: 'mobile', title: 'Mobile Development', items: ['Android', 'Cross-platform Mobile Development'] },
  { id: 'programming', title: 'Programming', items: ['C / C++', 'C#', 'Java', 'OOP'] },
  { id: 'web', title: 'Web Development', items: ['HTML', 'CSS', 'JavaScript', 'React JS', 'PHP', 'Laravel'] },
  { id: 'tools', title: 'Tools', items: ['Git', 'Microsoft Office'] },
  {
    id: 'soft',
    title: 'Soft Skills',
    items: ['Public Relations', 'Teamwork', 'Time Management', 'Effective Communication', 'Critical Thinking']
  }
]

export interface Project {
  id: string
  title: string
  type: 'Mobile App' | 'Web System' | 'Website'
  mockup: 'phone' | 'dashboard' | 'browser'
  summary: string
  details: string
  technologies: string[]
  features: string[]
}

export const projects: Project[] = [
  {
    id: 'skincare-app',
    title: 'Skincare Mobile Application',
    type: 'Mobile App',
    mockup: 'phone',
    summary: 'A mobile app that gives users skincare recommendations based on the information they provide.',
    details:
      'The app collects input from the user, processes it, and returns skincare recommendations through a simple, friendly mobile interface. The focus was on making the flow easy to follow on a small screen.',
    technologies: ['Android', 'Java', 'Cross-platform', 'OOP'],
    features: ['Skincare recommendations', 'User-friendly UI', 'User input', 'Data processing']
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking System',
    type: 'Web System',
    mockup: 'dashboard',
    summary: 'A booking system for reserving rooms, checking availability and managing users.',
    details:
      'Guests can browse and book rooms while the system checks availability to prevent conflicts. Administrators manage users and bookings, with data organised for efficient handling.',
    technologies: ['PHP', 'Laravel', 'HTML', 'CSS', 'JavaScript'],
    features: ['Room booking', 'Availability checking', 'User management', 'Efficient data handling']
  },
  {
    id: 'idp-website',
    title: 'IDP Website Development',
    type: 'Website',
    mockup: 'browser',
    summary: 'A responsive website built with HTML, CSS and JavaScript that works across phone, tablet and desktop.',
    details:
      'Built from scratch with core web technologies. Layouts adapt to each screen size so the content stays readable and easy to navigate on mobile, tablet and desktop.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['Responsive design', 'Mobile support', 'Tablet support', 'Desktop support']
  }
]

export const education = [
  {
    degree: 'Bachelor of Computer Science',
    school: 'Royal University of Phnom Penh',
    period: '2022 – 2026',
    status: 'Graduated'
  },
  {
    degree: 'High School Diploma',
    school: 'Toul Kbel High School',
    period: '2020 – 2022',
    status: 'Completed'
  }
]

export const reference = {
  name: 'Mr. Thou Chamroeun',
  title: 'Lecturer (Web Front-End & Back-End)',
  org: 'Royal University of Phnom Penh',
  phone: '+855 12 52 22 27',
  phoneHref: 'tel:+85512522227',
  email: 'thou.chamroeun@rupp.edu.kh'
}
