<script setup lang="ts">
import { tv } from '@base/libs/twVariants.lib'

interface Props {
  direction?: 'horizontal' | 'vertical'
}
const { direction = 'horizontal' } = defineProps<Props>()
const dividerStyle = tv({
  base: 'bg-neutral-100',
  variants: {
    direction: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
})
const classes = computed<string>(() => dividerStyle({
  direction,
}))
</script>

<template>
  <div :class="classes" />
</template>
