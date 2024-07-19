import { tv, type VariantProps } from '@base/libs/twVariants.lib'

export const useIconStyle = tv({
  defaultVariants: {
    size: 'default',
  },
  slots: {
    icon: 'flex-shrink-0',
  },
  variants: {
    size: {
      default: {
        icon: 'size-4',
      },
      full: {
        icon: 'size-full',
      },
      lg: {
        icon: 'size-5',
      },
      sm: {
        icon: 'size-3',
      },
      xl: {
        icon: 'size-6',
      },
      xs: {
        icon: 'size-2',
      },
      xxl: {
        icon: 'size-8',
      },
    },
  },
})

export type IconStyleProps = VariantProps<typeof useIconStyle>
