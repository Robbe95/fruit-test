import { cartUuidSchema } from '@cart/models/cart/cartUuid.model'
import { orderDtoSchema } from '@cart/models/order/detail/orderDto.model'
import { z } from 'zod'

export const cartDtoSchema = orderDtoSchema.extend({
  id: cartUuidSchema,
  orderDate: z.date().nullable(),
  orderStatus: z.literal('cart'),
})

export type CartDto = z.infer<typeof cartDtoSchema>
