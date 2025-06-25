<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
authStore.logout()
const toast = useToast()
toast.add({
  title: 'Successfully logged out',
  color: 'success',
  icon: 'i-mdi-check-circle'
})
const router = useRouter()
await router.push('/login')
</script>

<template>
  <AtomsParagraph>The user is logged out.</AtomsParagraph>
</template>
