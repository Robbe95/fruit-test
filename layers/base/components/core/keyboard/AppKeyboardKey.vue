<script setup lang="ts">
import type { KeyboardStyleProps } from '@base/components/core/keyboard/keyboardKey.style'
import { useKeyboardStyle } from '@base/components/core/keyboard/keyboardKey.style'
import type { KeyboardKey } from '@base/types/core/keyboard.type'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  keyboardKey: KeyboardKey
  variant?: KeyboardStyleProps['variant']
}>(), {
  variant: 'default',
})

const keyMap = new Map<KeyboardKey, string>([
  [
    'alt',
    '⌥',
  ],
  [
    'arrowdown',
    '↓',
  ],
  [
    'arrowleft',
    '←',
  ],
  [
    'arrowright',
    '→',
  ],
  [
    'arrowup',
    '↑',
  ],
  [
    'backspace',
    '⌫',
  ],
  [
    'ctrl',
    '⌃',
  ],
  [
    'enter',
    '↵',
  ],
  [
    'escape',
    'ESC',
  ],
  [
    'meta',
    '⌘',
  ],
  [
    'shift',
    '⇧',
  ],
])

const key = computed<string>(() => keyMap.get(props.keyboardKey) ?? props.keyboardKey)
const keyboardStyle = useKeyboardStyle()
const keyboardKeyClasses = computed<string>(() => keyboardStyle.key({
  variant: props.variant,
}))
</script>

<template>
  <kbd :class="keyboardKeyClasses">
    {{ key }}
  </kbd>
</template>
