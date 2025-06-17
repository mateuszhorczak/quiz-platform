export default defineNuxtRouteMiddleware((to, from) => {
  if (/^\/quiz\/\d+$/.test(to.path)) {
    return navigateTo(`${to.path}/solve`)
  }})
