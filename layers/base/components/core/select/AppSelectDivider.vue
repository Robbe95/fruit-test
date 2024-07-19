<script setup lang="ts">
import { useSelectStyle } from '@base/components/core/select/select.style'
import { SelectSeparator } from 'radix-vue'
import { computed } from 'vue'

const selectStyle = useSelectStyle()

const dividerClasses = computed<string>(() => selectStyle.divider())
</script>

<template>
  <SelectSeparator :class="dividerClasses" />
</template>
