import { createAddress } from '@base/mocks/address.mock'
import {
  createBoolean,
  createDate,
  createNumber,
  createString,
} from '@base/mocks/utils.mock'
import { generateUuid } from '@base/utils/uuid/generateUuid.util'
import { createOrderProducts } from '@cart/mocks/orderProduct.mock'
import type { CartUuid } from '@cart/models/cart/cartUuid.model'
import type { Cart } from '@cart/models/cart/get/cart.model'

export function createCart(overrides: Partial<Cart> = {}): Cart {
  return {
    id: generateUuid() as CartUuid,
    deliveryDate: createDate(),
    orderDate: createDate(),
    isDelivered: createBoolean(),
    deliveryAddress: createAddress(),
    invoiceAddress: createAddress(),
    orderLineCount: createNumber(1, 14),
    orderNumber: createString(12),
    orderProducts: createOrderProducts(createNumber(1, 14)),
    orderStatus: 'cart',
    remarks: createString(12),
    ...overrides,
  } satisfies Cart
}

export function createCarts(count: number): Cart[] {
  return Array.from({ length: count }, () => createCart())
}
