<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const quizStore = useQuizStore()
const auth = useAuthStore()
await quizStore.getUserQuizzes(auth.user.id)

const routeToQuiz = async (id: number) => {
  const router = useRouter()
  await router.push(`/quiz/${ id }/edit`)
}
</script>

<template>
  <MoleculesMainHeading
      text="My quizzes"
      icon="i-mdi-developer-board"
  />
  <div class="space-y-4">
    <MoleculesFieldsQuiz
        v-for="quiz in quizStore.userQuizzes"
        :id="quiz.id"
        :key="quiz.id"
        :name="quiz.name"
        :description="quiz.description"
        class="cursor-pointer"
        @click="routeToQuiz(quiz.id)"
    />
  </div>
</template>
