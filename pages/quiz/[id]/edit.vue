<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'editor-rights'
  ]
})

const route = useRoute()

const quizStore = useQuizStore()
const quizId = parseInt(route.params.id as string, 10)

await quizStore.getQuizById(quizId)
</script>

<template>
  <LayoutsMainContainer>
    <AtomsSubHeading>{{ quizStore.currentQuiz?.name || '' }}</AtomsSubHeading>
    <AtomsParagraph class="mt-2">{{ quizStore.currentQuiz?.description || '' }}</AtomsParagraph>
    <OrganismsQuizQuestionsCreate />
    <MoleculesFormQuizCreateQuestion class="my-4" />
    <AtomsButtonOutlined
        label="Solve this quiz"
        icon="i-mdi-arrow-right"
        size="md"
        type="button"
        @click="$router.push(`/quiz/${quizId}`)"
    />
  </LayoutsMainContainer>
</template>
