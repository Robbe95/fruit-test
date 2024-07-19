<script setup lang="ts">
import FormElement from '@base/components/core/form-element/FormElement.vue'
import { useInputStyle } from '@base/components/core/input/input.style'
import AppNumberInput from '@base/components/core/input/number/AppNumberInput.vue'
import AppText from '@base/components/core/text/AppText.vue'
import { useComponentAttrs } from '@base/composables/core/componentAttrs.composable'
import type { Icon } from '@base/icons/icons'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { computed } from 'vue'

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
     *
     */
    isTouched: boolean
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors
    /**
     * Whether to hide the increment and decrement controls.
     * @default false
     */
    hideControls?: boolean
    /**
     * The left icon of the input.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The label of the input.
     */
    label: string
    /**
     * The maximum value of the input.
     * @default null
     */
    max?: null | number
    /**
     * The minimum value of the input.
     * @default 0
     */
    min?: null | number
    /**
     * The placeholder of the input.
     * @default null
     */
    placeholder?: null | string
    /**
     * A suffix for the input. Overrides the right slot.
     * @default null
     */
    suffix?: null | string
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    hideControls: false,
    iconLeft: undefined,
    max: null,
    min: 0,
    placeholder: null,
    suffix: null,
  },
)

const emit = defineEmits<{
  blur: []
  focus: []
}>()

const model = defineModel<null | number>({
  required: true,
})

const { classAttr, otherAttrs } = useComponentAttrs()

function onFocus(): void {
  emit('focus')
}

function onBlur(): void {
  emit('blur')
}

const inputStyle = useInputStyle()

const numberSuffixClasses = computed<string>(() => inputStyle.numberSuffix())
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
    <AppNumberInput
      :id="id"
      v-model="model"
      v-bind="otherAttrs"
      :is-invalid="isInvalid"
      :placeholder="props.placeholder"
      :is-disabled="props.isDisabled"
      :is-loading="props.isLoading"
      :icon-left="props.iconLeft"
      :hide-controls="props.hideControls"
      :min="props.min"
      :max="props.max"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #left>
        <slot name="left" />
      </template>

      <template #right>
        <div
          v-if="props.suffix"
          :class="numberSuffixClasses"
        >
          <AppText variant="subtext">
            {{ props.suffix }}
          </AppText>
        </div>
        <slot
          v-else
          name="right"
        />
      </template>
    </AppNumberInput>
  </FormElement>
</template>
