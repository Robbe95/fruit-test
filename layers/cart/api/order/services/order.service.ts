import { createApiMock } from '@base/mocks/api.mock'
import { createPaginatedData } from '@base/mocks/paginatedData.mock'
import type {
  PaginatedApiData,
} from '@base/models/paginated-data/paginatedApiData.model'
import { createOrder, createOrders } from '@cart/mocks/order.mock'
import type { Order } from '@cart/models/order/detail/order.model'
import type { OrderIndex } from '@cart/models/order/index/orderIndex.model'
import type { OrderUuid } from '@cart/models/order/orderUuid.model'

export class OrderService {
  static async getAll(_page: number, _search?: null | string): Promise<PaginatedApiData<OrderIndex>> {
    // const api = useApi()
    // const response = await api.get({
    //   config: {
    //     params: {
    //       page,
    //       per_page: 20,
    //       search: search == null || search === '' ? undefined : search,
    //     },
    //   },
    //   responseSchema: paginatedDataSchema(orderIndexDtoSchema),
    //   url: `/orders`,
    // })

    // return {
    //   ...response,
    //   data: response.data.map(OrderTransformer.toOrderIndex),
    // }

    const response = await createApiMock(createPaginatedData(createOrders(20)))

    return response
  }

  static async getByUuid(_uuid: OrderUuid): Promise<Order> {
    // const api = useApi()
    // const response = await api.get({
    //   responseSchema: orderDtoSchema,
    //   url: `/orders/${uuid}`,
    // })

    // return OrderTransformer.toOrder(response)
    const response = await createApiMock(createOrder())

    return response
  }
}
