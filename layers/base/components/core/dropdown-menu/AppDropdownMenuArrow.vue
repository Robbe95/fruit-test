<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import { DropdownMenuArrow } from 'radix-vue'
import { computed } from 'vue'

const dropdownMenuStyle = useDropdownMenuStyle()

const arrowContainerClasses = computed<string>(() => dropdownMenuStyle.arrowContainer())
const arrowClasses = computed<string>(() => dropdownMenuStyle.arrow())
</script>

<template>
  <DropdownMenuArrow :as-child="true">
    <div :class="arrowContainerClasses">
      <div
        :class="arrowClasses"
      />
    </div>
  </DropdownMenuArrow>
</template>
