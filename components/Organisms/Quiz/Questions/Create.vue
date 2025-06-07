<script setup lang="ts">
import convertQuestionTypeToAccordionItem from "~/utils";
const quizStore = useQuizStore()

const convertedItems = ref()

watchEffect(() => {
  if (!quizStore.currentQuiz) return
  convertedItems.value = convertQuestionTypeToAccordionItem(quizStore.currentQuiz.questions)
})
</script>

<template>
  <UAccordion v-if="convertedItems" :items="convertedItems">
    <template #body="{ item }">
      <MoleculesFieldsQuestionEdit :question-id="item.id" :answers="item.answers" />
      <MoleculesFormQuizCreateAnswer :question-id="item.id" class="ml-8" />
    </template>
  </UAccordion>
</template>
