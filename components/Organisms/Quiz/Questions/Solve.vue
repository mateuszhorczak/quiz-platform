<script setup lang="ts">
const quizStore = useQuizStore()
</script>

<template>
  <MoleculesFieldsQuestion
      v-for="item in quizStore.quizToSolve?.questions"
      :id="item.id"
      :key="item.id"
      v-model:answers="item.answers"
      :quiz-id="item.quizId"
      :name="item.name"
  />
</template>
