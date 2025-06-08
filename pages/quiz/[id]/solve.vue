<script setup lang="ts">
const route = useRoute()
const quizStore = useQuizStore()
const quizId = parseInt(route.params.id as string, 10)

await quizStore.getQuizToSolveByQuizId(quizId)

const onSubmit = async () => {
  if (!quizStore.quizToSolve) return
  const userAnswers = quizStore.quizToSolve.questions.map((q) => ({
    questionId: q.id,
    selectedAnswers: q.answers
        .filter(a => a.selected)
        .map(a => a.id)
  }))

  await quizStore.solveQuiz(quizId, userAnswers)
  const router = useRouter()
  await router.push(`/quiz/${quizId}/result`)
}
</script>

<template>
  <LayoutsMainContainer>
    <AtomsSubHeading>{{ quizStore.quizToSolve?.name || '' }}</AtomsSubHeading>
    <AtomsParagraph class="mt-2">{{ quizStore.quizToSolve?.description || '' }}</AtomsParagraph>
    <OrganismsQuizQuestionsSolve />
    <AtomsButtonContained type="button" label="Send answers" icon="i-mdi-send" @click="onSubmit" />
  </LayoutsMainContainer>
</template>
