<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <MoleculesMainHeading
      text="Create your own quiz"
      icon="i-mdi-text-box-plus-outline"
  />
  <LayoutsMainContainer>
    <MoleculesFormQuizCreateQuiz />
  </LayoutsMainContainer>
</template>
