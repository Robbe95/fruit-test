<script setup lang="ts">
import { useContainerStyle } from '@base/components/core/container/container.style'
import { computed } from 'vue'

const containerStyle = useContainerStyle()
const containerBase = computed<string>(() => containerStyle.base())
</script>

<template>
  <div :class="containerBase">
    <slot />
  </div>
</template>
