<script setup lang="ts">
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import type { ComboboxProps } from '@base/types/core/comboboxProps.type'
import { ComboboxContent } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  popoverProps: ComboboxProps['popoverProps']
}>()

const comboboxStyle = useComboboxStyle()
const contentStyle = computed<string>(() => comboboxStyle.content())
</script>

<template>
  <!-- eslint-disable tailwindcss/no-custom-classname -->
  <ComboboxContent
    :force-mount="true"
    :align="props.popoverProps?.align ?? 'center'"
    :style="{
      minWidth: props.popoverProps?.minWidth,
    }"
    :class="contentStyle"
    position="popper"
  >
    <slot />
  </ComboboxContent>
</template>
