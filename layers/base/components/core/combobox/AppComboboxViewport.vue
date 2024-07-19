<script setup lang="ts">
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import { ComboboxViewport } from 'radix-vue'
import { computed } from 'vue'

const comboboxStyle = useComboboxStyle()
const viewportClasses = computed<string>(() => comboboxStyle.viewport())
</script>

<template>
  <ComboboxViewport :class="viewportClasses">
    <slot />
  </ComboboxViewport>
</template>
