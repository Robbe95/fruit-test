import type { OrderProduct } from '@cart/models/order-product/orderProduct.model'
import type { OrderProductDto } from '@cart/models/order-product/orderProductDto.model'
import { ProductTransformer } from '@cart/models/product/product.transformer'

export class OrderProductTransformer {
  static toOrderProduct(dto: OrderProductDto): OrderProduct {
    return {
      id: dto.id,
      productId: dto.productId,
      price: dto.price,
      product: ProductTransformer.toProduct(dto.product),
      quantity: dto.quantity,
    }
  }
}
