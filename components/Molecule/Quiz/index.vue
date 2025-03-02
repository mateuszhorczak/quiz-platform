<script setup lang="ts">
interface Props {
  id: number,
  name: string,
  description: string
}
const props = defineProps<Props>()
</script>

<template>
  <AtomsCard class="shadow-md w-2/3 p-4">
      <AtomsParagraph>{{ props.name }}</AtomsParagraph>
      <AtomsSmallParagraph>{{ props.description }}</AtomsSmallParagraph>
  </AtomsCard>
</template>
