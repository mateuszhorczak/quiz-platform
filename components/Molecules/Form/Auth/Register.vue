<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const isSubmitting = ref(false)

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/

const schema = z.object({
  username: z.string({ message: "Required" }).trim().min(3, 'Username must be at least 3 characters long'),
  email: z.string({ message: "Required" }).trim().email('Incorrect email format').nonempty(),
  password: z.string({ message: "Required" }).trim().regex(passwordRegex, ''),
  password2: z.string({ message: "Required" }).trim(),
}).refine(data => data.password === data.password2, {
  message: "Passwords are not the same",
  path: ["password2"]
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
  password2: undefined,
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  try {
    const { success, error } = await authStore.register({
      username: event.data.username,
      password: event.data.password,
      email: event.data.email
    })

    if (success) {
      toast.add({
        title: 'Registration successfully completed',
        description: 'You can now login to your account',
        color: 'success',
        icon: 'i-mdi-check-circle-outline'
      })
      await router.push('/login')
    } else if (error) {
      toast.add({
        title: 'Registration failed',
        description: error,
        color: 'error',
        icon: 'i-mdi-exclamation-thick'
      })
    }
  }
  catch (error) {
    toast.add({
      title: 'Registration error',
      description: 'An unexpected error occurred',
      color: 'error',
      icon: 'i-mdi-exclamation-thick'
    })
    console.error(error)
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
  >
    <AtomsInput
        v-model:val="state.email"
        label="Email"
        name="email"
        placeholder="you@example.com"
        icon="i-mdi-email"
        help=""
    />

    <AtomsInput
        v-model:val="state.username"
        label="Username"
        name="username"
        placeholder="your_unique_username"
        icon="i-mdi-account"
        help=""
    />

    <AtomsPasswordInputValidation
        v-model:val="state.password"
        label="Password"
        name="password"
        icon="i-mdi-lock"
        placeholder="YourSecurePassword!123"
    />

    <AtomsPasswordInput
        v-model:val="state.password2"
        label="Repeat password"
        name="password2"
        icon="i-mdi-lock-check"
        placeholder="Type the same password again"
        help=""
    />

    <AtomsButtonContained
        icon="i-mdi-account-arrow-up"
        label="Create account"
        size="lg"
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
    />
  </UForm>
</template>
