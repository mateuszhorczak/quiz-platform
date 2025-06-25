<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const auth = useAuthStore()

const items = computed<NavigationMenuItem[][]>(() => {
  const baseItems: NavigationMenuItem[] = [
    {
      label: 'Home page',
      icon: 'i-mdi-home',
      to: '/',
    },
    {
      label: "Settings",
      icon: 'i-mdi-cog',
      to: '/settings'
    }
  ]

  const authenticatedItems: NavigationMenuItem[] = auth.isLoggedIn ? [
    {
      label: "My quiz's",
      icon: 'i-mdi-account-box',
      to: '/my'
    },
    {
      label: 'Create new quiz',
      icon: 'i-mdi-creation-outline',
      to: '/create'
    }
  ] : []

  const accountMenu: NavigationMenuItem[] = auth.isLoggedIn ? [
        {
          label: 'Log out',
          icon: 'i-mdi-logout',
          to: '/logout'
        }
      ]
      : [
        {
          label: 'Log in',
          icon: 'i-mdi-login',
          to: '/login'
        },
        {
          label: 'Sign up',
          icon: 'i-mdi-register',
          to: '/register'
        }
      ]

  return [
    [...baseItems, ...authenticatedItems, ...accountMenu]
  ]
})
</script>

<template>
  <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]:w-48"
  />
</template>
