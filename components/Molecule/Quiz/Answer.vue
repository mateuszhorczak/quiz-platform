<script setup lang="ts">
import type { Answer } from "~/types";

const props = defineProps<Answer>()
const selected = ref(props.isCorrect)

const quizStore = useQuizStore()

watch(selected, (newValue) => {
  quizStore.updateAnswer(props.id, newValue)
})
</script>

<template>
  <div class="flex justify-between items-start p-2">
    <AtomsCheckbox v-model:val="selected" :label="props.name" class="max-w-[80%]" />
    <UIcon name="i-mdi-delete" class="w-5 h-5 cursor-pointer" @click="quizStore.deleteAnswer(props.id)" />
  </div>
</template>
