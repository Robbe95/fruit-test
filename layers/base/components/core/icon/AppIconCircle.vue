<script setup lang="ts">
import type { IconStyleProps } from '@base/components/core/icon/icon.style'
import type { Icon } from '@base/icons/icons'
import { twMerge } from '@base/libs/twMerge.lib'

interface Props {
  isLoading?: boolean
  icon: Icon
  size?: IconStyleProps['size']
}

const { icon, size = 'default' } = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
  <div :class="twMerge('flex size-8 flex-none items-center justify-center rounded-full bg-white', attrs?.class as string)">
    <Transition
      name="fade"
    >
      <div v-if="!isLoading">
        <AppIcon
          :size="size"
          :icon="icon"
        />
      </div>

      <AppLoader
        v-else
        class="size-5"
      />
    </Transition>
  </div>
</template>
