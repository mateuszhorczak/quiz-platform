<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{ questionId: number }>()
const quizStore = useQuizStore()
const route = useRoute()
const quizId = parseInt(route.params.id as string, 10)

const schema = z.object({
  name: z.string().nonempty(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
})

const createNewAnswer = async (event: FormSubmitEvent<Schema>) => {
  await quizStore.createAnswer(event.data.name, props.questionId, quizId)
  state.name = undefined
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="mx-auto space-y-4" @submit="createNewAnswer">
    <AtomsInput v-model:val="state.name" icon="i-mdi-chat-question" placeholder="Add answer" label="Answer" help="" size="md" />
    <AtomsButtonContained type="submit" label="Add new answer" icon="i-mdi-plus-circle" />
  </UForm>
</template>
