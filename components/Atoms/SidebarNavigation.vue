<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Create new quiz',
      icon: 'i-mdi-creation-outline',
      to: '/create'
    },
    {
      label: "My quiz's",
      icon: 'i-mdi-account-box',
      to: '/my'
    },
    {
      label: "Settings",
      icon: 'i-mdi-cog',
      to: '/settings'
    },
    {
      label: 'Home page',
      icon: 'i-mdi-home',
      to: '/',
    },
  ]
])
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>
