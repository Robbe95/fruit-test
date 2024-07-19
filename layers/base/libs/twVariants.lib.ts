import { config } from '@base/libs/twMerge.lib'
import { createTV } from 'tailwind-variants'

export type { VariantProps } from 'tailwind-variants'

export const tv = createTV({
  twMergeConfig: config,
})
