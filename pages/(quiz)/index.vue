<script setup lang="ts">
const quizStore = useQuizStore()
await quizStore.getAllQuizzes()

const routeToQuiz = async (id: number) => {
  const router = useRouter()
  await router.push(`/quiz/${ id }`)
}
</script>

<template>
  <div class="flex items-center">
    <UIcon name="i-mdi-developer-board" class="w-8 h-8 ml-4" />
    <AtomsSubHeading class="ml-2">Available quizzes</AtomsSubHeading>
  </div>
  <MoleculesFieldsQuiz
      v-for="quiz in quizStore.allQuizzes"
      :id="quiz.id"
      :key="quiz.id"
      :name="quiz.name"
      :description="quiz.description"
      class="my-4 cursor-pointer"
      @click="routeToQuiz(quiz.id)"

  />
</template>
