<script setup lang="ts">
const route = useRoute()
const quizStore = useQuizStore()

await quizStore.getQuizById(parseInt(route.params.id as string, 10))
</script>

<template>
  <LayoutsMainContainer>
    <AtomsSubHeading>{{ quizStore.currentQuiz?.name || '' }}</AtomsSubHeading>
    <AtomsParagraph class="mt-2">{{ quizStore.currentQuiz?.description || '' }}</AtomsParagraph>
    <OrganismsQuizQuestionsCreate />
    <MoleculesFormQuizCreateQuestion class="mt-4" />
  </LayoutsMainContainer>
</template>
