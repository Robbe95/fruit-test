import { cartUuidSchema } from '@cart/models/cart/cartUuid.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const cartAddBulkFormSchema = z.object({
  cartId: cartUuidSchema,
  items: z.object({
    productId: productUuidSchema,
    quantity: z.number(),
  }).array(),
})

export type CartAddBulkForm = z.infer<typeof cartAddBulkFormSchema>
