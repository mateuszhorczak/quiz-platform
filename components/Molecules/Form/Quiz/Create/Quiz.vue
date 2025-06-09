<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const quizStore = useQuizStore()

const schema = z.object({
  name: z.string().min(5, 'Must be at least 5 characters'),
  description: z.string().nonempty()
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  description: undefined
})

const isLoading = ref(false)

const createNewQuiz = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  try {
    await quizStore.createQuiz(event.data.name, event.data.description)

    const router = useRouter()
    await router.push('/')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="mx-auto space-y-4" @submit="createNewQuiz">
    <AtomsInput
        v-model:val="state.name"
        icon="i-mdi-chat-question"
        placeholder="Name your quiz"
        label="Quiz name"
        help=""
        size="md"
    />
    <AtomsInput
        v-model:val="state.description"
        icon="i-mdi-text-box"
        placeholder="Short describe"
        label="Description"
        help=""
        size="md"
    />
    <AtomsButtonContained type="submit" label="Create quiz" icon="i-mdi-plus-circle" :loading="isLoading" />
  </UForm>
</template>
