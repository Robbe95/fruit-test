import { priceSchema } from '@base/models/price/price.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const productDtoSchema = z.object({
  id: productUuidSchema,
  name: z.string(),
  price: priceSchema.nullable(),
})

export type ProductDto = z.infer<typeof productDtoSchema>
