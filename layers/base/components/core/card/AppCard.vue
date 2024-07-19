<script setup lang="ts">
import { twMerge } from '@base/libs/twMerge.lib'
import type { ComponentInstance } from 'vue'

const props = defineProps<{
  as?: ComponentInstance<any> | string
}>()

const attrs = useAttrs()

const cardComponent = props.as ?? 'div'

const isButton = cardComponent === 'button'
</script>

<template>
  <Component
    :is="cardComponent"
    :class="twMerge('p-4 bg-card text-card-foreground rounded-card text-left w-full shadow-card-shadow', isButton ? 'focus-ring' : '', attrs?.class as string)"
  >
    <slot />
  </Component>
</template>
