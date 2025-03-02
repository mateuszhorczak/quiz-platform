<script setup lang="ts">
import { z } from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'

const props = defineProps<{ questionId: number }>()
const quizStore = useQuizStore()

const schema = z.object({
  name: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  return errors
}

const createNewAnswer = async (event: FormSubmitEvent<Schema>) => {
  await quizStore.createAnswer(event.data.name, props.questionId)
  state.name = undefined
}
</script>

<template>
  <UForm :validate="validate" :schema="schema" :state="state" @submit="createNewAnswer" class="mx-auto space-y-4">
    <MoleculeFormInput v-model:val="state.name" icon="i-mdi-chat-question" placeholder="Add answer" label="Answer" input-name="name" size="md" />

    <AtomsButtonContained type="submit" label="Add new answer" icon="i-mdi-plus-circle" />
  </UForm>
</template>
