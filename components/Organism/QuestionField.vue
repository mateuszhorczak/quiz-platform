<script setup lang="ts">
import type { Answer } from "~/types";

const props = defineProps<{ answers: Answer[], questionId: number }>()

const quizStore = useQuizStore()
</script>

<template>
  <MoleculeQuizAnswer v-for="answer in props.answers"
                      :key="answer.id"
                      :id="answer.id"
                      :name="answer.name"
                      :question-id="answer.questionId"
                      :is-correct="answer.isCorrect"
  />
  <div class="flex justify-end">
    <AtomsButtonOutlined @click="quizStore.deleteQuestion(props.questionId)" label="Delete question" color="rose" icon="i-mdi-delete-sweep" class="hover:bg-rose-50" />
  </div>
</template>
