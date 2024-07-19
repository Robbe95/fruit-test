import type { VariantProps } from '@base/libs/twVariants.lib'
import { tv } from '@base/libs/twVariants.lib'

export const useContainerStyle = tv({
  slots: {
    base: 'container mx-auto flex flex-col px-8',
  },
})

export type ContainerStyleProps = VariantProps<typeof useContainerStyle>
