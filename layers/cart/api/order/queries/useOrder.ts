import { useQuery } from '@base/composables/query/useQuery'
import { orderKeys } from '@cart/api/order/keys/order.keys'
import { OrderService } from '@cart/api/order/services/order.service'
import type { OrderUuid } from '@cart/models/order/orderUuid.model'

export function useOrder(uuid: Ref<OrderUuid>) {
  const ordersQuery = orderKeys.getByUuid(uuid)

  return useQuery({
    queryFn: async () => {
      const data = await OrderService.getByUuid(uuid.value)

      return data
    },
    queryKey: ordersQuery.queryKey,
  })
};
