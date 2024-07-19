import { AddressTransformer } from '@base/models/address/address.transformer'
import type { CartAddDto } from '@cart/models/cart/add/cartAddDto.model'
import type { CartAddForm } from '@cart/models/cart/add/cartAddForm.model'
import type { CartAddBulkDto } from '@cart/models/cart/add-bulk/cartAddBulkDto.model'
import type { CartAddBulkForm } from '@cart/models/cart/add-bulk/cartAddBulkForm.model'
import type { Cart } from '@cart/models/cart/get/cart.model'
import type { CartDto } from '@cart/models/cart/get/cartDto.model'
import type { CartUpdateDto } from '@cart/models/cart/update/cartUpdateDto.model'
import type { CartUpdateForm } from '@cart/models/cart/update/cartUpdateForm.model'
import { OrderProductTransformer } from '@cart/models/order-product/orderProduct.transformer'

export class CartTransformer {
  static toAddBulkDto = (payload: CartAddBulkForm): CartAddBulkDto => {
    return {
      items: payload.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    }
  }

  static toUpdateDto = (payload: CartUpdateForm): CartUpdateDto => {
    return {
      quantity: payload.quantity,
    }
  }

  static toAddDto(payload: CartAddForm): CartAddDto {
    return {
      productId: payload.productId,
      quantity: payload.quantity,
    }
  }

  static toCart(dto: CartDto): Cart {
    return {
      id: dto.id,
      deliveryDate: dto.deliveryDate != null ? new Date(dto.deliveryDate) : null,
      orderDate: dto.orderDate != null ? new Date(dto.orderDate) : null,
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
}
