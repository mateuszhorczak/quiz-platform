<script setup lang="ts">
import type { AnswerResult } from "~/types";

const props = defineProps<AnswerResult>()

const answerColor = computed(() => {
  if (props.isCorrect && props.userSelected) {
    return 'bg-green-500/40' // 1. Valid answer
  } else if (!props.isCorrect && props.userSelected) {
    return 'bg-red-500/40' // 2. Selected invalid answer
  } else if (props.isCorrect && !props.userSelected) {
    return 'bg-yellow-300/40' // 3. No selected valid answer
  }
  return '' // 4. Others
})
</script>

<template>
  <div class="my-1" :class="answerColor">
    <UCheckbox
        :model-value="props.userSelected"
        name="answer"
        :label="props.name"
        class="p-2"
        disabled
    />
  </div>
</template>
