<script setup lang="ts">
const props = defineProps<{ label: string, icon: string }>()
</script>

<template>
  <UButton :label="props.label" variant="solid" :icon="props.icon" />
</template>
