<script setup lang="ts" generic="T extends string | boolean">
import FormElement from '@base/components/core/form-element/FormElement.vue'
import FormRadioGroupIndicator from '@base/components/core/radio-group/FormRadioGroupIndicator.vue'
import FormRadioGroupItem from '@base/components/core/radio-group/FormRadioGroupItem.vue'
import FormRadioGroupRoot from '@base/components/core/radio-group/FormRadioGroupRoot.vue'
import { useRadioGroupStyle } from '@base/components/core/radio-group/radioGroup.style'
import type { DataItem } from '@base/types/core/dataItem.type'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * Whether the radio group is disabled.
   */
  isDisabled?: boolean
  /**
   *  Whether the radio group is required.
   */
  isRequired?: boolean
  /**
   * Whether the radio group is touched.
   */
  isTouched: boolean
  /**
   * The errors associated with the radio group.
   */
  errors: FormFieldErrors
  /**
   * The label of the radio group.
   * @default null
   */
  label?: null | string
  /**
   * The model value of the radio group.
   */
  modelValue: T | null
  /**
   * The options of the radio group.
   */
  options: DataItem<T>[]
}>(), {
  isDisabled: false,
  isRequired: false,
  label: null,
})

const emit = defineEmits<{
  'update:modelValue': [T | null]
}>()

const model = computed<null | string>({
  get: () => props.modelValue !== null ? JSON.stringify(props.modelValue) : null,
  set: (value: null | string) => {
    emit('update:modelValue', value !== null ? JSON.parse(value) as T : null)
  },
})

const options = computed<DataItem<string>[]>(() => {
  return props.options.map((option) => ({
    ...option,
    value: JSON.stringify(option.value),
  }))
})

const radioGroupStyle = useRadioGroupStyle()

const containerClasses = computed<string>(() => radioGroupStyle.container())
const itemIndicatorClasses = computed<string>(() => radioGroupStyle.itemIndicator())
const itemTextClasses = computed<string>(() => radioGroupStyle.itemText())
const itemWrapperClasses = computed<string>(() => radioGroupStyle.itemWrapper())
const itemsContainerClasses = computed<string>(() => radioGroupStyle.itemsContainer())
</script>

<template>
  <FormElement
    :errors="props.errors"
    :is-touched="props.isTouched"
    :label="props.label"
    :is-disabled="props.isDisabled"
    :is-required="props.isRequired"
  >
    <FormRadioGroupRoot v-model="model">
      <div :class="containerClasses">
        <div
          v-for="option of options"
          :key="option.label"
          :class="itemsContainerClasses"
        >
          <FormRadioGroupItem
            :id="option.value"
            :value="option.value"
            :class="itemWrapperClasses"
          >
            <FormRadioGroupIndicator :class="itemIndicatorClasses" />
          </FormRadioGroupItem>

          <label
            :for="option.value"
            :class="itemTextClasses"
          >
            {{ option.label }}
          </label>
        </div>
      </div>
    </FormRadioGroupRoot>
  </FormElement>
</template>
