<script setup lang="ts">
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import { useSelectStyle } from '@base/components/core/select/select.style'
import { SelectScrollDownButton } from 'radix-vue'
import { computed } from 'vue'

const selectStyle = useSelectStyle()

const scrollButtonDownClasses = computed<string>(() => selectStyle.scrollButtonDown())
const scrollButtonIconClasses = computed<string>(() => selectStyle.scrollButtonIcon())
</script>

<template>
  <SelectScrollDownButton
    :class="scrollButtonDownClasses"
  >
    <AppIcon
      :class="scrollButtonIconClasses"
      icon="chevronDown"
      size="default"
    />
  </SelectScrollDownButton>
</template>
