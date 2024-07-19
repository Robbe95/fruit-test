import { useQuery } from '@base/composables/query/useQuery'
import { orderKeys } from '@cart/api/order/keys/order.keys'
import { OrderService } from '@cart/api/order/services/order.service'

export function useOrders(options: {
  page: Ref<number>
}) {
  const { page } = options

  return useQuery({
    queryFn: async () => {
      const data = await OrderService.getAll(page.value)

      return data
    },

    queryKey: orderKeys.all(page).queryKey,
  })
};
