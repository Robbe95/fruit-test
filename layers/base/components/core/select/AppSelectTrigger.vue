<script setup lang="ts">
import { useSelectStyle } from '@base/components/core/select/select.style'
import { SelectTrigger } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  id?: null | string
  isDisabled?: boolean
  isInvalid?: boolean
}>(), {
  id: null,
  isDisabled: false,
  isInvalid: false,
})

const selectStyle = useSelectStyle()

const triggerClasses = computed<string>(() => selectStyle.trigger({
  isDisabled: props.isDisabled,
  isInvalid: props.isInvalid,
}))
</script>

<template>
  <SelectTrigger
    :id="props.id"
    :class="triggerClasses"
  >
    <slot />
  </SelectTrigger>
</template>
