<script setup lang="ts">
const quizStore = useQuizStore()
</script>

<template>
  <MoleculesFieldsQuestion
      v-for="item in quizStore.quizToSolve?.questions"
      :key="item.id"
      :id="item.id"
      :quiz-id="item.quizId"
      :name="item.name"
      v-model:answers="item.answers"
  />
</template>
