<script setup lang="ts">
import { useFormLabelStyle } from '@base/components/core/form-label/formLabel.style'
import { Label } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  for: string
  label: string
}>(), {
  isDisabled: false,
  isInvalid: false,
  isRequired: false,
})

const label = computed<string>(() => {
  if (props.isRequired) {
    return `${props.label} *`
  }

  return props.label
})

const formLabelStyle = useFormLabelStyle()

const labelClasses = computed<string>(() => formLabelStyle.label({
  isDisabled: props.isDisabled,
  isInvalid: props.isInvalid,
}))
</script>

<template>
  <Label :for="props.for">
    <span :class="labelClasses">
      {{ label }}
    </span>
  </Label>
</template>
