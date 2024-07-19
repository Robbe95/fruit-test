import { z } from 'zod'

export const addressTypeSchema = z.enum([
  'shipping',
  'delivery',
])

export type AddressType = z.infer<typeof addressTypeSchema>
