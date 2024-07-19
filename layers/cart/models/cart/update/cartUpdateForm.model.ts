import { cartUuidSchema } from '@cart/models/cart/cartUuid.model'
import { orderProductUuidSchema } from '@cart/models/order-product/orderProductUuid.model'
import { z } from 'zod'

export const cartUpdateFormSchema = z.object({
  cartId: cartUuidSchema,
  orderProductId: orderProductUuidSchema,
  quantity: z.number().min(1),
})

export type CartUpdateForm = z.infer<typeof cartUpdateFormSchema>
