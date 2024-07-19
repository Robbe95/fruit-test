<script setup lang="ts" generic="T extends string">
import { useCheckboxStyle } from '@base/components/core/checkbox/checkbox.style'
import FormCheckbox from '@base/components/core/checkbox/FormCheckbox.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import type { DataItem } from '@base/types/core/dataItem.type'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * Whether the checkbox group is disabled.
   */
  isDisabled?: boolean
  /**
   *  Whether the checkbox group is required.
   */
  isRequired?: boolean
  /**
   * Whether the checkbox group has been touched.
   */
  isTouched: boolean
  /**
   * The errors associated with the checkbox group.
   */
  errors: FormFieldErrors
  /**
   * The label of the checkbox group.
   * @default null
   */
  label?: null | string
  /**
   * The options of the checkbox group.
   */
  options: DataItem<T>[]
}>(), {
  isDisabled: false,
  isRequired: false,
  label: null,
})

const model = defineModel<T[]>({
  required: true,
})

const checkboxStyle = useCheckboxStyle()
const checkboxContainerClasses = computed<string>(() => checkboxStyle.container())
const checkboxGroupContainerClasses = computed<string>(() => checkboxStyle.groupContainer())

function isOptionSelected(value: T): boolean {
  return model.value.includes(value)
}

function toggleOption(value: T): void {
  const isSelected = isOptionSelected(value)

  if (isSelected) {
    model.value = model.value.filter((v) => v !== value)
  }
  else {
    model.value = [
      ...model.value,
      value,
    ]
  }
}
</script>

<template>
  <FormElement
    :errors="props.errors"
    :is-touched="props.isTouched"
    :label="props.label"
    :is-disabled="props.isDisabled"
    :is-required="props.isRequired"
  >
    <div :class="checkboxGroupContainerClasses">
      <div
        v-for="option of props.options"
        :key="option.label"
        :class="checkboxContainerClasses"
      >
        <FormCheckbox
          :id="option.value"
          :is-disabled="props.isDisabled"
          :model-value="isOptionSelected(option.value)"
          @update:model-value="toggleOption(option.value)"
        />

        <label :for="option.value">
          {{ option.label }}
        </label>
      </div>
    </div>
  </FormElement>
</template>
