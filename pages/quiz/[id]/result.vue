<script setup lang="ts">
const route = useRoute()
const quizStore = useQuizStore()

const quizId = parseInt(route.params.id as string, 10)
</script>

<template>
  <LayoutsMainContainer>
    <div class="flex">
      <AtomsParagraph v-if="quizStore.solvedQuiz" class="ml-auto">
        Points:
        {{ quizStore.solvedQuiz?.score.correct }} /
        {{ quizStore.solvedQuiz?.score.total }}
      </AtomsParagraph>
    </div>
    <AtomsSubHeading>{{ quizStore.solvedQuiz?.quiz?.name || '' }}</AtomsSubHeading>
    <AtomsParagraph class="mt-2">{{ quizStore.solvedQuiz?.quiz?.description || '' }}</AtomsParagraph>
    <OrganismsQuizQuestionsResults />
    <AtomsButtonOutlined
        label="Solve again"
        icon="i-mdi-arrow-right"
        size="md"
        type="button"
        @click="$router.push(`/quiz/${quizId}`)"
    />
  </LayoutsMainContainer>
</template>
