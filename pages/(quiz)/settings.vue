<script setup lang="ts">
const quizStore = useQuizStore()
</script>

<template>
  <MoleculesMainHeading
      text="Settings"
      icon="i-mdi-cog-outline"
  />
  <LayoutsMainContainer>
    <AtomsSubHeading>Choose between solving all questions or 5 random questions by default</AtomsSubHeading>
    <USwitch
        v-model="quizStore.allQuestionInQuiz"
        name="all-questions"
        label="Solve all questions instead of 5 random ones"
        class="p-2"
    />
  </LayoutsMainContainer>
</template>
