import { createApiMock } from '@base/mocks/api.mock'
import { createCart } from '@cart/mocks/cart.mock'
import type { CartAddForm } from '@cart/models/cart/add/cartAddForm.model'
import type { CartAddBulkForm } from '@cart/models/cart/add-bulk/cartAddBulkForm.model'
import type { Cart } from '@cart/models/cart/get/cart.model'
import type { CartRemoveForm } from '@cart/models/cart/remove/cartRemoveForm.model'
import type { CartUpdateForm } from '@cart/models/cart/update/cartUpdateForm.model'

export class CartService {
  static async add(_addForm: CartAddForm): Promise<Cart> {
    // const api = useApi()
    // const body = CartTransformer.toAddDto(addForm)
    // return CartTransformer.toCart(response)
    const response = await createApiMock(createCart())

    return response
  }

  static async addBulk(_addForm: CartAddBulkForm): Promise<Cart> {
    // const api = useApi()
    // const data = await api.post({
    //   body: CartTransformer.toAddBulkDto(addForm),
    //   responseSchema: cartDtoSchema,
    //   url: `/cart/${addForm.cartId}/items/bulk`,
    // })

    // return CartTransformer.toCart(data)

    const response = await createApiMock(createCart())

    return response
  }

  static async get(): Promise<Cart> {
    // const api = useApi()
    // const data = await api.get({
    //   responseSchema: cartDtoSchema,
    //   url: `/cart`,
    // })

    // return CartTransformer.toCart(data)

    const response = await createApiMock(createCart())

    return response
  }

  static async remove(_removeForm: CartRemoveForm): Promise<Cart> {
    // const api = useApi()
    // const data = await api.delete({
    //   responseSchema: cartDtoSchema,
    //   url: `/cart/${removeForm.cartId}/items/${removeForm.orderProductId}`,
    // })

    // return CartTransformer.toCart(data)

    const response = await createApiMock(createCart())

    return response
  }

  static async update(_updateForm: CartUpdateForm): Promise<Cart> {
    // const api = useApi()
    // const data = await api.post({
    //   body: CartTransformer.toUpdateDto(updateForm),
    //   responseSchema: cartDtoSchema,
    //   url: `/cart/${updateForm.cartId}/items/${updateForm.orderProductId}`,
    // })

    // return CartTransformer.toCart(data)

    const response = await createApiMock(createCart())

    return response
  }
}
