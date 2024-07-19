<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core'
import { AppIcon } from '@wisemen/vue-core'
import type { RouteLocationRaw } from 'vue-router'

import type { ButtonStyleProps } from './button.style'
import { useButtonStyle } from './button.style'

export interface AppButtonProps {
  /**
   * Whether the button is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the button is in a loading state.
   * @default false
   */
  isLoading?: boolean
  /**
   * The icon to display on the left side of the button.
   * @default null
   */
  iconLeft?: Icon | null
  /**
   * The icon to display on the right side of the button.
   * @default null
   */
  iconRight?: Icon | null
  /**
   * The size of the button.
   * @default 'default'
   */
  size?: ButtonStyleProps['size']
  to: RouteLocationRaw
  /**
   * The type of the button.
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit'
  /**
   * The variant of the button.
   * @default 'default'
   */
  variant?: ButtonStyleProps['variant']
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  // TODO: find out why defaulting these to `null` breaks the `Icon` prop type when using `declare module`.
  // iconLeft: null,
  // iconRight: null,
  isDisabled: false,
  isLoading: false,
  size: 'default',
  type: 'button',
  variant: 'default',
})

const buttonStyle = useButtonStyle()

const buttonClasses = computed<string>(() =>
  buttonStyle.button({
    size: props.size,
    variant: props.variant,
  }))

const buttonLeftIconClasses = computed<string>(() =>
  buttonStyle.buttonLeftIcon({
    isLoading: props.isLoading,
    size: props.size,
  }))

const buttonRightIconClasses = computed<string>(() =>
  buttonStyle.buttonRightIcon({
    isLoading: props.isLoading,
    size: props.size,
  }))
</script>

<template>
  <NuxtLinkLocale
    :is-disabled="isDisabled || isLoading"
    :type="props.type"
    :to="props.to"
    :class="buttonClasses"
  >
    <AppIcon
      v-if="props.iconLeft !== null && props.iconLeft !== undefined"
      :icon="props.iconLeft"
      :class=" buttonLeftIconClasses"
    />

    <span
      :class="{
        'opacity-0': props.isLoading,
      }"
    >

      <slot />
    </span>

    <div
      v-if="props.isLoading"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <AppLoader
        class="size-4"
      />
    </div>

    <AppIcon
      v-if="props.iconRight !== null && props.iconRight !== undefined"
      :icon="props.iconRight"
      :class="buttonRightIconClasses"
    />
  </NuxtLinkLocale>
</template>
