<script setup lang="ts">
const props = defineProps<{
  icon: string
  placeholder: string
  label: string
  help: string
}>()

const model = defineModel<string>('val', { default: '' })
</script>

<template>
  <UFormField
      :label="props.label"
      :help="props.help"
  >
    <UInput
        v-model="model"
        :icon="props.icon"
        :placeholder="props.placeholder"
        variant="subtle"
        class="w-full"
    />
  </UFormField>
</template>
