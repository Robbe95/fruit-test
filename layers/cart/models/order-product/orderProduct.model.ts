import { priceSchema } from '@base/models/price/price.model'
import { orderProductUuidSchema } from '@cart/models/order-product/orderProductUuid.model'
import { productSchema } from '@cart/models/product/detail/product.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const orderProductSchema = z.object({
  id: orderProductUuidSchema,
  productId: productUuidSchema,
  price: priceSchema,
  product: productSchema,
  quantity: z.number(),
})

export type OrderProduct = z.infer<typeof orderProductSchema>
