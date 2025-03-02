<script setup lang="ts">
const props = defineProps<{ placeholder: string, icon: string }>()
</script>

<template>

  <UInput color="primary" variant="outline" :placeholder="props.placeholder" :icon="props.icon" />
</template>
