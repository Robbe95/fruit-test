<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import type { z } from 'zod'

const props = defineProps<{
  form: Form<TFormType>
  label: string
}>()
</script>

<template>
  <AppFormSubmitButton
    :form="props.form"
    :label="props.label"
    :is-keyboard-command-disabled="true"
    class="mt-4"
  >
    <slot>
      {{ label }}
    </slot>
  </AppFormSubmitButton>
</template>
