<script setup lang="ts">
const props = defineProps<{ label: string, route: string }>()
</script>

<template>
  <UButton
:label="props.label"
           variant="link"
           :to="props.route"
           size="xl"
  />
</template>
