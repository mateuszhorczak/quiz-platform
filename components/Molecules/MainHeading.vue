<script setup lang="ts">
const props = defineProps<{
  text: string,
  icon: string,
}>()
</script>

<template>
  <div class="flex items-center mt-2 mb-6">
    <UIcon :name="props.icon" class="w-8 h-8 ml-4" />
    <AtomsSubHeading class="ml-2">{{ props.text }}</AtomsSubHeading>
  </div>
</template>
