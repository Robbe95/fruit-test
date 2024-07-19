<script setup lang="ts">
import AppSelectScrollDownButton from '@base/components/core/select/AppSelectScrollDownButton.vue'
import AppSelectScrollUpButton from '@base/components/core/select/AppSelectScrollUpButton.vue'
import { useSelectStyle } from '@base/components/core/select/select.style'
import { SelectContent, SelectViewport } from 'radix-vue'
import { computed } from 'vue'

const selectStyle = useSelectStyle()

const contentContainerClasses = computed<string>(() => selectStyle.contentContainer())
const contentViewportClasses = computed<string>(() => selectStyle.contentViewport())
</script>

<template>
  <SelectContent
    :force-mount="true"
    :class="contentContainerClasses"
    align="center"
    position="popper"
  >
    <AppSelectScrollUpButton />

    <SelectViewport :class="contentViewportClasses">
      <slot />
    </SelectViewport>

    <AppSelectScrollDownButton />
  </SelectContent>
</template>

<style>
.custom-select-content {
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
}
</style>
