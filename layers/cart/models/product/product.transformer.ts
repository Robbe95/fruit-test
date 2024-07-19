import type { Product } from '@cart/models/product/detail/product.model'
import type { ProductDto } from '@cart/models/product/detail/productDto.model'
import type { ProductIndex } from '@cart/models/product/index/productIndex.model'
import type { ProductIndexDto } from '@cart/models/product/index/productIndexDto.model'

export class ProductTransformer {
  static toProduct(dto: ProductDto): Product {
    return {
      id: dto.id,
      isDetail: true,
      name: dto.name,
      price: dto.price,
    }
  }

  static toProductIndex(dto: ProductIndexDto): ProductIndex {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
    }
  }
}
