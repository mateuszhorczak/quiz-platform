<script setup lang="ts">
const questions = ref([])

const addQuestion = () => {
  questions.value.push('question')
}
</script>

<template>
  <AtomsCard class="flex shadow-md w-2/3 p-4">
    <div class="mx-auto space-y-4">
      <AtomsSubHeading>Create your own quiz.</AtomsSubHeading>
      {{ questions }}
      <AtomsButtonContained @click="addQuestion" icon="i-mdi-plus-circle" label="Add question" />
    </div>
  </AtomsCard>
</template>
