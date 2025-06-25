<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const isSubmitting = ref(false)

const schema = z.object({
  username: z.string({ message: "Required" }).trim(),
  password: z.string({ message: "Required" }).trim(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!event.data.username || !event.data.password) {
    return
  }

  isSubmitting.value = true
  try {
    const { success, error } = await authStore.login({
      username: event.data.username,
      password: event.data.password
    })

    if (success) {
      toast.add({
        title: 'Login successful',
        color: 'success',
        icon: 'i-mdi-check-circle'
      })
      await router.push('/')
    } else if (error) {
      toast.add({
        title: 'Login failed',
        description: error,
        color: 'error',
        icon: 'i-mdi-exclamation-thick'
      })
    }
  }
  catch (error) {
    toast.add({
      title: 'Login error',
      description: 'An unexpected error occurred.',
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
        v-model:val="state.username"
        label="Username"
        name="username"
        icon="i-mdi-account"
        placeholder="Enter your username"
        help=""
    />

    <AtomsPasswordInput
        v-model:val="state.password"
        label="Password"
        name="password"
        icon="i-mdi-lock"
        placeholder="Account password"
        help=""
    />

    <AtomsButtonContained
        icon="i-mdi-account-arrow-right"
        label="Log in"
        size="lg"
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
    />
  </UForm>
</template>
