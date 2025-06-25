export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  const match = to.path.match(/^\/quiz\/(\d+)\/edit\/?$/)

  if (match) {
    const quizId = parseInt(match[1])
    const isAuthor = auth.user?.userQuizzesId?.includes(quizId)

    if (!isAuthor) {
      return navigateTo(`/quiz/${ quizId }`)
    }
  }
})
