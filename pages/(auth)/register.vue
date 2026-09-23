<script setup lang="ts">
const { registrationEnabled } = useRuntimeConfig().public
</script>

<template>
  <MoleculesMainHeading
    text="Create new user account"
    icon="i-mdi-account-box-plus-outline"
  />
  <LayoutsAuthContainer>
    <MoleculesFormAuthRegister v-if="registrationEnabled" />
    <AtomsParagraph v-else>
      Registration is currently closed. You can still browse and solve all quizzes without an account.
    </AtomsParagraph>
  </LayoutsAuthContainer>
</template>
