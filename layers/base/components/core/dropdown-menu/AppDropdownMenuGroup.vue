<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import { DropdownMenuGroup } from 'radix-vue'
import { computed } from 'vue'

const dropdownMenuStyle = useDropdownMenuStyle()

const groupClasses = computed<string>(() => dropdownMenuStyle.group())
</script>

<template>
  <DropdownMenuGroup :class="groupClasses">
    <slot />
  </DropdownMenuGroup>
</template>
