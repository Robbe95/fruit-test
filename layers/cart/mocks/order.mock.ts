import { createAddress } from '@base/mocks/address.mock'
import {
  createBoolean,
  createDate,
  createNumber,
  createString,
} from '@base/mocks/utils.mock'
import { generateUuid } from '@base/utils/uuid/generateUuid.util'
import { createOrderProducts } from '@cart/mocks/orderProduct.mock'
import type { Order } from '@cart/models/order/detail/order.model'
import { orderStatusSchema } from '@cart/models/order/orderStatus.model'
import type { OrderUuid } from '@cart/models/order/orderUuid.model'

export function createRandomOrderStatus() {
  const statuses = Object.values(orderStatusSchema.Values)

  return statuses[Math.floor(Math.random() * statuses.length)] as Order['orderStatus']
}
export function createOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: generateUuid() as OrderUuid,
    deliveryDate: createDate(),
    orderDate: createDate(),
    isDelivered: createBoolean(),
    deliveryAddress: createAddress(),
    invoiceAddress: createAddress(),
    orderLineCount: createNumber(0, 14),
    orderNumber: createString(12),
    orderProducts: createOrderProducts(createNumber(0, 14)),
    orderStatus: createRandomOrderStatus(),
    remarks: createString(12),
    ...overrides,
  } satisfies Order
}

export function createOrders(count: number): Order[] {
  return Array.from({ length: count }, () => createOrder())
}
