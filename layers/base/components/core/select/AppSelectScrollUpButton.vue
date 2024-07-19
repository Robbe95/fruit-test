<script setup lang="ts">
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import { useSelectStyle } from '@base/components/core/select/select.style'
import { SelectScrollUpButton } from 'radix-vue'
import { computed } from 'vue'

const selectStyle = useSelectStyle()

const scrollButtonUpClasses = computed<string>(() => selectStyle.scrollButtonUp())
const scrollButtonIconClasses = computed<string>(() => selectStyle.scrollButtonIcon())
</script>

<template>
  <SelectScrollUpButton
    :class="scrollButtonUpClasses"
  >
    <AppIcon
      :class="scrollButtonIconClasses"
      icon="chevronUp"
      size="default"
    />
  </SelectScrollUpButton>
</template>
