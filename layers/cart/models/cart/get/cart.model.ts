import { cartUuidSchema } from '@cart/models/cart/cartUuid.model'
import { orderSchema } from '@cart/models/order/detail/order.model'
import { z } from 'zod'

export const cartSchema = orderSchema.extend({
  id: cartUuidSchema,
  orderDate: z.date().nullable(),
  orderStatus: z.literal('cart'),
})

export type Cart = z.infer<typeof cartSchema>
