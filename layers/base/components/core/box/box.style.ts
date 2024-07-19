import { tv, type VariantProps } from '@base/libs/twVariants.lib'

export const boxStyle = tv({
  base: 'flex w-full items-center justify-between gap-2 rounded-card px-4 py-3 text-subtext focus-ring',
  variants: {
    isReversed: {
      false: 'flex-row',
      true: 'flex-row-reverse',
    },
    variant: {
      dark: 'bg-primary/20 text-primary-foreground',
      default: 'bg-neutral-100 text-foreground',
      secondary: 'bg-neutral-900 text-primary-foreground',
    },
  },
})

export type BoxStyleProps = VariantProps<typeof boxStyle>
