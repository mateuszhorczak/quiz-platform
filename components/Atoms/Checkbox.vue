<script setup lang="ts">
interface Props {
  label: string,
  val: undefined,
}
const props = defineProps<Props>()
const model = defineModel('val')
</script>

<template>
  <UCheckbox v-model="model" name="answer" :label="props.label" :ui="{ label: 'text-sm font-medium text-black dark:text-gray-200' }" />
</template>
