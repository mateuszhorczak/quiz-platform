<script setup lang="ts">

const quizStore = useQuizStore()
</script>

<template>
  <div v-if="!quizStore.solvedQuiz">
    <AtomsParagraph>Loading data...</AtomsParagraph>
  </div>
  <div v-else>
    <MoleculesFieldsQuestionResult
        v-for="item in quizStore.solvedQuiz.quiz.questions"
        :id="item.id"
        :key="item.id"
        :name="item.name"
        :quiz-id="item.quizId"
        :answers="item.answers"
    />
  </div>
</template>
