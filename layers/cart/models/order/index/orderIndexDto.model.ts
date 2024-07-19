import { orderStatusSchema } from '@cart/models/order/orderStatus.model'
import { orderUuidSchema } from '@cart/models/order/orderUuid.model'
import { z } from 'zod'

export const orderIndexDtoSchema = z.object({
  id: orderUuidSchema,
  deliveryDate: z.string().nullable(),
  orderDate: z.string(),
  isDelivered: z.boolean(),
  orderLineCount: z.number(),
  orderNumber: z.string(),
  orderStatus: orderStatusSchema,
  remarks: z.string().nullable(),
})

export type OrderIndexDto = z.infer<typeof orderIndexDtoSchema>
