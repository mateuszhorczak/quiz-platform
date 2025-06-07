<script setup lang="ts">
import type { AnswerSolve } from "~/types";

const props = defineProps<AnswerSolve>()
const model = defineModel<boolean>('selected', { default: false })
</script>

<template>
  <UCheckbox v-model="model" name="answer" :label="props.name" class="p-2" />
</template>
