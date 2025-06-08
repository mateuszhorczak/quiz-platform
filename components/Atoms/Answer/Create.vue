<script setup lang="ts">
import type { Answer } from "~/types";

const props = defineProps<Answer>()
const selected = ref(props.isCorrect)
const route = useRoute()
const quizId = parseInt(route.params.id as string, 10)

const quizStore = useQuizStore()

watch(selected, async (newValue) => {
  await quizStore.updateAnswer(props.id, newValue, quizId)
})
</script>

<template>
  <div class="flex justify-between items-start p-2">
    <UCheckbox v-model="selected" name="answer" :label="props.name" />
    <UIcon name="i-mdi-delete" class="w-5 h-5 cursor-pointer" @click="quizStore.deleteAnswer(props.id, quizId)" />
  </div>
</template>
