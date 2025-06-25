<script setup lang="ts">
const props = defineProps<{
  icon: string
  placeholder: string
  name: string
  label: string
}>()

const model = defineModel<string>('val', { default: '' })

const show = ref(false)

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[^a-zA-Z0-9]/, text: 'At least 1 special character' }
  ]

  return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const strength = computed(() => checkStrength(model.value))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value <= 2) return 'error'
  if (score.value <= 3) return 'warning'
  if (score.value === 4) return 'info'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Enter a password'
  if (score.value <= 2) return 'Weak password'
  if (score.value === 3) return 'Medium password'
  if (score.value === 4) return 'Good password'
  return 'Strong password'
})
</script>

<template>
  <div class="space-y-2">
    <UFormField :label="props.label" :name="props.name">
      <UInput
          v-model="model"
          :icon="props.icon"
          :placeholder="props.placeholder"
          :color="color"
          :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1' }"
          :aria-invalid="score < 5"
          aria-describedby="password-strength"
          variant="subtle"
          class="w-full"
      >
        <template #trailing>
          <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="show ? 'i-mdi-eye-off' : 'i-mdi-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              class="cursor-pointer"
              @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>

    <UProgress
        :color="color"
        :indicator="text"
        :model-value="score"
        :max="5"
        size="sm"
    />

    <p id="password-strength" class="text-sm font-medium">
      {{ text }}. Must contain:
    </p>

    <ul class="space-y-1" aria-label="Password requirements">
      <li
          v-for="(req, index) in strength"
          :key="index"
          class="flex items-center gap-0.5"
          :class="req.met ? 'text-success' : 'text-muted'"
      >
        <UIcon :name="req.met ? 'i-mdi-check-circle-outline' : 'i-mdi-close-circle-outline'" class="size-4 shrink-0" />

        <span class="text-xs font-light">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

