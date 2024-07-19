<script setup lang="ts">
import AppIncrement from '@base/components/core/increment/AppIncrement.vue'
import type { FormFieldErrors } from '@wisemen/vue-core'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the input is disabled.
     */
    isDisabled?: boolean
    /**
     *  Whether the input is required.
     */
    isRequired?: boolean
    /**
     * Whether the input is touched.
     */
    isTouched: boolean
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors
    /**
     * The label of the input.
     */
    label: string
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
  },
)

const model = defineModel<null | number>({
  required: true,
})
</script>

<template>
  <FormElement
    v-slot="{ id }"
    :errors="props.errors"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :label="props.label"
  >
    <AppIncrement
      :id="id"
      v-model="model"
    />
  </FormElement>
</template>
