import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const cartAddDtoSchema = z.object({
  productId: productUuidSchema,
  quantity: z.number().min(1),
})

export type CartAddDto = z.infer<typeof cartAddDtoSchema>
