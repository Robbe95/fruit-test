import { cartUuidSchema } from '@cart/models/cart/cartUuid.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const cartAddFormSchema = z.object({
  cartId: cartUuidSchema,
  productId: productUuidSchema,
  quantity: z.number().min(1),
})

export type CartAddForm = z.infer<typeof cartAddFormSchema>
