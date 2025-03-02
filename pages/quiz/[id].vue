<script setup lang="ts">
import convertQuestionTypeToAccordionItem from "~/utils";

const quizStore = useQuizStore()
const route = useRoute()

quizStore.fetchQuiz(parseInt(route.params.id as string, 10))

const convertedItems = ref()
watchEffect(() => {
  if (!quizStore.currentQuiz) return
  convertedItems.value = convertQuestionTypeToAccordionItem(quizStore.currentQuiz.questions)
})
</script>

<template>
  <AtomsCard class="shadow-md w-2/3 p-4">
    <AtomsSubHeading>{{ quizStore.currentQuiz?.name || '' }}</AtomsSubHeading>
    <AtomsParagraph class="mt-2">{{ quizStore.currentQuiz?.description || '' }}</AtomsParagraph>

    <!--    <OrganismQuestionField v-for="question in quizStore.currentQuiz?.questions || []"-->
    <!--                           :key="question?.id"-->
    <!--                           :id="question?.id"-->
    <!--                           :name="question?.name"-->
    <!--                           :answers="question?.answers"-->
    <!--                           :quiz-id="question?.quizId"-->
    <!--                           class="my-4"-->
    <!--    />-->
    <UAccordion :items="convertedItems">
      <template #item="{ item }">
        <p>{{ item.content }}</p>
      </template>
    </UAccordion>

    <OrganismFormQuestion class="mt-4" />
  </AtomsCard>

</template>
