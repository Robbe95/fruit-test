import { AddressTransformer } from '@base/models/address/address.transformer'
import type { Order } from '@cart/models/order/detail/order.model'
import type { OrderDto } from '@cart/models/order/detail/orderDto.model'
import type { OrderIndex } from '@cart/models/order/index/orderIndex.model'
import type { OrderIndexDto } from '@cart/models/order/index/orderIndexDto.model'
import { OrderProductTransformer } from '@cart/models/order-product/orderProduct.transformer'

export class OrderTransformer {
  static toOrder(dto: OrderDto): Order {
    return {
      id: dto.id,
      deliveryDate: dto.deliveryDate != null ? new Date(dto.deliveryDate) : null,
      orderDate: new Date(dto.orderDate),
      isDelivered: dto.isDelivered,
      deliveryAddress: dto.deliveryAddress != null ? AddressTransformer.toAddress(dto.deliveryAddress) : null,
      invoiceAddress: dto.invoiceAddress != null ? AddressTransformer.toAddress(dto.invoiceAddress) : null,
      orderLineCount: dto.orderLineCount,
      orderNumber: dto.orderNumber,
      orderProducts: dto.orderProducts.map(OrderProductTransformer.toOrderProduct),
      orderStatus: dto.orderStatus,
      remarks: dto.remarks,
    }
  }

  static toOrderIndex(dto: OrderIndexDto): OrderIndex {
    return {
      id: dto.id,
      deliveryDate: dto.deliveryDate != null ? new Date(dto.deliveryDate) : null,
      orderDate: new Date(dto.orderDate),
      isDelivered: dto.isDelivered,
      orderLineCount: dto.orderLineCount,
      orderNumber: dto.orderNumber,
      orderStatus: dto.orderStatus,
      remarks: dto.remarks,
    }
  }
}
