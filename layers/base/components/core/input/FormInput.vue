<script setup lang="ts">
import FormElement from '@base/components/core/form-element/FormElement.vue'
import AppInput from '@base/components/core/input/AppInput.vue'
import { useComponentAttrs } from '@base/composables/core/componentAttrs.composable'
import type { Icon } from '@base/icons/icons'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the input is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the input is loading.
     * @default false
     */
    isLoading?: boolean
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
     * The left icon of the input.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The right icon of the input.
     * @default null
     */
    iconRight?: Icon | null
    /**
     * The label of the input.
     */
    label: string
    /**
     * The placeholder of the input.
     * @default null
     */
    placeholder?: null | string
    /**
     * The type of the input.
     * @default 'text'
     */
    type?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    iconLeft: undefined,
    iconRight: undefined,
    placeholder: null,
    type: 'text',
  },
)

const model = defineModel<null | string>({
  required: true,
})

const slots = useSlots()

const { classAttr, otherAttrs } = useComponentAttrs()
</script>

<template>
  <FormElement
    v-slot="{ isInvalid, id }"
    :class="classAttr"
    :errors="props.errors"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :label="props.label"
  >
    <AppInput
      :id="id"
      v-model="model"
      v-bind="otherAttrs"
      :is-invalid="isInvalid"
      :placeholder="props.placeholder"
      :is-disabled="props.isDisabled"
      :type="props.type"
      :is-loading="props.isLoading"
      :icon-left="props.iconLeft ?? undefined"
      :icon-right="props.iconRight ?? undefined"
    >
      <template
        v-if="slots.left !== undefined"
        #left
      >
        <Component
          :is="slots.left"
        />
      </template>

      <template
        v-if="slots.right !== undefined"
        #right
      >
        <Component
          :is="slots.right"
        />
      </template>
    </AppInput>
  </FormElement>
</template>
