import { cartUuidSchema } from '@cart/models/cart/cartUuid.model'
import { orderProductUuidSchema } from '@cart/models/order-product/orderProductUuid.model'
import { z } from 'zod'

export const cartRemoveFormSchema = z.object({
  cartId: cartUuidSchema,
  orderProductId: orderProductUuidSchema,
})

export type CartRemoveForm = z.infer<typeof cartRemoveFormSchema>
