<script setup lang="ts">
import type { TextStyleProps } from '@base/components/core/text/text.style'
import { useTextStyle } from '@base/components/core/text/text.style'
import { computed, useAttrs } from 'vue'

type TextType = 'blockquote' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

const props = withDefaults(
  defineProps<{
    /**
     * The HTML tag to render the component as
     * @default 'p'
     */
    as?: TextType
    /**
     * The variant of the text
     */
    variant: TextStyleProps['variant']
  }>(),
  {
    as: 'p',
  },
)

const attrs = useAttrs()
const textStyle = useTextStyle()

const textClasses = computed<string>(() => textStyle.text({
  class: attrs.class as string,
  variant: props.variant,
}))
</script>

<template>
  <Component
    :is="as"
    :class="textClasses"
  >
    <slot />
  </Component>
</template>
