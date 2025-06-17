<script setup lang="ts">
const quizStore = useQuizStore()

</script>

<template>
  <LayoutsMainContainer>
    <AtomsSubHeading>Set if you want solve all question or 5 random by default</AtomsSubHeading>
    <USwitch v-model="quizStore.allQuestionInQuiz" name="all-questions" label="Get all question instead 5 random" class="p-2" />
  </LayoutsMainContainer>
</template>
