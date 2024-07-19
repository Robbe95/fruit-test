<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import { DropdownMenuSubContent } from 'radix-vue'
import { computed } from 'vue'

const dropdownMenuStyle = useDropdownMenuStyle()

const subContentClasses = computed<string>(() => dropdownMenuStyle.itemSubContent())
</script>

<template>
  <DropdownMenuSubContent
    :side-offset="4"
    :align-offset="-5"
    :class="subContentClasses"
  >
    <slot />
  </DropdownMenuSubContent>
</template>
