<script setup lang="ts">
import { Phone, Mail, MapPin, Send, Copy, Check, UserRound } from 'lucide-vue-next'
import { profile, reference } from '~/data/portfolio'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive<{ name?: string; email?: string; message?: string }>({})
const prepared = ref(false)
const copied = ref<string | null>(null)

const contacts = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: MapPin, label: 'Location', value: profile.location, href: null }
]

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = text
    setTimeout(() => (copied.value = null), 1800)
  } catch {
    // clipboard unavailable — user can still select the text
  }
}

const validate = () => {
  errors.name = form.name.trim() ? undefined : 'Please enter your name.'
  errors.email = !form.email.trim()
    ? 'Please enter your email address.'
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? undefined
      : 'Please enter a valid email address.'
  errors.message = !form.message.trim()
    ? 'Please enter a message.'
    : form.message.trim().length < 10
      ? 'Message should be at least 10 characters.'
      : undefined
  return !errors.name && !errors.email && !errors.message
}

// No backend: hand the validated message to the visitor's own email app.
const submit = () => {
  if (!validate()) return
  const subject = `Portfolio enquiry from ${form.name.trim()}`
  const body = `${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  prepared.value = true
}
</script>

<template>
  <section id="contact" class="section border-t border-line">
    <div class="container-page">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">Contact</p>
        <h2 class="section-title">Let's talk</h2>
        <p class="section-lead">
          Have an internship opening or a question about my work? I'd be glad to hear from you.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <!-- Details -->
        <div class="space-y-6">
          <ul v-reveal class="card divide-y divide-line">
            <li v-for="c in contacts" :key="c.label" class="flex items-center gap-4 p-5">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-subtle text-accent">
                <component :is="c.icon" class="h-4 w-4" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-xs text-faint">{{ c.label }}</p>
                <a v-if="c.href" :href="c.href" class="block truncate text-sm font-medium text-fg hover:text-accent">
                  {{ c.value }}
                </a>
                <p v-else class="text-sm font-medium text-fg">{{ c.value }}</p>
              </div>
              <button
                v-if="c.href"
                type="button"
                class="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-faint hover:bg-subtle hover:text-fg"
                :aria-label="`Copy ${c.label.toLowerCase()}`"
                @click="copy(c.value)"
              >
                <Check v-if="copied === c.value" class="h-4 w-4 text-emerald-500" />
                <Copy v-else class="h-4 w-4" />
              </button>
            </li>
          </ul>

          <div v-reveal="80" class="card p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-faint">Reference</p>
            <div class="mt-4 flex items-start gap-4">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-subtle text-muted">
                <UserRound class="h-4 w-4" />
              </span>
              <div class="min-w-0 text-sm">
                <p class="font-semibold text-fg">{{ reference.name }}</p>
                <p class="text-muted">{{ reference.title }}</p>
                <p class="text-muted">{{ reference.org }}</p>
                <div class="mt-3 flex flex-col gap-1">
                  <a :href="reference.phoneHref" class="link w-fit">{{ reference.phone }}</a>
                  <a :href="`mailto:${reference.email}`" class="link w-fit break-all">{{ reference.email }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form v-reveal="120" class="card p-6 sm:p-8" novalidate @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="c-name" class="mb-1.5 block text-sm font-medium text-fg">Name</label>
              <input
                id="c-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="input"
                :class="errors.name && 'border-red-500'"
                :aria-invalid="!!errors.name"
                aria-describedby="c-name-err"
              />
              <p v-if="errors.name" id="c-name-err" class="mt-1.5 text-xs text-red-500">{{ errors.name }}</p>
            </div>
            <div>
              <label for="c-email" class="mb-1.5 block text-sm font-medium text-fg">Email</label>
              <input
                id="c-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                class="input"
                :class="errors.email && 'border-red-500'"
                :aria-invalid="!!errors.email"
                aria-describedby="c-email-err"
              />
              <p v-if="errors.email" id="c-email-err" class="mt-1.5 text-xs text-red-500">{{ errors.email }}</p>
            </div>
          </div>
          <div class="mt-5">
            <label for="c-message" class="mb-1.5 block text-sm font-medium text-fg">Message</label>
            <textarea
              id="c-message"
              v-model="form.message"
              rows="6"
              class="input resize-none"
              :class="errors.message && 'border-red-500'"
              :aria-invalid="!!errors.message"
              aria-describedby="c-message-err"
            />
            <p v-if="errors.message" id="c-message-err" class="mt-1.5 text-xs text-red-500">{{ errors.message }}</p>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs text-faint" aria-live="polite">
              <template v-if="prepared">Your email app should open with the message ready to send.</template>
              <template v-else>Opens your email app with the message pre-filled.</template>
            </p>
            <button type="submit" class="btn-primary w-full py-3 sm:w-auto sm:py-2.5">
              <Send class="h-4 w-4" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
