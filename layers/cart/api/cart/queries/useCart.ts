import { useQuery } from '@base/composables/query/useQuery'
import { cartKeys } from '@cart/api/cart/keys/cart.keys'
import { CartService } from '@cart/api/cart/services/cart.service'

export function useCart() {
  return useQuery({
    ...cartKeys.get,
    queryFn: async () => {
      return await CartService.get()
    },
  })
};
