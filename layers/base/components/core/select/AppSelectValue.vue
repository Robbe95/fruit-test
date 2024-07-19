<script setup lang="ts">
import { useSelectStyle } from '@base/components/core/select/select.style'
import { SelectValue } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  isEmpty: boolean
}>()

const selectStyle = useSelectStyle()

const valueClasses = computed<string>(() => selectStyle.value({
  isEmpty: props.isEmpty,
}))
</script>

<template>
  <SelectValue
    :class="valueClasses"
  >
    <slot />
  </SelectValue>
</template>
