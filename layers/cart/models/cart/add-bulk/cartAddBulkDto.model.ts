import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const cartAddBulkDtoSchema = z.object({
  items: z.object({
    productId: productUuidSchema,
    quantity: z.number(),
  }).array(),
})

export type CartAddBulkDto = z.infer<typeof cartAddBulkDtoSchema>
