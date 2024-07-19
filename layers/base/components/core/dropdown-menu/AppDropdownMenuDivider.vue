<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import { DropdownMenuSeparator } from 'radix-vue'
import { computed } from 'vue'

const dropdownMenuStyle = useDropdownMenuStyle()

const dividerClasses = computed<string>(() => dropdownMenuStyle.divider())
</script>

<template>
  <DropdownMenuSeparator :class="dividerClasses" />
</template>
