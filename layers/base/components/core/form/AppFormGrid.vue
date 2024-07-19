<script setup lang="ts">
import { twMerge } from '@base/libs/twMerge.lib'

const classes = useAttrs().class as string
</script>

<template>
  <div :class="twMerge('grid lg:grid-cols-2 gap-4', classes)">
    <slot />
  </div>
</template>
