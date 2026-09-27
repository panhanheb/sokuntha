<script setup lang="ts">
import {
  X,
  Printer,
  FileText,
  Mail,
  Phone,
  MapPin,
  Copy
} from 'lucide-vue-next'

const { isCvModalOpen, closeCv, triggerDynamicIsland } = usePortfolioState()

const printCv = () => {
  if (!process.client) return
  window.print()
}

const copyCvText = () => {
  if (!process.client) return
  const summary = `SORN SOKUNTHA
Computer Science Graduate | Mobile App Developer
Phone: +855 99 43 08 69 | Email: sornsokuntha21@gmail.com
Location: Phnom Penh, Cambodia

EDUCATION:
- Bachelor of Computer Science, Royal University of Phnom Penh (2022 - 2026, Graduated)
- High School Diploma, Toul Kbel High School (2020 - 2022)

TECHNICAL SKILLS:
- Mobile: Android, Cross-platform Mobile Development
- Programming: C/C++, C#, Java, OOP
- Web: HTML, CSS, JavaScript, React JS, PHP, Laravel
- Tools: Git, Microsoft Office
- Soft Skills: Public Relations, Teamwork, Time Management, Effective Communication, Critical Thinking

FEATURED PROJECTS:
- Hotel Booking System (PHP, Laravel, Room booking, Availability checking, User management)
- Skincare Mobile Application (Android, Cross-platform, Skincare recommendations, Data processing)
- IDP Website Development (HTML, CSS, JavaScript, Multi-device responsive design)

REFERENCE:
- Mr. Thou Chamroeun (Lecturer, RUPP) | Phone: +855 12 52 22 27 | Email: thou.chamroeun@rupp.edu.kh`

  navigator.clipboard.writeText(summary).then(() => {
    triggerDynamicIsland('CV Copied', 'Full resume text copied to clipboard', 'success')
  })
}
</script>

<template>
  <div
    v-if="isCvModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
  >
    <div
      @click="closeCv"
      class="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
    ></div>

    <div
      class="relative w-full max-w-3xl rounded-[32px] ios-glass-nav border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden z-10 animate-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col"
    >
      <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between print:hidden">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center border border-white/20">
            <FileText class="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 class="text-base font-bold text-white tracking-tight">Curriculum Vitae</h3>
            <p class="text-xs text-cyan-300">Sorn Sokuntha • Candidate Profile</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="copyCvText"
            class="ios-btn-secondary p-2 rounded-xl text-neutral-300 hover:text-white"
            title="Copy CV Text"
          >
            <Copy class="w-4 h-4" />
          </button>
          <button
            @click="printCv"
            class="ios-btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md"
          >
            <Printer class="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
          <button
            @click="closeCv"
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors ml-1"
            aria-label="Close CV"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="p-6 sm:p-10 overflow-y-auto space-y-6 text-neutral-200 print:text-black print:bg-white bg-slate-950/70">
        <div class="border-b border-white/15 pb-6 space-y-2">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight">
            SORN SOKUNTHA
          </h1>
          <p class="text-sm font-semibold text-cyan-400 print:text-blue-700">
            Computer Science Graduate | Mobile App Developer
          </p>

          <div class="pt-2 flex flex-wrap gap-4 text-xs text-neutral-300 print:text-gray-700">
            <span class="flex items-center gap-1.5">
              <Phone class="w-3.5 h-3.5 text-cyan-400" />
              <span>+855 99 43 08 69</span>
            </span>
            <span class="flex items-center gap-1.5">
              <Mail class="w-3.5 h-3.5 text-purple-400" />
              <span>sornsokuntha21@gmail.com</span>
            </span>
            <span class="flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 text-emerald-400" />
              <span>Sangkat Touk Thla, Khan Sen Sok, Phnom Penh</span>
            </span>
          </div>
        </div>

        <div class="space-y-1.5">
          <h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            Professional Objective
          </h2>
          <p class="text-xs sm:text-sm text-neutral-300 print:text-gray-800 leading-relaxed">
            A passionate and motivated Computer Science graduate with a strong interest in Mobile Application Development. Experienced in developing mobile and web applications and eager to gain real-world experience through a Mobile App Development Internship.
          </p>
        </div>

        <div class="space-y-3">
          <h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            Education
          </h2>
          <div class="space-y-2">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs sm:text-sm font-bold text-white print:text-black">
                  Bachelor of Computer Science
                </p>
                <p class="text-xs text-neutral-400 print:text-gray-600">Royal University of Phnom Penh (RUPP)</p>
              </div>
              <span class="text-xs font-mono text-cyan-300 print:text-blue-600 font-semibold">2022 – 2026 (Graduated)</span>
            </div>
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs sm:text-sm font-bold text-white print:text-black">
                  High School Diploma
                </p>
                <p class="text-xs text-neutral-400 print:text-gray-600">Toul Kbel High School</p>
              </div>
              <span class="text-xs font-mono text-cyan-300 print:text-blue-600 font-semibold">2020 – 2022</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            Technical & Professional Skills
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 print:text-gray-800">
            <p><strong class="text-white print:text-black">Mobile:</strong> Android, Cross-platform Mobile Development</p>
            <p><strong class="text-white print:text-black">Programming:</strong> C / C++, C#, Java, OOP</p>
            <p><strong class="text-white print:text-black">Web:</strong> HTML, CSS, JavaScript, React JS, PHP, Laravel</p>
            <p><strong class="text-white print:text-black">Tools:</strong> Git, Microsoft Office</p>
            <p class="sm:col-span-2"><strong class="text-white print:text-black">Soft Skills:</strong> Public Relations, Teamwork, Time Management, Effective Communication, Critical Thinking</p>
          </div>
        </div>

        <div class="space-y-3">
          <h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            Academic & Practical Projects
          </h2>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 print:border-gray-300">
              <p class="text-xs sm:text-sm font-bold text-white print:text-black">Hotel Booking System</p>
              <p class="text-[11px] text-cyan-300 print:text-blue-600">Technologies: PHP, Laravel, OOP</p>
              <p class="text-xs text-neutral-300 print:text-gray-700 mt-1">
                Room booking, real-time availability checking, user management, and efficient data handling.
              </p>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 print:border-gray-300">
              <p class="text-xs sm:text-sm font-bold text-white print:text-black">Skincare Mobile Application</p>
              <p class="text-[11px] text-cyan-300 print:text-blue-600">Technologies: Android, Cross-platform, Java, OOP</p>
              <p class="text-xs text-neutral-300 print:text-gray-700 mt-1">
                Skincare recommendations, user-friendly UI, interactive user input, and data processing.
              </p>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 print:border-gray-300">
              <p class="text-xs sm:text-sm font-bold text-white print:text-black">IDP Website Development</p>
              <p class="text-[11px] text-cyan-300 print:text-blue-600">Technologies: HTML, CSS, JavaScript</p>
              <p class="text-xs text-neutral-300 print:text-gray-700 mt-1">
                Responsive design with multi-device compatibility across mobile, tablet, and desktop viewports.
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-1.5 border-t border-white/15 pt-4">
          <h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            Professional Reference
          </h2>
          <p class="text-xs sm:text-sm font-bold text-white print:text-black">Mr. Thou Chamroeun</p>
          <p class="text-xs text-neutral-300 print:text-gray-700">Lecturer (Web Front-End & Back-End), Royal University of Phnom Penh</p>
          <p class="text-xs text-neutral-400 print:text-gray-600">
            Phone: +855 12 52 22 27 | Email: thou.chamroeun@rupp.edu.kh
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
