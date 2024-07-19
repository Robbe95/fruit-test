<script setup lang="ts" generic="T extends string">
import { useRadioGroupStyle } from '@base/components/core/radio-group/radioGroup.style'
import { RadioGroupItem } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  unstyled?: boolean
  value: T
}>()

const radioGroupStyle = useRadioGroupStyle()

const itemClasses = computed<string>(() => radioGroupStyle.item())
</script>

<template>
  <RadioGroupItem
    :value="props.value"
    :class="itemClasses"
  >
    <slot />
  </RadioGroupItem>
</template>
