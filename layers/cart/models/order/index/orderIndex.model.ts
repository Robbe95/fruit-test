import { orderStatusSchema } from '@cart/models/order/orderStatus.model'
import { orderUuidSchema } from '@cart/models/order/orderUuid.model'
import { z } from 'zod'

export const orderIndexSchema = z.object({
  id: orderUuidSchema,
  deliveryDate: z.date().nullable(),
  orderDate: z.date(),
  isDelivered: z.boolean(),
  orderLineCount: z.number(),
  orderNumber: z.string(),
  orderStatus: orderStatusSchema,
  remarks: z.string().nullable(),
})

export type OrderIndex = z.infer<typeof orderIndexSchema>
