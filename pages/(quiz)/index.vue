<script setup lang="ts">
const quizStore = useQuizStore()
await quizStore.getAllQuizzes()

const routeToQuiz = async (id: number) => {
  const router = useRouter()
  await router.push(`/quiz/${ id }`)
}
</script>

<template>
  <MoleculesMainHeading
      text="Available quizzes"
      icon="i-mdi-developer-board"
  />
  <div class="space-y-4">
    <MoleculesFieldsQuiz
        v-for="quiz in quizStore.allQuizzes"
        :id="quiz.id"
        :key="quiz.id"
        :name="quiz.name"
        :description="quiz.description"
        class="cursor-pointer"
        @click="routeToQuiz(quiz.id)"
    />
  </div>
</template>
