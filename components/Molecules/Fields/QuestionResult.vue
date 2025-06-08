<script setup lang="ts">
import type { QuestionResult } from '~/types'
const props = defineProps<QuestionResult>()
</script>

<template>
  <div class="py-4">
    <AtomsParagraph class="text-lg">{{ props.name }}</AtomsParagraph>
    <AtomsAnswerResult
      v-for="item in props.answers"
      :id="item.id"
      :key="item.id"
      :question-id="item.questionId"
      :name="item.name"
      :is-correct="item.isCorrect"
      :user-selected="item.userSelected"
    />
  </div>
</template>
