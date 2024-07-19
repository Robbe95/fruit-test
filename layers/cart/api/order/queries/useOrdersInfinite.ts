import type { PaginatedApiData } from '@base/models/paginated-data/paginatedApiData.model'
import { orderKeys } from '@cart/api/order/keys/order.keys'
import { OrderService } from '@cart/api/order/services/order.service'
import type { OrderIndex } from '@cart/models/order/index/orderIndex.model'
import { useInfiniteQuery } from '@tanstack/vue-query'

export function useOrdersInfinite(search: Ref<null | string>) {
  const convertedSearch = computed<string>(() => search.value ?? '')

  return useInfiniteQuery({
    getNextPageParam: (lastPage: PaginatedApiData<OrderIndex>, _, lastPageParams) => {
      const perPage = lastPage.pagination.perPage
      const total = lastPage.pagination.total

      if (perPage * lastPageParams < total) {
        return lastPageParams + 1
      }

      return undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = await OrderService.getAll(pageParam, search.value)

      return data
    },
    queryKey: orderKeys.infinite(convertedSearch).queryKey,
  })
};
