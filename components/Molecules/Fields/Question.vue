<script setup lang="ts">
import type { QuestionSolve, AnswerSolve } from "~/types";

const props = defineProps<QuestionSolve>()
const model = defineModel<AnswerSolve[]>('answers', { default: [] })
</script>

<template>
  <div class="py-4">
    <AtomsParagraph class="text-lg">{{ props.name }}</AtomsParagraph>
    <AtomsAnswerSolve
        v-for="item in model"
        :id="item.id"
        :key="item.id"
        v-model:selected="item.selected"
        :name="item.name"
        :question-id="item.questionId"
    />
  </div>
</template>
