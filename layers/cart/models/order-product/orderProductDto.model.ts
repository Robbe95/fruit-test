import { priceSchema } from '@base/models/price/price.model'
import { orderProductUuidSchema } from '@cart/models/order-product/orderProductUuid.model'
import { productDtoSchema } from '@cart/models/product/detail/productDto.model'
import { productUuidSchema } from '@cart/models/product/productUuid.model'
import { z } from 'zod'

export const orderProductDtoSchema = z.object({
  id: orderProductUuidSchema,
  productId: productUuidSchema,
  price: priceSchema,
  product: productDtoSchema,
  quantity: z.number(),
})

export type OrderProductDto = z.infer<typeof orderProductDtoSchema>
