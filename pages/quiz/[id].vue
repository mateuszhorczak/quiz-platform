<script setup lang="ts">
const route = useRoute()
const quizStore = useQuizStore()

await quizStore.getQuizById(parseInt(route.params.id as string, 10))
</script>

<template>
  <AtomsCard class="shadow-md w-2/3 p-4">
    <AtomsSubHeading>{{ quizStore.currentQuiz?.name || '' }}</AtomsSubHeading>
    <AtomsParagraph class="mt-2">{{ quizStore.currentQuiz?.description || '' }}</AtomsParagraph>
    <OrganismsQuizQuestions />
    <MoleculesFormQuestion class="mt-4" />
  </AtomsCard>

</template>
