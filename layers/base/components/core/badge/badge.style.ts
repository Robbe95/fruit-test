import type { VariantProps } from '@base/libs/twVariants.lib'
import { tv } from '@base/libs/twVariants.lib'

export const useBadgeStyle = tv({
  slots: {
    badge: 'rounded-md border border-solid border-border px-1 py-0.5 shadow-sm',
  },
})

export type BadgeStyleProps = VariantProps<typeof useBadgeStyle>
