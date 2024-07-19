<script setup lang="ts">
import { type IconStyleProps, useIconStyle } from '@base/components/core/icon/icon.style'
import { type Icon, icons } from '@base/icons/icons'
import type { Component } from 'vue'
import {
  computed,
  shallowRef,
  watch,
} from 'vue'

const props = withDefaults(
  defineProps<{
    icon: Icon
    size?: IconStyleProps['size']
  }>(),
  {
    size: 'default',
  },
)

const svgComponent = shallowRef<Component | null>(null)

async function setIcon(): Promise<void> {
  const resolvedComponent = await icons[props.icon]

  svgComponent.value = resolvedComponent.default
}

watch(
  () => props.icon,
  async () => {
    await setIcon()
  },
  {
    immediate: true,
  },
)

const iconStyle = useIconStyle()

const iconClasses = computed<string>(() => iconStyle.icon({ size: props.size }))

await setIcon()
</script>

<template>
  <Component
    :is="svgComponent"
    v-if="svgComponent !== null"
    :class="iconClasses"
  />
</template>
