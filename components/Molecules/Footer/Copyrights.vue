<script setup lang="ts">
const currentYear = new Date().getFullYear()

const lightText = 'font-light text-sm text-white leading-tight'
const boldText = 'font-bold text-sm text-white leading-tight'
</script>

<template>
  <div class="sm:flex">
    <AtomsParagraph
        :class="lightText"
        class="mr-1"
    >
      Copyright ©{{ currentYear }}
    </AtomsParagraph>
    <AtomsParagraph :class="boldText" class="mr-1">
      Mateusz Horczak
    </AtomsParagraph>
    <AtomsParagraph :class="lightText">
      wszystkie prawa zastrzeżone.
    </AtomsParagraph>
  </div>
</template>
