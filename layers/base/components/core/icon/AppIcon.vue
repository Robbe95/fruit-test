<script setup lang="ts">
import AppAsyncIcon from '@base/components/core/icon/AppAsyncIcon.vue'
import type { IconStyleProps } from '@base/components/core/icon/icon.style'
import { useComponentAttrs } from '@base/composables/core/componentAttrs.composable'
import type { Icon } from '@base/icons/icons'

withDefaults(
  defineProps<{
    icon: Icon
    size?: IconStyleProps['size']
  }>(),
  {
    size: 'default',
  },
)

const { classAttr } = useComponentAttrs()
</script>

<template>
  <Suspense>
    <AppAsyncIcon
      :icon="icon"
      :size="size"
      :class="classAttr"
    />
  </Suspense>
</template>
