<script setup lang="ts">
const props = defineProps<{ label: string, icon: string }>()
</script>

<template>
  <UButton
:icon="props.icon"
           :label="props.label"
           variant="outline"
  />
</template>
