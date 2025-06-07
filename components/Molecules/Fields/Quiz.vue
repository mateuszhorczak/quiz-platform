<script setup lang="ts">
interface Props {
  id: number,
  name: string,
  description: string,
}

const props = defineProps<Props>()
</script>

<template>
  <LayoutsMainContainer>
    <AtomsParagraph>{{ props.name }}</AtomsParagraph>
    <AtomsSmallParagraph>{{ props.description }}</AtomsSmallParagraph>
  </LayoutsMainContainer>
</template>
