<script setup lang="ts">
interface RouterLink {
  route: string;
  text: string;
  icon: string;
}

const props = defineProps<RouterLink>()
</script>

<template>
  <NuxtLink :to="props.route" class="flex items-center hover:opacity-80">
    <UIcon :name="props.icon" class="w-5 h-5 mr-1" />
    <AtomsParagraph>{{ props.text }}</AtomsParagraph>
  </NuxtLink>
</template>
