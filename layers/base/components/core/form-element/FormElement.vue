<script setup lang="ts">
import FormError from '@base/components/core/form-error/FormError.vue'
import FormGroup from '@base/components/core/form-group/FormGroup.vue'
import FormLabel from '@base/components/core/form-label/FormLabel.vue'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { useId } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  /**
   * Whether the input is disabled.
   */
  isDisabled: boolean
  /**
   *  Whether the input is required.
   */
  isRequired: boolean
  /**
   * Whether the input is touched. This is used to determine if the input should be marked as invalid.
   */
  isTouched: boolean
  /**
   * The errors associated with the input.
   */
  errors: FormFieldErrors
  /**
   * The label of the input.
   */
  label: null | string
}>()

const inputId = useId(null, 'input')

const isInvalid = computed<boolean>(() => {
  return props.isTouched && props.errors !== undefined
})
</script>

<template>
  <FormGroup>
    <FormLabel
      v-if="props.label !== null"
      :for="inputId"
      :label="props.label"
      :is-required="props.isRequired"
      :is-invalid="isInvalid"
      :is-disabled="props.isDisabled"
    />

    <slot
      :id="inputId"
      :is-invalid="isInvalid"
    />

    <FormError
      :is-visible="isInvalid"
      :errors="props.errors"
    />
  </FormGroup>
</template>
