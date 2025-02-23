<script setup lang="ts">
const props = defineProps<{ label: string, icon: string }>()
</script>

<template>
  <UButton :label="props.label" variant="solid" :icon="props.icon"
           :ui="{
              font: 'font-bold',
              color: {
                primary: { solid: 'shadow-sm text-white dark:text-primary-500 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 aria-disabled:bg-{color}-500 dark:bg-gray-900 dark:hover:bg-gray-950 dark:disabled:bg-{color}-400 dark:aria-disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400' },
                error: { solid: 'shadow-sm text-white dark:text-white bg-error-main hover:bg-error-dark disabled:bg-rose-500 aria-disabled:bg-rose-500 dark:bg-error-dark dark:hover:bg-error-main dark:disabled:bg-rose-400 dark:aria-disabled:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:focus-visible:outline-rose-400' }
              }
           }"
  />
</template>
