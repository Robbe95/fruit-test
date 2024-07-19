import type { OrderUuid } from '@cart/models/order/orderUuid.model'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const orderKeys = createQueryKeys('order', {
  all: (page: MaybeRefOrGetter<number>) => ({
    queryKey: [
      page,
    ],
  }),
  getByUuid: (uuid: MaybeRefOrGetter<OrderUuid>) => ({
    queryKey: [
      uuid,
    ],
  }),
  infinite: (search: MaybeRefOrGetter<string>) => ({
    queryKey: [
      search,
    ],
  }),
})
