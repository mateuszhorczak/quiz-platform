<script setup lang="ts">
import type { Answer } from "~/types";

const route = useRoute()
const quizId = parseInt(route.params.id as string, 10)

const props = defineProps<{ answers: Answer[], questionId: number }>()
const quizStore = useQuizStore()
</script>

<template>
  <AtomsAnswerCreate
      v-for="answer in props.answers"
      :id="answer.id"
      :key="answer.id"
      :name="answer.name"
      :question-id="answer.questionId"
      :is-correct="answer.isCorrect"
  />
  <div class="flex justify-end">
    <AtomsButtonOutlined
        label="Delete question"
        color="rose"
        icon="i-mdi-delete-sweep"
        class="hover:bg-rose-50"
        @click="quizStore.deleteQuestion(props.questionId, quizId)"
    />
  </div>
</template>
