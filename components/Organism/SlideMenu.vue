<script setup lang="ts">

</script>

<template>
  <UCard class="h-screen" :ui="{ background: 'bg-gray-50' }">
    <template #header>
      <AtomsHeading>Your quiz's</AtomsHeading>
    </template>

    <ul class="space-y-4">
      <li>
        <MoleculeRouteLink icon="i-mdi-creation-outline" route="/create" text="Create new quiz" />
      </li>
      <li>
        <MoleculeRouteLink icon="i-mdi-account-box" route="/my" text="My quiz's" />
      </li>
      <li>
        <MoleculeRouteLink icon="i-mdi-home" route="/" text="Home page" />
      </li>
    </ul>

    <template #footer>
      <AtomsSmallParagraph>Footer</AtomsSmallParagraph>
    </template>
  </UCard>
</template>
