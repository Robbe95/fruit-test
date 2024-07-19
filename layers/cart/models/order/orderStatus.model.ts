import { z } from 'zod'

export const orderStatusSchema = z.enum([
  'ordered',
  'processing',
  'to_be_shipped',
  'delivered',
])

export type OrderStatus = z.infer<typeof orderStatusSchema>
