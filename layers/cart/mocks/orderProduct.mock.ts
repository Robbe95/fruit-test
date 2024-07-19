import { createNumber } from '@base/mocks/utils.mock'
import type { Price } from '@base/models/price/price.model'
import { generateUuid } from '@base/utils/uuid/generateUuid.util'
import { createProduct } from '@cart/mocks/product.mock'
import type { OrderProduct } from '@cart/models/order-product/orderProduct.model'
import type { OrderProductUuid } from '@cart/models/order-product/orderProductUuid.model'

export function createOrderProduct(overrides: Partial<OrderProduct> = {}): OrderProduct {
  const product = createProduct({
    isDetail: true,
  })

  return {
    id: generateUuid() as OrderProductUuid,
    productId: product.id,
    price: createNumber(0, 100) as Price,
    product,
    quantity: createNumber(0, 8),
    ...overrides,
  } satisfies OrderProduct
}

export function createOrderProducts(count: number): OrderProduct[] {
  return Array.from({ length: count }, () => createOrderProduct())
}
