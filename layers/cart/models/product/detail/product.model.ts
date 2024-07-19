import { priceSchema } from '@base/models/price/price.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const productSchema = z.object({
  id: productUuidSchema,
  isDetail: z.literal(true).default(true),
  name: z.string(),
  price: priceSchema.nullable(),
})

export type Product = z.infer<typeof productSchema>
