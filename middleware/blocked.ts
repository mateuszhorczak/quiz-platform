export default defineNuxtRouteMiddleware((to) => {
  const match = to.path.match(/^\/quiz\/(\d+)\/?$/)
  if (match) {
    return navigateTo(`/quiz/${match[1]}/solve`)
  }
})
