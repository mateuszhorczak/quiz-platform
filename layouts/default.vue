<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="md:flex flex-1">
      <OrganismsSlideMenu class="xl:w-1/6 md:w-1/4"/>
      <div class="bg-white dark:bg-gray-800 flex-1 md:mx-4">
        <NuxtPage />
      </div>
    </div>
    <LayoutsFooter />
  </div>
</template>
