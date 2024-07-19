<script setup lang="ts">
import { boxStyle, type BoxStyleProps } from '@base/components/core/box/box.style'
import type { Icon } from '@base/icons/icons'

interface Props {
  isReversed?: BoxStyleProps['isReversed']
  icon: Icon
  iconClasses?: string
  variant?: BoxStyleProps['variant']
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isReversed: false,
    variant: 'default',
  },
)
</script>

<template>
  <div
    :to="props"
    :class="boxStyle({
      variant: props.variant,
      isReversed,
    })"
  >
    <div class="flex items-center gap-4">
      <AppIcon
        :icon="props.icon"
        :class="props.iconClasses"
        size="lg"
      />

      <div>
        <slot name="front" />
      </div>
    </div>
    <div>
      <slot name="back" />
    </div>
  </div>
</template>
