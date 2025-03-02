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

    <UAccordion :items="convertedItems">
      <template #default="{ item, index, open }">
        <UButton
            color="gray"
            variant="ghost"
            class="border-b border-gray-200 dark:border-gray-700"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>
          <template #trailing>
            <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
            />
          </template>
        </UButton>
      </template>

      <template #item="{ item }">
        <div class="ml-8">
          <OrganismQuestionField :answers="item.answers" :question-id="item.id" />
          <OrganismFormAnswer :question-id="item.id" />
        </div>
      </template>
    </UAccordion>

    <OrganismFormQuestion class="mt-4" />
  </AtomsCard>

</template>
