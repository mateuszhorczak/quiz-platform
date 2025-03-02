<script setup lang="ts">
interface Props {
  label: string;
  val: undefined;
  placeholder: string;
  icon: string;
  inputName: string;
}

const props = defineProps<Props>()

const model = defineModel('val')
</script>

<template>
  <UFormGroup :label="props.label" :name="props.inputName">
    <AtomsInput v-model="model" :placeholder="props.placeholder" :icon="props.icon" />
  </UFormGroup>
</template>
