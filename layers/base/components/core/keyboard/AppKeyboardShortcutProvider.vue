<script setup lang="ts">
import { useKeyboardShortcut } from '@base/composables/core/keyboardShortcut.composable'
import type { KeyboardShortcutConfig } from '@base/types/core/keyboardShortcut.type'
import { ref } from 'vue'

const props = defineProps<{
  config: KeyboardShortcutConfig
}>()

const wrapperRef = ref<HTMLElement | null>(null)

useKeyboardShortcut({
  keys: props.config.keys,
  onTrigger: (event) => {
    const firstElement = wrapperRef.value?.firstElementChild ?? null

    if (props.config.preventDefault ?? false) {
      event.preventDefault()
    }

    if (props.config.stopPropagation ?? false) {
      event.stopPropagation()
    }

    if (firstElement instanceof HTMLElement) {
      firstElement.click()
    }
  },
})
</script>

<template>
  <div ref="wrapperRef">
    <slot :keys="props.config.keys" />
  </div>
</template>
