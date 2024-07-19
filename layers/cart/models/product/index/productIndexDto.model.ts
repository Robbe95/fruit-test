import { priceSchema } from '@base/models/price/price.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const productIndexDtoSchema = z.object({
  id: productUuidSchema,
  name: z.string(),
  price: priceSchema.nullable(),
})

export type ProductIndexDto = z.infer<typeof productIndexDtoSchema>
