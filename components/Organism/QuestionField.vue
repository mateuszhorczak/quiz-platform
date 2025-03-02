<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<Question>()
</script>

<template>
  <AtomsCard class="shadow-md p-2">
    <AtomsParagraph>{{ props.name }}</AtomsParagraph>
    <AtomsSmallParagraph></AtomsSmallParagraph>
  </AtomsCard>
</template>
