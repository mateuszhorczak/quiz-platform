<script setup lang="ts">
import { z } from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'

const quizStore = useQuizStore()

const schema = z.object({
  name: z.string().min(5, 'Must be at least 5 characters'),
  description: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  description: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'quiz-name', message: 'Required' })
  if (!state.description) errors.push({ path: 'description', message: 'Required' })
  return errors
}

const createNewQuiz = async (event: FormSubmitEvent<Schema>) => {
  await quizStore.createQuiz(event.data.name, event.data.description)

  const router = useRouter()
  await router.push('/')
}
</script>

<template>
  <UForm :validate="validate" :schema="schema" :state="state" @submit="createNewQuiz" class="mx-auto space-y-4">
    <MoleculeFormInput v-model:val="state.name" icon="i-mdi-chat-question" placeholder="Name your quiz" label="Quiz name" input-name="quiz-name" size="md" />
    <MoleculeFormInput v-model:val="state.description" icon="i-mdi-text-box" placeholder="Short describe" label="Description" input-name="description" size="md" />

    <AtomsButtonContained type="submit" label="Create quiz" icon="i-mdi-plus-circle" />
  </UForm>
</template>
