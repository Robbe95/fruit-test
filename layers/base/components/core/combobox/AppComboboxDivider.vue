<script setup lang="ts">
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import { ComboboxSeparator } from 'radix-vue'
import { computed } from 'vue'

const comboboxStyle = useComboboxStyle()
const dividerStyle = computed<string>(() => comboboxStyle.divider())
</script>

<template>
  <ComboboxSeparator :class="dividerStyle" />
</template>
