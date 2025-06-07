<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const quizStore = useQuizStore()

const schema = z.object({
  name: z.string().min(5, 'Must be at least 5 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
})

const createNewQuestion = async (event: FormSubmitEvent<Schema>) => {
  const route = useRoute()
  await quizStore.createQuestion(event.data.name, parseInt(route.params.id as string, 10))
  state.name = undefined
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="mx-auto space-y-4" @submit="createNewQuestion">
    <AtomsInput v-model:val="state.name" icon="i-mdi-chat-question" placeholder="Ask a question" label="Question name" help="" size="md" />
    <AtomsButtonContained type="submit" label="Add new question" icon="i-mdi-plus-circle" />
  </UForm>
</template>
