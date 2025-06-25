<script setup lang="ts">
const props = defineProps<{
  icon: string
  placeholder: string
  name: string
  label: string
  help: string
}>()

const model = defineModel<string>('val', { default: '' })
const show = ref(false)
</script>

<template>
  <UFormField
      :label="props.label"
      :help="props.help"
      :name="props.name"
  >
    <UInput
        v-model="model"
        :icon="props.icon"
        :placeholder="props.placeholder"
        :type="show ? 'text' : 'password'"
        class="w-full"
        variant="subtle"
        :ui="{ trailing: 'pe-1' }"
    >
      <template #trailing>
        <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-mdi-eye-off' : 'i-mdi-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            class="cursor-pointer"
            @click="show = !show"
        />
      </template>
    </UInput>
  </UFormField>
</template>
